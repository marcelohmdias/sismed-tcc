const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const NotifyPlugin = require('webpack-notifier')
const WebpackBar = require('webpackbar')

const BS_PROXY = {
  host: 'localhost',
  open: false,
  port: 3001,
  proxy: 'http://localhost:8080/'
}

const BS_CONFIG = {
  reload: false
}

const plugins = [
  new NotifyPlugin(),
  new WebpackBar()
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(new BrowserSyncPlugin(BS_PROXY, BS_CONFIG))
}

module.exports = {
  configureWebpack: { plugins },
  devServer: {
    progress: false
  },
  lintOnSave: true,
  runtimeCompiler: true,
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  pwa: {
    name: 'SISMed - Sistema de Gestão Médica',
    // Theme Config
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#2d527c',
    msTileColor: '#2d527c',
    themeColor: '#2d527c',
    // Plugin Config
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cacheId: 'sismed-app',
      navigateFallback: 'index.html',
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp(
            '^https://fonts.(?:googleapis|gstatic).com/(.*)'
          ),
          handler: 'staleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60
            }
          }
        }
      ]
    }
  }
}
