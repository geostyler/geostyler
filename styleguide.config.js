const webpackConfig = require('./webpack.common.config');
const packagejson = require('./package.json');
module.exports = {
  title: 'GeoStyler',
  styleguideDir: './build/v' + packagejson.version,
  propsParser: require('react-docgen-typescript')
    .withCustomConfig('./tsconfig.json')
    .parse,
  components: 'src/Component/**/*.tsx',
  webpackConfig: webpackConfig,
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.tsx?$/, '.example.md')
  },
  template: {
    favicon: 'https://terrestris.github.io/geostyler/favicon.ico'
  },
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts'
  ],
  usageMode: 'expand',
  sections: [{
    name: 'Introduction',
    content: 'README.md'
  }, {
    name: 'Components',
    sections: [{
      name: 'FieldSet',
      components: 'src/Component/FieldSet/**/*.tsx'
    }, {
      name: 'Filter',
      components: 'src/Component/Filter/**/*.tsx'
    }, {
      name: 'Rule',
      components: 'src/Component/Rule/**/*.tsx'
    }, {
      name: 'RuleTable',
      components: 'src/Component/RuleTable/**/*.tsx'
    }, {
      name: 'RuleGenerator',
      components: 'src/Component/RuleGenerator/**/*.tsx'
    }, {
      name: 'ScaleDenominator',
      components: 'src/Component/ScaleDenominator/**/*.tsx'
    }, {
      name: 'Symbolizer',
      components: 'src/Component/Symbolizer/**/*.tsx'
    }, {
      name: 'UploadButton',
      components: 'src/Component/UploadButton/**/*.tsx'
    }]
  }]
};
