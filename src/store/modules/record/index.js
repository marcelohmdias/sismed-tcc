import actions from './actions'
import mutations from './mutations'

const namespaced = true

const state = {
  data: {
    attendances: [],
    exams: [],
    medicines: []
  },
  list: []
}

export default {
  actions,
  mutations,
  namespaced,
  state
}
