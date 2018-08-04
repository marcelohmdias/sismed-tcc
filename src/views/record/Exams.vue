<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ExamsForm">
        <app-exams-form
          slot-scope="props"
          :form="props"
          @clean="reset"
          ref="ExamsForm"
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
    </v-card>
  </div>
</template>

<script>
import PageRules from '@/mixins/PageRules'
import AppExamsForm from './ExamsForm'

export default {
  name: 'Exams',
  mixins: [ PageRules ],
  components: { AppExamsForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Exames'
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
        text: 'page.exam.table.doctor',
        value: 'doctor'
      },
      {
        text: 'page.exam.table.date',
        value: 'date'
      },
      {
        text: 'page.exam.table.status',
        value: 'status'
      }
    ],
    order: [
      'patient',
      'doctor',
      'date',
      'status'
    ]
  }),
  methods: {
    async searchUser (state, form) {},
    reset () {}
  }
}
</script>
