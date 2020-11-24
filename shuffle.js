var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let int = parseInt(Math.random() * (len - i)) + i;
    swap(arr, i, int);
  }
  return arr;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(shuffle(arr));

function shuffle1(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let int = parseInt(Math.random() * (len - i)) + i;
    swap(arr, i, int);
  }
  return arr;
}

function shuffle2(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let int = parseInt(Math.random() * (i + 1));
    swap(arr, i, int);
  }
  return arr;
}

function shuffle4(arr) {
  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    let int = parseInt(Math.random() * (i + 1));
    swap(arr, int, i);
  }
  return arr;
}
