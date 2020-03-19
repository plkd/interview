/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b)
    let result = nums[0] + nums[1] + nums[2]
    for (let i = 0; i < nums.length - 2; i++) {
        let L = i + 1, R = nums.length - 1
        while (L < R) {
            let sum = nums[i] + nums[L] + nums[R]
            if (Math.abs(target - sum) < Math.abs(target - result)) {
                result = sum
            }
            if (sum > target) {
                R--
            } else if( sum < target) {
                L++
            } else {
                return result
            }
        }
    }
    return result
};

console.log(threeSumClosest([-1,2,1,-4], 1))