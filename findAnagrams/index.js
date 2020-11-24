function findAnagrams(str, t) {
  let left = 0,
      start = 0,
      right = 0,
      minLength = Infinity,
      need = {},
      window = {},
      needLength = 0;
  for (let i = 0; i < t.length; i++) {
    need[i] = need[i] ? need[i]++ : 1;
    if (need[i]) {
      need[i]++
    } else {
      need[i] = 1
    }
    needLength++
  }
  let match = 0;

  while (right < str.length) {
    let c1 = str[right]
    if (need[c1]) {
      window[c1] = window[c1] ? window[c1]++ : 1
      if (window[c1] == need[c1]) {
        match++
      }
    }
    right++

    while (match == needLength) {
      if (right - left < minLength) {
        start = left
        minLength = right - left
      }
      let c2 = str[left]
      if (need[c2]) {
        window[c2]--
        if (window[c2] < need[c2])
          match--
      }
      left++
    }
  }
  return minLength == Infinity ? "" : str.substr(start, minLength)
}

function compareObj(obj1, obj2) {
  for (key in obj1) {
    if (!obj2[key] || obj2[key] !== obj1[key]) {
      return false;
    }
  }
  return true
}
