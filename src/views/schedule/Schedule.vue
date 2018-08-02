<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ScheduleForm">
        <app-schedule-form
          slot-scope="props"
          :form="props"
          @clean="reset"
          ref="ScheduleFormForm"
        />
      </f-form>
    </v-card>

    <v-card>
      <app-calendar
        :date="date"
        :list="list"
        @add="onAdd"
        @change="onChange"
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
    />
  </div>
</template>

<script>
import AppCalendar from './Calendar'
import AppScheduleForm from './ScheduleForm'
import AppAppointmentDialog from './AppointmentDialog'

export default {
  name: 'AppSchedule',
  components: { AppAppointmentDialog, AppCalendar, AppScheduleForm },
  data: () => ({
    date: new Date(),
    datePicker: false,
    dialog: false,
    entity: {},
    list: []
  }),
  computed: {
    parsedValue () {
      const year = this.date.getFullYear()
      const month = this.date.getMonth() + 1
      const date = this.date.getDate()
      return `${year}-${month}-${date}`
    }
  },
  methods: {
    changeDate (value) {
      const date = value.split('-')
      this.date = new Date(date[0], date[1] - 1, date[2])
      this.datePicker = false
    },
    onAdd (data) {
      console.log(data)
      this.openDialog(true)
    },
    onChange (data) {
      console.log(data)
    },
    onEdit (data) {
      console.log(data)
      this.openDialog(true)
    },
    onRemove (data) {
      console.log(data)
    },
    openCalendar () {
      this.datePicker = true
    },
    openDialog (state) {
      this.dialog = state
    },
    reset () {},
    searchUser () {}
  }
}
</script>

<style lang="stylus">
.datepicker__custom .v-date-picker-title
  line-height 1.1
</style>
