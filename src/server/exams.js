import { db } from '@/helpers/firebase'

const examRef = () => db().collection('exams')
const examTypeRef = () => db().collection('exams_types')

export const getList = async (state) => {
  const request = Object
    .keys(state)
    .reduce((data, key) =>
      data.where(key, '==', state[key]), examRef())

  const list = await request.get()
  const examList = []

  list.forEach((doc) => {
    const exam = doc.data()
    examList.push({ ...exam,
      _id: doc.id
    })
  })

  return examList
}

export const selectedList = async () => {
  const list = await examTypeRef().get()

  const exams = []

  list.forEach((item) => {
    const exam = item.data()
    exams.push({
      key: item.id,
      value: exam.name
    })
  })

  return exams.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })
}

export const addExam = (data) => {
  return examRef().add(data)
}

export const editExam = async (ref, data) => {
  return examRef().doc(ref).update(data)
}

export const deleteExam = async (ref) => {
  return examRef().doc(ref).delete()
}

export default {
  getList,
  addExam,
  editExam,
  deleteExam,
  selectedList
}
