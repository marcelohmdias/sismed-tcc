<template>
  <v-card>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md8 lg6>
          <v-text-field
            name="full_name"
            :label="$t('page.profile.form.full_name')"
            type="text"
            :value="entity.full_name"
            readonly
          />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <v-text-field
            name="date_birth"
            :label="$t('page.profile.form.date_birth')"
            type="text"
            :value="date"
            readonly
          />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <app-select
            :items="sexItems"
            name="sex"
            :label="'page.profile.form.sex'"
            :value="entity.sex"
            readonly
          />
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs
            v-model="tabState"
            color="grey lighten-3"
            slider-color="primary"
            left
            show-arrows>
            <v-tab href="#tab-0">
              <app-icon name="clipboard-pulse" />
              <span class="v-tabs__title" v-t="'page.record.tab.calls'" />
            </v-tab>
            <v-tab href="#tab-1">
              <app-icon name="heart-pulse" />
              <span class="v-tabs__title" v-t="'page.record.tab.exams'" />
            </v-tab>
            <v-tab href="#tab-2">
              <app-icon name="file-document" />
              <span class="v-tabs__title" v-t="'page.record.tab.medicines'" />
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabState">
            <v-tab-item id="tab-0">
              <app-record-attendance
                :items="entity.attendances"
                :list="listDoctor"
                :id="entity._id"
              />
            </v-tab-item>
            <v-tab-item id="tab-1">
              <app-record-exams
                :items="entity.exams"
                :list="listDoctor"
                :id="entity._id"
                :name="entity.full_name"
                :patient="entity.patient_id"
              />
            </v-tab-item>
            <v-tab-item id="tab-2">
              <app-record-medicines
                :items="entity.medicines"
                :list="listDoctor"
                :id="entity._id"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-container class="pt-0 px-2 pb-2" grid-list-lg>
        <v-layout>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn color="secondary" :to="{ name: 'ResearchRecords' }" block>
              <app-icon name="subdirectory-arrow-left" />
              <span v-t="'globals.button.come_back'" />
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PageRules from '@/mixins/PageRules'

import AppRecordAttendance from './RecordAttendance'
import AppRecordExams from './RecordExams'
import AppRecordMedicines from './RecordMedicines'

import { date } from '@/helpers/formatters'

import { selectedList } from '@/server/doctor'

const actions = mapActions({
  getId: 'record/GET_ID',
  resetId: 'record/RESET_ID'
})

const state = mapState({
  entity: (state) => state.record.data
})

export default {
  name: 'RegisterRecords',
  components: { AppRecordAttendance, AppRecordExams, AppRecordMedicines },
  mixins: [ PageRules ],
  data: () => ({
    listDoctor: [],
    sexItems: [
      { text: 'enums.sex.female', value: 1 },
      { text: 'enums.sex.male', value: 2 }
    ],
    tabState: 'tab-0'
  }),

  computed: {
    ...state,
    date () {
      const value = this.entity.date_birth
      return value
        ? date(value.toMillis()).format()
        : null
    }
  },

  methods: {
    ...actions,
    async getListDoctor () {
      this.listDoctor = await selectedList()
    }
  },

  created () {
    this.resetId()
    this.getListDoctor()
  },

  mounted () {
    (async (ctx) => {
      const { id } = ctx.$route.params

      if (!id) return

      ctx.unsubscribe = await ctx.getId({ id })

      if (ctx.unsubscribe.name !== 'Error') return

      ctx.$store.dispatch('notify/ADD', {
        body: 'error.register_not_found',
        title: 'message.title.default.error',
        type: 'error'
      }, { root: true })
      ctx.$router.push({ name: 'ResearchRecords' })
    })(this)
  },

  beforeDestroy () {
    this.resetId()
    this.unsubscribe && this.unsubscribe()
  }
}
</script>

<style lang="stylus" scoped>
.v-tabs__title
  margin-left 0.5em
</style>
