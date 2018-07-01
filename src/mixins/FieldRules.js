export default {
  methods: {
    checkError (state = {}) {
      return state.dirty && state.invalid ? [this.$t(state.error)] : []
    },
    validate (message, ...fns) {
      return () => (value, model) => {
        return !fns.every(fn => fn(value)) ? message : undefined
      }
    }
  }
}
