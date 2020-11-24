class Vue {
  constructor(options) {
    this._data = options.data
    observe(this._data)
  }
}

function observe(obj) {
  if(!obj || (typeof obj !== 'object')) return

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, value[key])
  })
}

function defineReactive(obj, key ,val) {
  Object.defineProperties(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val
    },
    set: function reactiveSetter(newVal) {
      if(newVal === val) return
      cb(newVal)
    }
  })
}