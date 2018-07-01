import Vue from 'vue'
import { ADD, HIDDEN, SHOWN } from './mutations-types'

export default {
  [ADD] (state, { id, context }) {
    Vue.set(state.alert, id, context)
  },
  [HIDDEN] (state, { id }) {
    Vue.delete(state.alert, id)
  },
  [SHOWN] (state, { id }) {
    state.alert[id].opened = true
  }
}
