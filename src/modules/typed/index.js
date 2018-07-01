/// <reference path="./index.d.ts" />

const types = {
  array: Array,
  bool: Boolean,
  date: Date,
  func: Function,
  num: Number,
  obj: Object,
  str: String,
  sym: Symbol
}

class Typed {
  _props = {}

  static get is () {
    return new Typed()
  }

  get define () {
    return this._props
  }

  get required () {
    this._props.required = true
    return this
  }

  default (value) {
    this._props.default = () => value
    return this
  }

  type (type) {
    this._props.type = type
    return this
  }

  validator (cb) {
    this._props.validator = cb
    return this
  }
}

Object.keys(types).forEach(label => {
  Object.defineProperty(Typed.prototype, label, {
    get () {
      return this.type(types[label])
    }
  })
})

export default Typed
