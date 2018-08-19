<template>
  <v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs
            v-model="tabState"
            color="grey lighten-3"
            slider-color="primary"
            show-arrows
            left
          >
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
              <v-card flat>
                <f-form :submit="submitHandler" name="PatientDataForm">
                  <app-register-patients-form
                    slot-scope="props"
                    :form="props"
                  />
                </f-form>
              </v-card>
            </v-tab-item>
            <v-tab-item id="tab-1">
              <app-patient-address
                :items="entity.addresses"
                :dialog="openAddressDialog"
                :user="entity._id"
              />
            </v-tab-item>
            <v-tab-item id="tab-2">
              <app-patient-contact
                :items="entity.contacts"
                :dialog="openContactDialog"
                :user="entity._id"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-container class="pt-0 px-2 pb-2" grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn color="secondary" block>
              <app-icon name="content-save" request />
              <span v-t="'globals.button.save'" />
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md4 lg3>
            <v-btn color="secondary" block>
              <app-icon name="file-document-outline" />
              <span v-t="'page.record.button.generate'" />
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn color="secondary" :to="{ name: 'ResearchPatients' }" block>
              <app-icon name="subdirectory-arrow-left" />
              <span v-t="'globals.button.come_back'" />
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import PageRules from '@/mixins/PageRules'

import AppRegisterPatientsForm from './RegisterPatientsForm'
import AppPatientAddress from './PatientAddress'
import AppPatientContact from './PatientContact'

const actions = mapActions({
  openAddressDialog: 'patient/ADDRESS_DIALOG',
  openContactDialog: 'patient/CONTACT_DIALOG'
})

const getters = mapGetters({
  entity: 'patient/getEntity'
})

export default {
  name: 'AppRegisterPatient',
  mixins: [ PageRules ],
  components: {
    AppPatientAddress,
    AppPatientContact,
    AppRegisterPatientsForm
  },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Cadastro de Paciente'
    }
  },
  data: () => ({
    tabState: 'tab-0'
  }),
  computed: {
    ...getters
  },
  methods: {
    ...actions,

    async submitHandler () {}
  }
}
</script>

<style lang="stylus" scoped>
.v-tabs__title
  margin-left 0.5em
</style>
