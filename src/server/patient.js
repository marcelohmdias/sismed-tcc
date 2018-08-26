import { db } from '@/helpers/firebase'

import { deleteRecord } from './record'

const patientRef = () => db().collection('patients')

const parseList = list => item => {
  const doc = item.data()
  doc._id = item.ref.id
  list.push(doc)
}

export const getList = async (state) => {
  const request = Object
    .keys(state)
    .reduce((data, key) =>
      data.where(key, '==', state[key]), patientRef())

  const list = await request.get()
  const patientList = []

  list.forEach((doc) => {
    const patient = doc.data()
    patientList.push({ ...patient,
      _id: doc.id
    })
  })

  return patientList
}

export const selectedList = async () => {
  const list = await getList({})
  return list.map((item) => ({
    key: item._id,
    value: item.full_name
  }))
}

export const getByid = async (id, fn) => {
  const patient = patientRef().doc(id)

  const patientMute = patient.onSnapshot((item) => {
    if (item.empty) return

    const patient = id ? item.data() : item.docs[0].data()

    if (!patient) return

    patient._id = id ? item.id : item.docs[0].ref.id

    fn('patient', patient)
  })

  const dataEntity = await patient.get()

  if (!dataEntity.exists) throw Error('register_not_found')

  const addressesMute = dataEntity.ref
    .collection('addresses').onSnapshot((docs) => {
      const addresses = []
      docs.forEach(parseList(addresses))
      fn('addresses', addresses)
    })

  const contactsMute = dataEntity.ref
    .collection('contacts').onSnapshot((docs) => {
      const contacts = []
      docs.forEach(parseList(contacts))
      fn('contacts', contacts)
    })

  return () => {
    addressesMute()
    contactsMute()
    patientMute()
  }
}

export const createPatient = async (data) => {
  data.registred_at = new Date()
  data.registred_at.setHours(0)
  data.registred_at.setMinutes(0)
  data.registred_at.setSeconds(0)
  data.registred_at.setMilliseconds(0)
  const result = await patientRef().add(data)
  return result.id
}

export const savePatient = async (ref, data) => {
  return patientRef().doc(ref).update(data)
}

export const deletePatient = async (ref) => {
  const data = await patientRef().doc(ref)
  const entity = await data.get()

  deleteRecord(entity.data().record_id)

  const addressesRef = await data.collection('addresses').get()
  addressesRef.forEach(async (item) => {
    await item.ref.delete()
  })

  const contactsRef = await data.collection('contacts').get()
  contactsRef.forEach(async (item) => {
    await item.ref.delete()
  })

  return data.delete()
}

export const addAddress = (ref, data) => {
  return patientRef()
    .doc(ref)
    .collection('addresses')
    .add(data)
}

export const editAddress = (ref, id, data) => {
  return patientRef()
    .doc(ref)
    .collection('addresses')
    .doc(id)
    .update(data)
}

export const deleteAddress = (ref, id) => {
  return patientRef()
    .doc(ref)
    .collection('addresses')
    .doc(id)
    .delete()
}

export const addContact = (ref, data) => {
  return patientRef()
    .doc(ref)
    .collection('contacts')
    .add(data)
}

export const editContact = async (ref, id, data) => {
  return patientRef()
    .doc(ref)
    .collection('contacts')
    .doc(id)
    .update(data)
}

export const deleteContact = async (ref, id) => {
  return patientRef()
    .doc(ref)
    .collection('contacts')
    .doc(id)
    .delete()
}

export default {
  getList,
  selectedList,
  getByid,
  createPatient,
  savePatient,
  deletePatient,
  addAddress,
  editAddress,
  deleteAddress,
  addContact,
  editContact,
  deleteContact
}
