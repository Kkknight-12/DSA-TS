# Majority Element

Given an integer array `nums`, return the element that appears **more than** `n / 2` times.

Problem guarantee:

- majority element hamesha exist karta hai

Example:

```txt
nums = [2, 2, 1, 1, 1, 2, 2]
answer = 2

length = 7
n/2 = 3.5
2 appears 4 times
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har element ko candidate maan lo.
Uski frequency poore array me count karo.
Jo element `n/2` se zyada baar aaye, wahi answer.

**How it works:**

1. Har index `i` ke liye `nums[i]` ko candidate maan lo
2. Poore array me us candidate ki frequency count karo
3. Agar frequency `n/2` se zyada ho, return kar do

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why slow:**

Same values ko baar-baar recount kar rahe ho.

---

## Approach 2: Better (HashMap / Frequency Map)

**Prerequisites (Agar Koi Chahiye):**
- **Map / HashMap basics**
- **Why needed:** Har value ki frequency efficiently track karni hai

**Intuition (Soch):**

Pehle example simulate karo:

```txt
nums = [2, 2, 1, 1, 1, 2, 2]
threshold = floor(7 / 2) = 3
```

Traversal:

```txt
2 -> count 1
2 -> count 2
1 -> count 1
1 -> count 2
1 -> count 3
2 -> count 3
2 -> count 4  -> threshold cross
```

Soch:

Hume har value ke liye bas current count yaad rakhna hai.
Isliye `Map<number, number>` perfect fit hai.

**How it works:**

1. `threshold = floor(n / 2)` nikaalo
2. Ek frequency map banao
3. Array traverse karo
4. Current value ka count update karo
5. Jaise hi count `threshold` se zyada ho, answer return kar do

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why better:**

Har element ek hi pass me process hota hai.
Frequency lookup/update average `O(1)` hoti hai.

---

## Approach 3: Optimal (Boyer-Moore Voting Algorithm)

**Prerequisites (Agar Koi Chahiye):**
- **Boyer-Moore Voting Algorithm**
- **Why needed:** Majority guarantee ka use karke extra space hata sakte hain

**Intuition (Soch):**

Majority element baaki sab elements ko pair karke cancel kar dega.

Example:

```txt
[2, 2, 1, 1, 1, 2, 2]

2 with 1 cancel
2 with 1 cancel
phir bhi 2 bach jaata hai
```

Is approach me:

- `candidate`
- `count`

maintain karte hain.

**How it works:**

1. `count = 0` se start karo
2. `count == 0` ho toh current element ko new candidate banao
3. Agar current element candidate jaisa hai, `count++`
4. Warna `count--`
5. End me candidate hi majority hota hai, because problem majority existence guarantee karti hai

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

HashMap ki zarurat hi nahi padti.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | None | Simple but repetitive recounting |
| Better | `O(n)` | `O(n)` | Map / HashMap basics | Easiest one-pass frequency approach |
| Optimal | `O(n)` | `O(1)` | Boyer-Moore Voting | Best space complexity |

---

## Which one to implement?

Current folder me:

- `better.ts` -> frequency map approach
- `optimal.ts` -> Boyer-Moore voting approach

If goal intuition-first learning hai, `better.ts` pehle easier lagega.
If goal best space complexity hai, `optimal.ts` final target hai.
