import { db } from '@/helpers/firebase'

const scheduleRef = () => db().collection('schedule')

export const getList = async (state) => {
  const request = Object
    .keys(state)
    .reduce((data, key) =>
      data.where(key, '==', state[key]), scheduleRef())

  const list = await request.get()
  const scheduleList = []

  list.forEach((doc) => {
    const schedule = doc.data()
    scheduleList.push({
      ...schedule,
      _id: doc.id
    })
  })

  return scheduleList
}

export const addSchedule = async (data) => {
  const list = await getList({
    doctor_id: data.doctor_id,
    start: data.start
  })

  if (list.length) return Error('has_registration')

  return scheduleRef().add(data)
}

export const editSchedule = async (ref, data) => {
  return scheduleRef().doc(ref).update(data)
}

export const deleteSchedule = async (ref) => {
  return scheduleRef().doc(ref).delete()
}

export default {
  getList,
  addSchedule,
  editSchedule,
  deleteSchedule
}
