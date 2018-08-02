import Vue from 'vue'
import VueHead from 'vue-head'
import VueProgressBar from 'vue-progressbar'
import Vuetify from 'vuetify'
import VueSnotify from 'vue-snotify'
import Formfy from './modules/formfy'
import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper'

// Configs
import notify from './env/notify'
import progress from './env/progress'
import theme from './env/theme'

// Components
import Breadcrumbs from './components/Breadcrumbs.vue'
import DataTable from './components/DataTable.vue'
import DatePicker from './components/DatePicker.vue'
import Icon from './components/Icon.vue'
import Select from './components/Select.vue'

// Plugins
Vue.use(Formfy)
Vue.use(VueHead)
Vue.use(VueProgressBar, progress)
Vue.use(VueSnotify, notify)
Vue.use(Vuetify, theme)
Vue.use(SchedulerInstaller)

// Components
Vue.component('app-breadcrumbs', Breadcrumbs)
Vue.component('app-data-table', DataTable)
Vue.component('app-date-picker', DatePicker)
Vue.component('app-icon', Icon)
Vue.component('app-select', Select)
