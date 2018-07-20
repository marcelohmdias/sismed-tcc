import { db } from '@/helpers/firebase'

const userRef = () => db().collection('users')

const parseList = list => item => {
  const doc = item.data()
  doc._id = item.ref.id
  list.push(doc)
}

export const getUser = async ({ uid }, fn) => {
  const user = userRef().where('user_id', '==', uid)

  const userMute = user.onSnapshot((item) => {
    if (item.empty) return

    const user = item.docs[0].data()
    user._id = item.docs[0].ref.id
    fn('user', user)
  })

  const dataEntity = await user.get()

  if (dataEntity.empty) return

  const userEntity = dataEntity.docs[0].ref

  const addressesMute = userEntity.collection('addresses').onSnapshot((docs) => {
    const addresses = []
    docs.forEach(parseList(addresses))
    fn('addresses', addresses)
  })

  const contactsMute = userEntity.collection('contacts').onSnapshot((docs) => {
    const contacts = []
    docs.forEach(parseList(contacts))
    fn('contacts', contacts)
  })

  return () => {
    addressesMute()
    contactsMute()
    userMute()
  }
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

export const getList = async (state) => {
  const request = Object
    .keys(state)
    .reduce((data, key) =>
      data.where(key, '==', state[key]), userRef())

  const list = await request.get()
  const userList = []

  list.forEach((doc) => {
    const user = doc.data()
    userList.push({ ...user, _id: doc.id })
  })

  return userList
}

export const createUser = async ({ email, password }) => {
  const data = await userRef().where('email', '==', email).get()

  if (!data.empty) throw new Error()

  const user = await userRef().add({
    email,
    password,
    'status': 1,
    'permission_type': 1
  })

  return user.id
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
  createUser,
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
