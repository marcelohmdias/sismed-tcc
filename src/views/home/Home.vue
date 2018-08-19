<template>
  <v-container class="pa-0" grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 lg3>
        <v-card>
          <v-card-text class="px-3 pt-3 pb-2">
            <div class="d-flex pb-1 card-box">
              <v-icon class="mdi mdi-account-card-details display-3" />
              <v-spacer style="width: 100%;" />
              <div>
                <div class="body-2 text-xs-right" v-text="'Pacientes'" />
                <div class="headline text-xs-right font-weight-regular" v-text="'150'" />
              </div>
            </div>
            <v-divider />
            <div class="pt-1 text-xs-left">
              <v-icon class="mdi mdi-settings subheading" />
              <span class="pl-2 body-1" v-text="'Total Cadastrados'" />
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 lg3>
        <v-card>
          <v-card-text class="px-3 pt-3 pb-2">
            <div class="d-flex pb-1 card-box">
              <v-icon class="mdi mdi-clipboard-pulse display-3" />
              <v-spacer style="width: 100%;" />
              <div>
                <div class="body-2 text-xs-right" v-text="'Atendimentos'" />
                <div class="headline text-xs-right font-weight-regular" v-text="'5'" />
              </div>
            </div>
            <v-divider />
            <div class="pt-1 text-xs-left">
              <v-icon class="mdi mdi-settings subheading" />
              <span class="pl-2 body-1" v-text="'Quantidade por Dia'" />
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 lg3>
        <v-card>
          <v-card-text class="px-3 pt-3 pb-2">
            <div class="d-flex pb-1 card-box">
              <v-icon class="mdi mdi-heart-pulse display-3" />
              <v-spacer style="width: 100%;" />
              <div>
                <div class="body-2 text-xs-right" v-text="'Exames'" />
                <div class="headline text-xs-right font-weight-regular" v-text="'9'" />
              </div>
            </div>
            <v-divider />
            <div class="pt-1 text-xs-left">
              <v-icon class="mdi mdi-settings subheading" />
              <span class="pl-2 body-1" v-text="'Total Entregues no Dia'" />
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 lg3>
        <v-card>
          <v-card-text class="px-3 pt-3 pb-2">
            <div class="d-flex pb-1 card-box">
              <v-icon class="mdi mdi-calendar-clock display-3" />
              <v-spacer style="width: 100%;" />
              <div>
                <div class="body-2 text-xs-right" v-text="'Consultas'" />
                <div class="headline text-xs-right font-weight-regular" v-text="'12'" />
              </div>
            </div>
            <v-divider />
            <div class="pt-1 text-xs-left">
              <v-icon class="mdi mdi-settings subheading" />
              <span class="pl-2 body-1" v-text="'Próximos Atendimentos'" />
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text class="pa-3">
            <app-line-charts :data="[]" :height="170" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppLineCharts from '@/components/LineCharts'

export default {
  name: 'Home',
  components: { AppLineCharts },
  head: {
    title: {
      inner: 'SISMed',
      separator: ' - ',
      complement: 'Início'
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-box
  color #2d527c
  justify-content space-between

  & .material-icons
    color #2d527c
    height 0.75em
</style>
