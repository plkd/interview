var arr1 = [1,2,3]
var arr2 = [2,3,4,5]

var result = arr1.filter(x => !arr2.includes(x))

// console.log(result)
// console.log(arr1)
// console.log(arr2)

const intersection = (a, b) => {
    const map = {}
    const result = []
    for(let n of a) {
        if(map[n]) {
            map[n]++
        } else{
            map[n] = 1
        }
    }

    for(let n of b) {
        if(map[n] >0) {
            result.push(n)
            map[n]--
        }
    }
    return result
}

let a = [1,2,2,1], b = [2,2]

console.log(intersection(a, b))