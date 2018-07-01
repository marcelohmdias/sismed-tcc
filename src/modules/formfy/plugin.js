import defineName from './utils/defineName'
import createModule from './utils/createModule'

const register = (store, { module = {}, options = {}, name }) => {
  if (module.registered) return

  name = defineName(name)

  module.namespaced = true
  module.registered = true

  store.registerModule(name, module, options)
}

const unregister = (store, { name }) => {
  store.unregister(defineName(name))
}

const subscribe = (store) => {
  store.subscribe(({ type, payload }) => {
    switch (type) {
      case 'formfy/REGISTER_FORM': return register(store, payload)
      case 'formfy/UNREGISTER_FORM': return unregister(store, payload)
    }
  })
}

export default (store) => {
  const module = createModule()
  register(store, { module })
  subscribe(store)
}
