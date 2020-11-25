const { reject } = require("./_promise1");

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(fn) {
    let self = this;

    self.status = PENDING;
    self.value = null;
    self.reason = null;

    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
      setTimeout(() => {
        if (self.status === PENDING) {
          self.value = value;
          self.status = FULFILLED;
          self.onFulfilledCallbacks.map((callback) => {
            callback(value);
          });
        }
      });
    }

    function reject(reason) {
      setTimeout(() => {
        if (self.status === PENDING) {
          self.reason = reason;
          self.status = REJECTED;
          self.onRejectedCallbacks.map((callback) => {
            callback(reason);
          });
        }
      });
    }

    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r) => {
            throw r;
          };

    let self = this;
    function resolvePromise(promise2, x, resolve, reject) {
      if (promis2 === x) {
        return reject(new TypeError("chain cycle"));
      }

      if (x instanceof MyPromise) {
        if (x.status === PENDING) {
          x.then((v) => resolvePromise(promise2, v, resolve, reject), reject);
        } else {
          x.then(resolve, reject);
        }
      } else if (x && (typeof x === "object" || typeof x === "function")) {
        let used;

        try {
          then = x.then;

          if (typeof then === "function") {
            then.call(
              x,
              (y) => {
                if (used) return;
                used = true;
                return resolvePromise(promise2, y, resolve, reject);
              },
              (r) => {
                if (used) return;
                used = true;
                return reject(r);
              }
            );
          } else {
            // if (used) return;
            // used = true;
            return resolve(x);
          }
        } catch (e) {
          if (used) return;
          used = true;
          return reject(e);
        }
      } else {
        return resolve(x);
      }
    }

    let promise2 = new MyPromise((resolve, reject) => {
      if (self.status === FULFILLED) {
        setTimeout(() => {
          try {
            x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          try {
            x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });

        self.onRejectedCallbacks.push(() => {
          try {
            x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });

    return promise2;
  }

  static deferred() {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
}

if (module && "exports" in module) {
  module.exports = MyPromise;
}
