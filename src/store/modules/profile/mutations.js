import createMutation from '@/utils/createMutation'

import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  GET_DATA_USER,
  PASSWORD_DIALOG,
  RESET_DATA_USER
} from './mutations-types'

const parseState = ({ status }) => status

export default {
  [ADDRESS_DIALOG]: createMutation('dialogAddress', parseState),
  [CONTACT_DIALOG]: createMutation('dialogContact', parseState),
  [PASSWORD_DIALOG]: createMutation('dialogPassword', parseState),
  [RESET_DATA_USER] (state) {
    state.data = {
      addresses: [],
      contacts: []
    }
  },
  [GET_DATA_USER] (state, { data, type }) {
    if (type === 'user') {
      state.data = {
        ...state.data,
        ...data
      }
      return
    }

    state.data[type] = [ ...data ]
  }
}
