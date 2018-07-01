import { APP_READY, INIT_REQUEST, FINISH_REQUEST } from './mutations-types'

export default {
  [APP_READY]: ({ commit }) => commit(APP_READY),
  [FINISH_REQUEST] ({ commit }, { id }) {
    setTimeout(() => commit(FINISH_REQUEST, { id }), 500)
  },
  [INIT_REQUEST]: ({ commit }, { id }) => commit(INIT_REQUEST, { id })
}
