function trap(arr) {
  if (arr.lenght === 0) return 0;

  let left = 0,
    right = arr.length - 1,
    res = 0;

  let l_max = arr[0],
    r_max = arr[arr.length - 1];

  while (left <= right) {
    l_max = Math.max(l_max, arr[left]);
    r_max = Math.max(r_max, arr[right]);

    if (l_max < r_max) {
      res += l_max - arr[left];
      left++;
    } else {
      res += r_max - arr[right];
      right--;
    }
  }

  return res;
}

var arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

trap(arr);
