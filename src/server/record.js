import { db } from '@/helpers/firebase'
import { savePatient } from './patient'

const recordRef = () => db().collection('records')

export const createRecord = async (data) => {
  data.registred_at = new Date()
  data.registred_at.setHours(0)
  data.registred_at.setMinutes(0)
  data.registred_at.setSeconds(0)
  data.registred_at.setMilliseconds(0)

  const result = await recordRef().add(data)
  await savePatient(data.patient_id, { record_id: result.id })
}

export default {
  createRecord
}
