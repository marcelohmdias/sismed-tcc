import { db } from '@/helpers/firebase'

const doctorsRef = () => db().collection('doctors')

const parseList = list => item => {
  const doc = item.data()
  doc._id = item.ref.id
  list.push(doc)
}

export const getList = async (state) => {
  const request = Object
    .keys(state)
    .reduce((data, key) =>
      data.where(key, '==', state[key]), doctorsRef())

  const list = await request.get()
  const doctorList = []

  list.forEach((doc) => {
    const doctor = doc.data()
    doctorList.push({ ...doctor, _id: doc.id })
  })

  return doctorList
}

export const getByid = async (id, fn) => {
  const doctor = doctorsRef().doc(id)

  const doctorMute = doctor.onSnapshot((item) => {
    if (item.empty) return

    const doctor = item.data()
    doctor._id = item.id

    fn('doctor', doctor)
  })

  const dataEntity = await doctor.get()

  if (dataEntity.empty) return

  const specialityMute = dataEntity.ref
    .collection('specialities').onSnapshot((docs) => {
      const speciality = []
      docs.forEach(parseList(speciality))
      fn('specialities', speciality)
    })

  return () => {
    specialityMute()
    doctorMute()
  }
}

export const createDoctor = async (data) => {
  const result = await doctorsRef().add(data)
  return result.id
}

export const saveDoctor = async (id, data) => {
  const result = await doctorsRef().doc(id).update(data)
  return result.id
}

export const deleteDoctor = async (id) => {
  const data = await doctorsRef().doc(id)

  // TODO: Validar se existem consultas marcadas

  const specialitiesRef = await data.collection('specialities').get()
  specialitiesRef.forEach(async (item) => {
    await item.ref.delete()
  })

  return data.delete()
}

export const addSpeciality = (ref, data) => {
  return doctorsRef()
    .doc(ref)
    .collection('specialities')
    .add(data)
}

export const editSpeciality = async (ref, id, data) => {
  return doctorsRef()
    .doc(ref)
    .collection('specialities')
    .doc(id)
    .update(data)
}

export const deleteSpeciality = async (ref, id) => {
  return doctorsRef()
    .doc(ref)
    .collection('specialities')
    .doc(id)
    .delete()
}

export default {
  getList,
  getByid,
  createDoctor,
  saveDoctor,
  deleteDoctor,
  addSpeciality,
  editSpeciality,
  deleteSpeciality
}
