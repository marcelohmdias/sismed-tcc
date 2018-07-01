<template>
  <v-dialog v-model="isOpened" max-width="400" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.profile.password_title'" />
      <v-card-text>
        <f-form name="PasswordForm" :submit="submitHandle">
          <app-password-form slot-scope="props" :form="props" />
        </f-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          form="PasswordForm"
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

import AppPasswordForm from './PasswordForm'

const actions = mapActions({
  changePassword: 'profile/CHANGE_PASSWORD'
})

const states = mapState({
  isOpened: (state) => state.profile.dialogPassword
})

export default {
  name: 'AppChangePassword',
  mixins: [ FormRules ],
  components: { AppPasswordForm },
  props: {
    dialog: Typed.is.func.required.define
  },
  computed: {
    ...states,
    isDisabled () {
      return this.formIsDisabled('PasswordForm')
    }
  },
  methods: {
    ...actions,
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async submitHandle ({ newPassword, oldPassword }) {
      try {
        this.$Progress.start()
        await this.changePassword({ newPassword, oldPassword })
        setTimeout(() => this.$Progress.finish(), 300)
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
