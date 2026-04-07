# Maximum Subarray

Given an integer array `nums`, return the maximum possible sum of a contiguous subarray.

Important:
- subarray contiguous honi chahiye
- answer sum hai, actual subarray nahi
- original LeetCode version usually non-empty array deta hai

Example:

```txt
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Best subarray = [4, -1, 2, 1]
Sum = 6

Answer = 6
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har possible start index choose karo.
Us start se har possible end index tak window extend karo.
Running sum maintain karo.

Har window ka sum check karke maximum track kar lo.

**How it works:**

1. `left` ko `0` se `n-1` tak chalao
2. Har `left` ke liye `currentSum = 0` se start karo
3. `right` ko `left` se `n-1` tak extend karo
4. `currentSum += nums[right]`
5. `maxSum` update karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why slow:**

Har start index se almost saare end indices try ho rahe hain.

Note:

Is problem me usually strong separate `better.ts` step nahi hota.
Main jump direct Kadane insight par aata hai.

---

## Approach 2: Optimal (Kadane's Algorithm)

**Prerequisites (Agar Koi Chahiye):**
- **Running sum / greedy intuition**
- **Why needed:** negative carry ko discard karke linear time me best answer nikaalna hai

**Intuition (Soch):**

Agar current running sum negative ho gayi,
toh usko future subarray me carry karna harmful hai.

Example:

```txt
currentSum = -5
next num = 4

carry    -> -5 + 4 = -1
restart  -> 4
```

Clearly fresh start better hai.

**How it works:**

1. `currentSum` running window sum rakho
2. Har number ko `currentSum` me add karo
3. `maxSum` ko immediately update karo
4. Agar `currentSum < 0` ho jaye, usko `0` reset kar do
5. End me `maxSum` return karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

Har element ek hi baar process hota hai,
aur future ko negative prefix carry nahi karte.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | None | Har start-end window try hoti hai |
| Optimal | `O(n)` | `O(1)` | Running sum intuition | Kadane negative carry discard karta hai |

---

## Which one to implement?

Current folder me:

- `optimal.ts`

Learning order ke liye best flow:
- pehle brute force ki search space samjho
- phir Kadane ka core idea pakdo:
  negative running sum ko future me carry mat karo
