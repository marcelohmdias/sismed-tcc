import createMutation from '@/utils/createMutation'

import { CURRENT_USER, RECOVERY_DIALOG, SIGNIN_USER } from './mutations-types'

export default {
  [CURRENT_USER]: createMutation('user'),
  [RECOVERY_DIALOG]: createMutation('recoveryDialog', ({ status }) => status),
  [SIGNIN_USER]: createMutation('user')
}
