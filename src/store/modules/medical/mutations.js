import {
  GET_ID,
  GET_LIST,
  RESET_ID,
  RESET_LIST
} from './mutations-types'

export default {

  [GET_ID] (state, { data, type }) {
    if (type === 'doctor') {
      state.data = {
        ...state.data,
        ...data
      }
      return
    }

    state.data[type] = [ ...data ]
  },

  [GET_LIST] (state, { list }) {
    state.list = list
  },

  [RESET_ID] (state) {
    state.data = {
      specialities: []
    }
  },

  [RESET_LIST] (state) {
    state.list = []
  }
}
