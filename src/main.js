import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import 'babel-polyfill'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import '@progress/kendo-ui/css/web/kendo.material.css'
import '@progress/kendo-ui/css/mobile/kendo.mobile.material.css'

// Modules
import acl from './router/acl'
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
import './env/kendo.core.min'

window.kendo.culture('pt-BR')

const isDev = process.env.NODE_ENV === 'development'

Vue.config.debug = isDev
Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = false
Vue.config.silent = !isDev

sync(store, router)

connect()

const render = h => h(App)

const app = new Vue({ acl, i18n, router, store, render })

onAuthChanged((data = {}) => {
  const user = (data || {}).uid || null

  app.$store.dispatch('auth/CURRENT_USER', { user })

  if (app.$store.state.ready) return

  app.$store.dispatch('APP_READY')

  app.$mount('[data-app]')

  logger()
})
