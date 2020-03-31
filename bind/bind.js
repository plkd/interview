

Function.prototype.bind2 = function (context) {
    var self = this
    var args = Array.prototype.slice.call(arguments, 1)

    var fNOP = function() {}

    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
    }

    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}

setTimeout(() => {
    console.log('setTimeout')
}, 0)

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
    new Promise(resolve => {
        console.log('promise 4')
        resolve()
    }).then(() => {
        console.log('promise 5')
    })
})
