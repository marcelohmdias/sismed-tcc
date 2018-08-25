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
            <v-tab href="#tab-1" v-if="disabled">
              <app-icon name="account-card-details" />
              <span class="v-tabs__title" v-t="'page.profile.tab.addresses'" />
            </v-tab>
            <v-tab href="#tab-2" v-if="disabled">
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
                    :entity="entity"
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
            <v-btn
              :disabled="formIsDisabled('PatientDataForm')"
              form="PatientDataForm"
              color="secondary"
              type="submit"
              block
            >
              <app-icon name="content-save" request />
              <span v-t="'globals.button.save'" />
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md4 lg3
            @click="generate"
            v-if="disabled && !hasRecord"
          >
            <v-btn color="secondary" block>
              <app-icon name="file-document-outline" />
              <span v-t="'page.record.button.generate'" />
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md4 lg3
            :disabled="!disabled"
            @click="accessRecord"
            v-if="disabled && hasRecord"
          >
            <v-btn color="secondary" block>
              <app-icon name="file-document-outline" />
              <span v-t="'page.record.button.access'" />
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
import { mapActions, mapState } from 'vuex'

import PageRules from '@/mixins/PageRules'
import FormRules from '@/mixins/FormRules'

import AppRegisterPatientsForm from './RegisterPatientsForm'
import AppPatientAddress from './PatientAddress'
import AppPatientContact from './PatientContact'

const actions = mapActions({
  getId: 'patient/GET_ID',
  resetId: 'patient/RESET_ID',
  saveEntity: 'patient/SAVE',
  openAddressDialog: 'patient/ADDRESS_DIALOG',
  openContactDialog: 'patient/CONTACT_DIALOG',
  generateRecord: 'patient/GENERATE_RECORD'
})

const state = mapState({
  entity: (state) => state.patient.data
})

export default {
  name: 'AppRegisterPatient',
  mixins: [ PageRules, FormRules ],
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
    ...state,
    disabled () {
      return !!this.entity._id
    },
    hasRecord () {
      return !!this.entity.record_id
    }
  },
  methods: {
    ...actions,

    async submitHandler (state, form) {
      try {
        this.$Progress.start()
        const { _id } = this.entity

        const data = {
          full_name: state.full_name || null,
          date_birth: new Date(state.date_birth),
          sex: state.sex || null,
          cpf: state.cpf || null,
          rg: state.rg || null,
          marital_status: state.marital_status,
          schooling: state.schooling || null,
          occupation: state.occupation || null,
          health_plan: state.health_plan || null,
          number_plan: state.number_plan || null,
          mother_name: state.mother_name || null,
          father_name: state.father_name || null,
          email: state.email || null,
          note: state.note || null
        }

        const id = await this.saveEntity({ ref: _id, data })

        if (!_id) {
          setTimeout(() => {
            this.$router.push({
              name: 'EditPatients',
              params: { id }
            })
          }, 500)
        }
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    accessRecord () {
      const id = this.entity.record_id

      this.$router.push({
        name: 'RegisterRecords',
        params: { id }
      })
    },

    async generate () {
      try {
        this.$Progress.start()
        const data = {
          patient_id: this.entity._id,
          full_name: this.entity.full_name,
          date_birth: this.entity.date_birth,
          sex: this.entity.sex
        }

        this.generateRecord({ data })
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  },

  created () {
    this.resetId()
  },

  mounted () {
    (async (ctx) => {
      const { id } = ctx.$route.params

      if (!id) return

      ctx.unsubscribe = await ctx.getId({ id })
    })(this)
  },

  beforeDestroy () {
    this.resetId()
    this.unsubscribe && this.unsubscribe()
  }
}
</script>

<style lang="stylus" scoped>
.v-tabs__title
  margin-left 0.5em
</style>
