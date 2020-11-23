function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    exch(arr, i, min);
  }
}

function exch(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [5, 3, 2, 1, 9, 8, 7, 6];

selectSort(arr);

console.log(arr);
