<template>
  <div>
    <v-breadcrumbs class="pb-1 pl-1" v-if="items.length"  large>
      <app-icon class="breadcrumb__icon__divider" slot="divider" name="chevron-right" />
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.text"
        tag="span"
      >
        <span v-if="item.icon">
          <span class="icon-page">
            <app-icon :name="item.icon" />
          </span>
          <span class="title-page" v-t="item.text" />
        </span>
        <span class="subtitle-page" v-t="item.text" v-else />
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
import EventBus from '@/helpers/EventBus'

export default {
  name: 'AppBreadcrumbs',
  data: () => ({
    items: []
  }),
  mounted () {
    EventBus.$on('load', (items) => {
      this.items = items
    })
  }
}
</script>

<style lang="stylus" scoped>
.icon-page
  margin-right 0.5em

  & > .v-icon
    color #2d527c
    font-size 2em !important
    padding-bottom 0.25em

.breadcrumb__icon__divider,
.subtitle-page,
.title-page
  color #2d527c

.title-page
  font-size 1.25em !important
  font-weight 500
</style>
