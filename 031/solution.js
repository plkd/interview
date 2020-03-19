/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {

    // let len = nums.length -1
    // while(len >0 && nums[len] < nums[len -1]){
    //     len--
    //     if(len ==0) {
    //         return nums.sort((a, b)=> b-a)
    //     }
    // }

    for (let i = nums.length - 1; i >= 0; i--) {
        // if (i == 0) {
        //     return nums.sort((a, b) => a - b)
        // }
        if (nums[i] > nums[i - 1]) {
            for (let j = nums.length; j < i -1; j--) {
                if (nums[i - 1] > nums[j]) {
                    let temp = nums[i - 1]
                    nums[i -1] = nums[j - 1]
                    nums[j - 1] = temp
                    for (let k = i; k < parseInt((nums.length+i) / 2); k++) {
                        let temp = nums[k]
                        nums[k] = nums[nums.length - k]
                        nums[nums.length - k] = temp
                    }
                    return nums
                }
            }
        }
        }
    };

    console.log(nextPermutation([1, 3, 2]))