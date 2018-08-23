import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import {
  deleteDoctor,
  getByid,
  getList,
  saveDoctor,
  createDoctor,
  addSpeciality,
  editSpeciality,
  deleteSpeciality
} from '@/server/doctor'

import {
  DELETE,
  GET_ID,
  GET_LIST,
  RESET_ID,
  RESET_LIST,
  SAVE,
  SAVE_SPECIALITIES,
  DELETE_SPECIALITIES
} from './mutations-types'

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

const deleteAction = async ({ dispatch }, { ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteDoctor(ref)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.doctor.delete',
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

const resetIdAction = ({ commit }) => commit(RESET_ID)

const resetListAction = ({ commit }) => commit(RESET_LIST)

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
      register = await createDoctor(data)
      notify.title = 'message.title.doctor.new'
    } else {
      register = await saveDoctor(ref, data)
      notify.title = 'message.title.doctor.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
    return register
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !ref
      ? 'message.title.doctor.new'
      : 'message.title.doctor.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const saveSpecialityAction = async ({ dispatch }, { ref, data, _id }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!_id) {
      await addSpeciality(ref, data)
      notify.title = 'message.title.speciality.new'
    } else {
      await editSpeciality(ref, _id, data)
      notify.title = 'message.title.speciality.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !ref
      ? 'message.title.speciality.new'
      : 'message.title.speciality.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteSpecialityAction = async ({ dispatch }, { ref, _id }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteSpeciality(ref, _id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.speciality.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.speciality.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

export default {
  [DELETE]: deleteAction,
  [GET_ID]: getIdAction,
  [GET_LIST]: getListAction,
  [RESET_ID]: resetIdAction,
  [RESET_LIST]: resetListAction,
  [SAVE]: saveAction,
  [SAVE_SPECIALITIES]: saveSpecialityAction,
  [DELETE_SPECIALITIES]: deleteSpecialityAction
}
