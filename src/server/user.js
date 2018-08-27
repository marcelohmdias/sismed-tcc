import { db } from '@/helpers/firebase'

const userRef = () => db().collection('users')

const parseList = list => item => {
  const doc = item.data()
  doc._id = item.ref.id
  list.push(doc)
}

export const getUser = async ({ id, uid }, fn) => {
  let user

  if (id) user = userRef().doc(id)

  if (uid) user = userRef().where('user_id', '==', uid)

  const userMute = user.onSnapshot((item) => {
    if (item.empty) return

    const user = id ? item.data() : item.docs[0].data()

    if (!user) return

    user._id = id ? item.id : item.docs[0].ref.id

    fn('user', user)
  })

  const dataEntity = await user.get()

  if (dataEntity.empty) throw Error('register_not_found')

  const userEntity = id ? dataEntity.ref : dataEntity.docs[0].ref

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
    if (user.empty) {
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

  if (data.exists) throw new Error()

  const user = await userRef().add({
    email,
    password
  })

  return user.id
}

export const saveUser = (user, data) => {
  return userRef().doc(user).update(data)
}

export const deleteUser = async (user) => {
  const data = await userRef().doc(user)

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
  deleteUser,
  // Address User Operations
  addAddress,
  editAddress,
  deleteAddress,
  // Contact User Operations
  addContact,
  editContact,
  deleteContact
}
