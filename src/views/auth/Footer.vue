<template>
  <v-footer color="primary" app dark>
    <span class="mx-auto body-1">
      <span v-html="$t('page.login.footer')" />
      <span> - </span>
      <span v-t="'globals.full_name'" />
    </span>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
