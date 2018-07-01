<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <f-field
      name="email"
      :validate="validate('error.login.email_field', required, email)"
    >
      <div slot-scope="props">
        <v-text-field
          prepend-icon="person"
          type="email"
          :id="props.name"
          :name="props.name"
          :label="$t('page.login.form.email')"
          :rules="checkError(props.meta)"
          :value="props.value"
          v-on="props.events"
          autofocus
        />
      </div>
    </f-field>
    <f-field
      name="password"
      :validate="validate('error.login.password_field', required, minLength(6))"
    >
      <div slot-scope="props">
        <v-text-field
          id="password"
          :type="type"
          :append-icon="icon"
          @click:append="changeIcon"
          prepend-icon="lock"
          :name="props.name"
          :label="$t('page.login.form.password')"
          :rules="checkError(props.meta)"
          :value="props.value"
          v-on="props.events"
        />
      </div>
    </f-field>
  </v-form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

import FieldRules from '@/mixins/FieldRules'
import Typed from '@/modules/typed'

export default {
  name: 'AppLoginForm',
  mixins: [ FieldRules ],
  props: {
    form: Typed.is.obj.define
  },
  data: () => ({
    icon: 'visibility',
    type: 'password'
  }),
  methods: {
    email: (...args) => email(...args),
    minLength: (...args) => minLength(...args),
    required: (...args) => required(...args),
    changeIcon () {
      this.icon = this.icon === 'visibility'
        ? 'visibility_off'
        : 'visibility'

      this.type = this.type === 'password'
        ? 'text'
        : 'password'
    }
  }
}
</script>

<style lang="stylus" scoped>
.card__text
  padding-bottom 5px
</style>
