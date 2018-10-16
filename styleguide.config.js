module.exports = {
  title: 'GeoStyler',
  styleguideDir: './build/styleguide',
  propsParser: require('react-docgen-typescript')
    .withCustomConfig('./tsconfig.json')
    .parse,
  components: 'src/Component/**/*.tsx',
  webpackConfig: require('react-scripts-ts/config/webpack.config.dev.js'),
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.tsx?$/, '.example.md')
  },
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts'
  ],
  showUsage: true,
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
