import { createForm, formSubscriptionItems } from 'final-form'
import Typed from '@/modules/typed'

import { createFormValidator, createSlot, createSubscribe } from './utils/utils'

export default {
  name: 'FForm',

  data () {
    const form = createForm({
      onSubmit: this.submit,
      initialValues: this.initial,
      validate: Array.isArray(this.validate)
        ? createFormValidator(this.validate)
        : this.validate
    })

    return {
      formConfig: form,
      formState: null
    }
  },

  props: {
    initial: Typed.is.obj.default({}).define,
    name: Typed.is.str.required.define,
    submit: Typed.is.func.default(() => {}).define,
    subscription: Typed.is.obj.define,
    validate: Typed.is.type([ Function, Array ]).default(() => {}).define
  },

  methods: {

    /**
      * @description
      * @param {Event} event
      */
    handleSubmit (event) {
      event && event.preventDefault()
      this.formConfig.submit()
    },

    handleChange (state) {
      this.formState = state
      this.$store.dispatch(`formfy/${this.name}/CHANGE_STATE_FORM`, state)
      this.$emit('change', state)
    }
  },

  created () {
    this.$store.dispatch('formfy/REGISTER_FORM', { name: this.name })

    const subscription = this.subscription
      ? this.subscription
      : formSubscriptionItems.reduce(createSubscribe, {})

    this.unsubscribe = this.formConfig.subscribe(
      this.handleChange,
      subscription
    )
  },

  beforeDestroy () {
    this.unsubscribe()
  },

  provide () {
    return {
      formConfig: this.formConfig,
      formName: this.name
    }
  },

  render (h) {
    const props = {
      name: this.name,
      state: this.formState,
      methods: {
        mutators: this.formConfig.mutators,
        batch: this.formConfig.batch,
        blur: this.formConfig.blur,
        change: this.formConfig.change,
        focus: this.formConfig.focus,
        initialize: this.formConfig.initialize,
        reset: this.formConfig.reset,
        submit: this.handleSubmit
      }
    }

    const slot = this.$scopedSlots.default
      ? this.$scopedSlots.default(props)
      : this.$slots.default

    return h('div', null, createSlot(slot))
  }
}
