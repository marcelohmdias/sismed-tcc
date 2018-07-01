import { fieldSubscriptionItems } from 'final-form'
import Typed from '@/modules/typed'

import { createFieldValidator, createSlot, createSubscribe, isEmpty } from './utils/utils'

const defaultFn = (value) => value

export default {
  name: 'FField',

  inject: ['formConfig', 'formName'],

  data: () => ({
    fieldState: null
  }),

  props: {
    formatter: Typed.is.func.default(defaultFn).define,
    name: Typed.is.str.required.define,
    parser: Typed.is.func.default(defaultFn).define,
    subscription: Typed.is.obj.define,
    validate: Typed.is.type([ Function, Array ]).default(() => {}).define
  },

  methods: {
    handleBlur () {
      this.fieldState.blur()
    },
    handleChange (state) {
      const event = `formfy/${this.formName}/CHANGE_STATE_FIELD`

      this.$emit('change', state)

      this.fieldState = state

      this.$store.dispatch(event, {
        name: this.name,
        fieldState: state
      })
    },
    handleFocus () {
      this.fieldState.focus()
    },
    /**
     * @description
     * @param {Event|string} e
     */
    handleInput (e = {}) {
      let data = e.target ? e.target.value : e

      const value = this.parser
        ? this.parser()(isEmpty(data) ? null : data)
        : data

      this.fieldState.change(value)
    }
  },

  created () {
    this.$store.dispatch(`formfy/${this.formName}/REGISTER_FIELD`, {
      name: this.name
    })

    const subscription = fieldSubscriptionItems.reduce(createSubscribe, {})
    const getValidator = Array.isArray(this.validate)
      ? createFieldValidator(this.validate)
      : this.validate

    this.unsubscribe = this.formConfig.registerField(
      this.name,
      this.handleChange,
      subscription,
      { getValidator }
    )
  },

  beforeDestroy () {
    this.unsubscribe()
  },

  render (h) {
    const {
      active,
      data,
      dirty,
      dirtySinceLastSubmit,
      error,
      initial,
      invalid,
      length,
      name,
      pristine,
      submitError,
      submitFailed,
      submitSucceeded,
      touched,
      valid,
      visited
    } = this.fieldState

    const meta = {
      active,
      data,
      dirty,
      dirtySinceLastSubmit,
      error,
      initial,
      invalid,
      length,
      submitError,
      submitFailed,
      submitSucceeded,
      pristine,
      touched,
      valid,
      visited
    }

    const events = {
      blur: this.handleBlur,
      focus: this.handleFocus,
      input: this.handleInput
    }

    const value = this.formatter()(this.fieldState.value)

    const scope = { events, meta, name, value }
    return createSlot(this.$scopedSlots.default(scope))[0]
  }
}
