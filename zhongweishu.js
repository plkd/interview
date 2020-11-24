/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let mid = Math.floor((nums1.length + nums2.length - 1) / 2), arr = [];
  let flag = mid % 2  //  true
  // mid = flag === 0 ? mid + 1 : mid

  let index1=0,index2 = 0;

  while(index1 + index2 <= mid) {
    if(nums1[index1] <= nums2[index2]) {
      arr.push(nums1[index1])
      index1++
    } else {
      arr.push(nums2[index2])
      index2++
    }
  }

  if(flag) {
    return arr[arr.length - 1].toFixed(1)
  } else {
    return ((arr[arr.length -1] + arr[arr.length -2]) / 2).toFixed(1)
  }

};

var nums1 = [1, 2],  nums2 = [3, 4]

findMedianSortedArrays(nums1, nums2)