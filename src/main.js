import Vue from 'vue'
import { sync } from 'vuex-router-sync'

// Modules
import router from './router'
import store from './store'

// Application
import App from './App'
import './registerServiceWorker'

sync(store, router)

const isDev = process.env.NODE_ENV !== 'production'

const render = h => h(App)

const app = new Vue({ router, store, render })

Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = false

app.$mount('[data-app]')
