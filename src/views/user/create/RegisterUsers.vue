<template>
  <v-card>
    <v-container grid-list-lg>
      <f-form :submit="submitHandler" name="RegisterUsersForm">
        <app-register-users-form slot-scope="props" :form="props" />
      </f-form>
    </v-container>
    <v-card-actions>
      <v-container class="pt-0" grid-list-lg>
        <v-layout>
          <v-flex xs12 sm4 md3 lg2>
            <v-btn
              color="secondary"
              type="submit"
              form="RegisterUsersForm"
              :disabled="formIsDisabled('RegisterUsersForm')"
              block
            >
              <app-icon name="content-save" request />
              <span v-t="'globals.button.save'" />
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

import PageRules from '@/mixins/PageRules'

import AppRegisterUsersForm from './RegisterUsersForm'
import FormRules from '@/mixins/FormRules'

const actions = mapActions({
  saveUser: 'users/CREATE_USER',
  resetUserEntity: 'users/RESET_USER'
})

export default {
  name: 'RegisterUsers',
  mixins: [ FormRules, PageRules ],
  components: { AppRegisterUsersForm },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Cadastro de Usuário'
    }
  },
  methods: {
    ...actions,
    async submitHandler (state, form) {
      try {
        this.$Progress.start()

        const data = {
          email: state.email,
          password: state.password
        }

        const user = await this.saveUser({ data })

        setTimeout(() => {
          this.$router.push({
            name: 'EditUsers',
            params: { id: user }
          })
        }, 300)
      } catch (err) {
        this.$Progress.fail()
      } finally {
        this.$Progress.finish()
      }
    }
  },
  created () {
    this.resetUserEntity()
  }
}
</script>
