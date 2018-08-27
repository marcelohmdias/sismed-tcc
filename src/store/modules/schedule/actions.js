import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import {
  getList,
  addSchedule,
  editSchedule,
  deleteSchedule
} from '@/server/schedule'

import { RESET_LIST, GET_LIST, SAVE, DELETE } from './mutations-types'

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

const saveScheduleAction = async ({ commit, dispatch }, { _id, data }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const notify = {
      body: 'message.success.generic',
      type: 'success'
    }

    let value

    if (!_id) {
      value = await addSchedule(data)
      notify.title = 'message.title.schedule.new'
    } else {
      value = await editSchedule(_id, data)
      notify.title = 'message.title.schedule.edit'
    }

    if (value) throw new Error(value.message)

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: err.code ? errorHandler(err.code) : `error.${err.message}`,
      type: 'error'
    }

    notify.title = !_id
      ? 'message.title.schedule.new'
      : 'message.title.schedule.edit'

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const deleteScheduleAction = async ({ commit, dispatch }, { _id }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await deleteSchedule(_id)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.schedule.delete',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.schedule.delete',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

export default {
  [RESET_LIST]: resetListAction,
  [GET_LIST]: getListAction,
  [SAVE]: saveScheduleAction,
  [DELETE]: deleteScheduleAction
}
