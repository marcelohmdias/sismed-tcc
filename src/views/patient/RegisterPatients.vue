<template>
  <div>RegisterPatients</div>
</template>

<script>
import PageRules from '@/mixins/PageRules'

export default {
  name: 'AppRegisterPatient',
  mixins: [ PageRules ],
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Cadastro de Paciente'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
