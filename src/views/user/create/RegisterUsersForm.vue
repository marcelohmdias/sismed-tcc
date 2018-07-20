<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-layout row wrap>
      <v-flex xs12 sm8 md8 lg6>
        <f-field
          name="email"
          :validate="validate('error.required.default', required, email)"
        >
          <template slot-scope="props">
            <v-text-field
              :name="props.name"
              :label="$t('page.profile.form.email')"
              :rules="checkError(props.meta)"
              :value="props.value"
              v-on="props.events"
              type="email"
              autofocus
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg3>
        <f-field
          name="password"
          :validate="validate('error.user.password', required, minLength(6))"
        >
          <template slot-scope="props">
            <v-text-field
              :type="type.password"
              :append-icon="icon.password"
              :name="props.name"
              :label="$t('page.user.form.password')"
              :rules="checkError(props.meta)"
              :value="props.value"
              v-on="props.events"
              @click:append="changeIcon('password')"
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg3>
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
              v-on="props.events"
              @click:append="changeIcon('repeat')"
            />
          </template>
        </f-field>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'AppRegisterUsersForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    form: Typed.is.obj.define
  },
  data: () => ({
    icon: {
      password: 'visibility',
      repeat: 'visibility'
    },
    type: {
      password: 'password',
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
    changeIcon (field) {
      this.icon[field] = this.icon[field] === 'visibility'
        ? 'visibility_off'
        : 'visibility'

      this.type[field] = this.type[field] === 'password'
        ? 'text'
        : 'password'
    }
  }
}
</script>
