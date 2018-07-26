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
          v-t="'globals.button.save'"
          :disabled="formIsDisabled('PasswordForm')"
          type="submit"
          form="PasswordForm"
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

import AppPasswordForm from './PasswordForm'

export default {
  name: 'AppChangePassword',
  components: { AppPasswordForm },
  mixins: [ FormRules ],
  props: {
    action: Typed.is.func.required.define,
    dialog: Typed.is.func.required.define,
    model: Typed.is.str.required.define
  },
  computed: {
    isOpened () {
      return this.$store.state[this.model].dialogPassword
    }
  },
  methods: {
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async submitHandle ({ newPassword, oldPassword }) {
      try {
        this.$Progress.start()
        await this.action({ newPassword, oldPassword })
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
