<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <f-field name="doctor">
            <template slot-scope="props">
              <v-autocomplete
                :items="[]"
                :name="props.name"
                :label="$t('page.record.table.doctor')"
                :no-data-text="$t('message.no_data')"
                :value="props.value"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            name="date"
            :label="$t('page.record.table.date')"
            type="text"
            readonly
          />
        </v-flex>
        <v-flex xs12>
          <f-field name="exam">
            <template slot-scope="props">
              <v-autocomplete
                :items="[]"
                :name="props.name"
                :label="$t('page.record.form.exam')"
                :no-data-text="$t('message.no_data')"
                :multiple="true"
                :multi-line="true"
                :value="props.value"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="status">
            <template slot-scope="props">
              <app-select
                :items="statusItem"
                :name="props.name"
                :label="'page.profile.form.status'"
                :value="props.value"
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="note">
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.patient.form.note')"
                :value="props.value"
                v-on="props.events"
                type="text"
                rows="3"
                auto-grow
              />
            </template>
          </f-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import Typed from '@/modules/typed'

export default {
  name: 'RecordExamsForm',
  props: {
    form: Typed.is.obj.define
  },
  data: () => ({
    statusItem: [
      { text: 'enums.exam.canceled', value: 0 },
      { text: 'enums.exam.marked', value: 1 },
      { text: 'enums.exam.fulfilled', value: 2 },
      { text: 'enums.exam.delivered', value: 3 }
    ]
  })
}
</script>

<style>

</style>
