const path = require('path')
const glob = require('glob')

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const NotifyPlugin = require('webpack-notifier')
const PurgecssPlugin = require('purgecss-webpack-plugin')
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

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  configureWebpack: {
    plugins: [
      new BrowserSyncPlugin(BS_PROXY, BS_CONFIG),

      new DashboardPlugin(),

      new NotifyPlugin(),

      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
      }),

      new WebpackBar()
    ]
  },
  devServer: {
    progress: false
  },
  lintOnSave: true,
  runtimeCompiler: true,
  parallel: require('os').cpus().length > 1,
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#2d527c',
    msTileColor: '#fff',
    name: 'SISMed - Sistema de Gestão Médica',
    themeColor: '#2d527c',
    workboxOptions: {
      cacheId: 'sismed-app',
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
