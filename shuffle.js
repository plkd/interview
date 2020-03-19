var arr = [1,2,3,4,5,6,7,8,9]

function shuffle(arr) {
    let len = arr.length
    for(let i=0;i<len -1;i++) {
        let int = parseInt(Math.random() * (len - i)) + i
        swap(arr, i, int)
    }
    return arr
}

function swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

console.log(shuffle(arr))