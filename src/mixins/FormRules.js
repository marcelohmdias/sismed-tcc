export default {
  methods: {
    formIsDisabled (name) {
      const formfy = this.$store.state.formfy
      if (!formfy || !formfy[name]) return true
      const form = formfy[name].formState
      return this.isLoading || form.pristine || form.invalid
    }
  }
}
