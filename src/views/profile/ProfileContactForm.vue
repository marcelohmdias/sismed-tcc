<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <f-field
            name="number_phone"
            :validate="validate('error.required.number_phone', required)"
          >
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.profile.form.number_phone')"
                :rules="checkError(props.meta)"
                :value="props.value"
                :mask="mask"
                type="tel"
                autofocus
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12 sm6>
          <f-field name="contact_person">
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.profile.form.contact_person')"
                :rules="checkError(props.meta)"
                :value="props.value"
                type="text"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12 sm4>
          <f-field
            name="contact_type"
            :validate="validate('error.required.type', required)"
          >
            <template slot-scope="props">
              <app-select
                :items="typeItem"
                :name="props.name"
                :label="'page.profile.form.type'"
                :value="props.value"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12 sm4>
          <f-field
            name="contact_status"
            :validate="validate('error.required.status', required)"
          >
            <template slot-scope="props">
              <app-select
                :items="statusItem"
                :name="props.name"
                :label="'page.profile.form.status'"
                :value="props.value"
                :readonly="!entity._id"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'AppProfileContactForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.define,
    form: Typed.is.obj.define
  },
  data () {
    return {
      typeItem: [
        { text: 'enums.contact.fixed', value: 1 },
        { text: 'enums.contact.mobile', value: 2 }
      ],
      statusItem: [
        { text: 'enums.status.inactive', value: 0 },
        { text: 'enums.status.active', value: 1 }
      ]
    }
  },
  computed: {
    mask () {
      const value = this.form.state.values.number_phone || ''
      return value.length < 11 ? '(##) ####-#####' : '(##) #####-####'
    }
  },
  watch: {
    entity: {
      handler: 'updateFormValue',
      immediate: true
    }
  },
  mounted () {
    EventBus.$on('$CloseDialog', () => this.form.methods.reset())
  },
  methods: {
    required: (...args) => required(...args),
    updateFormValue () {
      this.formConfig.initialize({
        _id: this.entity._id,
        number_phone: this.entity.number,
        contact_person: this.entity.contact_person,
        contact_status: this.entity.status,
        contact_type: this.entity.type
      })
    }
  }
}
</script>
