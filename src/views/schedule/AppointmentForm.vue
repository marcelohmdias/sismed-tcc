<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <f-field name="patient">
            <template slot-scope="props">
              <v-autocomplete
                :items="[]"
                :name="props.name"
                :label="$t('page.schedule.form.patient')"
                :no-data-text="$t('message.no_data')"
                :value="props.value"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="doctor">
            <template slot-scope="props">
              <v-autocomplete
                :items="[]"
                :name="props.name"
                :label="$t('page.schedule.form.doctor')"
                :no-data-text="$t('message.no_data')"
                :value="props.value"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="date" :formatter="dateFormatter">
            <template slot-scope="props">
              <app-date-picker
                :value="props.value"
                v-on="props.events">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.schedule.form.date')"
                  :value="props.value"
                  type="text"
                  readonly
                />
              </app-date-picker>
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="note">
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.patient.form.note')"
                :value="props.value"
                v-on="props.events"
                type="text"
                rows="1"
                auto-grow
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
import { date } from '@/helpers/formatters'

export default {
  name: 'AppointmentForm',
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
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },
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
