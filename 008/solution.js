var myAtoi = function(str) {
    let result, numberIndex
    str = str.replace(/^\s+/, '')
    let numMatch = str.match(/[0-9]+/)
    if(numMatch) {
         numberIndex = numMatch.index
    } else {
        return 0
    }
    if(numberIndex === 0) result = str.match(/[0-9]+/)[0]
    if(numberIndex === 1 && str[0] == '-') result = -str.match(/[0-9]+/)[0]
    else if(numberIndex === 1 && str[0] == '+') result = str.match(/[0-9]+/)[0]
    else if(str.substring(0, numberIndex).match(/[^0-9]+/)) return 0
      if (result > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1
    } else if (result < -Math.pow(2, 31)) {
        return -Math.pow(2, 31)
    } else {
        return result
    }
};