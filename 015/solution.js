/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort(function(a, b) {
         return a - b
     })
     let result = [], i = 0
     if (nums == null || nums.length < 3) return result
     for(let i = 0;i<nums.length;i++) {
         if(nums[i] > 0) {
             return result
         }
         if(i>0 && nums[i] == nums[i - 1]) {
             continue
         }
         let L = i + 1
         let R = nums.length - 1;
         while(L < R) {
             if(nums[i] + nums[L] + nums[R] == 0) {
                 result.push([nums[i], nums[L], nums[R]])
                 while(nums[L] == nums[L + 1] && L < R) {
                     L++
                 }
                 while(nums[R] == nums[R - 1] && L < R) {
                     R--
                 }
                 L++
                 R--
             } else if(nums[i] + nums[L] + nums[R] < 0) {
                 L++
             } else if(nums[i] + nums[L] + nums[R] > 0) {
                 R--
             }
         }
     }
     return result
 };
 

var nums = [-1,0,1,2,-1,-4]


var twoSum = function (nums) {
    var result = []
    var hash = {}
    for (let i = 0; i < nums.length; i++) {
        if (hash[nums[i]] !== undefined) {
            result.push([nums[i], hash[nums[i]]])
        } else {
            hash[0 - nums[i]] = nums[i]
        }
    }
    return result
}