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
                :items="patient"
                :name="props.name"
                :label="$t('page.schedule.form.patient')"
                :no-data-text="$t('message.no_data')"
                :rules="checkError(props.meta)"
                :value="props.value"
                :search-input="props.value"
                :filter="searchFilter"
                v-on="props.events"
                item-text="value"
                item-value="key"
                return-object
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field
            name="doctor"
            :validate="validate('error.required.doctor', required)"
          >
            <template slot-scope="props">
              <v-autocomplete
                :items="doctor"
                :name="props.name"
                :label="$t('page.schedule.form.doctor')"
                :no-data-text="$t('message.no_data')"
                :rules="checkError(props.meta)"
                :value="props.value"
                :search-input="props.value"
                :filter="searchFilter"
                v-on="props.events"
                item-text="value"
                item-value="key"
                return-object
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs16>
          <f-field
            name="date"
            :formatter="dateFormatter"
            :validate="validate('error.required.date', required)"
          >
            <template slot-scope="props">
              <app-date-picker
                :value="props.value"
                v-on="props.events">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.schedule.form.date')"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  type="text"
                  readonly
                />
              </app-date-picker>
            </template>
          </f-field>
        </v-flex>
        <v-flex xs16>
          <f-field
            name="time"
            :formatter="timeFormatter"
            :validate="validate('error.required.time', required)"
          >
            <template slot-scope="props">
              <app-date-picker
                :value="props.value"
                v-on="props.events" is-time>
                <v-text-field
                  :name="props.name"
                  :label="$t('page.schedule.form.time')"
                  :rules="checkError(props.meta)"
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
    form: Typed.is.obj.define,
    doctor: Typed.is.array.required.define,
    patient: Typed.is.array.required.define,
    opened: Typed.is.bool.required.define
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
  methods: {
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },
    timeFormatter () {
      return (value) => value || null
    },

    required: (...args) => required(...args),

    searchFilter (item, query = '') {
      if (query.value) {
        return item.value.toLowerCase().indexOf(query.value.toLowerCase()) > -1
      }

      if (Array.isArray(query)) {
        return query.some((data) => {
          return item.value.toLowerCase().indexOf(data.value.toLowerCase()) > -1
        })
      }

      return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
    }
  },
  watch: {
    opened (value) {
      !value && this.form.methods.reset()
    },
    entity (value) {
      this.formConfig.initialize({ ...value })
      this.form.methods.reset()
    }
  },
  mounted () {
    EventBus.$on('$CloseDialog', () => this.form.methods.reset())
  }
}
</script>
