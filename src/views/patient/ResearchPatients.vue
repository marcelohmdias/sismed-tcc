<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ResearchPatientForm">
        <app-research-patients-form
          slot-scope="props"
          :form="props"
          @clean="reset"
          ref="ResearchPatientForm"
        />
      </f-form>
    </v-card>
    <v-card>
      <v-card-title class="title" v-t="'page.patient.title.list_patient'" />
      <v-card-text class="pa-0">
        <v-container class="pt-0 px-3" grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <app-data-table
                :filters="filters"
                :headers="headers"
                :items="items"
                :order="order"
                :edit="editEntity"
                :remove="removeEntity"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-3 pb-3 pt-0">
        <v-btn color="secondary" :to="{ name: 'RegisterPatients' }">
          <app-icon name="plus-circle" />
          <span v-t="'globals.button.new'" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import PageRules from '@/mixins/PageRules'
import AppResearchPatientsForm from './ResearchPatientsForm'

import enums from '@/helpers/enums'
import { date } from '@/helpers/formatters'

const actions = mapActions({
  getList: 'patient/GET_LIST',
  reset: 'patient/RESET_LIST',
  deleteRef: 'patient/DELETE'
})

const state = mapState({
  items: (state) => state.patient.list
})

export default {
  name: 'AppResearchPatients',
  mixins: [ PageRules ],
  components: { AppResearchPatientsForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Pacientes'
    }
  },
  data () {
    return {
      filters: {
        date_birth: this.formatDate,
        cpf: this.formatCpf,
        sex: this.formatSex,
        status: this.formatStatus
      },
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
          text: 'page.patient.table.date_birth',
          value: 'date_birth'
        },
        {
          text: 'page.patient.table.sex',
          value: 'sex'
        }
      ],
      order: [
        'full_name',
        'email',
        'cpf',
        'date_birth',
        'sex'
      ]
    }
  },
  computed: { ...state },
  methods: {
    ...actions,

    async searchUser (state, form) {
      try {
        this.$Progress.start()

        const data = Object.keys(state).reduce((data, key) => {
          if (!state[key]) return data
          return { ...data, [key]: state[key] }
        }, {})

        if (data.date_birth) data.date_birth = new Date(data.date_birth)

        this.getList({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    editEntity (entity) {
      this.$router.push({
        name: 'EditPatients',
        params: { id: entity._id }
      })
    },

    async removeEntity (state) {
      try {
        this.$Progress.start()
        await this.deleteRef({ ref: state._id })
        this.$refs.ResearchPatientForm.form.methods.submit()
      } catch (error) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    formatDate (value) {
      return value
        ? date(value.toMillis()).format()
        : null
    },

    formatCpf (value = '') {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/g, '$1.$2.$3-$4')
    },

    formatSex (value) {
      if (!value) return value
      return this.$t(`enums.sex.${enums.sex.get(value).key}`)
    }
  }
}
</script>
