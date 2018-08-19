import { getUser } from '@/helpers/storage'

const name = 'Auth'

const checkAuth = (record) => !record.meta.requiresAuth

export const afterEach = function (to, from) {
  this.$Progress.finish()
}

export const beforeEach = function (to, from, next) {
  const progress = this.$Progress

  progress.start()

  if (to.meta.progress !== undefined) progress.parseMeta(to.meta.progress)

  if (
    to.name !== name &&
    to.matched.some(checkAuth) &&
    !getUser()
  ) {
    return next({ name })
  }

  next()
}

export const beforeEnter = function (to, from, next) {
  if (getUser()) return next()

  return next({ name })
}

export default {
  afterEach,
  beforeEach,
  beforeEnter
}
