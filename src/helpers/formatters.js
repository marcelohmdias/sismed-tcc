import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export const date = (d) => ({
  format: (f = 'DD/MM/YYYY') => dayjs(d).format(f),
  parse: () => dayjs(d).millisecond(),
  add: (value, ref) => dayjs(d).add(value, ref)
})

export default {
  date
}
