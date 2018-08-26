<template>
  <v-card>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm8 md9 lg10>
          <v-text-field
            :label="$t('page.profile.form.email')"
            :value="entity.email"
            name="email"
            type="email"
            prepend-icon="email"
            readonly
        />
        </v-flex>
        <v-flex xs12 sm4 md3 lg2>
          <v-btn color="secondary" @click="changePasswordRequest" block>
            <app-icon name="key-variant" />
            <span v-t="'globals.button.trade_password'" />
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-tabs
            v-model="tabState"
            color="grey lighten-3"
            slider-color="primary"
            left
            show-arrows
          >
            <v-tab href="#tab-0">
              <app-icon name="account-box" />
              <span
                class="v-tabs__title"
                v-t="'page.profile.tab.datas'"
              />
            </v-tab>
            <v-tab href="#tab-1">
              <app-icon name="account-card-details" />
              <span
                class="v-tabs__title"
                v-t="'page.profile.tab.addresses'"
              />
            </v-tab>
            <v-tab href="#tab-2">
              <app-icon name="phone" />
              <span
                class="v-tabs__title"
                v-t="'page.profile.tab.contacts'"
              />
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabState">
          <v-tab-item id="tab-0">
            <app-edit-users-data :entity="entity" />
          </v-tab-item>
          <v-tab-item id="tab-1">
            <app-edit-users-address
              :items="entity.addresses"
              :dialog="openAddressDialog"
              :user="entity._id"
            />
          </v-tab-item>
          <v-tab-item id="tab-2">
            <app-edit-users-contact
              :items="entity.contacts"
              :dialog="openContactDialog"
              :user="entity._id"
            />
          </v-tab-item>
        </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PageRules from '@/mixins/PageRules'

import AppEditUsersData from './EditUsersData'
import AppEditUsersAddress from '@/views/profile/ProfileAddress'
import AppEditUsersContact from '@/views/profile/ProfileContact'

const actions = mapActions({
  changePassword: 'users/CHANGE_PASSWORD',
  getUserEntity: 'users/GET_USER',
  resetUserEntity: 'users/RESET_USER',
  openAddressDialog: 'profile/ADDRESS_DIALOG',
  openContactDialog: 'profile/CONTACT_DIALOG'
})

const state = mapState({
  entity: (state) => state.users.data
})

export default {
  name: 'EditUser',
  mixins: [ PageRules ],
  components: {
    AppEditUsersAddress,
    AppEditUsersData,
    AppEditUsersContact
  },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Edição de Usuário'
    }
  },
  data: () => ({
    tabState: 'tab-0'
  }),
  computed: { ...state },
  methods: {
    ...actions,
    async changePasswordRequest () {
      try {
        this.$Progress.start()
        const { email } = this.entity
        this.changePassword({ email })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  },
  created () {
    this.resetUserEntity()
    ;(async (ctx) => {
      const { id } = ctx.$route.params

      ctx.unsubscribe = await ctx.getUserEntity({ id })

      if (ctx.unsubscribe.name !== 'Error') return

      ctx.$store.dispatch('notify/ADD', {
        body: 'error.register_not_found',
        title: 'message.title.default.error',
        type: 'error'
      }, { root: true })
      ctx.$router.push({ name: 'ResearchUsers' })
    })(this)
  },
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>

<style lang="stylus" scoped>
.v-tabs__title
  margin-left 0.5em
</style>
