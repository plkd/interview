var generateParenthesis = function(n) {
    var ans = []
    backtrack(ans, [], 0, 0, n)
    return ans
}

var backtrack = function(ans, cur, open, close, max) {
    if(cur.length == max * 2) {
        ans.push(cur.join(''))
        return
    }
    if(open < max) {
        cur.push('(')
        backtrack(ans, cur, open + 1, close, max)
        cur.pop()
    }
    if(close < open) {
        cur.push(')')
        backtrack(ans, cur, open, close + 1, max)
        cur.pop()
    }
}
console.log(generateParenthesis(3))
