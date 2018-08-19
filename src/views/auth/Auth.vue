<template>
  <div class="bg-image">
    <app-header />
    <app-content>
      <app-login :dialog="openDialog" />
    </app-content>
    <app-recovery :dialog="openDialog" />
    <app-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppContent from './Content'
import AppFooter from './Footer'
import AppHeader from './Header'
import AppLogin from './Login'
import AppRecovery from './Recovery'

const actions = mapActions({ openDialog: 'auth/RECOVERY_DIALOG' })

export default {
  name: 'AuthView',
  components: {
    AppContent,
    AppFooter,
    AppHeader,
    AppLogin,
    AppRecovery
  },
  methods: {
    ...actions
  },
  mounted () {
    this.$acl.change('disconnected')
  }
}
</script>

<style lang="stylus" scoped>
.bg-image
  background-image url('./../../assets/background.jpg')
  background-position center
  background-attachment fixed
  background-size cover
  height 100vh
  width 100vw
</style>
