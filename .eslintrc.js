module.exports = {
    "env": {
      "es6": true,
      "node": true,
      "googleappsscript/googleappsscript": true,
      "jest/globals": true,
    },
    "extends": [
      "airbnb-base",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
    ],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint",
      "googleappsscript",
      "jest",
    ],
    "rules": {
      "import/extensions": [2, {
        "js": "never",
        "ts": "never",
        "json": "never"
      }],
      "indent": [2, 2],
      "lines-between-class-members": 0,
      "no-console": 0,
      // typescript-eslint の no-unuserd-vars を有効にする
      "no-unused-vars": 0,
      "@typescript-eslint/no-unused-vars": 2,
    }
  };
