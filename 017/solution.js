/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const phone = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }

    let result = []

    function backtrack(combination, next) {
        if(next.length == 0) {
            result.push(combination)
        } else {
            let digit = next.substring(0, 1)
            let letters = phone[digit]
            for(let i=0;i<letters.length;i++) {
                let letter = letters[i]
                backtrack(combination + letter, next.substring(1))
            }
        }
    }

    if(digits.length != 0) {
        backtrack('', digits)
    } 
    return result
};