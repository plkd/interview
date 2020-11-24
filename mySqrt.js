/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  var mySqrt = function(x) {
    if(x <= 1) return x
    let start = 1, end = x, ans = 0
    while(start <= end) {
      let mid = start + parseInt((end - start) / 2)
      if(mid*mid === x) return mid
      if(mid*mid < x) {
        ans = mid
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
    return ans
  };
};

var search = function(nums, target) {
  let left = 0, right = nums.length - 1
  while(left <= right) {
    let mid = left + parseInt((right - left) / 2)
    if(nums[mid] === target) return mid
    if(nums[mid] > nums[nums.length - 1]) {
      if(nums[mid] > target && target > nums[left]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if(nums[mid] < target && target < nums[right]) {
        left = mid + 1
      } else {
        right = mid -1
      }
    }
  }
  return -1
}
