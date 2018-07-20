import EventBus from '@/helpers/EventBus'

export default {
  props: [ 'breadcrumbs' ],
  mounted () {
    EventBus.$emit('load', this.breadcrumbs)
  },
  updated () {
    EventBus.$emit('load', this.breadcrumbs)
  }
}
