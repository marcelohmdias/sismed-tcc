<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          <span v-t="'globals.title.attention'" />
        </v-card-title>
        <v-card-text>
          <span v-t="'globals.table.remove'" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">
            <span v-t="'globals.button.cancel'" />
          </v-btn>

          <v-btn color="green darken-1" flat="flat" @click="close">
            <span v-t="'globals.button.confirm'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <kendo-scheduler
      :class="mobileClass"
      :data-source="list"
      :date="date"
      :date-header-template="dateHeaderTemplate"
      :event-template="eventTemplate"
      :height="height"
      :messages="messages"
      :editable="editable"
      :footer="false"
      :edit="onEdit"
      :add="onAdd"
      :remove="onRemove"
      :change="onChange"
    >
      <kendo-scheduler-view :type="'day'" />
      <kendo-scheduler-view :type="'week'" />
      <kendo-scheduler-view :type="'month'" :selected="true" />
    </kendo-scheduler>
  </div>
</template>

<script>
import Typed from '@/modules/typed'
import messages from './messages'

const dateHeaderTemplate = window.kendo.template(
  '<b>#=kendo.toString(date, "d")#</b>'
)

const eventTemplate = window.kendo.template([
  '<div class="k-event-area">',
  '<div><b>Paciente:</b> #: patient_name #</div>',
  '<div><b>Médico:</b> #: doctor_name #</div>',
  '</div>'
].join(''))

export default {
  name: 'AppCalendar',
  props: {
    date: Typed.is.date.define,
    list: Typed.is.array.default([]).define
  },
  data: () => ({
    dialog: false,
    entity: null,
    editable: {
      confirmation: false,
      move: false,
      resize: false
    },
    dateHeaderTemplate,
    eventTemplate,
    messages
  }),
  computed: {
    height () {
      const size = this.$vuetify.breakpoint.height - 375
      return size < 400 ? 400 : size
    },
    mobileClass () {
      return this.$vuetify.breakpoint.mdAndDown
        ? 'mobile-calendar'
        : ''
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.$emit('remove', this.entity)
    },
    onAdd (ev) {
      ev.preventDefault()
      this.$emit('add', ev.event)
    },
    onChange (ev) {
      this.$emit('change', ev)
    },
    onEdit (ev) {
      ev.preventDefault()
      this.$emit('edit', ev.event)
    },
    onMounted (ev) {
      ev.preventDefault()
      ev.stopPropagation()
      this.$emit('open-calendar')
    },
    onRemove (ev) {
      ev.preventDefault()
      this.entity = ev.event
      this.dialog = true
    }
  },
  watch: {
    date (value) {
      window.kendo
        .jQuery(this.$el.querySelector('.k-scheduler'))
        .getKendoScheduler()
        .date(value)
    }
  },
  mounted () {
    this.btnCalendar = this.$el
      .querySelector('.k-nav-current')
      .querySelector('.k-link')

    this.btnCalendar.addEventListener('click', this.onMounted)
  },
  beforeDestroy () {
    this.btnCalendar.removeEventListener('click', this.onMounted)
  }
}
</script>

<style lang="stylus">
#app

  .k-scheduler-views
    .k-state-default
      border-bottom 1px solid #2d527c

    .k-state-selected
      border-bottom 1px solid #fff !important

  .k-event
    background-color #89c4f4
    border-color #89c4f4
    color #444
    box-shadow  0px 3px 3px -2px rgba(0,0,0,0.2),
                0px 3px 4px 0px rgba(0,0,0,0.14),
                0px 1px 8px 0px rgba(0,0,0,0.12) !important

  .k-event-area
    padding 2px

    div
      overflow-x hidden
      text-overflow ellipsis

  .k-header
    background-color #2d527c

  .k-scheduler-toolbar
    border-bottom-width 0px !important
    box-shadow  0px 3px 3px -2px rgba(0,0,0,0.2),
                0px 3px 4px 0px rgba(0,0,0,0.14),
                0px 1px 8px 0px rgba(0,0,0,0.12) !important

    .k-link,
    .k-state-default
      background-color #2d527c
      border-color #2d527c
      color #fff

    .k-scheduler
      min-height 30em

    .k-state-expanded
      border-width unse
      box-shadow  0px 3px 3px -2px rgba(0,0,0,0.2),
                  0px 3px 4px 0px rgba(0,0,0,0.14),
                  0px 1px 8px 0px rgba(0,0,0,0.12) !important

  .k-scheduler-table th
    overflow-x hidden
    text-overflow ellipsis

  .k-today > .k-link
      background-color #2d527c
      border-radius 50%
      color #fff
      padding 4px

  .mobile-calendar .k-scheduler-views
    padding-top 7px !important

@media (max-width: 1024px)
  #app

    .k-scheduler-views
      z-index 100

      .k-state-selected
        border-bottom: 1px solid #2d527c !important

</style>
