function mergeSort(arr) {
  sort(arr, 0, arr.length - 1);
}

function merge(arr, lo, mid, hi) {
  let i = lo,
    j = mid + 1;
  let aux = arr.slice();

  for (let k = lo; k <= hi; k++) {
    if (i > mid) arr[k] = aux[j++];
    else if (j > hi) arr[k] = aux[i++];
    else if (aux[i] > aux[j]) arr[k] = aux[j++];
    else arr[k] = aux[i++];
  }
}
function sort(arr, lo, hi) {
  if (hi <= lo) return;
  let mid = lo + Math.floor((hi - lo) / 2);
  sort(arr, lo, mid);
  sort(arr, mid + 1, hi);
  merge(arr, lo, mid, hi);
}

var arr = [8, 6, 4, 808, -22, 2, 1, 9, 3];

// mergeSort(arr);
mergeBu(arr)

console.log(arr);

function mergeBu(arr) {
  let n = arr.length;
  for (let sz = 1; sz < n; sz = sz + sz) {
    for (let lo = 0; lo <= n - sz; lo += sz + sz) {
      merge(arr, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, n - 1));
    }
  }
}
