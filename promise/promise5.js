// 先定义三个常量表示状态
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

function MyPromise(fn) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;

  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  var that = this;

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;
      that.onFulfilledCallbacks.forEach((callback) => {
        callback(that.value);
      });
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.onRejectedCallbacks.forEach((callback) => {
        callback(that.reason);
      });
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
      return reject(
        new TypeError("The promise and the return value are the same")
      );
    }

    if (x instanceof MyPromise) {
      x.then(function (y) {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    } else if (typeof x === "object" || typeof x === "function") {
      if (x === null) {
        return resolve(x);
      }

      try {
        var then = x.then;
      } catch (e) {
        return reject(e);
      }

      if (typeof then === "function") {
        var called = false;
        try {
          then.call(
            x,
            function (y) {
              if (called) return;
              called = true;
              resolvePromise(promise, y, resolve, reject);
            },
            function (r) {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (e) {
          if (called) return;
          reject(e);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== "function") {
    onFulfilled = function (value) {
      return value;
    };
  }
  if (typeof onRejected !== "function") {
    onRejected = function (reason) {
      // return MyPromise.reject(reason)
      throw reason;
    };
  }

  var that = this

  if (this.status === FULFILLED) {
    var promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          if (typeof onFulfilled !== "function") {
            resolve(that.value);
          } else {
            var x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    return promise2;
  }

  if (this.status === REJECTED) {
    var promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          if (typeof onFulfilled !== "function") {
            reject(that.reason);
          } else {
            var x = onRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    return promise2;
  }

  if (this.status === PENDING) {
    var promise2 = new MyPromise(function (resolve, reject) {
      that.onFulfilledCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(that.value);
            } else {
              var x = onFulfilled(that.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
      that.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (typeof onRejected !== "function") {
              reject(that.reason);
            } else {
              var x = onRejected(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    });
    return promise2;
  }
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