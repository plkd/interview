let convert = function(s, numRows){
    let lastSet = s.length % (numRows + numRows - 2)
    let addition = lastSet > 4 ? lastSet - 4 + 1 : 1
    let column = parseInt(s.length / (numRows + numRows - 2)) + addition
    let arr = []
    let sArr = s.split('')
    let j = 0
    for (let i=0;i<column;i++) {
        arr[i] = []
        if (j > 0) {
            j--
            while(j > 0){
                j--
                arr[i][j] = sArr.shift()
                i++
                arr[i] = []
            }
        } else {
            while (j < numRows) {
                arr[i][j] = sArr.shift()
                j++
            }
        }
    }
    console.log(arr)
}

convert("LEETCODEISHIRING", 4)

