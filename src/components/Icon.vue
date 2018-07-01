<template>
  <v-icon class="mdi" :class="icon" left small />
</template>

<script>

export default {
  name: 'AppIcon',
  props: {
    name: {
      required: true,
      type: String
    },
    request: Boolean
  },
  computed: {
    icon () {
      return this.request && this.$store.getters.isLoading
        ? 'mdi-loading mdi-spin'
        : `mdi-${this.name}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.mdi-spin:before
  animation mdi-spin 0.85s infinite linear
  font-size 18px
</style>
