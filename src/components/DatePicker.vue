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
      <v-date-picker
        :value="parsedValue"
        class="datepicker__custom"
        locale="pt-br"
        reactive
        scrollable
        @change="changeDate"
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
    value: Typed.is.str.define
  },
  data: () => ({ opened: false }),
  computed: {
    parsedValue () {
      if (!this.value) return null
      const date = this.value.split('/')
      return `${date[2]}-${date[1]}-${date[0]}`
    }
  },
  methods: {
    changeDate (value) {
      const data = value.split('-')
      const date = new Date(data[0], data[1] - 1, data[2])
      this.$listeners.input(date.getTime())
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
