<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ResearchMedicalForm">
        <app-medical-research-form
          slot-scope="props"
          :form="props"
          @clean="reset"
          ref="ResearchMedicalForm"
        />
      </f-form>
    </v-card>
    <v-card>
      <v-card-title class="title" v-t="'page.user.title.list_medical'" />
      <v-card-text class="pa-0">
        <v-container class="pt-0 px-3" grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <app-data-table
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
        <v-btn color="secondary" :to="{ name: 'RegisterMedicals' }">
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
import AppMedicalResearchForm from './MedicalResearchForm'

const actions = mapActions({
  getList: 'medical/GET_LIST',
  reset: 'medical/RESET_LIST',
  deleteRef: 'medical/DELETE'
})

const state = mapState({
  items: (state) => state.medical.list
})

export default {
  name: 'AppMedicalResearch',
  mixins: [ PageRules ],
  components: { AppMedicalResearchForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Médicos'
    }
  },
  data: () => ({
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
        text: 'page.medical.table.registry',
        value: 'registry'
      },
      {
        text: 'page.user.table.cpf',
        value: 'cpf'
      },
      {
        text: 'page.user.table.status',
        value: 'status'
      }
    ],
    order: [
      'full_name',
      'registry',
      'cpf',
      'status'
    ]
  }),
  computed: {
    ...state
  },
  methods: {
    ...actions,
    editEntity (entity) {
      this.$router.push({
        name: 'EditMedicals',
        params: { id: entity._id }
      })
    },

    async searchUser (state, form) {
      try {
        this.$Progress.start()

        const data = Object.keys(state).reduce((data, key) => {
          if (!state[key]) return data
          return { ...data, [key]: state[key] }
        }, {})

        this.getList({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    async removeEntity (state) {
      try {
        this.$Progress.start()
        await this.deleteRef({ ref: state._id })
        this.$refs.ResearchMedicalForm.form.methods.submit()
      } catch (error) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
