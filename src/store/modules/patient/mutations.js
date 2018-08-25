import createMutation from '@/utils/createMutation'

import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  GET_ID,
  GET_LIST,
  RESET_ID,
  RESET_LIST
} from './mutations-types'

const parseState = ({ status }) => status

export default {
  [ADDRESS_DIALOG]: createMutation('dialogAddress', parseState),
  [CONTACT_DIALOG]: createMutation('dialogContact', parseState),

  [GET_ID] (state, { data, type }) {
    if (type === 'patient') {
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
      addresses: [],
      contacts: []
    }
  },

  [RESET_LIST] (state) {
    state.list = []
  }
}
