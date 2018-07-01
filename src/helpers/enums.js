import Enum from 'enum'

export const address = new Enum({
  CORRESPONDENCE: 1,
  JOB: 2,
  RESIDENCE: 3
})

export const contact = new Enum({
  fixed: 1,
  mobile: 2
})

export const state = new Enum({
  AC: 1,
  AL: 2,
  AM: 3,
  AP: 4,
  BA: 5,
  CE: 6,
  DF: 7,
  ES: 8,
  GO: 9,
  MA: 10,
  MG: 11,
  MS: 12,
  MT: 13,
  PA: 14,
  PB: 15,
  PE: 16,
  PI: 17,
  PR: 18,
  RJ: 19,
  RN: 20,
  RO: 21,
  RR: 22,
  RS: 23,
  SC: 24,
  SE: 25,
  SP: 26,
  TO: 27
})

export const status = new Enum({
  inactive: 0,
  active: 1
})

export default {
  address,
  contact,
  state,
  status
}
