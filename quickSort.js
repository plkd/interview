function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pivot = partition1(arr, low, high)
    quickSort(arr, low, pivot)
    quickSort(arr, pivot + 1, high)
  }
}
// function partition(arr, low, high) {
//   let pivot = arr[low], leftwall = low;
//
//   for(let i=low+1;i<=high;i++) {
//     let temp = arr[i]
//     if(temp < pivot) {
//       swap(arr, i, leftwall)
//       leftwall = leftwall + 1
//     }
//   }
//   swap(arr, low, leftwall)
//   return leftwall
// }

function partition1(arr, start, end) {
  let i = start + 1, piv = arr[start]
  for(let j = start +1;j<=end;j++) {
    if(arr[j] < piv) {
      swap(arr, i, j)
      i++
    }
  }
  swap(arr, start, i-1)
  return i - 1
}

function swap(arr, left, right){
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

let arr = [2,1,5,4,7,9,8,0,3,6]

quickSort(arr)
console.log(arr)