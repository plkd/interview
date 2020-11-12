//  failed
class MyPromise {
  constructor(executor) {
    this.status = "pending";

    this.value = undefined;

    this.resolveArr = [];
    this.rejectArr = [];

    let change = (status, value) => {
      if (this.status !== "pending") return;
      this.status = status;
      this.value = value;

      let fnArr = status === "resolved" ? this.resolveArr : this.rejectArr;

      fnArr.forEach((item) => {
        if (typeof item !== "function") return;
        item(this.value);
      });
    };

    let resolve = (result) => {
      change("resolved", result);
    };

    let reject = (reason) => {
      change("rejected", reason);
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(resolveFn, rejectFn) {
    if (typeof resolveFn !== "function") {
      resolveFn = (result) => {
        return result;
      };
    }

    if (typeof rejectFn !== "function") {
      rejectFn = (reason) => {
        return MyPromise.reject(reason);
      };
    }

    return new MyPromise((resolve, reject) => {
      this.resolveArr.push((result) => {
        try {
          let x = resolveFn(result);

          if (x instanceof MyPromise) {
            x.then(resolve, reject);
            return;
          }

          resolve(x);
        } catch (err) {
          reject(err);
        }
      });

      this.rejectArrc.push((reason) => {
        try {
          let x = rejectFn(reason);

          if (x instanceof MyPromise) {
            x.then(resolve, reject);
            return;
          }

          resolve(x);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  catch(rejectFn) {
    return this.then(null, rejectFn);
  }

  finally(finallyFn) {
    let P = this.constructor;
    return this.then(
      (value) => P.resolve(finallyFn()).then(() => value),
      (reason) => P.reject(finallyFn()).then(() => reason)
    );
  }

  static resolve(result) {
    return new MyPromise((resolve) => {
      resolve(result);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  static all(promiseList) {
    return MyPromise((resolve, reject) => {
      let index = 0,
        results = [];

      for (let i = 0; i < promiseList.length; i++) {
        let item = promiseList[i];

        if (!(item instanceof MyPromise)) return;

        item
          .then((result) => {
            index++;
            results[i] = result;
            if (index === promiseList) {
              resolve(results);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
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
