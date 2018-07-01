<template>
  <div>RegisterUsers</div>
</template>

<script>
import PageRules from '@/mixins/PageRules'

export default {
  name: 'RegisterUsers',
  mixins: [ PageRules ],
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Cadastro de Usuário'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
