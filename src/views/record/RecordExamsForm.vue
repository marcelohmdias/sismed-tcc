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
                :disabled="disabled"
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
                  :disabled="disabled"
                  type="text"
                  readonly
                />
              </app-date-picker>
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field
            name="exam"
            :validate="validate('error.required.exam', required)"
          >
            <template slot-scope="props">
              <v-autocomplete
                :items="listExams"
                :name="props.name"
                :label="$t('page.record.form.exam')"
                :no-data-text="$t('message.no_data')"
                :multiple="true"
                :multi-line="true"
                :rules="checkError(props.meta)"
                :value="props.value"
                :search-input="props.value"
                :filter="searchFilter"
                :disabled="disabled"
                :max-width="550"
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
            name="status"
            :validate="validate('error.required.status', required)"
          >
            <template slot-scope="props">
              <app-select
                :items="statusItem"
                :name="props.name"
                :label="'page.profile.form.status'"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
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
                :disabled="disabled"
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
  name: 'RecordExamsForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.default({}).define,
    form: Typed.is.obj.define,
    listExams: Typed.is.array.define,
    list: Typed.is.array.define,
    opened: Typed.is.bool.define,
    disabled: Typed.is.bool.define
  },
  data: () => ({
    statusItem: [
      { text: 'enums.exam.canceled', value: 0 },
      { text: 'enums.exam.marked', value: 1 },
      { text: 'enums.exam.fulfilled', value: 2 },
      { text: 'enums.exam.delivered', value: 3 }
    ]
  }),
  methods: {
    required: (...args) => required(...args),
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },
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
      if (!value._id) {
        this.formConfig.initialize({})
        this.form.methods.reset()
        return
      }

      this.formConfig.initialize({
        _id: value._id,
        patient_id: value.patient_id,
        patient_name: value.patient_name,
        record_id: value.record_id,
        doctor: {
          key: value.doctor_id,
          value: value.doctor_name
        },
        date: date(value.date.toMillis()).format('YYYY-MM-DD'),
        status: value.status,
        note: value.note,
        exam: value.exams.map((item) => ({
          key: item.exam_id,
          value: item.name
        }))
      })

      this.form.methods.reset()
    }
  }
}
</script>

<style>

</style>
