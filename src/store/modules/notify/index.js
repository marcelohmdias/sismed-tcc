import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const namespaced = true

const state = {
  alert: {}
}

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
}
