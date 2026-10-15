import reactHooksPlugin from 'eslint-plugin-react-hooks';
import stylisticPlugin from '@stylistic/eslint-plugin';

import tsEslint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';

export default tsEslint.config({
  extends: [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.stylistic,
  ],
  files: [
    'src/**/*.{js,mjs,cjs,ts,jsx,tsx}'
  ],
  plugins: {
    '@stylistic': stylisticPlugin,
    'react-hooks': reactHooksPlugin
  },
  languageOptions: {
    globals: globals.browser,
    ecmaVersion: 'latest',
    parserOptions: {
      project: [
        './tsconfig.json',
        './tsconfig.test.json',
      ],
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: {
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'keyword-spacing': 2,
    'max-len': ['warn', { code: 120 }],
    'eol-last': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-trailing-spaces': 'warn',
    'spaced-comment': 'warn',
    'comma-dangle': 'off',
    '@stylistic/quotes': ['warn', 'single'],
    '@stylistic/semi': ['warn', 'always'],
    '@stylistic/member-delimiter-style': [
      'warn',
      {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false }
      }
    ],
    '@stylistic/type-annotation-spacing': 'warn',
    '@stylistic/jsx-tag-spacing': 'error',
    'camelcase': 'warn',
    'id-match': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase']
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false
        }
      }
    ],
    'curly': 'warn',
    'default-case': 'off',
    'dot-notation': 'warn',
    'eqeqeq': ['warn', 'smart'],
    'guard-for-in': 'warn',
    'no-bitwise': 'warn',
    'no-caller': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-fallthrough': 'warn',
    'no-new-wrappers': 'warn',
    'no-redeclare': 'warn',
    'no-shadow': ['warn', { hoist: 'all' }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-unused-expressions': 'warn',
    'no-unused-labels': 'warn',
    'radix': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off'
  }
});
