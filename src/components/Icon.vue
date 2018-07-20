<template>
  <v-icon :class="icon" class="mdi" left small />
</template>

<script>
import Typed from '@/modules/typed'

export default {
  name: 'AppIcon',
  props: {
    name: Typed.is.str.required.define,
    request: Typed.is.bool.define
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
