//  failed

const isFunction = variable => typeof variable === "function";
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    this._status = PENDING;
    this._value = undefined;
    // 添加成功回调函数队列
    this._fulfilledQueues = [];
    // 添加失败回调函数队列
    this._rejectedQueues = [];
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve(val) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = val;
  }

  _reject(err) {
    if (this._status !== PENDING) return;
    this._status = REJECTED;
    this._value = err;
  }

  then(onFulfilled, onRejected) {
    const { _value, _status } = this;

    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      let fulFilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(value);
            }
          }
        } catch (err) {
          onRejected(err);
        }
      };
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilled(res);
            }
          }
        } catch (err) {
          onRejectedNext(err);
        }
      };
      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(fulFilled);
          this._rejectedQueues.push(rejected);
          break;
        case FULFILLED:
          fulFilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }

  static deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });
  
    return result;
  };
}

module.exports = MyPromise;
