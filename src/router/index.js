import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const mode = 'history'

export default new VueRouter({ mode, routes })
