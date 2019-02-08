module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 8,
  },

  env: {
    amd: true,
    browser: true,
    es6: true,
    node: true
  }
};
