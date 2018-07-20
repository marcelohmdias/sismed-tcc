import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import { createUser, getList } from '@/server/user'

import { CREATE_USER, GET_USER_LIST, RESET_USER_LIST } from './mutations-types'

const createUserAction = async ({ commit, dispatch }, { data = {} }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const user = await createUser(data)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.user',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })

    return user
  } catch (err) {
    debugger
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.user',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const getListAction = async ({ commit, dispatch }, { data = {} }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const list = await getList(data)

    commit(GET_USER_LIST, { list })

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.search',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: 'message.user.insert',
      title: 'message.title.search',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const resetListAction = ({ commit }) => commit(RESET_USER_LIST)

export default {
  [CREATE_USER]: createUserAction,
  [GET_USER_LIST]: getListAction,
  [RESET_USER_LIST]: resetListAction
}
