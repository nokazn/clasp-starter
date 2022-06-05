const ALLOW = 0;
// const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    node: true,
    'googleappsscript/googleappsscript': true,
    'jest/globals': true,
  },
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'googleappsscript', 'jest'],
  rules: {
    'import/extensions': [
      ERROR,
      {
        js: 'never',
        ts: 'never',
        json: 'never',
      },
    ],
    'import/prefer-default-export': ALLOW,
    'import/no-unresolved': ALLOW,

    'lines-between-class-members': ALLOW,
    'no-console': ALLOW,

    // typescript-eslint の no-unused-vars を有効にする
    'no-unused-vars': ALLOW,
    '@typescript-eslint/no-unused-vars': ERROR,
  },
};
