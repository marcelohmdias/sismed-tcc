module.exports = {
  plugins: {
    autoprefixer: {
      add: true,
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie <= 9'
      ]
    }
  }
}
