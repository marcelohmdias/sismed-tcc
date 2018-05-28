const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const NotifyPlugin = require('webpack-notifier')
const WebpackBar = require('webpackbar')

const BS_PROXY = {
  host: 'localhost',
  open: false,
  port: 3001,
  proxy: 'http://localhost:3000/'
}

const BS_CONFIG = {
  reload: false
}

module.exports = {
  configureWebpack: {
    plugins: [
      new BrowserSyncPlugin(BS_PROXY, BS_CONFIG),
      new DashboardPlugin(),
      new NotifyPlugin(),
      new WebpackBar()
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    inline: true,
    port: 3000,
    progress: true,
    stats: 'errors-only'
  },
  lintOnSave: true,
  parallel: require('os').cpus().length > 1
}
