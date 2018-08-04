<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ResearchRecordsForm">
        <app-research-records-form
          slot-scope="props"
          :form="props"
          @clean="reset"
          ref="ResearchRecordsForm"
        />
      </f-form>
    </v-card>
    <v-card>
      <v-card-title class="title" v-t="'page.exam.title.list_exam'" />
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
        <v-btn color="secondary" :to="{ name: 'RegisterRecords' }">
          <app-icon name="plus-circle" />
          <span v-t="'globals.button.new'" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PageRules from '@/mixins/PageRules'
import AppResearchRecordsForm from './ResearchRecordsForm'

export default {
  name: 'ResearchRecords',
  mixins: [ PageRules ],
  components: { AppResearchRecordsForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Prontuários'
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
        text: 'page.exam.table.patient',
        value: 'patient'
      },
      {
        text: 'page.user.table.cpf',
        value: 'cpf'
      },
      {
        text: 'page.exam.table.status',
        value: 'status'
      }
    ],
    order: [
      'patient',
      'cpf',
      'status'
    ]
  }),
  methods: {
    async searchUser (state, form) {},
    reset () {}
  }
}
</script>

<style lang="stylus" scoped>

</style>
