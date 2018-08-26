<template>
  <v-card flat>
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
    <v-card-actions >
      <v-btn class="btn__space" color="secondary" @click="newEntity()">
        <app-icon name="plus-circle" />
        <span v-t="'globals.button.new'" />
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="opened" max-width="600" persistent>
      <v-card>
        <v-card-title
          class="title"
          v-t="'page.record.title.medicine_form'"
        />
        <v-card-text>
          <f-form name="RecordMedicinesForm" :submit="submitHandler">
            <app-record-medicines-form
              slot-scope="props"
              :form="props"
              :list="list"
              :opened="opened"
              :entity="entity"
            />
          </f-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="formIsDisabled('RecordMedicinesForm')"
            v-t="'globals.button.save'"
            type="submit"
            form="RecordMedicinesForm"
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
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'
import { date } from '@/helpers/formatters'

import AppRecordMedicinesForm from './RecordMedicinesForm'

const actions = mapActions({
  saveEndity: 'record/SAVE_MEDICINES',
  deleteEntity: 'record/DELETE_MEDICINES'
})

export default {
  name: 'AppRecordMedicines',
  mixins: [ FormRules ],
  components: { AppRecordMedicinesForm },
  props: {
    id: Typed.is.str.define,
    items: Typed.is.array.default([]).define,
    list: Typed.is.array.default([]).define
  },
  data () {
    return {
      opened: false,
      entity: {},
      filters: {
        date: this.formatDate
      },
      headers: [
        {
          text: 'page.profile.table.address.actions',
          sortable: false
        },
        {
          text: 'page.record.table.medicine',
          value: 'factory_name'
        },
        {
          text: 'page.record.table.doctor',
          value: 'doctor_name'
        },
        {
          text: 'page.record.table.date',
          value: 'date'
        }
      ],
      order: [
        'factory_name',
        'doctor_name',
        'date'
      ]
    }
  },
  methods: {
    ...actions,

    formatDate (value) {
      return value
        ? date(value.toMillis()).format()
        : null
    },

    editEntity (entity) {
      this.entity = {
        ...entity
      }
      this.opened = true
    },
    newEntity () {
      this.entity = {}
      this.opened = true
    },

    removeEntity ({ _id }) {
      try {
        this.$Progress.start()
        const ref = this.id

        this.deleteEntity({ _id, ref })
      } catch (error) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },

    async submitHandler (state) {
      try {
        this.$Progress.start()
        const { _id } = state

        const data = {
          doctor_name: state.doctor.value,
          doctor_id: state.doctor.key,
          date: new Date(state.date),
          generic_name: state.generic_name || null,
          factory_name: state.factory_name || null,
          manufacturer: state.manufacturer || null,
          dosage: state.dosage || null
        }

        const ref = this.id

        await this.saveEndity({ ref, _id, data })
        this.opened = false
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn__space
  margin-top 1em
</style>
