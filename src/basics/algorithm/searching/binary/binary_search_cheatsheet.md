# Binary Search — Quick Reference

Use this only after the concepts are clear.

---

## 1. Pehla sawal: search kis cheez par ho raha hai?

| Search space | Typical problems | Core question |
|---|---|---|
| Index space | exact search, lower bound, rotated array, peak, kth missing | kis index pe condition flip hoti hai? |
| Answer space | ship capacity, Koko, book allocation, aggressive cows | kaunsa answer value valid hai? |
| Partition space | median of two sorted arrays | smaller array se kitne elements left partition me jayenge? |

---

## 2. Pattern choose kaise karo?

| Goal | Loop | Mid bias | Valid update | Invalid update | Return |
|---|---|---|---|---|---|
| Exact target | `left <= right` | lower mid | return immediately | discard one half | `-1` if not found |
| First true / minimum valid | `left < right` | lower mid | `right = mid` | `left = mid + 1` | `left` |
| Last true / maximum valid | `left <= right` with `result`, or `left < right` | lower mid with `result`, upper mid for convergence | `result = mid; left = mid + 1` or `left = mid` | `right = mid - 1` | `result` or `left` |

---

## 3. Exact search template

```ts
let left = 0;
let right = arr.length - 1;

while (left <= right) {
  const mid = Math.floor(left + (right - left) / 2);

  if (arr[mid] === target) return mid;

  if (arr[mid] < target) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

return -1;
```

Use when:

- exact target search
- search in rotated sorted array
- exact math root if not found can return `-1`

---

## 4. First true / minimum valid template

```ts
while (left < right) {
  const mid = Math.floor((left + right) / 2); // lower mid

  if (isValid(mid)) {
    right = mid;      // mid answer ho sakta hai
  } else {
    left = mid + 1;   // mid answer nahi ho sakta
  }
}

return left;
```

Use when:

- lower bound
- upper bound
- search insert position
- minimum in rotated sorted array
- minimum valid answer in answer-space problems

---

## 5. Last true / maximum valid templates

### A. Result-saving style

```ts
let result = -1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (isValid(mid)) {
    result = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

return result;
```

### B. Convergence style

```ts
while (left < right) {
  const mid = Math.floor((left + right + 1) / 2); // upper mid

  if (isValid(mid)) {
    left = mid;
  } else {
    right = mid - 1;
  }
}

return left;
```

Use when:

- aggressive cows
- floor
- last occurrence
- maximum feasible answer

---

## 6. `right = n` vs `right = n - 1`

| Situation | Right boundary |
|---|---|
| Answer can be `n` | `right = n` |
| Answer must be real index | `right = n - 1` |

Examples:

- lower bound / insert position -> `n` possible
- rotated minimum -> only real indices, so `n - 1`
- partition search on smaller array -> `0 ... n1`

---

## 7. Mid include/exclude rule

```txt
Can mid still be the answer?
```

If yes:

- keep mid in range
- `right = mid` or `left = mid`

If no:

- discard mid
- `left = mid + 1` or `right = mid - 1`

---

## 8. Lower mid vs upper mid

| Update style | Mid |
|---|---|
| `right = mid` | lower mid |
| `left = mid + 1` | lower mid |
| `left = mid` | upper mid |
| `right = mid - 1` | lower mid |

Rule:

```txt
left = mid likh rahe ho?
=> upper mid chahiye
```

---

## 9. Rotated array: 2 different sub-patterns

### Search target

```ts
if (nums[left] <= nums[mid]) {
  // left half sorted
}
```

### Find minimum

```ts
if (nums[mid] > nums[right]) {
  left = mid + 1;
} else {
  right = mid;
}
```

Important:

```txt
nums[right] cleaner anchor hai for this minimum-finding invariant.
nums[left] universally wrong nahi hai.
```

---

## 10. Peak element template

```ts
while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[mid] < nums[mid + 1]) {
    left = mid + 1;
  } else {
    right = mid;
  }
}

return left;
```

Memory hook:

```txt
Slope up? peak right me.
Slope down? peak mid ya left me.
```

---

## 11. K-th missing positive

```ts
const missingCount = arr[mid] - (mid + 1);

if (missingCount < k) {
  left = mid + 1;
} else {
  right = mid - 1;
}
```

After loop:

```txt
left = first index jahan missingCount >= k
answer = left + k
```

Equivalent:

```txt
answer = k + right + 1
```

Preferred memory hook:

```txt
left + k
```

---

## 12. Binary search on answer

Recognition:

- minimum X such that possible
- maximum X such that possible
- helper `isPossible(x)` ban sakti hai

Minimize:

```txt
F F F T T T -> first true
```

Maximize:

```txt
T T T F F F -> last true
```

---

## 13. What not to mix

- `while (left <= right)` with `right = mid`
- lower mid with `left = mid`
- `right = n - 1` when answer can be `n`
- rotated target-search logic with rotated minimum logic
- answer-space search with partition search

---

## 14. One-line memory card

```txt
Binary search = monotonic search space + "mid answer ho sakta hai?" decision.
```
