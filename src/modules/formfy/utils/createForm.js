import Vue from 'vue'

const CHANGE_STATE_FORM = 'CHANGE_STATE_FORM'
const CHANGE_STATE_FIELD = 'CHANGE_STATE_FIELD'
const REGISTER_FIELD = 'REGISTER_FIELD'

export default () => ({
  actions: {
    [CHANGE_STATE_FIELD]: ({ commit }, payload) => {
      commit(CHANGE_STATE_FIELD, payload)
    },
    [CHANGE_STATE_FORM]: ({ commit }, payload) => {
      commit(CHANGE_STATE_FORM, payload)
    },
    [REGISTER_FIELD]: ({ commit }, payload) => {
      commit(REGISTER_FIELD, payload)
    }
  },
  mutations: {
    [CHANGE_STATE_FIELD]: (state, { name, fieldState }) => {
      state.fieldState[name] = fieldState
    },
    [CHANGE_STATE_FORM]: (state, payload) => {
      state.formState = payload
    },
    [REGISTER_FIELD]: (state, { name }) => {
      Vue.set(state.fieldState, name, null)
    }
  },
  state: {
    formState: null,
    fieldState: {}
  }
})
