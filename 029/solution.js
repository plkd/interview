/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    let flag = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0)
    let result = 0
    dividend = Math.abs(dividend)
    divisor = Math.abs(divisor)
    let count = 0
    while (dividend >= divisor) {
        divisor <<= 1
        count++
    }
    while (count > 0) {
        count--
        divisor >>= 1
        if (dividend >= divisor) {
            result += 1 << count
            dividend -= divisor
        }
    }
    if (!flag) {
        result = -result
    }
    if(result <= -Math.pow(2,31) || result >= Math.pow(2, 31)) {
        return Math.pow(2, 31) - 1
    } else {
        return result
    }
};