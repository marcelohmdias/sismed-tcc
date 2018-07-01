import createForm from './createForm'

const REGISTER_FORM = 'REGISTER_FORM'
const UNREGISTER_FORM = 'UNREGISTER_FORM'

export default () => ({
  actions: {
    [REGISTER_FORM]: ({ commit }, payload) => {
      const { model, name, options } = payload
      const module = createForm(model)
      commit(REGISTER_FORM, { module, name, options })
    },
    [UNREGISTER_FORM]: ({ commit }, { name }) => {
      commit(UNREGISTER_FORM, { name })
    }
  },
  mutations: {
    [REGISTER_FORM] () {},
    [UNREGISTER_FORM] () {}
  },
  state: {}
})
