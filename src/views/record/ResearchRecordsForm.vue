<template>
  <div>
    <v-card-title class="title" v-t="'globals.title.search'" />
    <v-card-text class="pa-0">
      <v-container class="pt-0 px-3" grid-list-lg>
        <v-layout row wrap>
          <v-flex>
            <v-form
              :id="form.name"
              :name="form.name"
              @submit.prevent="form.methods.submit"
            >
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md5 lg4>
                      <f-field name="patient">
                        <template slot-scope="props">
                          <v-autocomplete
                            :items="patients"
                            :name="props.name"
                            :label="$t('page.schedule.form.patient')"
                            :no-data-text="$t('message.no_data')"
                            :filter="searchFilter"
                            :value="props.value"
                            v-on="props.events"
                            item-text="value"
                            return-object
                          />
                        </template>
                      </f-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3 lg2>
                      <f-field name="cpf">
                        <template slot-scope="props">
                          <v-text-field
                            :name="props.name"
                            :label="$t('page.user.table.cpf')"
                            :value="props.value"
                            type="tel"
                            v-on="props.events"
                            mask="###.###.###-##"
                          />
                        </template>
                      </f-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="px-3 pb-3 pt-0">
      <v-btn type="submit" :form="form.name" color="secondary">
        <app-icon name="magnify" request />
        <span v-t="'globals.button.search'" />
      </v-btn>
      <v-btn color="secondary" @click="clean">
        <app-icon name="eraser" request />
        <span v-t="'globals.button.clean'" />
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import Typed from '@/modules/typed'

export default {
  name: 'ResearchRecordsForm',
  props: {
    form: Typed.is.obj.define,
    patients: Typed.is.array.define
  },
  methods: {
    clean () {
      this.form.methods.reset()
      this.$emit('clean')
    },
    searchFilter (item, query = '') {
      return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
    }
  }
}
</script>
