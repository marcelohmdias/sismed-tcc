<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12>
        <app-data-table
          :filters="filters"
          :headers="headers"
          :items="items"
          :order="order"
        />
      </v-flex>
    </v-layout>
    <v-card-actions >
      <v-btn class="btn__space" color="secondary">
        <app-icon name="plus-circle" />
        <span v-t="'globals.button.new'" />
      </v-btn>
      <app-profile-contact-dialog
        :dialog="dialog"
        :entity="entity"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import enums from '@/helpers/enums'

export default {
  name: 'EditUsersContact',
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
  methods: {
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
