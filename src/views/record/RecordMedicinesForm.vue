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
          <f-field name="generic_name">
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.record.form.generic_name')"
                :value="props.value"
                v-on="props.events"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="factory_name">
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.record.form.factory_name')"
                :value="props.value"
                v-on="props.events"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="manufacturer">
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.record.form.manufacturer')"
                :value="props.value"
                v-on="props.events"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="dosage">
            <template slot-scope="props">
              <v-textarea
                :name="props.name"
                :label="$t('page.record.form.dosage')"
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
  name: 'RecordMedicinesForm',
  props: {
    form: Typed.is.obj.define
  }
}
</script>

<style>

</style>
