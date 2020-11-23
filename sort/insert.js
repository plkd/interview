function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j>0 && arr[j] < arr[j -1]; j--) {
        exch(arr, j, j -1)
    }
  }
}

function exch(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [21, 1, 12, 69, 31, 78, 99, 95, 8, 22, 49, 9, 81, 80, 59, 97, 92, 29, 58, 28];

insertSort(arr);

console.log(arr);
