<template>
  <v-dialog v-model="opened" max-width="600" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.schedule.appointment_title'" />
      <v-card-text>
        <f-form :submit="submitHandler" name="AppointmentForm">
          <app-appointment-form
            slot-scope="props"
            :form="props"
            :entity="entity"
          />
        </f-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-t="'globals.button.save'"
          :disabled="isDisabled"
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

import AppAppointmentForm from './AppointmentForm'

export default {
  name: 'AppAppointmentDialog',
  components: { AppAppointmentForm },
  mixins: [ FormRules ],
  props: {
    dialog: Typed.is.func.required.define,
    entity: Typed.is.obj.required.define,
    opened: Typed.is.bool.required.define
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

        // await this.action({ _id, data, user })

        this.close()
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
