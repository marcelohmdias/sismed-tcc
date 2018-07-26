<template>
  <v-dialog v-model="opened" max-width="800" persistent>
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
          v-t="'globals.button.save'"
          :disabled="isDisabled"
          type="submit"
          form="AddressForm"
          color="secondary"
          flat
        />
        <v-spacer />
        <v-btn
          v-t="'globals.button.close'"
          color="secondary"
          flat
          @click="close"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import EventBus from '@/helpers/EventBus'
import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'

import AppProfileAddressForm from './ProfileAddressForm'

export default {
  name: 'AppProfileAddressDialog',
  components: { AppProfileAddressForm },
  mixins: [ FormRules ],
  props: {
    action: Typed.is.func.required.define,
    dialog: Typed.is.func.required.define,
    entity: Typed.is.obj.required.define,
    opened: Typed.is.bool.required.define,
    user: Typed.is.str.required.define
  },
  computed: {
    isDisabled () {
      return this.formIsDisabled('AddressForm')
    }
  },
  methods: {
    close () {
      EventBus.$emit('$CloseDialog')
      this.dialog(false)
    },
    async submitHandler (state, form) {
      try {
        this.$Progress.start()

        const user = this.user
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

        await this.action({ _id, data, user })

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
