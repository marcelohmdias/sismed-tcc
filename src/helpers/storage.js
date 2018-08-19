const stringify = (data) => JSON.stringify(data)

const parse = (data) => JSON.parse(data)

const getItem = () => parse(window.sessionStorage.getItem('CURRENT_USER'))

const isAuth = (type) => /^auth/g.test(type)

const setItem = ({ permission, user }) => {
  window.sessionStorage.setItem('CURRENT_USER', stringify({ permission, user }))
  return user
}

export const setUser = (user = null, permission = null) => {
  return setItem({ permission, user })
}

export const getUser = () => {
  const { permission, user } = getItem() || {}
  return setUser(user, permission)
}

export const plugin = (store) => store.subscribe(
  (mutation, state) => isAuth(mutation.type) && setUser(state.auth.user)
)

export const removeUser = () => window.sessionStorage.removeItem('CURRENT_USER')

export default {
  getUser,
  plugin,
  setUser,
  removeUser
}
