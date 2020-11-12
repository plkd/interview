// failed

function Promise(resolver) {
  this._status = "pending";

  this._doneCallbacks = [];
  this._failCallbacks = [];

  resolver(resolve, reject);
}

Promise.prototype.then = function (onResolve, onReject) {
  var promise = new Promise(function () {});

  this._doneCallbacks.push(makeCallback(promise, onResolve, "resolve"));
  this._failCallbacks.push(makeCallback(promise, onReject, "reject"));

  return promise;
};

function makeCallback(promise, callback, action) {
  return function promiseCallback(value) {
    if (typeof callback === "function") {
      var x;
      try {
        x = callback(value);
      } catch (e) {
        // 如果调用callback时抛出异常，则直接用此异常对象reject当前promise
        reject(promise, e);
      }
      // 如果callback的返回值是当前promise，为避免造成死循环，需要抛出异常
      // 根据Promise+规范，此处应抛出TypeError异常
      if (x === promise) {
        var reason = new TypeError(
          "TypeError: The return value could not be the same with the promise"
        );
        reject(promise, reason);
      }
      // 如果返回值是一个Promise对象，则当返回的Promise对象被resolve/reject后，再resolve/reject当前Promise
      else if (x instanceof Promise) {
        x.then(
          function (data) {
            resolve(promise, data);
          },
          function (reason) {
            reject(promise, reason);
          }
        );
      } else {
        var then;
        (function resolveThenable(x) {
          // 如果返回的是一个Thenable对象
          if (x && (typeof x === "object" || typeof x === "function")) {
            try {
              then = x.then;
            } catch (e) {
              reject(promise, e);
              return;
            }

            if (typeof then === "function") {
              var invoked = false;

              try {
                then.call(
                  x,
                  function (y) {
                    if (invoked) {
                      return;
                    }
                    invoked = true;
                    if (y === x) {
                      throw new TypeError(
                        "TypeError: The return value could not be the same with the previous thenable object"
                      );
                    }

                    resolveThenable(y);
                  },
                  function (e) {
                    if (invoked) {
                      return;
                    }
                    invoked = true;

                    reject(promise, e);
                  }
                );
              } catch (e) {
                // 如果`resolvePromise`和`rejectPromise`方法被调用后，再抛出异常，则忽略异常
                // 否则用异常对象reject此Promise对象
                if (!invoked) {
                  reject(promise, e);
                }
              }
            } else {
              resolve(promise, x);
            }
          } else {
            resolve(promise, x);
          }
        })(x);
      }
    } else {
      action === "resolve" ? resolve(promise, value) : reject(promise, value);
    }
  };
}

function resolve(promise, data) {
  if (promise._status !== "pending") {
    return;
  }

  promise._status = "fullfilled";
  promise._value = data;

  run(promise);
}

function reject(promise, reason) {
  if (promise._status !== "pending") {
    return;
  }

  promise._status = "rejected";
  promise._value = reason;

  run(promise);
}

function run(promise) {
  if (promise._status === "pending") {
    return;
  }

  var value = promise._value;
  var callbacks =
    promise._status === "fullfilled"
      ? promise._doneCallbacks
      : promise._failCallbacks;

  setTimeout(function () {
    for (var i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i](value);
    }
  });

  promise._doneCallbacks = [];
  promise._failCallbacks = [];
}

Promise.deferred = function () {
    var result = {};
    result.promise = new Promise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });
  
    return result;
  };
  
  module.exports = Promise;