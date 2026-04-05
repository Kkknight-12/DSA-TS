# 4 Sum

Given an integer array `nums` and an integer `target`, return **all unique quadruplets** `[nums[a], nums[b], nums[c], nums[d]]` such that:

```txt
a != b
b != c
c != d
a != c
a != d
b != d
nums[a] + nums[b] + nums[c] + nums[d] = target
```

Important:
- output me duplicate quadruplets nahi hone chahiye
- quadruplet ke andar order matter nahi karta

Example:

```txt
nums   = [1, 0, -1, 0, -2, 2]
target = 0

Valid quadruplets:
[-2, -1, 1, 2]
[-2, 0, 0, 2]
[-1, 0, 0, 1]
```

Answer:

```txt
[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har possible quadruplet try karo.
Agar sum `target` ke equal ho, toh usse answer me daal do.

Duplicates ka issue aayega, isliye found quadruplet ko sort karke Set me store kar sakte hain.

**How it works:**

1. `i`, `j`, `k`, `l` ke liye 4 nested loops chalao
2. Har quadruplet ka sum check karo
3. Agar sum `target` ho:
   - quadruplet sort karo
   - Set me daalo
4. End me unique quadruplets return karo

**Time Complexity:** `O(n^4)`
**Space Complexity:** depends on unique quadruplets

**Why slow:**

Combinations bahut zyada ho jaati hain.

---

## Approach 2: Better (HashSet)

**Prerequisites (Agar Koi Chahiye):**
- **HashSet / Set basics**
- **Why needed:** remaining pair ko efficiently check karna hai

**Intuition (Soch):**

```txt
a + b + c + d = target
```

Agar `a` aur `b` fix kar diye, toh:

```txt
c + d = target - (a + b)
```

Yani ab problem reduce ho gayi:
- do numbers fix karo
- remaining part me pair dhoondho

HashSet ki help se current `c` ke liye dekh sakte hain ki required `d` pehle dekha gaya hai ya nahi.

**How it works:**

1. Array sort karo
2. Outer loop me `i` fix karo
3. Second loop me `j` fix karo
4. Ab remaining part pe `seen` HashSet chalao
5. `fourth = target - (nums[i] + nums[j] + nums[k])`
6. Agar `fourth` pehle seen me hai, quadruplet mil gaya
7. Duplicate quadruplets ko sorted order + Set se unique rakho

**Time Complexity:** `O(n^3)`
**Space Complexity:** `O(n)`

**Why better:**

Fourth loop hat jaata hai.

---

## Approach 3: Optimal (Sort + Two Pointers)

**Prerequisites (Agar Koi Chahiye):**
- **Sorting**
- **Two pointers**
- **Why needed:** do numbers fix karke baaki part ko sorted `2-sum` ki tarah solve karna hai

**Intuition (Soch):**

Pehle array sort karo.
Phir:
- `i` fix karo
- `j` fix karo
- baaki part me `left` aur `right` se pair dhoondho

Sorted array me:
- sum chhota ho -> `left++`
- sum bada ho -> `right--`
- sum exact ho -> quadruplet mil gaya

Duplicate handling sorted order me naturally ho sakti hai.

**How it works:**

1. Array sort karo
2. Har `i` ko first element ki tarah fix karo
3. Duplicate `i` skip karo
4. Har `j` ko second element ki tarah fix karo
5. Duplicate `j` skip karo
6. `left = j + 1`, `right = n - 1`
7. Jab tak `left < right`:
   - `sum < target` -> `left++`
   - `sum > target` -> `right--`
   - `sum === target` -> quadruplet add karo, duplicate `left/right` skip karo, phir both move karo

**Time Complexity:** `O(n^3)`
**Space Complexity:** `O(1)` extra space

**Why optimal:**

HashSet ki bhi zarurat nahi padti.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^4)` | depends on unique quadruplets | None | Simple but very slow |
| Better | `O(n^3)` | `O(n)` | HashSet basics | Last loop remove ho jaata hai |
| Optimal | `O(n^3)` | `O(1)` | Sorting + Two Pointers | Best space complexity |

---

## Which one to implement?

Current folder me abhi:

- `better.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute force ka idea samjho
- phir HashSet reduction dekho
- phir final two-pointer optimal dekho
