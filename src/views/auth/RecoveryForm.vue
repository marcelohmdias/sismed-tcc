<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-layout row wrap>
      <v-flex xs12 sm9>
        <f-field
          name="emailRecovery"
          :validate="validate('error.login.email_field', required, email)"
        >
          <div slot-scope="props">
            <v-text-field
              prepend-icon="email"
              type="email"
              :id="props.name"
              :name="props.name"
              :label="$t('page.login.form.email')"
              :rules="checkError(props.meta)"
              :value="props.value"
              v-on="props.events"
            />
          </div>
        </f-field>
      </v-flex>
      <v-flex xs12 sm3>
        <v-btn
          color="secondary"
          type="submit"
          :disabled="isDisabled"
          :form="form.name"
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
  methods: {
    email: (...args) => email(...args),
    required: (...args) => required(...args)
  },
  mounted () {
    EventBus.$on('$CloseDialog', () => this.form.methods.reset())
  }
}
</script>
