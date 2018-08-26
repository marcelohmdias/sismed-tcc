<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ExamsForm">
        <app-exams-form
          slot-scope="props"
          :form="props"
          :doctor="doctorList"
          :patient="patientList"
          @clean="reset"
          ref="ExamsForm"
        />
      </f-form>
    </v-card>
    <v-card>
      <v-card-title class="title" v-t="'page.exam.title.list_exam'" />
      <v-card-text class="pa-0">
        <v-container class="pt-0 px-3" grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <app-data-table
                :filters="filters"
                :headers="headers"
                :items="items"
                :order="order"
                :edit="editEntity"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-dialog v-model="opened" max-width="600" persistent>
      <v-card>
        <v-card-title
          class="title"
          v-t="'page.record.title.exam_form'"
        />
        <v-card-text>
          <f-form name="RecordExamsForm" :submit="submitHandler">
            <app-record-exams-form
              slot-scope="props"
              :form="props"
              :list="doctorList"
              :list-exams="examList"
              :opened="opened"
              :entity="entity"
              disabled
            />
          </f-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="formIsDisabled('RecordExamsForm')"
            v-t="'globals.button.save'"
            type="submit"
            form="RecordExamsForm"
            color="secondary"
            flat
          />
          <v-spacer />
          <v-btn
            v-t="'globals.button.close'"
            color="secondary"
            flat
            @click="opened = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import PageRules from '@/mixins/PageRules'
import AppExamsForm from './ExamsForm'

import enums from '@/helpers/enums'
import { date } from '@/helpers/formatters'
import FormRules from '@/mixins/FormRules'

import { selectedList as getDoctorList } from '@/server/doctor'
import { selectedList as getPatientList } from '@/server/patient'
import { selectedList as getExamList } from '@/server/exams'

import AppRecordExamsForm from './RecordExamsForm'

const actions = mapActions({
  getList: 'exam/GET_LIST',
  saveEndity: 'record/SAVE_EXAMS',
  reset: 'exam/RESET_LIST'
})

const state = mapState({
  items: (state) => state.exam.list
})

export default {
  name: 'Exams',
  mixins: [ PageRules, FormRules ],
  components: { AppExamsForm, AppRecordExamsForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Exames'
    }
  },
  data () {
    return {
      doctorList: [],
      examList: [],
      patientList: [],
      opened: false,
      entity: {},
      filters: {
        date: this.formatDate,
        status: this.formatStatus
      },
      headers: [
        {
          text: 'page.profile.table.address.actions',
          sortable: false
        },
        {
          text: 'page.exam.table.patient',
          value: 'patient_name'
        },
        {
          text: 'page.exam.table.doctor',
          value: 'doctor_name'
        },
        {
          text: 'page.exam.table.date',
          value: 'date'
        },
        {
          text: 'page.exam.table.status',
          value: 'status'
        }
      ],
      order: [
        'patient_name',
        'doctor_name',
        'date',
        'status'
      ]
    }
  },

  computed: {
    ...state
  },

  methods: {
    ...actions,
    async searchUser (state, form) {
      try {
        this.$Progress.start()

        const data = {}

        if (state.patient) data.patient_id = state.patient.key
        if (state.doctor) data.doctor_id = state.doctor.key
        if (state.date) data.date = new Date(state.date)

        this.getList({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    async submitHandler (state) {
      try {
        this.$Progress.start()
        const { _id } = state

        const data = {
          record_id: state.record_id,
          patient_id: state.patient_id,
          patient_name: state.patient_name,
          doctor_name: state.doctor.value,
          doctor_id: state.doctor.key,
          date: new Date(state.date),
          status: state.status || null,
          note: state.note || null,
          exams: (state.exam || []).map((item) => ({
            exam_id: item.key,
            name: item.value
          }))
        }

        await this.saveEndity({ _id, data })
        this.opened = false
        this.$refs.ExamsForm.form.methods.submit()
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    editEntity (entity) {
      this.entity = {
        ...entity
      }
      this.opened = true
    },

    async getDoctor () {
      this.doctorList = await getDoctorList()
    },

    async getPatient () {
      this.patientList = await getPatientList()
    },

    async getExam () {
      this.examList = await getExamList()
    },

    formatDate (value) {
      return value
        ? date(value.toMillis()).format()
        : null
    },

    formatStatus (value) {
      if (!value) return value
      return this.$t(`enums.exam.${enums.exam.get(value).key}`)
    }
  },

  mounted () {
    this.getDoctor()
    this.getExam()
    this.getPatient()
  }
}
</script>
