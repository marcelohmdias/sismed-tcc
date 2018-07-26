<template>
  <v-dialog v-model="opened" max-width="600" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.profile.contact_title'" />
      <v-card-text>
        <f-form :submit="submitHandler" name="ContactForm">
          <app-profile-contact-form
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
          form="ContactForm"
          color="secondary"
          flat
        />
        <v-spacer />
        <v-btn
          v-t="'globals.button.close'"
          color="secondary"
          flat
          @click="close"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'

import AppProfileContactForm from './ProfileContactForm'

export default {
  name: 'AppProfileContactDialog',
  components: { AppProfileContactForm },
  mixins: [ FormRules ],
  props: {
    action: Typed.is.func.required.define,
    dialog: Typed.is.func.required.define,
    entity: Typed.is.obj.required.define,
    opened: Typed.is.bool.required.define,
    user: Typed.is.str.required.define
  },
  computed: {
    isDisabled () {
      return this.formIsDisabled('ContactForm')
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

        const user = this.user
        const _id = state._id

        const data = {
          number: state.number_phone,
          contact_person: state.contact_person || '',
          type: state.contact_type,
          status: state.contact_status
        }

        await this.action({ _id, data, user })

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
