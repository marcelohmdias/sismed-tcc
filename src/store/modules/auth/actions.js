import createHash from '@/helpers/createHash'
import errorHandler from '@/helpers/errorHandler'

import { signin, signout, recoverPassword } from '@/server/auth'

import { getByid } from '@/server/user'

import {
  CURRENT_USER,
  RECOVERY_DIALOG,
  RECOVER_PASSWORD,
  SIGNIN_USER,
  SIGNOUT_USER
} from './mutations-types'

const currentUserAction = ({ commit }, { user = null }) => {
  commit(CURRENT_USER, { user })
}

const openRecoveryDialogAction = ({ commit }, status) => {
  commit(RECOVERY_DIALOG, { status })
}

const recoverPasswordAction = async ({ dispatch }, { email }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    await recoverPassword(email)

    const notify = {
      body: 'message.success.generic',
      title: 'message.title.recovery',
      type: 'success'
    }

    dispatch('notify/ADD', notify, { root: true })
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.recovery',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })
    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const signinUserAction = async ({ commit, dispatch }, { email, password }) => {
  const id = createHash()

  try {
    dispatch('INIT_REQUEST', { id }, { root: true })

    const data = await signin(email, password)

    const user = await getByid({ uid: data.user.uid })

    if (!user.status) {
      const err = new Error('user/inactive-register')
      err.code = 'user/inactive-register'
      throw err
    }

    commit(SIGNIN_USER, { user: data.user.uid })

    setTimeout(
      () => {
        const notify = {
          body: 'message.success.signin',
          title: 'message.title.signin',
          type: 'success'
        }

        dispatch('notify/ADD', notify, { root: true })
      },
      500
    )
  } catch (err) {
    const notify = {
      body: errorHandler(err.code),
      title: 'message.title.auth',
      type: 'error'
    }

    dispatch('notify/ADD', notify, { root: true })

    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

const signoutUserAction = async ({ commit, dispatch }) => {
  const id = createHash()

  try {
    await signout()
    commit(CURRENT_USER, { user: null })
  } catch (err) {
    throw new Error(err)
  } finally {
    dispatch('FINISH_REQUEST', { id }, { root: true })
  }
}

export default {
  [CURRENT_USER]: currentUserAction,
  [RECOVERY_DIALOG]: openRecoveryDialogAction,
  [RECOVER_PASSWORD]: recoverPasswordAction,
  [SIGNIN_USER]: signinUserAction,
  [SIGNOUT_USER]: signoutUserAction
}
