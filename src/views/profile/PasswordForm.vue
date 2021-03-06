<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-layout row wrap>
      <v-flex xs12>
        <f-field
          name="oldPassword"
          :validate="validate('error.required.default', required)"
        >
          <template slot-scope="props">
            <v-text-field
              :type="type.old"
              :append-icon="icon.old"
              :name="props.name"
              :label="$t('page.profile.form.old_password')"
              :rules="checkError(props.meta)"
              :value="props.value"
              @click:append="changeIcon('old')"
              v-on="props.events"
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12>
        <f-field
          name="newPassword"
          :validate="validate('error.profile.password', required, minLength(6))"
        >
          <template slot-scope="props">
            <v-text-field
              :type="type.new"
              :append-icon="icon.new"
              :name="props.name"
              :label="$t('page.profile.form.new_password')"
              :rules="checkError(props.meta)"
              :value="props.value"
              @click:append="changeIcon('new')"
              v-on="props.events"
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12>
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
              @click:append="changeIcon('repeat')"
              v-on="props.events"
            />
          </template>
        </f-field>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

import EventBus from '@/helpers/EventBus'
import FieldRules from '@/mixins/FieldRules'
import Typed from '@/modules/typed'

export default {
  name: 'PasswordForm',
  mixins: [ FieldRules ],
  props: {
    form: Typed.is.obj.define
  },
  data: () => ({
    icon: {
      new: 'visibility',
      old: 'visibility',
      repeat: 'visibility'
    },
    type: {
      new: 'password',
      old: 'password',
      repeat: 'password'
    }
  }),
  mounted () {
    EventBus.$on('$CloseDialog', () => this.form.methods.reset())
  },
  methods: {
    minLength: (...args) => minLength(...args),
    required: (...args) => required(...args),
    isEquals (value) {
      return this.form.state.values.newPassword === value
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
