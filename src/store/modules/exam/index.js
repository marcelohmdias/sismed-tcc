import actions from './actions'
import mutations from './mutations'

const namespaced = true

const state = {
  list: []
}

export default {
  actions,
  mutations,
  namespaced,
  state
}
