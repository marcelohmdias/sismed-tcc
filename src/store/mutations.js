import Vue from 'vue'

import { APP_READY, FINISH_REQUEST, INIT_REQUEST } from './mutations-types'

export default {
  [APP_READY] (state) {
    state.ready = true
  },
  [FINISH_REQUEST] (state, { id }) {
    Vue.delete(state.loading, id)
  },
  [INIT_REQUEST] (state, { id }) {
    Vue.set(state.loading, id, true)
  }
}
