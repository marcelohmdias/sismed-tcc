import { db } from '@/helpers/firebase'

const contactRef = () => db().collection('contacts')

export const addContact = async (data) => {
  try {
    const doc = await contactRef().add(data)
    return doc.id
  } catch (err) {
    throw new Error(err)
  }
}

export default {
  addContact
}
