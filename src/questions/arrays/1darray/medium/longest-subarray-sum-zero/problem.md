# Longest Subarray With Sum Zero

Given an integer array `nums`, return the length of the longest contiguous subarray whose sum is exactly `0`.

Important:
- subarray contiguous honi chahiye
- answer length chahiye, actual subarray nahi
- agar koi zero-sum subarray exist nahi karti, answer `0` hoga

Example:

```txt
nums = [1, -1, 3, -3]

[1, -1, 3, -3] ka sum 0 hai

Answer = 4
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har possible start index choose karo.
Us start se har possible end index tak window extend karo.
Running sum maintain karo.

Jab bhi current window ka sum `0` ho,
current window valid zero-sum subarray hai.

**How it works:**

1. `left` ko `0` se `n-1` tak chalao
2. Har `left` ke liye `currentSum = 0` se start karo
3. `right` ko `left` se `n-1` tak extend karo
4. `currentSum += nums[right]`
5. Agar `currentSum === 0` ho, answer update karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why slow:**

Har start index se almost saare end indices try ho rahe hain.

Note:

Is problem me strong separate `better.ts` step usually nahi hota.
Main jump direct prefix-sum insight par aata hai.

---

## Approach 2: Optimal (Prefix Sum + HashMap)

**Prerequisites (Agar Koi Chahiye):**
- **Prefix sum**
- **HashMap**
- **Why needed:** repeated prefix sum ko fast detect karna hai

**Intuition (Soch):**

Agar same prefix sum do alag indices pe milta hai,
toh unke beech wali subarray ka sum zero hota hai.

Example:

```txt
nums        = [1, -1, 3, -3]
prefix sums = [1,  0, 3,  0]
```

Yahan prefix sum `0` index `1` pe bhi hai aur index `3` pe bhi.
Matlab in dono prefix checkpoints ke beech net contribution zero hai.

**How it works:**

1. `currentSum` naam ka running prefix sum maintain karo
2. Map me prefix sum ka first occurrence store karo
3. Start me `0 -> -1` store karo
4. Har index pe `currentSum` update karo
5. Agar same sum pehle mil chuka hai:
   current length = `i - firstIndex`
6. Nahi mila toh map me first occurrence store karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why optimal:**

Har element ek hi baar process hota hai,
aur map lookup average `O(1)` hota hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | None | Har start-end window try hoti hai |
| Optimal | `O(n)` | `O(n)` | Prefix sum + HashMap | Repeated prefix sum se zero-sum window milti hai |

---

## Which one to implement?

Current folder me:

- `brute-force.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute force se samjho ki hum actual me kya search kar rahe hain
- phir prefix sum ka repeat wala insight pakdo
- phir optimal solution me samjho ki first occurrence hi kyun store karte hain
