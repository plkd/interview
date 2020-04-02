function longestSubstring(str) {
  let left = 0,
    right = 0;
  let map = {},
    res = 0;
  while (right < str.length) {
    let c = str[right];
    if (!map[str[right]]) {
      map[str[right]] = 1;
    } else {
      map[str[right]]++;
    }
    right++;
    while (map[c] > 1) {
      let b = str[left];
      map[b]--;
      left++;
    }
    res = Math.max(res, right - left);
  }
  return res;
}

var str = "bbbbbb",
  str1 = "pwwkew";

console.log(longestSubstring(str));
