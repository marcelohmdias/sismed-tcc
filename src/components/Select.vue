<template>
  <v-select
    :id="id"
    :items="items"
    :name="name"
    :label="$t(label)"
    :value="value"
    @change="change"
    v-bind="$attrs"
    single-line
  >
    <template slot="selection" slot-scope="data">
      <span class="selected--text" v-t="data.item.text" />
    </template>
    <template slot="item" slot-scope="data">
      <v-list-tile-content>
        <v-list-tile-title v-t="data.item.text" />
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
import Typed from '@/modules/typed'

export default {
  name: 'AppSelect',
  props: {
    id: Typed.is.str.define,
    items: Typed.is.array.define,
    label: Typed.is.str.define,
    name: Typed.is.str.define,
    value: Typed.is.num.define
  },
  methods: {
    change (value) {
      this.$listeners.input({ target: { value } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.selected--text
  color rgba(0,0,0,0.87) !important
</style>
