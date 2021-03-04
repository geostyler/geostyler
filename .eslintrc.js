module.exports = {
  extends: '@terrestris/eslint-config-typescript',
  rules: {
    camelcase: [
      "off",
      {
        ignoreImports: true
      }
    ]
  }
};
