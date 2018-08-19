<template>
  <v-card class="elevation-12 mt-5">
    <v-toolbar color="secondary" dark dense>
      <v-toolbar-title v-t="'page.login.form_title'" />
    </v-toolbar>
    <v-card-text>
      <f-form :submit="handleSubmit" name="LoginForm">
        <app-login-form slot-scope="props" :form="props" />
      </f-form>
      <btn-recovery class="btn__recovery" @openDialog="dialog(true)" />
    </v-card-text>
    <v-card-actions>
      <v-layout>
        <v-flex xs12 sm3 offset-sm9>
          <v-btn
            :disabled="isDisabled"
            type="submit"
            form="LoginForm"
            color="secondary"
            block
          >
            <app-icon name="login-variant" request />
            <span v-t="'globals.button.signin'" />
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import FormRules from '@/mixins/FormRules'
import Typed from '@/modules/typed'

import AppLoginForm from './LoginForm'
import BtnRecovery from './BtnRecovery'

const actions = mapActions({ signinUser: 'auth/SIGNIN_USER' })

const getters = mapGetters({ isLoading: 'isLoading' })

export default {
  name: 'AppLogin',
  components: { AppLoginForm, BtnRecovery },
  mixins: [ FormRules ],
  props: {
    dialog: Typed.is.func.required.define
  },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Login'
    }
  },
  computed: {
    ...getters,
    isDisabled () {
      return this.formIsDisabled('LoginForm')
    }
  },
  methods: {
    ...actions,
    async handleSubmit ({ email, password }) {
      try {
        this.$Progress.start()
        await this.signinUser({ email, password })
        this.$acl.change('attendant')
        setTimeout(() => this.$router.push({ name: 'Home' }), 300)
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
.v-toolbar__content
  height 55px

.v-card__actions .v-btn
  margin-left 0
</style>
