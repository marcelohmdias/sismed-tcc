<template>
  <v-toolbar color="primary" app dark>
    <v-toolbar-title v-t="'globals.app_name'" class="mx-auto headline" />
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="stylus" scoped>
.headline
  font-family 'Audiowide', cursive !important
  letter-spacing 0.1em !important
</style>
