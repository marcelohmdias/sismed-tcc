<template>
  <v-dialog v-model="opened" max-width="600" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.schedule.appointment_title'" />
      <v-card-text>
        <f-form :submit="submitHandler" name="AppointmentForm">
          <app-appointment-form
            slot-scope="props"
            :form="props"
            :opened="opened"
            :entity="entity"
            :doctor="doctor"
            :patient="patient"
          />
        </f-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-t="'globals.button.save'"
          :disabled="formIsDisabled('AppointmentForm')"
          type="submit"
          form="AppointmentForm"
          color="secondary"
          flat
        />
        <v-spacer />
        <v-btn
          v-t="'globals.button.close'"
          color="secondary"
          @click="close"
          flat
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'
import { date } from '@/helpers/formatters'

import AppAppointmentForm from './AppointmentForm'

export default {
  name: 'AppAppointmentDialog',
  components: { AppAppointmentForm },
  mixins: [ FormRules ],
  props: {
    dialog: Typed.is.func.required.define,
    entity: Typed.is.obj.required.define,
    opened: Typed.is.bool.required.define,
    saveEndity: Typed.is.func.required.define,
    doctor: Typed.is.array.required.define,
    patient: Typed.is.array.required.define
  },
  computed: {
    isDisabled () {
      return this.formIsDisabled('AppointmentForm')
    }
  },
  methods: {
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async submitHandler (state, form) {
      try {
        this.$Progress.start()
        const { _id } = state

        const time = state.time.split(':')
        const start = new Date(state.date)

        start.setHours(time[0])
        start.setMinutes(time[1])

        const end = date(new Date(start)).add(30, 'minutes')

        const data = {
          patient_id: state.patient.key,
          patient_name: state.patient.value,
          doctor_id: state.doctor.key,
          doctor_name: state.doctor.value,
          start: start,
          end: end.toDate(),
          note: state.note || null
        }

        await this.saveEndity({ _id, data })

        this.close()

        this.$parent.$refs.ScheduleForm.form.methods.submit()
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.card__text, .title
  padding-bottom 0
</style>
