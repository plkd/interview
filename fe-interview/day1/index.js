var arr = new Array(5);
var num = getRandom();
var i = 0;
function getRandom() {
  return Math.floor(Math.random() * 31 + 2);
}
function randomArr(arr, random) {
  if (!~arr.indexOf(random)) {
    arr[i++] = random;
  } else {
    random = getRandom();
  }
  if (i >= 5) {
    return;
  }
  randomArr(arr, random);
}

randomArr(arr, num);

console.log(arr);
