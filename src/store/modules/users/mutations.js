import createMutation from '@/utils/createMutation'

import { GET_USER_LIST, RESET_USER_LIST } from './mutations-types'

export default {
  [GET_USER_LIST]: createMutation('list'),
  [RESET_USER_LIST]: (state) => {
    state.list = []
  }
}
