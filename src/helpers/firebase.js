import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import config from '@/env/server'

export const connect = () => firebase.initializeApp(config)

export const auth = () => firebase.auth()

export const db = () => {
  const db = firebase.firestore()
  db.settings({
    timestampsInSnapshots: true
  })
  return db
}

export default { auth, connect, db }
