function generateAll(current, pos, result) {
  if (pos == current.length) {
    if (valid(current)) {
      result.push(current.join(""));
    }
  } else {
    current[pos] = "(";
    generateAll(current, pos + 1, result);
    current[pos] = ")";
    generateAll(current, pos + 1, result);
  }
}

function valid(arr) {
  var balance = 0;
  for (let i = 0; i < arr.length; i++) {
    var element = arr[i];
    if (element == "(") {
      ++balance;
    } else {
      --balance;
    }
    if (balance < 0) {
      return false;
    }
  }
  return balance == 0;
}

var generateParenthesis = function (n) {
  var arr = new Array(2 * n),
    result = [];
  generateAll(arr, 0, result);
  return result;
};
