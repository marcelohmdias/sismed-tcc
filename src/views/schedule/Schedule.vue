<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ScheduleForm">
        <app-record-exams-form
          slot-scope="props"
          :form="props"
          :doctor="doctorList"
          :patient="patientList"
          @clean="reset"
          ref="ScheduleForm"
        />
      </f-form>
    </v-card>

    <v-card>
      <app-calendar
        :date="date"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @remove="onRemove"
        @open-calendar="openCalendar"
      />
      <v-dialog
        v-model="datePicker"
        width="290px"
        full-width
        lazy
        persistent
      >
        <v-date-picker
          :value="parsedValue"
          class="datepicker__custom"
          locale="pt-br"
          reactive
          scrollable
          @change="changeDate"
        >
          <v-spacer/>
          <v-btn
            v-t="'globals.button.close'"
            color="primary"
            @click="datePicker = false"
            flat
          />
        </v-date-picker>
      </v-dialog>
    </v-card>
    <app-appointment-dialog
      :dialog="openDialog"
      :entity="entity"
      :opened="dialog"
      :save-endity="saveEndity"
      :doctor="doctorList"
      :patient="patientList"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import PageRules from '@/mixins/PageRules'
import { date } from '@/helpers/formatters'

import AppCalendar from './Calendar'
import AppRecordExamsForm from '@/views/record/ExamsForm'
import AppAppointmentDialog from './AppointmentDialog'

import { selectedList as getDoctorList } from '@/server/doctor'
import { selectedList as getPatientList } from '@/server/patient'

const actions = mapActions({
  getList: 'schedule/GET_LIST',
  saveEndity: 'schedule/SAVE',
  deleteEndity: 'schedule/DELETE',
  reset: 'exam/RESET_LIST'
})

const state = mapState({
  items: (state) => state.schedule.list
})

export default {
  name: 'AppSchedule',
  mixins: [ PageRules ],
  components: { AppAppointmentDialog, AppCalendar, AppRecordExamsForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Agendamento'
    }
  },
  data: () => ({
    doctorList: [],
    patientList: [],
    date: new Date(),
    datePicker: false,
    dialog: false,
    entity: {}
  }),
  computed: {
    ...state,
    list () {
      return this.items.map((item) => {
        return {
          ...item,
          start: new Date(item.start.toMillis()),
          end: new Date(item.end.toMillis())
        }
      })
    },
    parsedValue () {
      const year = this.date.getFullYear()
      const month = this.date.getMonth() + 1
      const date = this.date.getDate()
      return `${year}-${month}-${date}`
    }
  },

  methods: {
    ...actions,
    async searchUser (state, form) {
      try {
        this.$Progress.start()

        const data = {}

        if (state.patient) data.patient_id = state.patient.key
        if (state.doctor) data.doctor_id = state.doctor.key
        if (state.date) data.start = new Date(state.date)

        this.getList({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },
    async getDoctor () {
      this.doctorList = await getDoctorList()
    },

    async getPatient () {
      this.patientList = await getPatientList()
    },

    changeDate (value) {
      const date = value.split('-')
      this.date = new Date(date[0], date[1] - 1, date[2])
      this.datePicker = false
    },

    onAdd (data) {
      this.entity = {
        date: data.start.getTime(),
        time: date(data.start).format('HH:mm')
      }
      this.openDialog(true)
    },

    onEdit (data) {
      this.entity = {
        _id: data._id,
        date: data.start.getTime(),
        doctor: {
          key: data.doctor_id,
          value: data.doctor_name
        },
        note: data.note,
        patient: {
          key: data.patient_id,
          value: data.patient_name
        },
        time: date(data.start).format('HH:mm')
      }
      this.openDialog(true)
    },

    onRemove (data) {
      try {
        this.$Progress.start()

        this.deleteEndity({ _id: data._id })

        this.$refs.ScheduleForm.form.methods.submit()
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    openCalendar () {
      this.datePicker = true
    },

    openDialog (state) {
      this.dialog = state
    }
  },
  mounted () {
    this.getDoctor()
    this.getPatient()
  }
}
</script>

<style lang="stylus">
.datepicker__custom .v-date-picker-title
  line-height 1.1
</style>
