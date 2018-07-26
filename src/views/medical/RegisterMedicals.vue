<template>
  <v-card>
    <v-container grid-list-lg>
      <f-form name="RegisterMedicalForm" :submit="submitHandler">
        <app-register-medicals-form  slot-scope="props" :form="props" />
      </f-form>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="primary" dark dense>
              <v-toolbar-title v-t="'page.medical.title.specialities'" />
            </v-toolbar>
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
            <v-card-actions class="px-3 pb-3 pt-0">
              <v-btn color="secondary" @click="opened = true">
                <app-icon name="plus-circle" />
                <span v-t="'globals.button.new'" />
              </v-btn>
              <v-dialog v-model="opened" max-width="500" persistent>
                <v-card>
                  <v-card-title
                    class="title"
                    v-t="'page.medical.title.speciality'"
                  />
                  <v-card-text>
                    <f-form name="SpecialityForm" :submit="submitHandler">
                      <app-speciality-form  slot-scope="props" :form="props" />
                    </f-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-t="'globals.button.save'"
                      type="submit"
                      form="SpecialityForm"
                      color="secondary"
                      flat
                    />
                    <v-spacer />
                    <v-btn
                      v-t="'globals.button.close'"
                      color="secondary"
                      flat
                      @click="opened = false"
                    />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-container class="pt-0 px-2 pb-2" grid-list-lg>
        <v-layout>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn
              color="secondary"
              block
            >
              <app-icon name="content-save" request />
              <span v-t="'globals.button.save'" />
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn color="secondary" :to="{ name: 'MedicalResearch' }"  block>
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
import PageRules from '@/mixins/PageRules'
import FormRules from '@/mixins/FormRules'

import AppRegisterMedicalsForm from './RegisterMedicalsForm'
import AppSpecialityForm from './SpecialityForm'

export default {
  name: 'AppRegisterMedical',
  mixins: [ FormRules, PageRules ],
  components: { AppRegisterMedicalsForm, AppSpecialityForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Cadastro de Médicos'
    }
  },
  data: () => ({
    opened: false,
    items: [],
    headers: [
      {
        text: 'page.profile.table.address.actions',
        sortable: false
      },
      {
        text: 'page.medical.table.speciality',
        value: 'speciality'
      },
      {
        text: 'page.medical.table.registry',
        value: 'registry'
      },
      {
        text: 'page.medical.table.date',
        value: 'date'
      }
    ],
    order: [
      'speciality',
      'registry',
      'date'
    ]
  }),
  methods: {
    async submitHandler () {}
  }
}
</script>

<style lang="stylus" scoped>

</style>
