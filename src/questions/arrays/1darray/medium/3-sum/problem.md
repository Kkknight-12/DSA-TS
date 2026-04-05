# 3 Sum

Given an integer array `nums`, return **all unique triplets** `[nums[i], nums[j], nums[k]]` such that:

```txt
i != j
j != k
i != k
nums[i] + nums[j] + nums[k] = 0
```

Important:
- output me duplicate triplets nahi hone chahiye
- triplet ke andar order matter nahi karta

Example:

```txt
nums = [-1, 0, 1, 2, -1, -4]

Valid triplets:
[-1, -1, 2]
[-1, 0, 1]
```

Answer:

```txt
[[-1, -1, 2], [-1, 0, 1]]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har possible triplet try karo.
Agar sum `0` ho, toh usse answer me daal do.

Duplicates ka issue aayega, isliye found triplet ko sort karke Set me store kar sakte hain.

**How it works:**

1. `i`, `j`, `k` ke liye 3 nested loops chalao
2. Har triplet ka sum check karo
3. Agar sum `0` ho:
   - triplet sort karo
   - Set me daalo
4. End me unique triplets return karo

**Time Complexity:** `O(n^3)`
**Space Complexity:** depends on unique triplets

**Why slow:**

Almost sab combinations check karne padte hain.

---

## Approach 2: Better (HashSet)

**Prerequisites (Agar Koi Chahiye):**
- **HashSet / Set basics**
- **Why needed:** teesra number efficiently check karna hai

**Intuition (Soch):**

`a + b + c = 0`

Agar `a` aur `b` fix hain, toh:

```txt
c = -(a + b)
```

Matlab teesra number pehle se decided hai.
Bas check karna hai ki woh pehle dekha gaya hai ya nahi.

**How it works:**

1. Array sort karo
2. Har `i` ko first element maan lo
3. Inner loop me `j` chalao
4. `third = -(nums[i] + nums[j])` nikaalo
5. Agar `third` HashSet me hai, toh triplet mil gaya
6. Duplicate triplets ko sorted order + Set se unique rakho

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(n)`

**Why better:**

Third loop hat jaata hai.

---

## Approach 3: Optimal (Sort + Two Pointers)

**Prerequisites (Agar Koi Chahiye):**
- **Sorting**
- **Two pointers**
- **Why needed:** fixed first number ke baad remaining part ko sorted `2-sum` ki tarah solve karna hai

**Intuition (Soch):**

Pehle array sort karo.
Ek number fix karo.
Baaki array me do numbers aise dhoondho jinka sum `-nums[i]` ho.

Sorted array me:
- sum chhota ho -> `left++`
- sum bada ho -> `right--`
- sum exact ho -> triplet mil gaya

Duplicate handling sorted order me naturally ho sakti hai.

**How it works:**

1. Array sort karo
2. Har `i` ko first element ki tarah fix karo
3. Duplicate `i` skip karo
4. `left = i + 1`, `right = n - 1`
5. Jab tak `left < right`:
   - `sum < 0` -> `left++`
   - `sum > 0` -> `right--`
   - `sum === 0` -> triplet add karo, duplicate `left/right` skip karo, phir both move karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)` extra space

**Why optimal:**

HashSet ki bhi zarurat nahi padti.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^3)` | depends on unique triplets | None | Simple but slow |
| Better | `O(n^2)` | `O(n)` | HashSet basics | Third loop remove ho jaata hai |
| Optimal | `O(n^2)` | `O(1)` | Sorting + Two Pointers | Best space complexity |

---

## Which one to implement?

Current folder me teeno versions available hain:

- `brute-force.ts`
- `better.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute samjho
- phir HashSet wala better
- phir two-pointer optimal
