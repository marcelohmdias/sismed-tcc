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
                            :items="[]"
                            :name="props.name"
                            :label="$t('page.schedule.form.patient')"
                            :no-data-text="$t('message.no_data')"
                            :value="props.value"
                            v-on="props.events"
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
                    <v-flex xs12 sm6 md4 lg4>
                      <f-field name="doctor">
                        <template slot-scope="props">
                          <v-autocomplete
                            :items="[]"
                            :name="props.name"
                            :label="$t('page.schedule.form.doctor')"
                            :no-data-text="$t('message.no_data')"
                            :value="props.value"
                            v-on="props.events"
                          />
                        </template>
                      </f-field>
                    </v-flex>
                    <v-flex xs12 sm4 md3 lg2>
                      <f-field name="date">
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

export default {
  name: 'ExamsForm',
  props: {
    form: Typed.is.obj.define
  },
  methods: {
    clean () {
      this.form.methods.reset()
      this.$emit('clean')
    }
  }
}
</script>
