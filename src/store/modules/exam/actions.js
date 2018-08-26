import createHash from '@/helpers/createHash'
// import errorHandler from '@/helpers/errorHandler'

import { getList } from '@/server/exams'

import { RESET_LIST, GET_LIST } from './mutations-types'

const getListAction = async ({ commit, dispatch }, { data = {} }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const list = await getList(data)

    commit(GET_LIST, { list })

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.search',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: 'message.error.internal_error',
      title: 'message.title.search',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const resetListAction = ({ commit }) => commit(RESET_LIST)

export default {
  [RESET_LIST]: resetListAction,
  [GET_LIST]: getListAction,
  [RESET_LIST]: resetListAction
}
