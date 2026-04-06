# Longest Equal Subarray

Given an integer array `nums` and an integer `k`, you may delete at most `k` elements from a chosen subarray.
After deletions, the remaining elements in that subarray must all be equal.

Return the maximum possible length of such an equal subarray.

Important:
- final kept elements sab same value ke hone chahiye
- at most `k` deletions allowed hain
- answer kept equal elements ki length hai, original window size nahi

Example:

```txt
nums = [1, 3, 2, 3, 1, 3], k = 3

Choose subarray [3, 2, 3, 1, 3]
Delete 2 and 1
Bacha: [3, 3, 3]

Answer = 3
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har possible subarray try karo.
Us subarray me jo value sabse zyada baar aati hai, usko rakho.
Baaki elements delete kar do.

If:

```txt
deletionsNeeded = windowSize - maxFreq
```

and `deletionsNeeded <= k`,
toh current subarray se valid equal subarray ban sakti hai.

**How it works:**

1. Har start index choose karo
2. Har end index extend karo
3. Current window me frequency map maintain karo
4. `maxFreq` nikaalo
5. `windowSize - maxFreq` agar `<= k` hai, toh answer update karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(n)`

**Why slow:**

Har start se almost poora array dobara scan hota hai.

---

## Approach 2: Better

**Prerequisites (Agar Koi Chahiye):**
- **Grouping indices by value**
- **Why needed:** ek chosen value ke liye pair of endpoints par deletions count karna hai

**Intuition (Soch):**

Agar hum ek specific value pe focus karein,
toh bas us value ke indices important ho jaate hain.

Example:

```txt
nums = [1, 3, 2, 3, 1, 3]
3 ke indices = [1, 3, 5]
```

Agar hum `[1 ... 5]` span lete hain,
toh beech ke non-3 elements delete karne padenge.

**How it works:**

1. Har value ke indices collect karo
2. Har value ki index list pe every `(left, right)` pair try karo
3. Compute:
   `indices[right] - indices[left] - (right - left)`
4. Agar yeh `<= k` hai, current count valid hai

**Time Complexity:** worst case `O(n^2)`
**Space Complexity:** `O(n)`

**Why better:**

Ab hum direct original array ke sab windows nahi dekh rahe.
Hum sirf relevant value positions pe kaam kar rahe hain.

---

## Approach 3: Optimal (Indices + Sliding Window)

**Prerequisites (Agar Koi Chahiye):**
- **Sliding window**
- **Grouping indices by value**
- **Why needed:** same index-list pe pair search ko linear banana hai

**Intuition (Soch):**

Better approach me हर pair try kar rahe the.
Usko sliding window se linear bana sakte hain.

For one value:

```txt
deletionsNeeded = indices[right] - indices[left] - (right - left)
```

If this exceeds `k`,
left ko aage badhao.

**How it works:**

1. Har value ke indices collect karo
2. Har indices list pe `left/right` sliding window chalao
3. Jab deletionsNeeded `> k` ho, `left++`
4. Valid window length = `right - left + 1`
5. Maximum track karo

**Time Complexity:** `O(n)` average
**Space Complexity:** `O(n)`

**Why optimal:**

Har indices list pe sliding window linear chalti hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(n)` | None | Har original subarray try hoti hai |
| Better | worst case `O(n^2)` | `O(n)` | Grouping indices | Value-wise work hota hai |
| Optimal | `O(n)` average | `O(n)` | Sliding window + indices grouping | Best practical approach |

---

## Which one to implement?

Current folder me:

- `brute.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute me `windowSize - maxFreq` samjho
- phir value indices wali soch pakdo
- phir optimal me gaps formula + sliding window dekho
