<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12>
        <app-data-table
          :filters="filters"
          :headers="headers"
          :items="items"
          :order="order"
          :edit="editEntity"
          :remove="removeEntity"
        />
      </v-flex>
    </v-layout>
    <v-card-actions >
      <v-btn class="btn__space" color="secondary" @click="newEntity()">
        <app-icon name="plus-circle" />
        <span v-t="'globals.button.new'" />
      </v-btn>
      <app-profile-contact-dialog
        :action="saveContact"
        :dialog="dialog"
        :entity="entity"
        :opened="opened"
        :user="user"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Typed from '@/modules/typed'
import enums from '@/helpers/enums'

import AppProfileContactDialog from './ProfileContactDialog'

const actions = mapActions({
  deleteContact: 'profile/DELETE_CONTACT',
  saveContact: 'profile/SAVE_CONTACT'
})

const states = mapState({
  opened: (state) => state.profile.dialogContact
})

export default {
  name: 'AppProfileContact',
  components: { AppProfileContactDialog },
  props: {
    dialog: Typed.is.func.required.define,
    items: Typed.is.array.default([]).define,
    user: Typed.is.str.default('').define
  },
  data () {
    return {
      entity: {},
      filters: {
        number: this.formatPhone,
        status: this.formatStatus,
        type: this.formatType
      },
      order: [
        'number',
        'contact_person',
        'type',
        'status'
      ],
      headers: [
        {
          text: 'page.profile.table.contact.actions',
          sortable: false
        },
        {
          text: 'page.profile.table.contact.number',
          value: 'number'
        },
        {
          text: 'page.profile.table.contact.contact',
          value: 'contact_person'
        },
        {
          text: 'page.profile.table.contact.type',
          value: 'type'
        },
        {
          text: 'page.profile.table.contact.status',
          value: 'status'
        }
      ]
    }
  },
  computed: { ...states },
  methods: {
    ...actions,
    editEntity (entity) {
      this.entity = entity
      this.dialog(true)
    },
    newEntity () {
      this.entity = {
        status: 1
      }
      this.dialog(true)
    },
    removeEntity (state) {
      try {
        this.$Progress.start()
        const user = this.user
        const _id = state._id

        this.deleteContact({ user, _id })
      } catch (error) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },
    formatPhone (value = '') {
      if (value.length === 10) {
        return value.replace(/(\d{2})(\d{4})(\d+)/g, '( $1 ) $2 - $3')
      }
      return value.replace(/(\d{2})(\d{5})(\d+)/g, '( $1 ) $2 - $3')
    },
    formatStatus (value) {
      return this.$t(`enums.status.${enums.status.get(value).key}`)
    },
    formatType (value) {
      return this.$t(`enums.contact.${enums.contact.get(value).key}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn__space
  margin-top 1em
</style>
