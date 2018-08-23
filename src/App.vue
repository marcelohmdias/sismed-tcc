<template>
  <v-app>
    <vue-progress-bar />
    <app-notify />
    <router-view :key="$route.name" />
  </v-app>
</template>

<script>
import AppNotify from '@/components/Notify.vue'

import { afterEach, beforeEach } from './router/event'

import '@mdi/font/css/materialdesignicons.min.css'

export default {
  name: 'SismedApp',
  components: { AppNotify },
  created () {
    this.$Progress.start()
    this.$router.beforeEach(beforeEach.bind(this))
    this.$router.afterEach(afterEach.bind(this))
  },
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main';

.application
  font-family 'Ubuntu', sans-serif
  line-height 1.5
</style>
