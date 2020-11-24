function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pivot = partition(arr, low, high)
    quickSort(arr, low, pivot)
    quickSort(arr, pivot + 1, high)
  }
}

function partition(arr, left, right) {
  let pivot = arr[left], p = left + 1
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, p)
      p++
    }
  }
  swap(arr, left, p - 1)
  return p - 1
}

function swap(arr, i, j) {
  console.log(i,j)
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

let arr = [2, 1, 5, 4, 7, 9, 8, 0, 3, 6]

quickSort(arr)
console.log(arr)