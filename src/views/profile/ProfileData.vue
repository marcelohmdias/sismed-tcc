<template>
  <v-card flat>
    <f-form :submit="submitHandler" name="ProfileForm">
      <app-profile-form
        slot-scope="props"
        :entity="entity"
        :form="props"
      />
    </f-form>
    <v-card-actions>
      <v-btn
        :disabled="formIsDisabled('ProfileForm')"
        type="submit"
        form="ProfileForm"
        color="secondary"
      >
        <app-icon name="content-save" request />
        <span v-t="'globals.button.save'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'

import AppProfileForm from './ProfileForm'

const actions = mapActions({ saveUser: 'profile/SAVE_USER' })

export default {
  name: 'AppProfileData',
  components: { AppProfileForm },
  mixins: [ FormRules ],
  props: {
    entity: Typed.is.obj.define
  },
  methods: {
    ...actions,
    async submitHandler (state, form) {
      try {
        this.$Progress.start()
        const { _id } = state

        const data = {
          cpf: state.cpf,
          'date_birth': new Date(state.date_birth),
          'full_name': state.full_name,
          sex: state.sex
        }

        await this.saveUser({ _id, data })
        form.reset()
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  }
}
</script>
