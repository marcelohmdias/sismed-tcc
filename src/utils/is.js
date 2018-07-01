import typify from './typify'

/**
 * @description Testa se o valor passado é do tipo definido
 * @param {any} value Valor de teste
 * @param {string} type Tipo esperado
 * @returns {boolean}
 */
const is = (value, type) => new RegExp(`${type}`, 'i').test(typify(value))

export default is
