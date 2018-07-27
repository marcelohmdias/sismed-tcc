import createMutation from '@/utils/createMutation'

import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  GET_PATIENT_DATA,
  RESET_PATIENT_DATA
} from './mutations-types'

const parseState = ({ status }) => status

export default {
  [ADDRESS_DIALOG]: createMutation('dialogAddress', parseState),

  [CONTACT_DIALOG]: createMutation('dialogContact', parseState),

  [RESET_PATIENT_DATA] (state) {
    state.data = {
      addresses: [],
      contacts: []
    }
  },

  [GET_PATIENT_DATA] (state, { data, type }) {
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
