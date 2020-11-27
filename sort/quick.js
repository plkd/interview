function quickSort(arr) {
  sort(arr, 0, arr.length - 1);
}

function sort(arr, lo, hi) {
  if (lo >= hi) return;
  let j = partition1(arr, lo, hi);
  sort(arr, lo, j - 1);
  sort(arr, j + 1, hi);
}

function partition(arr, lo, hi) {
  let i = lo,
    j = hi + 1,
    v = arr[lo];
  while (true) {
    while (arr[++i] < v) {
      if (i == hi) break;
    }
    while (v < arr[--j]) {
      if (j == lo) break;
    }
    if (i >= j) break;
    exch(arr, i, j);
  }
  exch(arr, lo, j);
  return j;
}

function partition1(arr, lo, hi) {
  let i = lo, j = hi + 1
  while(1) {
    while(arr[++i] < arr[lo]){
      if(i == hi) break
    }
    while(arr[--j]>arr[lo]){
      if(j == lo) break
    }
    if(i >= j) break
    exch(arr, i, j)
  }
  exch(arr, lo, j)
  return j
} 

function exch(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [92, 75, 98, 43, 50, 74, 1, 73, 30, 14, 36, 34, 80, 6, 68, 17, 93, 96, 37, 32];
quickSort(arr)
console.log(arr);
