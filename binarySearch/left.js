function leftBound(nums, target) {
  let left = 0,
    right = nums.length - 1

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] === target) {
      right = mid - 1;
    }
    // console.log(mid)
  }

  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
}

var arr = [1,2,2,3,3,3,2,4]

console.log(leftBound(arr, 3))