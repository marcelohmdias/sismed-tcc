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
      <app-profile-address-dialog
        :action="saveAddress"
        :dialog="dialog"
        :entity="entity"
        :opened="opened"
        :user="user"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Typed from '@/modules/typed'
import enums from '@/helpers/enums'

import AppProfileAddressDialog from './ProfileAddressDialog'

const actions = mapActions({
  deleteAddress: 'profile/DELETE_ADDRESS',
  saveAddress: 'profile/SAVE_ADDRESS'
})

const states = mapState({
  opened: (state) => state.profile.dialogAddress
})

export default {
  name: 'AppProfileAddress',
  components: { AppProfileAddressDialog },
  props: {
    dialog: Typed.is.func.required.define,
    items: Typed.is.array.default([]).define,
    user: Typed.is.str.default('').define
  },
  data () {
    return {
      entity: {},
      filters: {
        zip_cod: this.formatZipCod,
        state: this.formatState,
        status: this.formatStatus,
        type: this.formatType
      },
      headers: [{
        text: 'page.profile.table.address.actions',
        sortable: false
      },
      {
        text: 'page.profile.table.address.zip_cod',
        value: 'zip_cod'
      },
      {
        text: 'page.profile.table.address.public_place',
        value: 'public_place'
      },
      {
        text: 'page.profile.table.address.complement',
        value: 'complement'
      },
      {
        text: 'page.profile.table.address.number',
        value: 'number'
      },
      {
        text: 'page.profile.table.address.neighborhood',
        value: 'neighborhood'
      },
      {
        text: 'page.profile.table.address.city',
        value: 'city'
      },
      {
        text: 'page.profile.table.address.state',
        value: 'state'
      },
      {
        text: 'page.profile.table.address.type',
        value: 'type'
      },
      {
        text: 'page.profile.table.address.status',
        value: 'status'
      }
      ],
      order: [
        'zip_cod',
        'public_place',
        'complement',
        'number',
        'neighborhood',
        'city',
        'state',
        'type',
        'status'
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
      this.entity = { status: 1 }
      this.dialog(true)
    },
    removeEntity (state) {
      try {
        this.$Progress.start()
        const user = this.user
        const _id = state._id

        this.deleteAddress({ user, _id })
      } catch (error) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    },
    formatZipCod (value = '') {
      return value.replace(/(\d{2})(\d{3})(\d+)/g, '$1.$2-$3')
    },
    formatStatus (value) {
      if (!value) return value
      return this.$t(`enums.status.${enums.status.get(value).key}`)
    },
    formatType (value) {
      if (!value) return value
      return this.$t(`enums.address.${enums.address.get(value).key}`)
    },
    formatState (value) {
      if (!value) return value
      return this.$t(`enums.state.${enums.state.get(value).key}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn__space
  margin-top 1em
</style>
