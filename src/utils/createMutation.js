/**
 * @description Cria uma função de mutação padrão
 * @param {string} attr
 * @param {Function?} cb
 * @returns {Function}
 */
const createMutation = (attr, cb = (payload, attr) => payload[attr]) => {
  return (state, payload) => {
    state[attr] = cb(payload, attr)
  }
}

export default createMutation
