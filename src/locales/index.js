import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ptBR from './i18n/pt-br.js'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR
  }
})
