# Next Permutation

Given an array `nums`, transform it in-place into the next lexicographically greater permutation.

If such arrangement is not possible because the current array is already the largest permutation,
transform it into the smallest permutation instead.

Important:
- in-place modify karna hai
- actual return value zaruri nahi
- duplicates ho sakti hain

Example:

```txt
nums = [1, 3, 2]

Lexicographic order around it:
[1,2,3]
[1,3,2]   <- current
[2,1,3]   <- next
[2,3,1]
[3,1,2]
[3,2,1]
```

Answer after update:

```txt
[2,1,3]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Backtracking basics
- Lexicographic order ka basic idea

**Intuition (Soch):**

Saari unique permutations generate karo.
Unhe lexicographic order me rakho.
Current permutation dhoondo.
Uske next wali permutation array me copy kar do.

**How it works:**

1. `nums` ke saare unique permutations generate karo
2. Unhe lexicographic order me rakho
3. Current permutation ka index find karo
4. `nextIndex = (currentIndex + 1) % totalPermutations`
5. Next permutation ko original array me copy kar do

**Time Complexity:** very large, around `O(n! * n)` practical cost
**Space Complexity:** very large, because all permutations store hoti hain

**Why slow:**

Hume sirf next permutation chahiye,
but brute force unnecessary saari permutations bana deta hai.

---

## Approach 2: Optimal

**Prerequisites (Agar Koi Chahiye):**
- Reversal basics
- Lexicographic order intuition
- **Why needed:** array ko direct next permutation me convert karna hai bina saari permutations generate kiye

**Intuition (Soch):**

Right side ka descending suffix already sabse bada arrangement hota hai.
Is suffix ke andar rehkar next larger permutation nahi ban sakti.

Toh:

1. Right se first position dhoondo jahan increase possible hai
2. Us pivot ko right side ke just-bigger element ke saath swap karo
3. Suffix ko smallest order me le aao

**How it works:**

1. Right se scan karke `pivot` dhoondo jahan `nums[pivot] < nums[pivot+1]`
2. Agar pivot mila:
   - right se first element dhoondo jo `nums[pivot]` se bada ho
   - swap karo
3. Pivot ke right wale suffix ko reverse karo
4. Agar pivot na mile, whole array reverse karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

Sirf wohi minimum change karta hai jo current arrangement ko next larger banaye.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | huge, around `O(n! * n)` | huge | Backtracking + lexicographic order | Saari permutations generate hoti hain |
| Optimal | `O(n)` | `O(1)` | Lexicographic intuition + reversal | Direct next permutation milti hai |

---

## Which one to implement?

Current folder me:

- `brute-force.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute force se "next in lexicographic order" idea pakdo
- phir optimal me samjho:
  pivot, successor, reverse suffix
