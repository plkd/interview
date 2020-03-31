function unique(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < res.length; j++) {
            if (res[j] === array[i]) {
                break
            }
        }
        if (j === res.length) {
            res.push(array[i])
        }
    }
    return res
}

function unique1(array) {
    let res = []
    for (let i = 0, len = array.length; i < len; i++) {
        let current = array[i]
        if (res.indexOf(current) === -1) {
            res.push(array[i])
        }
    }
    return res
}

function unique2(array) {
    let res = []
    let sortedArray = array.slice().sort()
    let seen
    for (let i = 0, len = sortedArray.length; i < len; i++) {
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i]
    }
    return res
}

function unique3(array) {
    return array.filter((item, index, array) =>
        array.indexOf(item) === index
    )
}

function unique4(array) {
    return array.slice().sort().filter((item, index, array) =>
        !index || array[index - 1] !== item
    )
}

// the ultimate version
function unique5(array) {
    let obj = {}
    return array.filter((item, index, array) =>
        obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    )
}

function unique6(array) {
    return [...new Set(array)]
}

// 特殊类型比较
var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false

var array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
