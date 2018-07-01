<template>
  <vue-snotify />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import 'vue-snotify/styles/material.css'

export default {
  name: 'AppNotify',
  computed: {
    ...mapGetters('notify', { alert: 'getNotify' })
  },
  methods: {
    ...mapActions('notify', {
      onHidden: 'HIDDEN',
      onShown: 'SHOWN'
    }),
    createMessages (id) {
      const { body, opened, title, type } = this.alert[id]

      if (opened) return

      this.mapToast(id, this.$snotify[type](
        this.$t(body),
        this.$t(title)
      ))
    },
    mapToast (id, toast) {
      toast.on('beforeHide', () => this.onHidden({ id }))
      toast.on('beforeShow', () => this.onShown({ id }))
    }
  },
  watch: {
    alert (messages) {
      Object.keys(messages).forEach(this.createMessages)
    }
  }
}
</script>

<style lang="stylus">
.snotify

  &-rightTop
    right 0.75em
    top 5.5em

  & .snotifyToast
    border-radius 2px
    box-shadow 0px 7px 8px -4px rgba(0,0,0,0.2),
               0px 12px 17px 2px rgba(0,0,0,0.14),
               0px 5px 22px 4px rgba(0,0,0,0.12)

    &__body
      font-size 0.85em
      text-align justify

    &__inner
      padding 15px 70px 15px 15px

    &__progressBar
      height 5px

      &__percentage
        height 5px

    &__title
      font-size 1em
      font-weight bold

  &-error
    background-color #c0392b

    & .snotifyToast__progressBar
      background-color #890001

      &__percentage
        background-color #f96b55

  &-info
    background-color #89c4f4

    & .snotifyToast__progressBar
      background-color #5694c1

      &__percentage
        background-color #bcf7ff

  &-success
    background-color #1e824c

    & .snotifyToast__progressBar
      background-color #005423

      &__percentage
        background-color #55b278

  &-warning
    background-color #f39c12

    & .snotifyToast__progressBar
      background-color #bb6e00

      &__percentage
        background-color #ffcd4e

</style>
