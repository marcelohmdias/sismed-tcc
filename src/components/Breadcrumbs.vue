<template>
  <div>
    <v-breadcrumbs v-if="items.length" class="pb-3 pl-1" large>
      <app-icon
        slot="divider"
        class="breadcrumb__icon__divider"
        name="chevron-right"
      />
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.text"
        tag="span"
      >
        <span v-if="item.icon">
          <span class="icon-page">
            <app-icon :name="item.icon" />
          </span>
          <span v-t="item.text" class="title-page" />
        </span>
        <span v-t="item.text" v-else class="subtitle-page" />
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
import EventBus from '@/helpers/EventBus'

const items = []

export default {
  name: 'AppBreadcrumbs',
  data: () => ({ items }),
  methods: {
    editBreadcrumbs (items) {
      this.items = items
    }
  },
  mounted () {
    EventBus.$on('load', this.editBreadcrumbs)
  }
}
</script>

<style lang="stylus" scoped>
.icon-page
  margin-right 0.5em

  & > .v-icon
    color #2d527c
    font-size 2em !important

.breadcrumb__icon__divider,
.subtitle-page,
.title-page
  color #2d527c

.title-page
  font-size 1.25em !important
  font-weight 500
  line-height 2em
</style>
