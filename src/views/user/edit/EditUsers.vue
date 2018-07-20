<template>
  <v-card>
    <v-container grid-list-lg>
      <v-form>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg10>
            <v-text-field
              :label="$t('page.profile.form.email')"
              name="email"
              type="email"
              prepend-icon="email"
              readonly
          />
          </v-flex>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn color="secondary" block>
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
              <app-edit-users-data />
            </v-tab-item>
            <v-tab-item id="tab-1">
              <app-edit-users-address />
            </v-tab-item>
            <v-tab-item id="tab-2">
              <app-edit-users-contact />
            </v-tab-item>
          </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import PageRules from '@/mixins/PageRules'

import AppEditUsersAddress from './EditUsersAddress'
import AppEditUsersData from './EditUsersData'
import AppEditUsersContact from './EditUsersContact'

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
  })
}
</script>

<style lang="stylus" scoped>
.v-tabs__title
  margin-left 0.5em
</style>
