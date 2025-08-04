import * as wdio from 'eslint-plugin-wdio';
import globals from 'globals';

export default [
  {
    files: ['tests/**/*.js'],
    plugins: { wdio },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es6,
        ...globals.node,
        ...globals.mocha,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // 'no-undef': 'error', // Typescript
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'always-multiline'],

      'no-process-exit': 'error',
      'no-sync': 'warn',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    },
  },
];
