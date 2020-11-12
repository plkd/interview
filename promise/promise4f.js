//  failed

function Promise(resolver) {
  if (typeof resolver !== "function") {
    throw new TypeError("Promise resolver " + resolver + " is not a function");
  }
  if (!(this instanceof Promise)) return new Promise(resolver);

  var self = this;
  self.callbacks = [];
  self.status = "pending";

  function resolve(value) {
    setTimeout(function () {
      if (self.status !== "pending") return;
      self.status = "fullfilled";
      self.data = value;

      for (var i = 0, len = self.callbacks.length; i < len; i++) {
        self.callbacks[i].onResolved(value);
      }
    });
  }

  function reject(reason) {
    setTimeout(function () {
      if (self.status !== "pending") return;
      self.status = "rejected";
      self.data = reason;

      for (var i = 0, len = self.callbacks.length; i < len; i++) {
        self.callbacks[i].onRejected(value);
      }
    });
  }

  try {
    resolver(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise!"));
  }

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function rs(y) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return resolvePromise(promise, y, resolve, reject);
          },
          function rj(r) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        return resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    return resolve(x);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (v) {
          return v;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (e) {
          throw e;
        };

  var self = this;
  var promise2;

  if (self.status === "fullfilled") {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onResolved(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          return reject(e);
        }
      });
    }));
  }

  if (self.status === "rejected") {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onRejected(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          return reject(e);
        }
      });
    }));
  }

  if (self.status === "pending") {
    return (promise2 = new Promise(function (resolve, reject) {
      self.callbacks.push({
        onResolved: function (value) {
          try {
            var x = onResolved(value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            return reject(e);
          }
        },
        onRejected: function (reason) {
          try {
            var x = onRejected(reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            return reject(e);
          }
        },
      });
    }));
  }
};

Promise.prototype.valueOf = function () {
  return this.data;
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.finally = function (fn) {
  return this.then(
    function (v) {
      setTimeout(fn);
      return v;
    },
    function (r) {
      setTimeout(fn);
      throw r;
    }
  );
};

Promise.prototype.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(
          function (value) {
            resolvedCounter++;
            resolvedValues[i] = value;
            if (resolvedCounter == promiseNum) {
              return resolve(resolvedValues);
            }
          },
          function (reason) {
            return reject(reason);
          }
        );
      })(i);
    }
  });
};

Promise.prototype.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          return resolve(value);
        },
        function (reason) {
          reject(reason);
        }
      );
    }
  });
};
Promise.resolve = function (value) {
  var promise = new Promise(function (resolve, reject) {
    resolvePromise(promise, value, resolve, reject);
  });
  return promise;
};

Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  });
};

Promise.deferred = function () {
  var result = {};
  result.promise = new Promise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = Promise;
