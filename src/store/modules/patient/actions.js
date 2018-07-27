import createAction from '@/utils/createAction'

import {
  ADDRESS_DIALOG,
  CONTACT_DIALOG,
  DELETE_ADDRESS,
  SAVE_ADDRESS,
  DELETE_CONTACT,
  SAVE_CONTACT
} from './mutations-types'

const parseAction = (ctx, status) => ({ status })

const openAddressDialogAction = createAction(ADDRESS_DIALOG, parseAction)

const openContactDialogAction = createAction(CONTACT_DIALOG, parseAction)

const saveAddresAction = async () => {}

const deleteAddresAction = async () => {}

const saveContactAction = async () => {}

const deleteContactAction = async () => {}

export default {
  [ADDRESS_DIALOG]: openAddressDialogAction,
  [CONTACT_DIALOG]: openContactDialogAction,
  [DELETE_ADDRESS]: deleteAddresAction,
  [SAVE_ADDRESS]: saveAddresAction,
  [DELETE_CONTACT]: deleteContactAction,
  [SAVE_CONTACT]: saveContactAction
}
