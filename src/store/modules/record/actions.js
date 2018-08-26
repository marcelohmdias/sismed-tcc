import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import {
  getList,
  deleteRecord,
  getByid,
  addAttendance,
  editAttendance,
  deleteAttendance,
  addMedicine,
  editMedicine,
  deleteMedicine
} from '@/server/record'
import { addExam, deleteExam, editExam } from '@/server/exams'

import {
  RESET_ID,
  RESET_LIST,
  GET_LIST,
  DELETE,
  GET_ID,
  SAVE_ATTENDANCES,
  DELETE_ATTENDANCES,
  SAVE_EXAMS,
  DELETE_EXAMS,
  SAVE_MEDICINES,
  DELETE_MEDICINES
} from './mutations-types'

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

const deleteAction = async ({ dispatch }, { ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteRecord(ref)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.record.delete',
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

const resetIdAction = ({ commit }) => commit(RESET_ID)

const resetListAction = ({ commit }) => commit(RESET_LIST)

const saveAttendancesAction = async ({ commit, dispatch }, { _id, data, ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!_id) {
      await addAttendance(ref, data)
      notify.title = 'message.title.attendance.new'
    } else {
      await editAttendance(ref, _id, data)
      notify.title = 'message.title.attendance.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !_id
      ? 'message.title.attendance.new'
      : 'message.title.attendance.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteAttendancesAction = async ({ commit, dispatch }, { _id, ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteAttendance(ref, _id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.attendance.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.attendance.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const saveExamsAction = async ({ commit, dispatch }, { _id, data }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!_id) {
      await addExam(data)
      notify.title = 'message.title.exam.new'
    } else {
      await editExam(_id, data)
      notify.title = 'message.title.exam.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !_id
      ? 'message.title.exam.new'
      : 'message.title.exam.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteExamsAction = async ({ commit, dispatch }, { _id }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteExam(_id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.exam.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.exam.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const saveMedicinesAction = async ({ commit, dispatch }, { _id, data, ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    if (!_id) {
      await addMedicine(ref, data)
      notify.title = 'message.title.medicine.new'
    } else {
      await editMedicine(ref, _id, data)
      notify.title = 'message.title.medicine.edit'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      type: 'error'
    }

    notify.title = !_id
      ? 'message.title.medicine.new'
      : 'message.title.medicine.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteMedicinesAction = async ({ commit, dispatch }, { _id, ref }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteMedicine(ref, _id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.medicine.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.medicine.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

export default {
  [RESET_ID]: resetIdAction,
  [RESET_LIST]: resetListAction,
  [GET_LIST]: getListAction,
  [DELETE]: deleteAction,
  [GET_ID]: getIdAction,
  [RESET_ID]: resetIdAction,
  [RESET_LIST]: resetListAction,
  [SAVE_ATTENDANCES]: saveAttendancesAction,
  [DELETE_ATTENDANCES]: deleteAttendancesAction,
  [SAVE_EXAMS]: saveExamsAction,
  [DELETE_EXAMS]: deleteExamsAction,
  [SAVE_MEDICINES]: saveMedicinesAction,
  [DELETE_MEDICINES]: deleteMedicinesAction
}
