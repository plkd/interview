let longestPalindrome1 = function () {
    function isPalindrome(str) {
        let len = str.length
        let middle = parseInt(len / 2)
        for (let i = 0; i < middle; i++) {
            if (str[i] != str[len - i - 1]) {
                return false
            }
        }
        return true
    }

    let ans = ''
    let max = 0
    var len = s.length
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j <= len; j++) {
            let temp = s.substring(i, j)
            if (isPalindrome(temp) && temp.length > max) {
                ans = temp
                max = temp.length
            }
        }
    }
    return ans
}

let longestPalindrome = function (s) {
    if (s == null || s.length < 1) return s
    let start = end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i)
        let len2 = expandAroundCenter(s, i, i + 1)
        let len = Math.max(len1, len2)
        if(len>end - start){
            start = i - parseInt((len - 1) /2)
            end = i + parseInt(len/2)
        }
    }
    return s.substring(start, end + 1)
}

let expandAroundCenter = function (s, left, right) {
    let L = left, R = right
    while (L >= 0 && R < s.length && s[L] == s[R]) {
        L--;
        R++
    }
    return R - L - 1;
}