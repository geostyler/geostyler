/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

const fs = require('fs');
const readdirp = require('readdirp');
const childProcess = require('child_process');

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
