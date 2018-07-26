import { auth } from '@/helpers/firebase'

export const current = () => auth().currentUser

export const onAuthChanged = (callback) => auth().onAuthStateChanged(callback)

export const recoverPassword = (email) => auth().sendPasswordResetEmail(email)

export const signin = async (email, password) => {
  const user = await auth().signInWithEmailAndPassword(email, password)
  return user
}

export const signout = async () => {
  await auth().signOut()
  return true
}

export const changePassword = async (oldPassword, newPassword) => {
  await signin(current().email, oldPassword)
  return current().updatePassword(newPassword)
}

export const requestChangePassword = (email) => {
  return auth().sendPasswordResetEmail(email)
}

export const passwordReset = async (oobCode, password) => {
  await auth().verifyPasswordResetCode(oobCode)
  return auth().confirmPasswordReset(oobCode, password)
}
