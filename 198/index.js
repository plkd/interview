/**
 * 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums.length) return 0;
  let len = nums.length;
  if (len == 1) return nums[0];
  let first = nums[0],
    second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < len; i++) {
    let temp = second;
    second = Math.max(first + nums[i], second);
    first = temp;
  }
  return second;
};
