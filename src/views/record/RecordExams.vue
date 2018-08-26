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
          v-t="'page.record.title.exam_form'"
        />
        <v-card-text>
          <f-form name="RecordExamsForm" :submit="submitHandler">
            <app-record-exams-form
              slot-scope="props"
              :form="props"
              :list="list"
              :list-exams="listExams"
              :opened="opened"
              :entity="entity"
            />
          </f-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="formIsDisabled('RecordExamsForm')"
            v-t="'globals.button.save'"
            type="submit"
            form="RecordExamsForm"
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
import enums from '@/helpers/enums'
import { date } from '@/helpers/formatters'

import AppRecordExamsForm from './RecordExamsForm'
import { selectedList } from '@/server/exams'

const actions = mapActions({
  saveEndity: 'record/SAVE_EXAMS',
  deleteEntity: 'record/DELETE_EXAMS'
})

export default {
  name: 'AppRecordExams',
  mixins: [ FormRules ],
  components: { AppRecordExamsForm },
  props: {
    id: Typed.is.str.define,
    items: Typed.is.array.default([]).define,
    list: Typed.is.array.default([]).define,
    name: Typed.is.str.define,
    patient: Typed.is.str.define
  },
  data () {
    return {
      opened: false,
      entity: {},
      listExams: [],
      filters: {
        date: this.formatDate,
        exams: this.formatExam,
        status: this.formatStatus
      },
      headers: [
        {
          text: 'page.profile.table.address.actions',
          sortable: false
        },
        {
          text: 'page.record.table.exam',
          value: 'exams'
        },
        {
          text: 'page.record.table.doctor',
          value: 'doctor_name'
        },
        {
          text: 'page.record.table.date',
          value: 'date'
        },
        {
          text: 'page.record.table.status',
          value: 'status'
        }
      ],
      order: [
        'exams',
        'doctor_name',
        'date',
        'status'
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

    formatExam (value = []) {
      return value.map(({ name }) => name).join(', ')
    },

    formatStatus (value) {
      if (!value) return value
      return this.$t(`enums.exam.${enums.exam.get(value).key}`)
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

    async getListExams () {
      this.listExams = await selectedList()
    },

    removeEntity ({ _id }) {
      try {
        this.$Progress.start()
        this.deleteEntity({ _id })
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
          record_id: this.id,
          patient_id: this.patient,
          patient_name: this.name,
          doctor_name: state.doctor.value,
          doctor_id: state.doctor.key,
          date: new Date(state.date),
          status: state.status || null,
          note: state.note || null,
          exams: (state.exam || []).map((item) => ({
            exam_id: item.key,
            name: item.value
          }))
        }

        await this.saveEndity({ _id, data })
        this.opened = false
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  },
  created () {
    this.getListExams()
  }
}
</script>

<style lang="stylus" scoped>
.btn__space
  margin-top 1em
</style>
