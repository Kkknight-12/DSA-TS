function kmpSearchRotateString(text: string, pattern: string): boolean {
  // Build prefix (failure) table for pattern
  const m = pattern.length;
  const lps = new Array(m).fill(0); // longest proper prefix which is also suffix
  let len = 0; // length of previous longest prefix suffix
  let i = 1;
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // Search pattern in text
  let j = 0; // index for pattern
  for (i = 0; i < text.length; ) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === m) return true; // found
    } else {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return false;
}

function isRotationKMP(s: string, goal: string): boolean {
  if (s.length !== goal.length) return false;
  if (s === '' && goal === '') return true;
  return kmpSearchRotateString(s + s, goal);
}