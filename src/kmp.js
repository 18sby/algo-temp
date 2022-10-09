const calcNext = (pattern) => {
  const n = pattern.length;
  const next = new Array(n).fill(0);
  let j = 0;
  let i = 1;
  while (i < n) {
    if (pattern[i] === pattern[j]) {
      next[i] = j + 1;
      i++;
      j++;
    } else {
      if (j > 0) {
        j = next[j - 1];
      } else {
        i++;
      }
    }
  }
  return next;
}

const kmp = (s, pattern) => {
  const m = s.length;
  const n = pattern.length;
  const next = calcNext(pattern);
  let i = 0;
  let j = 0;
  let match = false;
  while (i < m) {
    if (s[i] === pattern[j]) {
      i++;
      j++;
      if (j === n) {
        match = true;
        break;
      }
    } else {
      if (j > 0) {
        j = next[j - 1];
      } else {
        i++;
      }
    }
  }
  return match ? (i - n) : -1;
}