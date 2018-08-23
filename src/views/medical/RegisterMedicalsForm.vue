<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-layout row wrap>
      <v-flex xs12 sm12 md8 lg6>
        <f-field
          name="full_name"
          :validate="validate('error.required.full_name', required)"
        >
          <template slot-scope="props">
            <v-text-field
              :name="props.name"
              :label="$t('page.profile.form.full_name')"
              :rules="checkError(props.meta)"
              :value="props.value"
              v-on="props.events"
              type="text"
              autofocus
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <f-field
          name="cpf"
          :validate="validate('error.required.cpf', required)"
        >
          <template slot-scope="props">
            <v-text-field
              :name="props.name"
              :label="$t('page.profile.form.cpf')"
              :rules="checkError(props.meta)"
              :value="props.value"
              v-on="props.events"
              type="tel"
              mask="###.###.###-##"
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <f-field
          name="registry"
          :validate="validate('error.required.registry', required)"
        >
          <template slot-scope="props">
            <v-text-field
              :name="props.name"
              :label="$t('page.medical.form.registry')"
              :rules="checkError(props.meta)"
              :value="props.value"
              v-on="props.events"
              type="text"
            />
          </template>
        </f-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <f-field name="status">
          <template slot-scope="props">
            <app-select
              :items="statusItem"
              :name="props.name"
              :label="'page.profile.form.status'"
              :value="props.value"
              v-on="props.events"
            />
          </template>
        </f-field>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'RegisterMedicalsForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.define,
    form: Typed.is.obj.define
  },
  data () {
    return {
      statusItem: [
        { text: 'enums.status.inactive', value: 0 },
        { text: 'enums.status.active', value: 1 }
      ]
    }
  },
  methods: {

    required: (...args) => required(...args),

    updateFormValue () {
      if (this.entity._id) {
        return this.formConfig.initialize({
          ...this.entity
        })
      }

      return this.formConfig.initialize({
        ...this.entity,
        status: 1
      })
    }

  },
  watch: {
    entity: {
      handler: 'updateFormValue',
      immediate: true
    }
  }
}
</script>
