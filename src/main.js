import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'babel-polyfill'

// Modules
import i18n from './locales'
import router from './router'
import store from './store'

// Application
import App from './App'
import logger from './helpers/logger'
import { connect } from './helpers/firebase'
import { onAuthChanged } from './server/auth'

import './registerServiceWorker'
import './plugins'

const isDev = process.env.NODE_ENV !== 'production'

Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = false

sync(store, router)

connect()

const render = h => h(App)

const app = new Vue({ i18n, router, store, render })

onAuthChanged((data = {}) => {
  const user = (data || {}).uid || null

  app.$store.dispatch('auth/CURRENT_USER', { user })

  if (app.$store.state.ready) return

  app.$store.dispatch('APP_READY')

  app.$mount('[data-app]')

  logger()
})
