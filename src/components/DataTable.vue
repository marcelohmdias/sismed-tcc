<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          <span v-t="'globals.title.attention'" />
        </v-card-title>
        <v-card-text>
          <span v-t="'globals.table.remove'" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">
            <span v-t="'globals.button.cancel'" />
          </v-btn>

          <v-btn color="green darken-1" flat="flat" @click="close">
            <span v-t="'globals.button.confirm'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="items"
      :rows-per-page-items="rows"
      :no-data-text="$t('globals.table.no_items_found')"
      :rows-per-page-text="$t('globals.table.lines_per_page')"
      class="elevation-1"
      sort-icon="mdi-chevron-down"
    >
      <template slot="headerCell" slot-scope="props">
        <span v-t="props.header.text" class="table__title" />
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="layout">
            <v-btn class="mx-0" icon @click="edit(props.item)">
              <v-tooltip bottom>
                <span slot="activator">
                  <v-icon color="secondary">edit</v-icon>
                </span>
                <span v-t="'globals.button.edit'" />
              </v-tooltip>
            </v-btn>
            <v-btn
              class="mx-0"
              @click="openModal(props.item)"
              :disabled="checkDisabled(props.item)"
              v-if="hasDelete"
              icon
            >
              <v-tooltip bottom>
                <span slot="activator">
                  <v-icon color="secondary">delete</v-icon>
                </span>
                <span v-t="'globals.button.remove'" />
              </v-tooltip>
            </v-btn>
          </td>
          <td v-for="label in order" :key="label" nowrap>
            <span v-text="formatter(props.item[label], label)" />
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Typed from '@/modules/typed'

export default {
  name: 'AppDataTable',
  props: {
    edit: Typed.is.func.define,
    filters: Typed.is.obj.default({}).define,
    headers: Typed.is.array.default([]).define,
    items: Typed.is.array.default([]).define,
    order: Typed.is.array.default([]).define,
    remove: Typed.is.func.define,
    disabledRemove: Typed.is.func.default(false).define
  },
  data () {
    return {
      rows: [5, 10, 25],
      dialog: false,
      entity: null
    }
  },

  computed: {
    hasDelete () {
      return !!this.remove
    }
  },

  methods: {
    checkDisabled (item) {
      return this.disabledRemove(item)
    },
    openModal (item) {
      this.entity = item
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.remove(this.entity)
    },
    formatter (value, label) {
      return this.filters[label]
        ? this.filters[label](value)
        : value
    }
  }
}
</script>

<style lang="stylus" scoped>
.table__title
  margin-right 0.75em
</style>
