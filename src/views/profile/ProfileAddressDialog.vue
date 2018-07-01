<template>
  <v-dialog v-model="isOpened" max-width="800" persistent>
    <v-card>
      <v-card-title class="title" v-t="'page.profile.address_title'" />
      <v-card-text>
        <f-form name="AddressForm" :submit="submitHandler">
          <app-profile-address-form
            slot-scope="props"
            :form="props"
            :entity="entity"
          />
        </f-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          form="AddressForm"
          color="secondary"
          v-t="'globals.button.save'"
          :disabled="isDisabled"
          flat
        />
        <v-spacer />
        <v-btn
          color="secondary"
          v-t="'globals.button.close'"
          @click="close"
          flat
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'

import AppProfileAddressForm from './ProfileAddressForm'

const actions = mapActions({
  saveAddress: 'profile/SAVE_ADDRESS'
})

const states = mapState({
  isOpened: (state) => state.profile.dialogAddress
})

export default {
  name: 'AppProfileAddressDialog',
  components: { AppProfileAddressForm },
  mixins: [ FormRules ],
  props: {
    dialog: Typed.is.func.required.define,
    entity: Typed.is.obj.required.define
  },
  computed: {
    ...states,
    isDisabled () {
      return this.formIsDisabled('AddressForm')
    }
  },
  methods: {
    ...actions,
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async submitHandler (state, form) {
      try {
        this.$Progress.start()

        const user = this.$store.state.profile.data._id
        const _id = state._id

        const data = {
          zip_cod: state.zip_cod || '',
          public_place: state.public_place,
          number: state.number,
          complement: state.complement || '',
          neighborhood: state.neighborhood,
          city: state.city,
          state: state.state,
          type: state.address_type,
          status: state.address_status
        }

        await this.saveAddress({ _id, data, user })

        this.close()
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.card__text, .title
  padding-bottom 0
</style>
