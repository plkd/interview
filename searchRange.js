/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let start = searchStart(nums, target)
  let end = searchEnd(nums,target)
  function searchStart(nums, target) {
    let left = 0,right = nums.length - 1
    while(left <= right) {
      let mid = left + parseInt((right - left) / 2)
      if(nums[mid] === target &&(mid - 1 < 0 || nums[mid - 1] !== target)) {
        return mid
      } else if (nums[mid] >= target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return -1
  }
  function searchEnd(nums, target) {
    let left = 0,right = nums.length - 1
    while(left <= right) {
      let mid = left + parseInt((right - left) / 2)
      if(nums[mid] === target &&(mid + 1> nums.length -1 || nums[mid + 1] !== target)) {
        return mid
      } else if(nums[mid] <= target) {
        left = mid + 1
      } else {
        right = mid -1
      }
    }
    return -1
  }
  return [start, end]
};

var  nums = [5,7,7,8,8,10], target = 6

console.log(searchRange(nums, target))