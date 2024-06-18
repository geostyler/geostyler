module.exports = {
  extends: '@terrestris/eslint-config-typescript-react',
  rules: {
    camelcase: [
      'off',
      {
        ignoreImports: true
      }
    ],
    '@typescript-eslint/member-ordering': 0
  },
  overrides: [
    {
      files: [
        '**/*.spec.ts',
        '**/*.spec.tsx'
      ],
      env: {
        'jest': true
      }
    }
  ]
};
