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
            <f-field name="full_name">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.profile.form.full_name')"
                  :value="props.value"
                  v-on="props.events"
                  type="text"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field name="date_birth">
              <template slot-scope="props">
                <app-date-picker
                  :value="props.value"
                  v-on="props.events">
                  <v-text-field
                    :name="props.name"
                    :label="$t('page.profile.form.date_birth')"
                    :value="props.value"
                    type="text"
                    readonly
                  />
                </app-date-picker>
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field name="sex">
              <template slot-scope="props">
                <app-select
                  :items="sexItems"
                  :name="props.name"
                  :label="'page.profile.form.sex'"
                  :value="props.value"
                  v-on="props.events"
                />
              </template>
            </f-field>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <f-field name="cpf">
              <template slot-scope="props">
                <v-text-field
                  :name="props.name"
                  :label="$t('page.profile.form.cpf')"
                  :value="props.value"
                  v-on="props.events"
                  mask="###.###.###-##"
                  type="tel"
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
          <v-flex xs12 md8 lg3>
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
          <v-flex xs12 md8 lg6>
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
import Typed from '@/modules/typed'

export default {
  name: 'RegisterPatientsForm',
  props: {
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
      ]
    }
  }
}
</script>

<style>

</style>
