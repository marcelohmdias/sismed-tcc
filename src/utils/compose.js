/**
 * @description Método utilitário para composição
 * @param {Function[]} fns  Lista de funções
 * @returns {Function}
 */
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

export default compose
