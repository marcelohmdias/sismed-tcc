/**
 * @description Sets the configuration for the attributes of Vue components
 * @class Typed
 */
export default class Typed {
  /**
   * @private
   * @memberof Typed
   */
  _props = {}

  /**
   * @description Returns an instance of Typed
   * @readonly
   * @static
   * @returns {Typed}
   * @memberof Typed
   */
  static get is () {
    return new Typed()
  }

  /**
   * @description Returns the property setting value
   * @readonly
   * @returns {Props}
   * @memberof Typed
   */
  get define () {
    return this._props
  }

  /**
   * @description Defines the attribute as required
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get required () {
    this._props.required = true
    return this
  }

  /**
   * @description Defines the attribute as Array
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get array () {
    return this.type(Array)
  }

  /**
   * @description Defines the attribute as Boolean
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get bool () {
    return this.type(Boolean)
  }

  /**
   * @description Defines the attribute as Function
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get func () {
    return this.type(Function)
  }

  /**
   * @description Defines the attribute as Number
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get num () {
    return this.type(Number)
  }

  /**
   * @description Defines the attribute as Object
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get obj () {
    return this.type(Object)
  }

  /**
   * @description Defines the attribute as String
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get str () {
    return this.type(String)
  }

  /**
   * @description Defines the attribute as Symbol
   * @readonly
   * @returns {Typed}
   * @memberof Typed
   */
  get sym () {
    return this.type(Symbol)
  }

  /**
   * @description Sets a default value for the attribute
   * @param {any} value
   * @returns {Typed}
   * @memberof Typed
   */
  default (value) {
    this._props.default = () => value
    return this
  }
  /**
   * @description Defines the attribute by the value passed in the function
   * @param {any} type
   * @returns {Typed}
   * @memberof Typed
   */
  type (type) {
    this._props.type = type
    return this
  }

  /**
   * @description Defines a validator for the attribute
   * @param {function} cb
   * @returns {Typed}
   * @memberof Typed
   */
  validator (cb) {
    this._props.validator = cb
    return this
  }
}

/**
 * @typedef Props
 * @property {Function} [default?]
 * @property {Boolean} [required?]
 * @property {any} type
 * @property {Function} [validator?]
 */
