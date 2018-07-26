<template>
  <v-card class="elevation-12 mt-5">
    <v-toolbar color="secondary" dark dense>
      <v-toolbar-title v-t="'page.login.form_title_password'" />
    </v-toolbar>
    <v-card-text>
      <f-form :submit="handleSubmit" name="LoginForm">
        <app-password-display-form slot-scope="props" :form="props" />
      </f-form>
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
            <app-icon name="content-save" request />
            <span v-t="'globals.button.save'" />
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import FormRules from '@/mixins/FormRules'

import AppPasswordDisplayForm from './PasswordDisplayForm'

const actions = mapActions({ resetPassword: 'auth/RESET_PASSWORD' })

const getters = mapGetters({ isLoading: 'isLoading' })

export default {
  name: 'AppPasswordDisplay',
  components: { AppPasswordDisplayForm },
  mixins: [ FormRules ],
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Troca Senha'
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
    async handleSubmit ({ password }) {
      try {
        this.$Progress.start()
        const { mode, oobCode } = this.$route.query

        if (mode !== 'resetPassword') return

        await this.resetPassword({ oobCode, password })
        setTimeout(() => this.$router.push({ name: 'Auth' }), 300)
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
