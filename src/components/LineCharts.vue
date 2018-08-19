<script>
import { Line } from 'vue-chartjs'

import Typed from '@/modules/typed'

export default {
  name: 'LineCharts',
  extends: Line,
  props: {
    data: Typed.is.array.define
  },
  data: () => ({
    options: {
      responsive: true
    }
  }),
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
