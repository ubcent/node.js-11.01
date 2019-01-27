module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    // 'plugin:prettier/recommended'
    'standard'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
   rules: {
     semi: [1, 'always'],
     'comma-dangle': ['error', 'only-multiline'],
     'no-unused-vars': 1,
     'no-debugger': 1,
     'no-console': 1,
     'space-before-function-paren': 0,
     'indent': 1,
     'vue/attribute-hyphenation': 0
  },
}
