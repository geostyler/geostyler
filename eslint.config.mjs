import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import stylisticPlugin from '@stylistic/eslint-plugin'

import tsEslint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';

import eslintTerrestris from '@terrestris/eslint-config-typescript-react';

export default tsEslint.config({
  extends: [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.stylistic,
    importPlugin.flatConfigs.recommended
  ],
  files: [
    'src/**/*.{js,mjs,cjs,ts,jsx,tsx}'
  ],
  plugins: {
    react: reactPlugin,
    '@stylistic': stylisticPlugin,
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefreshPlugin
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
    ...eslintTerrestris.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
});
