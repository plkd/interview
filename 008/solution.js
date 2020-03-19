var myAtoi = function(str) {
    str = str.replace(/^\s+/)
    let numIndex = str.match(/[0-9]+/).index
    let result
    if (numIndex == 0) {
        result =  str.match(/[0-9]+/)[0]
    } 
    if(numIndex == 1 && str[0] == '-') {
        result = -str.match(/[0-9]+/)[0]
    }
    if (str.substring(0, numIndex).match(/[a-zA-Z]+/)) {
        return 0
    }
    if (result > Math.pow(2, 31) - 1) {
        return 'INT_MAX'
    } else if (result < -Math.pow(2, 31)) {
        return 'INT_MIN'
    } else {
        return result
    }
}   