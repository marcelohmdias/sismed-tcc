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
                            :items="patient"
                            :name="props.name"
                            :label="$t('page.schedule.form.patient')"
                            :no-data-text="$t('message.no_data')"
                            :value="props.value"
                            :search-input="props.value"
                            :filter="searchFilter"
                            v-on="props.events"
                            item-text="value"
                            item-value="key"
                            return-object
                          />
                        </template>
                      </f-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg4>
                      <f-field name="doctor">
                        <template slot-scope="props">
                          <v-autocomplete
                            :items="doctor"
                            :name="props.name"
                            :label="$t('page.schedule.form.doctor')"
                            :no-data-text="$t('message.no_data')"
                            :value="props.value"
                            :search-input="props.value"
                            :filter="searchFilter"
                            v-on="props.events"
                            item-text="value"
                            item-value="key"
                            return-object
                          />
                        </template>
                      </f-field>
                    </v-flex>
                    <v-flex xs12 sm4 md3 lg2>
                      <f-field name="date" :formatter="dateFormatter">
                        <template slot-scope="props">
                          <app-date-picker
                            :value="props.value"
                            v-on="props.events">
                            <v-text-field
                              :name="props.name"
                              :label="$t('page.exam.table.date')"
                              :value="props.value"
                              type="text"
                              readonly
                            />
                          </app-date-picker>
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
import { date } from '@/helpers/formatters'

export default {
  name: 'ExamsForm',
  props: {
    form: Typed.is.obj.define,
    doctor: Typed.is.array.define,
    patient: Typed.is.array.define
  },
  methods: {
    clean () {
      this.form.methods.reset()
      this.$emit('clean')
    },
    dateFormatter () {
      return (value) => value ? date(value).format() : null
    },
    searchFilter (item, query = '') {
      if (query.value) {
        return item.value.toLowerCase().indexOf(query.value.toLowerCase()) > -1
      }

      if (Array.isArray(query)) {
        return query.some((data) => {
          return item.value.toLowerCase().indexOf(data.value.toLowerCase()) > -1
        })
      }

      return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
    }
  }
}
</script>
