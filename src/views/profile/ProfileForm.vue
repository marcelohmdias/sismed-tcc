<template>
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
                type="text"
                v-on="props.events"
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
                type="tel"
                mask="###.###.###-##"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <f-field name="status">
            <template slot-scope="props">
              <app-select
                :items="statusItem"
                :name="props.name"
                :label="'page.profile.form.status'"
                :value="props.value"
                v-on="props.events"
                readonly
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <f-field name="permission_type">
            <template slot-scope="props">
              <app-select
                :items="permissionItem"
                :name="props.name"
                :label="'page.profile.form.permission_type'"
                :value="props.value"
                readonly
                v-on="props.events"
              />
            </template>
          </f-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

import { date } from '@/helpers/formatters'

export default {
  name: 'AppProfileForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.define,
    form: Typed.is.obj.define
  },
  data () {
    return {
      sexItems: [
        { text: 'enums.sex.female', value: 1 },
        { text: 'enums.sex.male', value: 2 }
      ],
      statusItem: [
        { text: 'enums.status.inactive', value: 0 },
        { text: 'enums.status.active', value: 1 }
      ],
      permissionItem: [
        { text: 'enums.permission.attendant', value: 1 },
        { text: 'enums.permission.doctor', value: 2 },
        { text: 'enums.permission.manager', value: 3 }
      ]
    }
  },
  methods: {
    required: (...args) => required(...args),
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },
    updateFormValue () {
      if (!this.entity._id) return

      let birth = null

      if (this.entity.date_birth) {
        birth = this.entity.date_birth.toMillis()
      }

      this.formConfig.initialize({
        ...this.entity,
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
