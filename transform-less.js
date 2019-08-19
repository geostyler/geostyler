const fs = require('fs');
const readdirp = require('readdirp');
const childProcess = require("child_process");

const replace = require('replace-in-file');

// Transform less
(async function() {
  const files = await readdirp.promise('dist', { fileFilter: '*.less' });
  files.forEach(file => {
    const out = file.fullPath.replace('.less', '.css');
    const less = childProcess.fork('./node_modules/.bin/lessc', [file.fullPath, out]);
    less.on('exit', function (code) {
      fs.unlink(file.fullPath, (err) => {
        if (err) throw err;
      });
    });
  });
})();

// Replace less imports with css imports
const requireRegex = /(require\(".+\.)less"\)/g;
const requireOptions = {
  files: 'dist/**/*.js',
  from: requireRegex,
  to: match => match.replace(requireRegex, '$1css")')
};

const importRegex = /(import '.+\.)less'/g;
const importOptions = {
  files: 'dist/**/*.d.ts',
  from: importRegex,
  to: match => match.replace(importRegex, '$1css\'')
};

replace(requireOptions).catch(error => console.error);
replace(importOptions).catch(error => console.error);
