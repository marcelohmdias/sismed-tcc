/**
 * @description Cria uma função para tratamento das ações
 * @param {string} type
 * @param {Function?} cb
 * @returns {Function}
 */
const createAction = (type, cb = (ctx, payload) => payload) => {
  return (ctx, payload) => {
    ctx.commit(type, cb(ctx, payload))
  }
}

export default createAction
