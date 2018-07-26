<template>
  <v-card flat>
    <f-form :submit="submitHandler" name="EditUserForm">
      <app-edit-users-data-form
        slot-scope="props"
        :form="props"
        :entity="entity"
      />
    </f-form>
    <v-card-actions>
      <v-btn
        type="submit"
        form="EditUserForm"
        color="secondary"
        :disabled="formIsDisabled('EditUserForm')"
      >
        <app-icon name="content-save" request />
        <span v-t="'globals.button.save'" />
      </v-btn>
      <v-btn color="secondary" :to="{ name: 'ResearchUsers' }" >
        <app-icon name="subdirectory-arrow-left" />
        <span v-t="'globals.button.come_back'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

import AppEditUsersDataForm from './EditUsersDataForm'

import Typed from '@/modules/typed'
import FormRules from '@/mixins/FormRules'

const actions = mapActions({ saveUser: 'profile/SAVE_USER' })

export default {
  name: 'EditUserData',
  components: { AppEditUsersDataForm },
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
