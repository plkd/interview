function quickSort(arr) {
  sort(arr, 0, arr.length - 1);
}

function sort(arr, lo, hi) {
  if (lo >= hi) return;
  let j = partition(arr, lo, hi);
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

function exch(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [5, 3, 2, 1, 9, 8, 7, 6];
quickSort(arr)
console.log(arr);
