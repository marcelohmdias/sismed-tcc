<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12>
        <app-data-table
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
            <app-record-attendance-form slot-scope="props" :form="props" />
          </f-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
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

import Typed from '@/modules/typed'

import AppRecordAttendanceForm from './RecordAttendanceForm'

export default {
  name: 'AppRecordMedicines',
  components: { AppRecordAttendanceForm },
  props: {
    items: Typed.is.array.default([]).define
  },
  data: () => ({
    opened: false,
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
        value: 'doctor'
      },
      {
        text: 'page.record.table.diagnostic',
        value: 'diagnostic'
      }
    ],
    order: [
      'date',
      'doctor',
      'diagnostic'
    ]
  }),
  methods: {
    editEntity (entity) {
      this.opened = true
    },
    newEntity () {
      this.opened = true
    },
    removeEntity (state) {

    },
    submitHandler () {}
  }
}
</script>

<style lang="stylus" scoped>
.btn__space
  margin-top 1em
</style>
