/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FieldValue = admin.firestore.FieldValue;

admin.initializeApp();

exports.createUser = functions.firestore
  .document('users/{user}')
  .onCreate((snap) => {
    const data = snap.data()
    const password = data.password;
    const email = data.email;

    snap.ref.update({ password: FieldValue.delete() })

    admin.auth()
      .createUser({ email, password })
      .then((userRecord) => {
        const user_id = userRecord.uid
        snap.ref.set({ user_id }, { merge: true })
      })
      .catch((error) => error)
  })
