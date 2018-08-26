<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ResearchRecordsForm">
        <app-research-records-form
          slot-scope="props"
          :form="props"
          :patients="listPatient"
          @clean="reset"
          ref="ResearchRecordsForm"
        />
      </f-form>
    </v-card>
    <v-card>
      <v-card-title class="title" v-t="'page.record.title.list'" />
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
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PageRules from '@/mixins/PageRules'
import AppResearchRecordsForm from './ResearchRecordsForm'

import enums from '@/helpers/enums'
import { selectedList } from '@/server/patient'

const actions = mapActions({
  getList: 'record/GET_LIST',
  reset: 'record/RESET_LIST',
  deleteRef: 'record/DELETE'
})

const state = mapState({
  items: (state) => state.record.list
})

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
  data () {
    return {
      listPatient: [],
      filters: {
        cpf: this.formatCpf,
        status: this.formatStatus
      },
      headers: [
        {
          text: 'page.profile.table.address.actions',
          sortable: false
        },
        {
          text: 'page.exam.table.patient',
          value: 'full_name'
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
        'full_name',
        'cpf',
        'status'
      ]
    }
  },

  computed: {
    ...state
  },

  methods: {
    ...actions,
    async searchUser (state, form) {
      try {
        this.$Progress.start()

        const data = Object.keys(state).reduce((data, key) => {
          if (!state[key]) return data
          return { ...data, [key]: state[key] }
        }, {})

        if (data.patient) data.patient_id = data.patient.key
        delete data.patient

        this.getList({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    async getListPatient () {
      this.listPatient = await selectedList()
    },

    editEntity (entity) {
      this.$router.push({
        name: 'RegisterRecords',
        params: { id: entity._id }
      })
    },

    async removeEntity (state) {
      try {
        this.$Progress.start()
        await this.deleteRef({ ref: state._id })
        this.$refs.ResearchRecordsForm.form.methods.submit()
      } catch (error) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    formatCpf (value = '') {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/g, '$1.$2.$3-$4')
    },

    formatStatus (value) {
      if (!value) return value
      return this.$t(`enums.status.${enums.status.get(value).key}`)
    }
  },

  mounted () {
    this.getListPatient()
  }
}
</script>

<style lang="stylus" scoped>

</style>
