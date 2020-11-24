let findPeakElement = function(nums) {
  let left = 1, right = nums.length - 2
  while(left < right) {
    let mid = left + parseInt((right - left) / 2)
    if(nums[mid] > nums[mid -1] && nums[mid] < nums[mid + 1]) return mid
    if(nums[mid] > nums[mid - 1] && nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else if(nums[mid] < nums[mid -1]) {

    }
  }
}