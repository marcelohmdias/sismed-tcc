import createMutation from '@/utils/createMutation'

import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  GET_USER,
  GET_USER_LIST,
  RESET_USER,
  RESET_USER_LIST
} from './mutations-types'

const parseState = ({ status }) => status

export default {
  [ADDRESS_DIALOG]: createMutation('dialogAddress', parseState),
  [CONTACT_DIALOG]: createMutation('dialogContact', parseState),
  [GET_USER_LIST]: createMutation('list'),
  [RESET_USER_LIST]: createMutation('list', () => []),
  [RESET_USER] (state) {
    state.data = {
      addresses: [],
      contacts: []
    }
  },
  [GET_USER] (state, { data, type }) {
    if (type === 'user') {
      state.data = { ...state.data, ...data }
      return
    }

    state.data[type] = [ ...data ]
  }
}
