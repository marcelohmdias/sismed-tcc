import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import {
  addAddress,
  deleteAddress,
  getUser,
  saveUser,
  editAddress,
  addContact,
  editContact,
  deleteContact
} from '@/server/user'

import { changePassword } from '@/server/auth'

import {
  ADDRESS_DIALOG,
  CHANGE_PASSWORD,
  CONTACT_DIALOG,
  GET_DATA_USER,
  PASSWORD_DIALOG,
  SAVE_USER,
  SAVE_ADDRESS,
  DELETE_ADDRESS,
  SAVE_CONTACT,
  DELETE_CONTACT
} from './mutations-types'

import createAction from '@/utils/createAction'

const parseAction = (ctx, status) => ({ status })

const openAddressDialogAction = createAction(ADDRESS_DIALOG, parseAction)

const openContactDialogAction = createAction(CONTACT_DIALOG, parseAction)

const openPasswordDialogAction = createAction(PASSWORD_DIALOG, parseAction)

const getDataUser = async ({ commit, dispatch }, { uid }) => {
  try {
    const unsubscribe = getUser({ uid }, (type, data = {}) => {
      commit(GET_DATA_USER, { type, data })
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

const changePasswordAction = async ({ commit, dispatch }, { oldPassword, newPassword }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await changePassword(oldPassword, newPassword)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.password',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
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

const saveUserAction = async ({ commit, dispatch }, { _id, data }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await saveUser(_id, data)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.profile',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.profile',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const saveAddresAction = async ({ commit, dispatch }, { _id, data, user }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!_id) {
      await addAddress(user, data)
      notify.title = 'message.title.address.new'
    } else {
      await editAddress(user, _id, data)
      notify.title = 'message.title.address.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !_id
      ? 'message.title.address.new'
      : 'message.title.address.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteAddresAction = async ({ commit, dispatch }, { _id, user }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteAddress(user, _id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.address.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.address.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const saveContactAction = async ({ commit, dispatch }, { _id, data, user }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!_id) {
      await addContact(user, data)
      notify.title = 'message.title.contact.new'
    } else {
      await editContact(user, _id, data)
      notify.title = 'message.title.contact.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !_id
      ? 'message.title.contact.new'
      : 'message.title.contact.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteContactAction = async ({ commit, dispatch }, { _id, user }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteContact(user, _id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.contact.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.contact.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

export default {
  [ADDRESS_DIALOG]: openAddressDialogAction,
  [CHANGE_PASSWORD]: changePasswordAction,
  [CONTACT_DIALOG]: openContactDialogAction,
  [GET_DATA_USER]: getDataUser,
  [PASSWORD_DIALOG]: openPasswordDialogAction,
  [SAVE_USER]: saveUserAction,
  [SAVE_ADDRESS]: saveAddresAction,
  [DELETE_ADDRESS]: deleteAddresAction,
  [SAVE_CONTACT]: saveContactAction,
  [DELETE_CONTACT]: deleteContactAction
}
