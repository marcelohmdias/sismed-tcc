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
          <f-field name="anamnesis">
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.record.form.anamnesis')"
                :value="props.value"
                v-on="props.events"
                type="text"
                rows="3"
                auto-grow
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="diagnostic">
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.record.form.diagnostic')"
                :value="props.value"
                v-on="props.events"
                type="text"
                rows="3"
                auto-grow
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
  name: 'RecordAttendanceForm',
  props: {
    form: Typed.is.obj.define
  }
}
</script>

<style>

</style>
