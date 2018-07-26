<template>
  <div class="bg-image">
    <app-header />
    <app-content>
      <app-password-display />
    </app-content>
    <app-footer />
  </div>
</template>

<script>
import AppContent from './Content'
import AppFooter from './Footer'
import AppHeader from './Header'
import AppPasswordDisplay from './PasswordDisplay'

export default {
  name: 'ChangePasswordView',
  components: {
    AppContent,
    AppFooter,
    AppHeader,
    AppPasswordDisplay
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
