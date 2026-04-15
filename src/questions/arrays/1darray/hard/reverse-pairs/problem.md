# Reverse Pairs

Given an array `nums`, count pairs `(i, j)` such that:

```txt
i < j
nums[i] > 2 * nums[j]
```

Return the total number of such pairs.

Example:

```txt
nums = [1, 3, 2, 3, 1]
```

Valid reverse pairs:

```txt
(1, 4) -> nums[1] = 3, nums[4] = 1 -> 3 > 2 * 1
(3, 4) -> nums[3] = 3, nums[4] = 1 -> 3 > 2 * 1
```

Answer:

```txt
2
```

Important:

- `i` must be before `j`
- pair condition is not `nums[i] > nums[j]`
- pair condition is stricter: `nums[i] > 2 * nums[j]`

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Sabse direct way:

```txt
har i ke liye
  har j > i ke liye
    check nums[i] > 2 * nums[j]
```

**How it works:**

1. `i` ko `0..n-1` tak chalao
2. `j` ko `i+1..n-1` tak chalao
3. Agar condition true hai, count badhao

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why slow:**

Har pair check kar rahe hain.
Agar `n = 100000` ho, toh pairs bahut zyada ban jayenge.

---

## Approach 2: Better

**Prerequisites (Agar Koi Chahiye):**
- **Sorted structure / Fenwick Tree / coordinate compression**
- **Why needed:** already seen values ke against fast counting karna

**Intuition (Soch):**

Hum array traverse karte hue pichle elements ko sorted structure me store kar sakte hain.
For current `nums[j]`, hume count karna hai:

```txt
previous nums[i] > 2 * nums[j]
```

Sorted structure se ye count `O(log n)` me mil sakta hai.

**Time Complexity:** `O(n log n)`
**Space Complexity:** `O(n)`

**Why not primary here:**

JavaScript / TypeScript me built-in balanced tree nahi hota.
Fenwick Tree coordinate compression ke saath possible hai,
but merge sort approach zyada natural hai is problem ke liye.

---

## Approach 3: Optimal - Merge Sort Counting

**Prerequisites (Agar Koi Chahiye):**
- **Merge Sort**
- **Two pointers inside sorted halves**
- **Why needed:** sorted halves me many pairs ek saath count karna

**Intuition (Soch):**

Brute force slow hai because har pair individually check hota hai.

Merge sort me array split hota hai:

```txt
left half
right half
```

Recursive calls ke baad dono halves sorted hoti hain.

Sorted halves ka benefit:

```txt
agar nums[leftPointer] > 2 * nums[rightPointer]
```

toh right side pointer ko aage move karke ek saath multiple valid right elements count kar sakte hain.

**Important counting order:**

1. left half ke pairs count karo
2. right half ke pairs count karo
3. left half vs right half ke cross pairs count karo
4. dono halves merge karke sorted banao

Cross pairs merge se pehle count karne padte hain,
because tab tak left half aur right half ki boundary clear hoti hai.

**Time Complexity:** `O(n log n)`
**Space Complexity:** `O(n)`

**Why optimal:**

Merge sort ke har level par total `O(n)` work hota hai.
Levels roughly `log n` hote hain.

So total:

```txt
O(n log n)
```

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | none | every pair check karo |
| Better | `O(n log n)` | `O(n)` | sorted structure / Fenwick | previous elements se count karo |
| Optimal | `O(n log n)` | `O(n)` | merge sort | sorted halves me cross pairs count karo |

---

## Learning Order

Pehle brute force se condition samjho:

```txt
i < j and nums[i] > 2 * nums[j]
```

Phir merge sort ka key idea samjho:

```txt
left half sorted
right half sorted
cross pairs can be counted with two pointers
```

Most important memory line:

```txt
Reverse pairs are counted before merge, because sorted halves still have clear left/right identity.
```
