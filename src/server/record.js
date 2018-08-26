import { db } from '@/helpers/firebase'
import { savePatient } from './patient'
import { deleteExam, getList as getListExames } from './exams'

const recordRef = () => db().collection('records')
const examRef = () => db().collection('exams')

const parseList = list => item => {
  const doc = item.data()
  doc._id = item.ref.id
  list.push(doc)
}

export const createRecord = async (data) => {
  data.registred_at = new Date()
  data.registred_at.setHours(0)
  data.registred_at.setMinutes(0)
  data.registred_at.setSeconds(0)
  data.registred_at.setMilliseconds(0)
  data.status = 1

  const result = await recordRef().add(data)
  await savePatient(data.patient_id, { record_id: result.id })
}

export const getList = async (state) => {
  const request = Object
    .keys(state)
    .reduce((data, key) =>
      data.where(key, '==', state[key]), recordRef())

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
  try {
    const record = recordRef().doc(id)

    const recordMute = record.onSnapshot((item) => {
      if (item.empty) return

      const record = id ? item.data() : item.docs[0].data()

      if (!record) return

      record._id = id ? item.id : item.docs[0].ref.id

      fn('record', record)
    })

    const dataEntity = await record.get()

    if (!dataEntity.exists) throw Error('register_not_found')

    const examsMute = examRef()
      .where('record_id', '==', dataEntity.ref.id)
      .onSnapshot((docs) => {
        const exams = []
        docs.forEach(parseList(exams))
        fn('exams', exams)
      })

    const attendancesMute = dataEntity.ref
      .collection('attendances').onSnapshot((docs) => {
        const attendances = []
        docs.forEach(parseList(attendances))
        fn('attendances', attendances)
      })

    const medicinesMute = dataEntity.ref
      .collection('medicines').onSnapshot((docs) => {
        const medicines = []
        docs.forEach(parseList(medicines))
        fn('medicines', medicines)
      })

    return () => {
      attendancesMute()
      examsMute()
      medicinesMute()
      recordMute()
    }
  } catch (err) {
    return err
  }
}

export const deleteRecord = async (ref) => {
  const data = await recordRef().doc(ref)

  const entity = await data.get()
  const record = entity.data()

  savePatient(record.patient_id, { record_id: null })

  const exams = await getListExames({ record_id: data.id })

  exams.forEach(async ({ _id }) => {
    await deleteExam(_id)
  })

  const attendancesRef = await data.collection('attendances').get()
  attendancesRef.forEach(async (item) => {
    await item.ref.delete()
  })

  const medicinesRef = await data.collection('medicines').get()
  medicinesRef.forEach(async (item) => {
    await item.ref.delete()
  })

  return data.delete()
}

export const addAttendance = (ref, data) => {
  return recordRef()
    .doc(ref)
    .collection('attendances')
    .add(data)
}

export const editAttendance = async (ref, id, data) => {
  return recordRef()
    .doc(ref)
    .collection('attendances')
    .doc(id)
    .update(data)
}

export const deleteAttendance = async (ref, id) => {
  return recordRef()
    .doc(ref)
    .collection('attendances')
    .doc(id)
    .delete()
}

export const addMedicine = (ref, data) => {
  return recordRef()
    .doc(ref)
    .collection('medicines')
    .add(data)
}

export const editMedicine = async (ref, id, data) => {
  return recordRef()
    .doc(ref)
    .collection('medicines')
    .doc(id)
    .update(data)
}

export const deleteMedicine = async (ref, id) => {
  return recordRef()
    .doc(ref)
    .collection('medicines')
    .doc(id)
    .delete()
}

export default {
  createRecord,
  getList,
  getByid,
  deleteRecord,
  addAttendance,
  editAttendance,
  deleteAttendance,
  addMedicine,
  editMedicine,
  deleteMedicine
}
