const path = require('path');
const webpackConfig = require('./webpack.common.config');
module.exports = {
  title: 'GeoStyler',
  styleguideDir: './build/styleguide',
  assetsDir: './docs',
  propsParser: require('react-docgen-typescript')
    .withCustomConfig('./tsconfig.json')
    .parse,
  components: 'src/Component/**/*.tsx',
  webpackConfig: webpackConfig,
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.tsx?$/, '.example.md')
  },
  ignore: [
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    'src/index.ts'
  ],
  usageMode: 'expand',
  sections: [{
    name: 'Introduction',
    content: './docs/README.md'
  }, {
    name: 'Components',
    sections: [{
      name: 'CodeEditor',
      components: 'src/Component/CodeEditor/**/*.tsx'
    }, {
      name: 'DataInput',
      components: 'src/Component/DataInput/**/*.tsx'
    }, {
      name: 'FieldSet',
      components: 'src/Component/FieldSet/**/*.tsx'
    }, {
      name: 'Filter',
      components: 'src/Component/Filter/**/*.tsx'
    }, {
      name: 'LocaleWrapper',
      components: 'src/Component/LocaleWrapper/**/*.tsx'
    }, {
      name: 'NameField',
      components: 'src/Component/NameField/**/*.tsx'
    }, {
      name: 'Rule',
      components: 'src/Component/Rule/**/*.tsx'
    }, {
      name: 'RuleGenerator',
      components: 'src/Component/RuleGenerator/**/*.tsx'
    }, {
      name: 'RuleTable',
      components: 'src/Component/RuleTable/**/*.tsx'
    }, {
      name: 'ScaleDenominator',
      components: 'src/Component/ScaleDenominator/**/*.tsx'
    }, {
      name: 'Style',
      components: 'src/Component/Style/**/*.tsx'
    }, {
      name: 'Symbolizer',
      components: 'src/Component/Symbolizer/**/*.tsx'
    }, {
      name: 'UploadButton',
      components: 'src/Component/UploadButton/**/*.tsx'
    }]
  }],
  require: [
    path.join(__dirname, 'node_modules/antd/dist/antd.css')
  ]
};
