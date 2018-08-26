<template>
  <v-card>
    <v-container grid-list-lg>
      <f-form name="RegisterMedicalForm" :submit="submitHandler">
        <app-register-medicals-form
          slot-scope="props"
          :form="props"
          :entity="entity"
        />
      </f-form>
    </v-container>

    <v-container grid-list-lg v-if="entity._id">
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
                      :items="entity.specialities"
                      :filters="filters"
                      :order="order"
                      :edit="editEntity"
                      :remove="removeEntity"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="px-3 pb-3 pt-0">
              <v-btn color="secondary" @click="openedDialog">
                <app-icon name="plus-circle" />
                <span v-t="'globals.button.new'" />
              </v-btn>
              <v-dialog v-model="opened" max-width="500">
                <v-card>
                  <v-card-title
                    class="title"
                    v-t="'page.medical.title.speciality'"
                  />
                  <v-card-text>
                    <f-form name="SpecialityForm" :submit="submitDialogHandler">
                      <app-speciality-form
                        slot-scope="props"
                        :form="props"
                        :opened="opened"
                        :entity="dialogEntity"
                      />
                    </f-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      :disabled="formIsDisabled('SpecialityForm')"
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
              :disabled="formIsDisabled('RegisterMedicalForm')"
              form="RegisterMedicalForm"
              color="secondary"
              type="submit"
              block
            >
              <app-icon name="content-save" request />
              <span v-t="'globals.button.save'" />
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn color="secondary" :to="{ name: 'MedicalResearch' }" @click="resetId" block>
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
import { date } from '@/helpers/formatters'

import AppRegisterMedicalsForm from './RegisterMedicalsForm'
import AppSpecialityForm from './SpecialityForm'

const actions = mapActions({
  getId: 'medical/GET_ID',
  resetId: 'medical/RESET_ID',
  saveDoctor: 'medical/SAVE',
  saveSpecialities: 'medical/SAVE_SPECIALITIES',
  deleteSpecialities: 'medical/DELETE_SPECIALITIES'
})

const state = mapState({
  entity: (state) => state.medical.data
})

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
  data () {
    return {
      opened: false,
      dialogEntity: {},
      filters: {
        date: this.formatDate
      },
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
    }
  },
  computed: { ...state },
  methods: {
    ...actions,

    formatDate (value) {
      return value
        ? date(value.toMillis()).format()
        : null
    },

    async submitHandler (state, form) {
      try {
        this.$Progress.start()
        const { _id } = state

        const data = {
          'full_name': state.full_name,
          cpf: state.cpf,
          registry: state.registry,
          status: state.status
        }

        const id = await this.saveDoctor({ ref: _id, data })

        if (!_id) {
          setTimeout(() => {
            this.$router.push({
              name: 'EditMedicals',
              params: { id }
            })
          }, 300)
        }
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    async submitDialogHandler (state, form) {
      try {
        this.$Progress.start()
        const { _id } = state

        const data = {
          speciality: state.speciality,
          registry: state.registry
        }

        if (state.date) data.date = new Date(state.date)

        const ref = this.entity._id

        await this.saveSpecialities({ ref, _id, data })
        this.opened = false
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    editEntity (value) {
      this.dialogEntity = value
      this.opened = true
    },

    openedDialog () {
      this.dialogEntity = {}
      this.opened = true
    },

    removeEntity ({ _id }) {
      try {
        this.$Progress.start()
        const ref = this.entity._id

        this.deleteSpecialities({ _id, ref })
      } catch (error) {
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

      if (ctx.unsubscribe.name !== 'Error') return

      ctx.$store.dispatch('notify/ADD', {
        body: 'error.register_not_found',
        title: 'message.title.default.error',
        type: 'error'
      }, { root: true })
      ctx.$router.push({ name: 'ResearchMedicals' })
    })(this)
  },
  beforeDestroy () {
    this.resetId()
    this.unsubscribe && this.unsubscribe()
  }
}
</script>
