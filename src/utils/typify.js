import compose from './compose'

/**
 * @description Retorna o tipo do valor passado
 * @param {any} value
 * @returns{string}
 */
const toString = (value) => Object.prototype.toString.call(value)

/**
 * @description Normaliza o valor passado
 * @param {string} value
 * @returns {string}
 */
const normalize = (value) => value.match(/\s\w+/g)[0]

/**
 * @description Remove os espaços e coloca o texto em caixa baixa
 * @param {string} value
 * @returns {string}
 */
const trimAndLower = (value) => value.trim().toLowerCase()

/**
 * @description Retorna o tipo do valor passado
 * @param {any} value
 * @returns {string}
 */
const typify = (value) => compose(trimAndLower, normalize, toString)(value)

export default typify
