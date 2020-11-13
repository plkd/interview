const { resolve } = require("./promise6");

var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

function MyPromise(fn) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;

  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  var self = this;

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilledCallbacks.forEach((callback) => {
        callback(value);
      });
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejectedCallbacks.forEach((callback) => {
        callback(self.reason);
      });
    }
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  let self = this;

  let promise2 = new MyPromise(function (resolve, reject) {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          var x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          var x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            var x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            var x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle"));
  }
  if (x && (typeof x === "object" || typeof x === "function")) {
    let used;
    try {
      let then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (used) return;
            used = true;
            reject(r);
          }
        );
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

MyPromise.resolve = function (param) {
  if (param instanceof MyPromise) {
    return param;
  }
  return new MyPromise((resolve, reject) => {
      if(param && param.then && typeof param.then === 'function') {
          setTimeout(param.then(resolve, reject))
      } else {
          resolve(param)
      }
  })
};

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;

var p = new Promise(function(resolve, reject) {
    console.log('resolved')
    setTimeout(() => {
        resolve(123)
    }, 1000)
})
p.then(function(res) {
    console.log('2.2', res)
})

p.then(function(res) {
    console.log('2', res)
    return res
}).then(function(r) {
    console.log('3', r)
    setTimeout(() => {
        console.log('4', r)
    }, 2000)
})

