function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    let mid = Math.floor(start + end / 2);
    mergeSort(arr, start, mid)
    mergeSort(arr, mid + 1, end)
    merge(arr, start, mid, end)
  }
}

function merge(arr, start, mid, end) {
  let p = start, q = mid + 1, brr = [], k = 0;
  for (let i = start; i <= end; i++) {
    if (p > mid) { //  checks if first part comes to an end or not
      brr[k++] = arr[q++]
    } else if (q > end) { // checks if second part comes to an end or not
      brr[k++] = arr[p++]
    } else if (arr[p] < arr[q]) {
      brr[k++] = arr[p++]
    } else {
      brr[k++] = arr[q++]
    }
  }
  for (let p = 0; p < k; p++) {
    arr[start++] = brr[p]
  }
}

let arr = [9, 2, 1, 4, 5, 8, 7, 6, 3]
mergeSort(arr)
console.log(arr)