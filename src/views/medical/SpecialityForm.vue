<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <f-field name="speciality" >
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.medical.form.speciality')"
                :value="props.value"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="registry">
            <template slot-scope="props">
              <v-text-field
                :name="props.name"
                :label="$t('page.medical.form.registry')"
                :value="props.value"
                v-on="props.events"
                type="text"
              />
            </template>
          </f-field>
        </v-flex>
        <v-flex xs12>
          <f-field name="date">
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
import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'SpecialtyForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.define,
    form: Typed.is.obj.define
  }
}
</script>
