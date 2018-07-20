<template>
  <v-card width="100%">
    <v-toolbar color="primary" dark>
      <v-toolbar-title v-t="'page.profile.title'" />
    </v-toolbar>
    <v-container>
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
          <v-btn color="secondary" @click="openPasswordDialog(true)" block>
            <app-icon name="key-variant" />
            <span v-t="'globals.button.trade_password'" />
          </v-btn>
        </v-flex>
        <app-change-password :dialog="openPasswordDialog" />
        <v-flex xs12>
          <v-tabs
            v-model="tabState"
            color="grey lighten-3"
            slider-color="primary"
            left
            show-arrows>
            <v-tab href="#tab-0">
              <app-icon name="account-box" />
              <span class="v-tabs__title" v-t="'page.profile.tab.datas'" />
            </v-tab>
            <v-tab href="#tab-1">
              <app-icon name="account-card-details" />
              <span class="v-tabs__title" v-t="'page.profile.tab.addresses'" />
            </v-tab>
            <v-tab href="#tab-2">
              <app-icon name="phone" />
              <span class="v-tabs__title" v-t="'page.profile.tab.contacts'" />
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabState">
            <v-tab-item id="tab-0">
              <app-profile-data :entity="entity" />
            </v-tab-item>
            <v-tab-item id="tab-1">
              <app-profile-address
                :items="entity.addresses"
                :dialog="openAddressDialog"
              />
            </v-tab-item>
            <v-tab-item id="tab-2">
              <app-profile-contact
                :items="entity.contacts"
                :dialog="openContactDialog"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppChangePassword from './ChangePassword'
import AppProfileAddress from './ProfileAddress'
import AppProfileContact from './ProfileContact'
import AppProfileData from './ProfileData'

const actions = mapActions({
  openAddressDialog: 'profile/ADDRESS_DIALOG',
  openContactDialog: 'profile/CONTACT_DIALOG',
  openPasswordDialog: 'profile/PASSWORD_DIALOG'
})

const getters = mapGetters({
  entity: 'profile/getEntity'
})

export default {
  name: 'AppProfile',
  components: {
    AppChangePassword,
    AppProfileAddress,
    AppProfileContact,
    AppProfileData
  },
  data: () => ({
    tabState: 'tab-0'
  }),
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Perfil'
    }
  },
  computed: {
    ...getters
  },
  methods: {
    ...actions
  }
}
</script>

<style lang="stylus" scoped>
.v-tabs__title
  margin-left 0.5em
</style>
