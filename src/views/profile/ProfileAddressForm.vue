<template>
  <v-form
    :id="form.name"
    :name="form.name"
    @submit.prevent="form.methods.submit"
  >
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm3>
          <f-field
            name="zip_cod"
          >
            <div slot-scope="props">
              <v-text-field
                type="tel"
                :id="props.name"
                :name="props.name"
                :label="$t('page.profile.form.zip_cod')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
                @blur="searchZipCode(props.value, props.meta)"
                mask="##.###-###"
                autofocus
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs10 sm7>
          <f-field
            name="public_place"
            :validate="validate('error.required.public_place', required)"
          >
            <div slot-scope="props">
              <v-text-field
                type="text"
                :id="props.name"
                :name="props.name"
                :label="$t('page.profile.form.public_place')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs2 sm2>
          <f-field
            name="number"
            :validate="validate('error.required.number', required)"
          >
            <div slot-scope="props">
              <v-text-field
                type="number"
                :id="props.name"
                :name="props.name"
                :label="$t('page.profile.form.number')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs12 md6>
          <f-field
            name="complement"
          >
            <div slot-scope="props">
              <v-text-field
                type="text"
                :id="props.name"
                :name="props.name"
                :label="$t('page.profile.form.complement')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs12 md6>
          <f-field
            name="neighborhood"
            :validate="validate('error.required.neighborhood', required)"
          >
            <div slot-scope="props">
              <v-text-field
                type="text"
                :id="props.name"
                :name="props.name"
                :label="$t('page.profile.form.neighborhood')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs12 sm6>
          <f-field
            name="city"
            :validate="validate('error.required.city', required)"
          >
            <div slot-scope="props">
              <v-text-field
                type="text"
                :id="props.name"
                :name="props.name"
                :label="$t('page.profile.form.city')"
                :rules="checkError(props.meta)"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <f-field
            name="state"
            :validate="validate('error.required.state', required)"
          >
            <div slot-scope="props">
              <app-select
                :items="stateItem"
                :id="props.name"
                :name="props.name"
                :label="'page.profile.form.state'"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs12 sm4>
          <f-field
            name="address_type"
            :validate="validate('error.required.type', required)"
          >
            <div slot-scope="props">
              <app-select
                :items="typeItem"
                :id="props.name"
                :name="props.name"
                :label="'page.profile.form.type'"
                :value="props.value"
                v-on="props.events"
              />
            </div>
          </f-field>
        </v-flex>
        <v-flex xs12 sm4>
          <f-field
            name="address_status"
            :validate="validate('error.required.status', required)"
          >
            <div slot-scope="props">
              <app-select
                :items="statusItem"
                :id="props.name"
                :name="props.name"
                :label="'page.profile.form.status'"
                :value="props.value"
                v-on="props.events"
                :readonly="!entity._id"
              />
            </div>
          </f-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import enums from '@/helpers/enums'
import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'AppProfileAddressForm',
  mixins: [ FieldRules ],
  inject: [ 'formConfig' ],
  props: {
    entity: Typed.is.obj.define,
    form: Typed.is.obj.define
  },
  data () {
    return {
      typeItem: [
        { text: 'enums.address.CORRESPONDENCE', value: 1 },
        { text: 'enums.address.JOB', value: 2 },
        { text: 'enums.address.RESIDENCE', value: 3 }
      ],
      statusItem: [
        { text: 'enums.status.inactive', value: 0 },
        { text: 'enums.status.active', value: 1 }
      ],
      stateItem: [
        { text: 'enums.state.AC', value: 1 },
        { text: 'enums.state.AL', value: 2 },
        { text: 'enums.state.AM', value: 3 },
        { text: 'enums.state.AP', value: 4 },
        { text: 'enums.state.BA', value: 5 },
        { text: 'enums.state.CE', value: 6 },
        { text: 'enums.state.DF', value: 7 },
        { text: 'enums.state.ES', value: 8 },
        { text: 'enums.state.GO', value: 9 },
        { text: 'enums.state.MA', value: 10 },
        { text: 'enums.state.MG', value: 11 },
        { text: 'enums.state.MS', value: 12 },
        { text: 'enums.state.MT', value: 13 },
        { text: 'enums.state.PA', value: 14 },
        { text: 'enums.state.PB', value: 15 },
        { text: 'enums.state.PE', value: 16 },
        { text: 'enums.state.PI', value: 17 },
        { text: 'enums.state.PR', value: 18 },
        { text: 'enums.state.RJ', value: 19 },
        { text: 'enums.state.RN', value: 20 },
        { text: 'enums.state.RO', value: 21 },
        { text: 'enums.state.RR', value: 22 },
        { text: 'enums.state.RS', value: 23 },
        { text: 'enums.state.SC', value: 24 },
        { text: 'enums.state.SE', value: 25 },
        { text: 'enums.state.SP', value: 26 },
        { text: 'enums.state.TO', value: 27 }
      ]
    }
  },
  methods: {
    required: (...args) => required(...args),
    async searchZipCode (value, meta) {
      if (meta.invalid || meta.pristine || !value) return
      try {
        const data = await fetch(`https://viacep.com.br/ws/${value}/json/`)
        const result = await data.json()

        this.formConfig.change('public_place', result.logradouro)
        this.formConfig.change('neighborhood', result.bairro)
        this.formConfig.change('complement', result.complemento)
        this.formConfig.change('city', result.localidade)
        this.formConfig.change('state', enums.state.get(result.uf).value)
      } catch (err) {}
    },
    updateFormValue () {
      this.formConfig.initialize({
        _id: this.entity._id,
        zip_cod: this.entity.zip_cod,
        public_place: this.entity.public_place,
        number: this.entity.number,
        complement: this.entity.complement,
        neighborhood: this.entity.neighborhood,
        city: this.entity.city,
        state: this.entity.state,
        address_status: this.entity.status,
        address_type: this.entity.type
      })
    }
  },
  watch: {
    entity: {
      handler: 'updateFormValue',
      immediate: true
    }
  },
  mounted () {
    EventBus.$on('$CloseDialog', () => this.form.methods.reset())
  }
}
</script>
