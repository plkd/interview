var PENDING = "pending";
var FULFILLED = "fullfilled";
var REJECTED = "rejected";

function MyPromise(fn) {
  this.value = null;
  this.reason = null;
  this.status = PENDING;

  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  let self = this;

  function resolve(value) {
    if (self.status === PENDING) {
      self.value = value;
      self.status = FULFILLED;
      self.onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.reason = reason;
      self.status = REJECTED;
      self.onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== "function") {
    onFulfilled = (value) => value;
  }
  if (typeof onRejected !== "function") {
    onRejected = (reason) => {
      throw reason;
    };
  }

  var self = this;

  var promise2 = new MyPromise(function (resolve, reject) {
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
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle"));
  }

  if (x && (typeof x === "object" || typeof x === "function")) {
    var used;
    try {
      var then = x.then;

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

  return promise2;
}

MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value;
  }

  return new MyPromise(function (resolve) {
    resolve(value);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise(function (resolve, reject) {
    reject(reason);
  });
};

MyPromise.all = function (promiseList) {
  var res = new MyPromise(function (resolve, reject) {
    var count = 0;
    var result = [];
    var length = promiseList.length;

    if (length === 0) return resolve(result);

    promiseList.forEach(function (promise, index) {
      MyPromise.resolve(promise).then(
        function (value) {
          count++;
          result[index] = value;
          if (count === length) {
            resolve(result);
          }
        },
        function (reason) {
          reject(reason);
        }
      );
    });
  });
  return res;
};

MyPromise.race = function (promiseList) {
  var res = new MyPromise(function (resolve, reject) {
    var length = promiseList;

    if (length === 0) {
      return resolve(0);
    } else {
      for (let i = 0; i < length; i++) {
        MyPromise.resolve(promiseList[i]).then(
          function (value) {
            return resolve(value);
          },
          function (reason) {
            return reject(reason);
          }
        );
      }
    }
  });
  return res;
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
