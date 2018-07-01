<template>
  <v-dialog v-model="isOpened" max-width="800" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.login.recover_title'" />
      <v-card-text>
        <f-form name="RecoveryForm" :submit="handleSubmit">
          <app-recovery-form slot-scope="props" :form="props" />
        </f-form>
      </v-card-text>
      <v-card-actions>
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

import AppRecoveryForm from './RecoveryForm'

const actions = mapActions({
  recoverPassword: 'auth/RECOVER_PASSWORD'
})

const states = mapState({
  isOpened: (state) => state.auth.recoveryDialog
})

export default {
  name: 'AppRecovery',
  components: { AppRecoveryForm },
  props: {
    dialog: Typed.is.func.required.define
  },
  computed: {
    ...states
  },
  methods: {
    ...actions,
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async handleSubmit ({ emailRecovery }) {
      try {
        this.$Progress.start()
        await this.recoverPassword({ email: emailRecovery })
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
