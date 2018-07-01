import { db } from '@/helpers/firebase'

const userRef = () => db().collection('users')

const parseList = list => item => {
  const doc = item.data()
  doc._id = item.ref.id
  list.push(doc)
}

export const getUser = async ({ uid }, fn) => {
  const user = userRef().where('user_id', '==', uid)

  user.get().then((data) => {
    if (data.empty) return

    const user = data.docs[0].ref

    user.collection('addresses').onSnapshot((docs) => {
      const addresses = []
      docs.forEach(parseList(addresses))
      fn('addresses', addresses)
    })

    user.collection('contacts').onSnapshot((docs) => {
      const contacts = []
      docs.forEach(parseList(contacts))
      fn('contacts', contacts)
    })
  })

  return user.onSnapshot((item) => {
    if (item.empty) return

    const user = item.docs[0].data()
    user._id = item.docs[0].ref.id
    fn('user', user)
  })
}

export const getByid = async ({ uid, id }) => {
  let user

  if (uid) {
    user = await userRef().where('user_id', '==', uid).get()
    if (user.empty) {
      const err = new Error('auth/user-not-found')
      err.code = 'auth/user-not-found'
      throw err
    }
    user = user.docs[0]
  } else {
    user = await userRef().doc(id).get()
    if (!user.exists) {
      const err = new Error('auth/user-not-found')
      err.code = 'auth/user-not-found'
      throw err
    }
  }

  return user.data()
}

export const getList = async () => {
  const list = await userRef().get()
  return list
}

export const saveUser = (_id, data) => {
  return userRef().doc(_id).update(data)
}

export const addAddress = (user, data) => {
  return userRef().doc(user).collection('addresses').add(data)
}

export const editAddress = (user, id, data) => {
  return userRef().doc(user).collection('addresses').doc(id).update(data)
}

export const deleteAddress = (user, id) => {
  return userRef().doc(user).collection('addresses').doc(id).delete()
}

export const addContact = (user, data) => {
  return userRef().doc(user).collection('contacts').add(data)
}

export const editContact = async (user, id, data) => {
  return userRef().doc(user).collection('contacts').doc(id).update(data)
}

export const deleteContact = async (user, id) => {
  return userRef().doc(user).collection('contacts').doc(id).delete()
}

export default {
  // User Operations
  getList,
  getByid,
  getUser,
  saveUser,
  // Address User Operations
  addAddress,
  editAddress,
  deleteAddress,
  // Contact User Operations
  addContact,
  editContact,
  deleteContact
}
