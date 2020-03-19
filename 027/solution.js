/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
   let i = 0;
   for(let j=0;j<nums.length;j++){
       if(nums[j] != val){
           nums[i] = nums[j]
           i++
       }
   }
   return i
};

var removeElement1 = function(nums, val) {
    let i = 0, len = nums.length;
    while(i <len) {
        if(nums[i] == val) {
            nums[i] = nums[len-1]
            len--
        } else {
            i++
        }
    }
    return n
}