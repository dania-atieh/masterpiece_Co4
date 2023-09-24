module.exports = {
  plugins: ['node'], //provides rules related to Node.js development.
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  // recommended rules that cover general JavaScript best practices.
  // recommended rules specific to Node.js best practices and patterns.
  env: {
    browser: true,
    commonjs: true,
    es2021: true //may use ECMAScript 2021 features.
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': 'warn' //identify variables that are declared but not used.
  }
};
