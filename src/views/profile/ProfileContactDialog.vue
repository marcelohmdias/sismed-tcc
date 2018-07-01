<template>
  <v-dialog v-model="isOpened" max-width="600" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.profile.contact_title'" />
      <v-card-text>
        <f-form name="ContactForm" :submit="submitHandler">
          <app-profile-contact-form
            slot-scope="props"
            :form="props"
            :entity="entity"
          />
        </f-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          form="ContactForm"
          color="secondary"
          v-t="'globals.button.save'"
          :disabled="isDisabled"
          flat
        />
        <v-spacer />
        <v-btn
          color="secondary"
          v-t="'globals.button.close'"
          @click="close"
          flat
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'

import AppProfileContactForm from './ProfileContactForm'

const actions = mapActions({
  saveContact: 'profile/SAVE_CONTACT'
})

const states = mapState({
  isOpened: (state) => state.profile.dialogContact
})

export default {
  name: 'AppProfileContactDialog',
  components: { AppProfileContactForm },
  mixins: [ FormRules ],
  props: {
    dialog: Typed.is.func.required.define,
    entity: Typed.is.obj.required.define
  },
  computed: {
    ...states,
    isDisabled () {
      return this.formIsDisabled('ContactForm')
    }
  },
  methods: {
    ...actions,
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async submitHandler (state, form) {
      try {
        this.$Progress.start()

        const user = this.$store.state.profile.data._id
        const _id = state._id

        const data = {
          number: state.number_phone,
          contact_person: state.contact_person || '',
          type: state.contact_type,
          status: state.contact_status
        }

        await this.saveContact({ _id, data, user })

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
