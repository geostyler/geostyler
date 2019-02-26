const path = require('path');
const webpackConfig = require('./webpack.common.config');
module.exports = {
  title: 'GeoStyler',
  styleguideDir: './build/styleguide',
  propsParser: require('react-docgen-typescript')
    .withCustomConfig('./tsconfig.json')
    .parse,
  components: 'src/Component/**/*.tsx',
  skipComponentsWithoutExample: true,
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
  }],
  // moduleAliases: {
  //   'antd': path.resolve(__dirname, 'node_modules/antd')
  // },
  require: [
    path.join(__dirname, 'node_modules/antd/dist/antd.css')
  ]
};
