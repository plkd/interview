function shallowExtend() {
  var name, options, copy;
  var length = arguments.length;
  var i = 1;
  var target = arguments[0];

  for (; i < length; i++) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        var copy = options[name];
        if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

// 第二版
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error"
  .split(" ")
  .map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
  });

function type(obj) {
  // 一箭双雕
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[Object.prototype.toString.call(obj)] || "object"
    : typeof obj;
}

function isPlainObject(obj) {
  var proto, Ctor;
  // 排除掉明显不是obj的以及一些宿主对象如Window
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj);
  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return (
    typeof Ctor === "function" &&
    hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
  );
}

function isFunction(obj) {
  return type(obj) === "function";
}

function deepExtend() {
  var deep = false;
  var name, options, copy, src, copyIsArray;
  var length = arguments.length;
  var i = 1;
  var target = arguments[0] || {};
  if (typeof target == "boolean") {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }
  for (; i < length; i++) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy) continue;

        if (
          deep &&
          copy &&
          (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          target[name] = deepExtend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
