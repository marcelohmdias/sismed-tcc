<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <f-field
            name="doctor"
            :validate="validate('error.required.doctor', required)"
          >
            <template slot-scope="props">
              <v-autocomplete
                :items="list"
                :name="props.name"
                :label="$t('page.record.table.doctor')"
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
        <v-flex xs12 md6>
          <f-field
            name="date"
            :formatter="dateFormatter"
            :validate="validate('error.required.date', required)"
          >
            <template slot-scope="props">
              <app-date-picker
                :value="props.value"
                v-on="props.events"
              >
                <v-text-field
                  :name="props.name"
                  :label="$t('page.record.table.date')"
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
          <f-field
            name="anamnesis"
            :validate="validate('error.required.anamnesis', required)"
          >
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.record.form.anamnesis')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
                type="text"
                rows="3"
                auto-grow
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field
            name="diagnostic"
            :validate="validate('error.required.diagnostic', required)"
          >
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.record.form.diagnostic')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
                type="text"
                rows="3"
                auto-grow
              />
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
                rows="3"
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
import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'
import { date } from '@/helpers/formatters'

export default {
  name: 'RecordAttendanceForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.default({}).define,
    form: Typed.is.obj.define,
    list: Typed.is.array.define,
    opened: Typed.is.bool.define
  },
  methods: {
    required: (...args) => required(...args),
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },
    searchFilter (item, query = '') {
      if (query.value) {
        return item.value.toLowerCase().indexOf(query.value.toLowerCase()) > -1
      }
      return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
    }
  },
  watch: {
    opened (value) {
      !value && this.form.methods.reset()
    },
    entity (value) {
      if (!value._id) {
        this.formConfig.initialize({})
        this.form.methods.reset()
        return
      }

      this.formConfig.initialize({
        _id: value._id,
        doctor: {
          key: value.doctor_id,
          value: value.doctor_name
        },
        date: date(value.date.toMillis()).format('YYYY-MM-DD'),
        anamnesis: value.anamnesis,
        diagnostic: value.diagnostic,
        note: value.note
      })

      this.form.methods.reset()
    }
  }
}
</script>
