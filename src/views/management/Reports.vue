<template>
  <div>Reports</div>
</template>

<script>
import PageRules from '@/mixins/PageRules'

export default {
  name: 'Reports',
  mixins: [ PageRules ],
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Consulta de Relatórios'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
