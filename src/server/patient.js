import { db } from '@/helpers/firebase'

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

export const getByid = async (id, fn) => {
  const patient = patientRef().doc(id)

  const patientMute = patient.onSnapshot((item) => {
    if (item.empty) return

    const patient = id ? item.data() : item.docs[0].data()
    patient._id = id ? item.id : item.docs[0].ref.id

    fn('patient', patient)
  })

  const dataEntity = await patient.get()

  if (dataEntity.empty) return

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

export const createPatient = (data) => {
  return patientRef().add(data)
}

export const savePatient = (ref, data) => {
  return patientRef().doc(ref).update(data)
}

export const deletePatient = async (ref) => {
  const data = await patientRef().doc(ref)

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

export const addAddress = (id, data) => {
  return patientRef()
    .doc(id)
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
