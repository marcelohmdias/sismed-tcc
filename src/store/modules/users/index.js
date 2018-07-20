import actions from './actions'
import mutations from './mutations'

const namespaced = true

const state = {
  data: null,
  list: []
}

export default {
  actions,
  mutations,
  namespaced,
  state
}
