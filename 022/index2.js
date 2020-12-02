var generateParenthesis = function(n) {
    var result = []
    if(n <= 0) return result
    getParenthesis("", n, n, result)
    return result 
}

var getParenthesis = function(str, left, right, result) {
    if(left == 0 && right == 0){
        result.push(str)
        return
    }
    if(left == right) {
        getParenthesis(str + '(', left - 1, right, result)
    } else if(left < right) {
        if(left > 0) {
            getParenthesis(str + '(', left - 1, right, result)
        }
        getParenthesis(str + ')', left, right - 1, result)
    }
}

console.log(generateParenthesis(3))