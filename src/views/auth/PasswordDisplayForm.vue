<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <f-field
      :validate="validate('error.login.password_field', required, minLength(6))"
      name="password"
    >
      <template slot-scope="props">
        <v-text-field
          :type="type.new"
          :append-icon="icon.new"
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
    <f-field
      name="repeatPassword"
      :validate="validate('error.profile.repeat_password', required, isEquals)"
    >
      <template slot-scope="props">
        <v-text-field
          :type="type.repeat"
          :append-icon="icon.repeat"
          :name="props.name"
          :label="$t('page.profile.form.repeat_password')"
          :rules="checkError(props.meta)"
          :value="props.value"
          prepend-icon="lock"
          @click:append="changeIcon('repeat')"
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
  name: 'AppPasswordDisplayForm',
  mixins: [ FieldRules ],
  props: {
    form: Typed.is.obj.define
  },
  data: () => ({
    icon: {
      new: 'visibility',
      repeat: 'visibility'
    },
    type: {
      new: 'password',
      repeat: 'password'
    }
  }),
  methods: {
    email: (...args) => email(...args),
    minLength: (...args) => minLength(...args),
    required: (...args) => required(...args),
    isEquals (value) {
      return this.form.state.values.password === value
    },
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
