/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (!needle) return 0
    let i = 0, start = 0
    for (let j = 0; j < haystack.length; j++) {
        if(haystack[j] == needle[i]){
            start = j
            if(i < needle.length) {
                ++i
            } 
            if(i == needle.length) {
                return start - needle.length + 1
            }
        } else {
            j = j - i
            i = 0
        }
    }
    return -1
};