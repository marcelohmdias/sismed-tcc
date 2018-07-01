import createHash from '@/helpers/createHash'

import { ADD, HIDDEN, SHOWN } from './mutations-types'

export default {
  [ADD] ({ commit }, payload) {
    const id = createHash()

    const context = {
      ...payload,
      opened: false
    }

    commit(ADD, { id, context })
  },
  [HIDDEN]: ({ commit }, payload) => commit(HIDDEN, payload),
  [SHOWN]: ({ commit }, payload) => commit(SHOWN, payload)
}
