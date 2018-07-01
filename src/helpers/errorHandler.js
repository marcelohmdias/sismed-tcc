const error = {
  'auth/internal-error': 'message.error.internal_error',
  'auth/invalid-email': 'message.error.invalid_email',
  'auth/user-disabled': 'message.error.user_disabled',
  'auth/user-not-found': 'message.error.user_not_found',
  'auth/wrong-password': 'message.error.wrong_password',
  'user/inactive-register': 'message.error.inactive_register',
  generic: 'message.error.generic'
}

export default (type = 'generic') => error[type]
