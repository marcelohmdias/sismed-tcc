<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <f-field
      :validate="validate('error.login.email_field', required, email)"
      name="email"
    >
      <template slot-scope="props">
        <v-text-field
          :name="props.name"
          :label="$t('page.login.form.email')"
          :rules="checkError(props.meta)"
          :value="props.value"
          prepend-icon="person"
          type="email"
          autofocus
          v-on="props.events"
        />
      </template>
    </f-field>
    <f-field
      :validate="validate('error.login.password_field', required, minLength(6))"
      name="password"
    >
      <template slot-scope="props">
        <v-text-field
          :type="type"
          :append-icon="icon"
          :name="props.name"
          :label="$t('page.login.form.password')"
          :rules="checkError(props.meta)"
          :value="props.value"
          prepend-icon="lock"
          @click:append="changeIcon"
          v-on="props.events"
        />
      </template>
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
