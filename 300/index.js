// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let arr = [];
  while (nums.length) {
    let last = nums.pop();
    if (arr.length && !arr.includes(last)) {
        let index = binarySearch(arr, last)
        arr.splice(index, 0, last)
    }
    if(!arr.length) {
        arr.push(last);
    }
  }
};

function binarySearch(arr, value) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (value === arr[mid]) {
      return mid;
    } else if (value < arr[mid]) {
      right = mid - 1;
    } else if (value > arr[mid]) {
      left = mid + 1;
    }
  }
  return left
}
