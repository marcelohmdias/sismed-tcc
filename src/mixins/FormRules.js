export default {
  methods: {
    formIsDisabled (name) {
      const store = this.$store
      const { formfy = {} } = store.state
      const { isLoading = false } = store.getters

      if (!formfy[name]) return true

      const form = formfy[name].formState
      return isLoading || form.pristine || form.invalid
    }
  }
}
