<template>
  <div>
    <v-card class="mb-4" width="100%">
      <f-form :submit="searchUser" name="ResearchUserForm">
        <app-research-user-form
          slot-scope="props"
          :form="props"
          @clean="reset"
        />
      </f-form>
    </v-card>
    <v-card>
      <v-card-title
        v-t="'page.user.title.list_user'"
        class="title"
      />
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
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-3 pb-3 pt-0">
        <v-btn
          :to="{ name: 'RegisterUsers' }"
          color="secondary"
        >
          <app-icon name="plus-circle" />
          <span v-t="'globals.button.new'" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

import PageRules from '@/mixins/PageRules'
import AppResearchUserForm from './ResearchUserForm'

import enums from '@/helpers/enums'

const actions = mapActions({
  getUserList: 'users/GET_USER_LIST',
  reset: 'users/RESET_USER_LIST'
})

const states = mapState({
  items: (state) => state.users.list
})

export default {
  name: 'AppResearchUsers',
  components: {
    AppResearchUserForm
  },
  mixins: [PageRules],
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Usuários'
    }
  },
  data () {
    return {
      filters: {
        cpf: this.formatCpf,
        permission_type: this.formatPermission,
        status: this.formatStatus
      },
      headers: [{
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
    }
  },
  computed: {
    ...states
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

        this.getUserList({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    editEntity (entity) {
      this.$router.push({
        name: 'EditUsers',
        params: { id: entity._id }
      })
    },

    formatCpf (value = '') {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/g, '$1.$2.$3-$4')
    },

    formatPermission (value) {
      return this.$t(`enums.permission.${enums.permission.get(value).key}`)
    },

    formatStatus (value) {
      return this.$t(`enums.status.${enums.status.get(value).key}`)
    }
  }
}

</script>

<style lang="stylus" scoped>

</style>
