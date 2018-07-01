import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// Plugins
import Formfy from '@/modules/formfy'
import storage from '@/helpers/storage'

import modules from './modules'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const plugins = [
  Formfy.plugin,
  storage.plugin
]

const state = {
  loading: {},
  ready: false
}

export default new Vuex.Store({
  actions,
  getters,
  modules,
  mutations,
  plugins,
  state,
  strict
})
