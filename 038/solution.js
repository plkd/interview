/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let res = '1'
    for (let i = 1; i < n; i++) {
        let str = res
        res = ''
        for (let j = 0; j < str.length;) {
            let c = 0
            let k = j
            while(k<str.length&&str[k]==str[j]){
                k++
                c++
            }
            res += c + '' + str[j]
            j = k
        }

    }
    return res
};