<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="items"
    :rows-per-page-items="rows"
    :no-data-text="$t('globals.table.no_items_found')"
    :rows-per-page-text="$t('globals.table.lines_per_page')"
    sort-icon="mdi-chevron-down"
  >
    <template slot="headerCell" slot-scope="props">
      <span class="table__title" v-t="props.header.text" />
    </template>
    <template slot="items" slot-scope="props">
      <tr>
        <td class="layout">
          <v-btn class="mx-0" @click="edit(props.item)" icon>
            <v-tooltip bottom>
              <span slot="activator">
                <v-icon color="secondary">edit</v-icon>
              </span>
              <span v-t="'globals.button.edit'" />
            </v-tooltip>
          </v-btn>
          <v-btn class="mx-0" @click.stop="dialog = true" icon>
            <v-tooltip bottom>
              <span slot="activator">
                <v-icon color="secondary">delete</v-icon>
              </span>
              <span v-t="'globals.button.remove'" />
            </v-tooltip>
            <v-dialog v-model="dialog" max-width="600">
              <v-card>
                <v-card-title class="headline">
                  <span v-t="'Atenção***'" />
                </v-card-title>
                <v-card-text>
                  <span>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                  >
                    <span v-t="'Cancelar***'" />
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="close(props.item)"
                  >
                    <span v-t="'Confirmar***'" />
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </td>
        <td v-for="label in order" :key="label" nowrap>
          <span v-text="formatter(props.item[label], label)" />
        </td>
      </tr>
    </template>
  </v-data-table>
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
    remove: Typed.is.func.define
  },
  data () {
    return {
      rows: [5, 10, 25],
      dialog: false
    }
  },
  methods: {
    close (item) {
      this.dialog = false
      this.remove(item)
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
