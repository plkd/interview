/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b)
    let ans = []
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue
            let L = j + 1, R = nums.length - 1
            while (L < R) {
                let sum = nums[i] + nums[j] + nums[L] + nums[R]
                if (sum == target) {
                    ans.push([nums[i], nums[j], nums[L], nums[R]])
                    while (L < R && nums[L] == nums[++L]) {

                    }
                    while (L < R && nums[R] == nums[--R]) {

                    }
                }
                if (sum < target) {
                    L++
                } else if (sum > target) {
                    R--
                }
            }
        }
    }
    return ans
};