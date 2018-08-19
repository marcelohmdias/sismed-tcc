<template>
  <div>
    <v-dialog
      ref="dialog"
      v-model="opened"
      width="290px"
      full-width
      lazy
      persistent
    >
      <slot slot="activator" />
      <v-time-picker
        :value="parsedTime"
        :allowed-minutes="allowedStep"
        class="datepicker__custom"
        format="24hr"
        @input="changeTime"
        v-if="isTime"
      >
        <v-spacer/>
        <v-btn
          v-t="'globals.button.close'"
          color="primary"
          flat
          @click="close"
        />
      </v-time-picker>
      <v-date-picker
        :value="parsedDate"
        class="datepicker__custom"
        locale="pt-br"
        reactive
        scrollable
        @input="changeDate"
        v-else
      >
        <v-spacer/>
        <v-btn
          v-t="'globals.button.close'"
          color="primary"
          flat
          @click="close"
        />
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import Typed from '@/modules/typed'

export default {
  name: 'AppDatePicker',
  props: {
    value: Typed.is.str.define,
    isTime: Typed.is.bool.define
  },
  data: () => ({ opened: false }),
  computed: {
    parsedDate () {
      if (!this.value) return null
      const date = this.value.split('/')
      return `${date[2]}-${date[1]}-${date[0]}`
    },
    parsedTime () {
      if (!this.value) return null
      return this.value
    }
  },
  methods: {
    allowedStep (value) {
      return value % 30 === 0
    },
    changeDate (value) {
      const data = value.split('-')
      const date = new Date(data[0], data[1] - 1, data[2])
      this.$listeners.input(date.getTime())
      this.close()
    },
    changeTime (value) {
      this.$listeners.input(value)
      this.close()
    },
    close () {
      this.opened = false
    }
  }
}
</script>

<style lang="stylus">
.datepicker__custom .v-date-picker-title
  line-height 1.1
</style>
