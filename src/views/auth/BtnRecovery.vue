<template>
  <v-btn flat small @click.stop="openDialog">
    <v-icon class="mdi mdi-key-variant" left small />
    <span v-t="'page.login.recover'" />
  </v-btn>
</template>

<script>
export default {
  name: 'BtnRecovery',
  methods: {
    openDialog () {
      this.$emit('openDialog')
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-btn
  margin 0
  text-transform none
</style>
