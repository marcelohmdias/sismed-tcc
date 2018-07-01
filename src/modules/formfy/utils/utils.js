const composeValidators = (fns, ...args) => {
  return fns.reduce((err, fns) => err || fns(...args), undefined)
}

export const createFieldValidator = (validators) => {
  return () => (...args) => composeValidators(validators, ...args)
}

export const createFormValidator = (validators) => {
  return (...args) => composeValidators(validators, ...args)
}

export const createSlot = (slot) => Array.isArray(slot) ? slot : [slot]

export const createSubscribe = (prev, curr) => ({ ...prev, [curr]: true })

/* eslint-disable no-self-compare  */
export const isEmpty = (value) =>
  value === undefined || value === null || value === '' || value !== value

export default {
  createFieldValidator,
  createFormValidator,
  createSlot,
  createSubscribe,
  isEmpty
}
