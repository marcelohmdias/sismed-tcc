import actions from './actions'
import mutations from './mutations'

const namespaced = true

const state = {
  data: {
    addresses: [],
    contacts: []
  },
  dialogAddress: false,
  dialogContact: false,
  list: []
}

export default {
  actions,
  mutations,
  namespaced,
  state
}
