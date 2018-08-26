import {
  GET_LIST,
  RESET_LIST
} from './mutations-types'

export default {

  [GET_LIST] (state, { list }) {
    state.list = list
  },

  [RESET_LIST] (state) {
    state.list = []
  }
}
