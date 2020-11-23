function shell(arr) {
  let increment = Math.floor(arr.length / 2);
  while (increment > 0) {
    for (let i = increment; i < arr.length; i++) {
      let j = i,
        temp = arr[i];

      while (j >= increment && arr[j - increment] > temp) {
        arr[j] = arr[j - increment];
        j = j - increment;
      }

      arr[j] = temp;
    }
    // if (increment == 2) {
    //   increment = 1;
    // } else {
      increment = Math.floor(increment / 2);
    // }
  }
  return arr
}

function exch(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [21, 1, 12, 69, 31, 78, 99, 95, 8, 22, 49, 9, 81, 80, 59, 97, 92, 29, 58, 28];

shell(arr);

console.log(arr);
