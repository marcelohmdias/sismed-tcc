<template>
  <div>
    <v-card class="mb-4" width="100%">
      <v-card-title class="title" v-t="'globals.title.search'" />
      <v-card-text class="pa-0">
        <v-container class="pt-0 px-3" grid-list-lg>
          <v-layout row wrap>
            <v-flex>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12 sm4 lg2>
                      <v-text-field type="tel" label="cpf***" mask="###.###.###-##" />
                    </v-flex>
                    <v-flex xs12 sm8 lg4>
                      <v-text-field type="text" label="name***" />
                    </v-flex>
                    <v-flex xs12 sm4 lg2>
                      <v-text-field type="text" label="data de nascimento***" />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-3 pb-3 pt-0">
        <v-btn color="secondary">
          <app-icon name="magnify" request />
          <span v-t="'globals.button.search'" />
        </v-btn>
        <v-btn color="secondary">
          <app-icon name="eraser" request />
          <span v-t="'globals.button.clean'" />
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title class="title" v-t="'page.user.title.list_user'" />
      <v-card-text class="pa-0">
        <v-container class="pt-0 px-3" grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <app-data-table
                :headers="headers"
                :items="items"
                :order="order"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-3 pb-3 pt-0">
        <v-btn color="secondary" :to="{ name: 'RegisterUsers' }">
          <app-icon name="plus-circle" />
          <span v-t="'globals.button.new'" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PageRules from '@/mixins/PageRules'

export default {
  name: 'AppMedical',
  mixins: [ PageRules ],
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Médicos'
    }
  },
  data: () => ({
    items: [],
    headers: [
      {
        text: 'page.profile.table.address.actions',
        sortable: false
      },
      {
        text: 'page.user.table.full_name',
        value: 'full_name'
      },
      {
        text: 'page.user.table.email',
        value: 'email'
      },
      {
        text: 'page.user.table.cpf',
        value: 'cpf'
      },
      {
        text: 'page.user.table.permission_type',
        value: 'permission_type'
      },
      {
        text: 'page.user.table.status',
        value: 'status'
      }
    ],
    order: [
      'full_name',
      'email',
      'cpf',
      'permission_type',
      'status'
    ]
  })
}
</script>

<style lang="stylus" scoped>

</style>
