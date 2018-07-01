import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const namespaced = true

const state = {
  recoveryDialog: false,
  user: null
}

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
}
