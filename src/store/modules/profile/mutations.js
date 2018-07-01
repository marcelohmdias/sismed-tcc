import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  GET_DATA_USER,
  PASSWORD_DIALOG
} from './mutations-types'

import createMutation from '@/utils/createMutation'

const parseState = ({ status }) => status

export default {
  [ADDRESS_DIALOG]: createMutation('dialogAddress', parseState),
  [CONTACT_DIALOG]: createMutation('dialogContact', parseState),
  [PASSWORD_DIALOG]: createMutation('dialogPassword', parseState),
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
