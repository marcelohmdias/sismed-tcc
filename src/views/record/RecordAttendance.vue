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
    <v-dialog v-model="opened" max-width="800" persistent>
      <v-card>
        <v-card-title
          class="title"
          v-t="'page.record.title.attendance_form'"
        />
        <v-card-text>
          <f-form name="RecordAttendanceForm" :submit="submitHandler">
            <app-record-attendance-form
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
            :disabled="formIsDisabled('RecordAttendanceForm')"
            v-t="'globals.button.save'"
            type="submit"
            form="RecordAttendanceForm"
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

import AppRecordAttendanceForm from './RecordAttendanceForm'

const actions = mapActions({
  saveEndity: 'record/SAVE_ATTENDANCES',
  deleteEntity: 'record/DELETE_ATTENDANCES'
})

export default {
  name: 'AppRecordAttendance',
  mixins: [ FormRules ],
  components: { AppRecordAttendanceForm },
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
        date: this.formatDate,
        diagnostic: this.formatText
      },
      headers: [
        {
          text: 'page.profile.table.address.actions',
          sortable: false
        },
        {
          text: 'page.record.table.date',
          value: 'date'
        },
        {
          text: 'page.record.table.doctor',
          value: 'doctor_name'
        },
        {
          text: 'page.record.table.diagnostic',
          value: 'diagnostic'
        }
      ],
      order: [
        'date',
        'doctor_name',
        'diagnostic'
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

    formatText (value = '') {
      return value.length > 100
        ? `${value.substring(0, 100)} ...`
        : value
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
          anamnesis: state.anamnesis || null,
          diagnostic: state.diagnostic || null,
          note: state.note || null
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
