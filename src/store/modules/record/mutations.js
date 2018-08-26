import {
  GET_ID,
  GET_LIST,
  RESET_ID,
  RESET_LIST
} from './mutations-types'

export default {

  [GET_ID] (state, { data, type }) {
    if (type === 'record') {
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
      attendances: [],
      exams: [],
      medicines: []
    }
  },

  [RESET_LIST] (state) {
    state.list = []
  }
}
