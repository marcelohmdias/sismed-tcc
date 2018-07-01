import Field from './Field'
import Form from './Form'
import _plugin from './plugin'

export const plugin = _plugin

const Formfy = {
  install (Vue) {
    Vue.component('f-field', Field)
    Vue.component('f-form', Form)
  },
  plugin
}

export default Formfy
