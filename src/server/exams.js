import { db } from '@/helpers/firebase'

const examRef = () => db().collection('exams')

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

export const addExam = (user, data) => {
  return examRef().add(data)
}

export const editExam = async (ref, id, data) => {
  return examRef().doc(ref).doc(id).update(data)
}

export const deleteExam = async (ref, id) => {
  return examRef().doc(ref).doc(id).delete()
}

export default {
  getList,
  addExam,
  editExam,
  deleteExam
}
