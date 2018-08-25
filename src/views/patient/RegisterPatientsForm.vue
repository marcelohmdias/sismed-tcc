<template>
  <div>
    <v-form
      :id="form.name"
      :name="form.name"
      @submit.prevent="form.methods.submit"
    >
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 md8 lg6>
            <f-field
              name="full_name"
              :validate="validate('error.required.full_name', required)"
            >
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.profile.form.full_name')"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field
              name="date_birth"
              :formatter="dateFormatter"
              :validate="validate('error.required.date_birth', required)"
            >
              <template slot-scope="props">
                <app-date-picker
                  :value="props.value"
                  v-on="props.events">
                  <v-text-field
                    :name="props.name"
                    :label="$t('page.profile.form.date_birth')"
                    :rules="checkError(props.meta)"
                    :value="props.value"
                    type="text"
                    readonly
                  />
                </app-date-picker>
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field
              name="sex"
              :validate="validate('error.required.sex', required)"
            >
              <template slot-scope="props">
                <app-select
                  :items="sexItems"
                  :name="props.name"
                  :label="'page.profile.form.sex'"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  v-on="props.events"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field
              name="cpf"
              :validate="validate('error.required.cpf', required)"
            >
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.profile.form.cpf')"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  v-on="props.events"
                  mask="###.###.###-##"
                  type="tel"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field name="rg">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.patient.form.rg')"
                  :value="props.value"
                  v-on="props.events"
                  type="tel"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field
              name="marital_status"
              :validate="validate('error.required.marital_status', required)"
            >
              <template slot-scope="props">
                <app-select
                  :items="maritalItems"
                  :name="props.name"
                  :label="'page.patient.form.marital_status'"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  v-on="props.events"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field
              name="schooling"
              :validate="validate('error.required.schooling', required)"
            >
              <template slot-scope="props">
                <app-select
                  :items="schoolingItems"
                  :name="props.name"
                  :label="'page.patient.form.schooling'"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  v-on="props.events"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 md4 lg3>
            <f-field name="occupation">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.patient.form.occupation')"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 md8 lg6>
            <f-field name="health_plan">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.patient.form.health_plan')"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 md4 lg3>
            <f-field name="number_plan">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.patient.form.number_plan')"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 md6 lg6>
            <f-field
              name="mother_name"
              :validate="validate('error.required.mother_name', required)"
            >
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.patient.form.mother_name')"
                  :rules="checkError(props.meta)"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 md6 lg6>
            <f-field name="father_name">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.patient.form.father_name')"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 lg6>
            <f-field name="email">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.profile.form.email')"
                  :value="props.value"
                  v-on="props.events"
                  type="email"
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
                  rows="1"
                  auto-grow
                />
              </template>
            </f-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Typed from '@/modules/typed'

import FieldRules from '@/mixins/FieldRules'

import { date } from '@/helpers/formatters'

export default {
  name: 'RegisterPatientsForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    form: Typed.is.obj.define,
    entity: Typed.is.obj.define
  },
  data () {
    return {
      maritalItems: [
        { text: 'enums.marital.not_married', value: 1 },
        { text: 'enums.marital.married', value: 2 },
        { text: 'enums.marital.divorced', value: 3 },
        { text: 'enums.marital.widower', value: 4 },
        { text: 'enums.marital.separated', value: 5 }
      ],
      schoolingItems: [
        { text: 'enums.schooling.child_education', value: 1 },
        { text: 'enums.schooling.elementary_school', value: 2 },
        { text: 'enums.schooling.high_school', value: 3 },
        { text: 'enums.schooling.technical_education', value: 4 },
        { text: 'enums.schooling.university_graduate', value: 5 },
        { text: 'enums.schooling.postgraduate', value: 6 },
        { text: 'enums.schooling.master_degree', value: 7 },
        { text: 'enums.schooling.doctorate_degree', value: 8 },
        { text: 'enums.schooling.post_doctoral', value: 9 }
      ],
      sexItems: [
        { text: 'enums.sex.female', value: 1 },
        { text: 'enums.sex.male', value: 2 }
      ]
    }
  },

  methods: {
    required: (...args) => required(...args),

    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },

    updateFormValue (value) {
      if (!value._id) {
        return this.formConfig.initialize({
          ...this.entity
        })
      }

      let birth = null

      if (this.entity.date_birth) {
        birth = this.entity.date_birth.toMillis()
      }

      return this.formConfig.initialize({
        ...value,
        date_birth: birth
      })
    }
  },

  watch: {
    entity: {
      handler: 'updateFormValue',
      immediate: true
    }
  }
}
</script>
