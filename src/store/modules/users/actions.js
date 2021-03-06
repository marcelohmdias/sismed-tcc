import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'
import createAction from '@/utils/createAction'

import { createUser, deleteUser, getList, getUser } from '@/server/user'
import { requestChangePassword } from '@/server/auth'

import {
  ADDRESS_DIALOG,
  CHANGE_PASSWORD,
  CONTACT_DIALOG,
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  GET_USER_LIST,
  RESET_USER,
  RESET_USER_LIST
} from './mutations-types'

const parseAction = (ctx, status) => ({ status })

const openAddressDialogAction = createAction(ADDRESS_DIALOG, parseAction)

const openContactDialogAction = createAction(CONTACT_DIALOG, parseAction)

const changePasswordAction = async ({ dispatch }, { email }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const user = await requestChangePassword(email)

    const notify = {
      body: 'message.success.email_changed',
      title: 'message.title.password',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })

    return user
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.password',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

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

const getUserAction = async ({ commit, dispatch }, { id }) => {
  try {
    const unsubscribe = getUser({ id }, (type, data = {}) => {
      commit(GET_USER, { type, data })
    })
    return Promise.resolve(unsubscribe)
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.default.error',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
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

const deleteuserAction = async ({ dispatch }, { user }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteUser(user)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.user_delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })

    return user
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.user_delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const resetListAction = ({ commit }) => commit(RESET_USER_LIST)

const resetUserAction = ({ commit }) => commit(RESET_USER)

export default {
  [ADDRESS_DIALOG]: openAddressDialogAction,
  [CHANGE_PASSWORD]: changePasswordAction,
  [CONTACT_DIALOG]: openContactDialogAction,
  [CREATE_USER]: createUserAction,
  [DELETE_USER]: deleteuserAction,
  [GET_USER]: getUserAction,
  [GET_USER_LIST]: getListAction,
  [RESET_USER]: resetUserAction,
  [RESET_USER_LIST]: resetListAction
}
