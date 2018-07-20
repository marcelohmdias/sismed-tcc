<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-layout row wrap>
      <v-flex xs12 sm9>
        <f-field
          :validate="validate('error.login.email_field', required, email)"
          name="emailRecovery"
        >
          <template slot-scope="props">
            <v-text-field
              :name="props.name"
              :label="$t('page.login.form.email')"
              :rules="checkError(props.meta)"
              :value="props.value"
              prepend-icon="email"
              type="email"
              v-on="props.events"
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12 sm3>
        <v-btn
          :disabled="isDisabled"
          :form="form.name"
          color="secondary"
          type="submit"
          block
        >
          <app-icon name="send" request />
          <span v-t="'globals.button.send'" />
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

import EventBus from '@/helpers/EventBus'
import FieldRules from '@/mixins/FieldRules'
import FormRules from '@/mixins/FormRules'
import Typed from '@/modules/typed'

const getters = mapGetters({ isLoading: 'isLoading' })

export default {
  name: 'RecoveryForm',
  mixins: [ FieldRules, FormRules ],
  props: {
    form: Typed.is.obj.define
  },
  computed: {
    ...getters,
    isDisabled () {
      return this.formIsDisabled('RecoveryForm')
    }
  },
  mounted () {
    EventBus.$on('$CloseDialog', () => this.form.methods.reset())
  },
  methods: {
    email: (...args) => email(...args),
    required: (...args) => required(...args)
  }
}
</script>
