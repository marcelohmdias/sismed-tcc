import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const namespaced = true

const state = {
  data: {
    addresses: [],
    contacts: []
  },
  dialogAddress: false,
  dialogContact: false
}

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
}
