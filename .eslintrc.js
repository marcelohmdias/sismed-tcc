const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'prettier',
    'prettier/standard',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [ 'prettier' ],
  rules: {
    'generator-star-spacing': 'off',
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
