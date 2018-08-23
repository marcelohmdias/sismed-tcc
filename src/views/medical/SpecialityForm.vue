<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <f-field
            name="speciality"
            :validate="validate('error.required.speciality', required)"
          >
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.medical.form.speciality')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field
            name="registry"
            :validate="validate('error.required.registry', required)"
          >
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.medical.form.registry')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field
            name="date"
            :formatter="dateFormatter"
          >
            <template slot-scope="props">
              <app-date-picker
                :value="props.value"
                v-on="props.events">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.medical.form.date')"
                  :value="props.value"
                  type="text"
                  readonly
                />
              </app-date-picker>
            </template>
          </f-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { date } from '@/helpers/formatters'

import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'SpecialtyForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.default({}).define,
    form: Typed.is.obj.define,
    opened: Typed.is.bool.define
  },
  methods: {
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },

    required: (...args) => required(...args)
  },
  watch: {
    opened (value) {
      !value && this.form.methods.reset()
    },
    entity (value) {
      if (!value._id) {
        this.formConfig.initialize({
          speciality: null,
          registry: null,
          date: null
        })
        this.form.methods.reset()
        return
      }

      const entity = {
        _id: value._id,
        speciality: value.speciality,
        registry: value.registry
      }

      if (value.date) {
        entity.date = date(value.date.toMillis()).format('YYYY-MM-DD')
      }

      this.formConfig.initialize(entity)
      this.form.methods.reset()
    }
  }
}
</script>
