import createAction from '@/utils/createAction'
import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import {
  getList,
  getByid,
  deletePatient,
  createPatient,
  savePatient,
  addAddress,
  addContact,
  editAddress,
  editContact,
  deleteAddress,
  deleteContact
} from '@/server/patient'
import { createRecord } from '@/server/record'

import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  RESET_ID,
  RESET_LIST,
  GET_ID,
  GET_LIST,
  DELETE,
  SAVE,
  DELETE_ADDRESS,
  SAVE_ADDRESS,
  DELETE_CONTACT,
  SAVE_CONTACT,
  GENERATE_RECORD
} from './mutations-types'

const parseAction = (ctx, status) => ({ status })

const openAddressDialogAction = createAction(ADDRESS_DIALOG, parseAction)

const openContactDialogAction = createAction(CONTACT_DIALOG, parseAction)

const resetIdAction = ({ commit }) => commit(RESET_ID)

const resetListAction = ({ commit }) => commit(RESET_LIST)

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

const getIdAction = async ({ commit, dispatch }, { id }) => {
  try {
    const unsubscribe = getByid(id, (type, data = {}) => {
      commit(GET_ID, { type, data })
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

const deleteAction = async ({ dispatch }, { ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deletePatient(ref)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.patient.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })

    return ref
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.entity_delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const saveAction = async ({ dispatch }, { ref, data }) => {
  const id = createHash()

  try {
    let register
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!ref) {
      register = await createPatient(data)
      notify.title = 'message.title.patient.new'
    } else {
      register = await savePatient(ref, data)
      notify.title = 'message.title.patient.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
    return register
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !ref
      ? 'message.title.patient.new'
      : 'message.title.patient.edit'

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

const generateRecordAction = async ({ commit, dispatch }, { data }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const result = await createRecord(data)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.record.new',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })

    return result
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.record.new',
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
  [CONTACT_DIALOG]: openContactDialogAction,
  [RESET_ID]: resetIdAction,
  [RESET_LIST]: resetListAction,
  [GET_ID]: getIdAction,
  [GET_LIST]: getListAction,
  [DELETE]: deleteAction,
  [SAVE]: saveAction,
  [DELETE_ADDRESS]: deleteAddresAction,
  [SAVE_ADDRESS]: saveAddresAction,
  [DELETE_CONTACT]: deleteContactAction,
  [SAVE_CONTACT]: saveContactAction,
  [GENERATE_RECORD]: generateRecordAction
}
