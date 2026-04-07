# Merge Intervals

Given an array of intervals where each interval is `[start, end]`, merge all overlapping intervals and return the final list.

Important:
- intervals touching at boundary bhi merge hote hain
- example: `[1,4]` and `[4,5]` merge into `[1,5]`
- output order usually sorted by start hota hai after processing

Example:

```txt
intervals = [[1,3],[2,6],[8,10],[15,18]]

[1,3] and [2,6] overlap
merge -> [1,6]

Answer = [[1,6],[8,10],[15,18]]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Sorting basics

**Intuition (Soch):**

Pehle intervals ko start ke basis par sort karo.
Phir har interval ko base maan kar aage scan karo:
jab tak overlap milta rahe, merged end extend karte jao.

Ye brute isliye hai kyunki har interval ke liye future scan dobara ho sakta hai.

**How it works:**

1. Intervals sort karo by start
2. Har interval ko base interval lo
3. Agar woh already previous merged interval me absorb ho chuka hai, skip karo
4. Warna future intervals ko scan karo
5. Jab tak overlap mile, `end = max(end, nextEnd)` karo
6. No overlap aate hi break karo and merged interval push karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(n)`

**Why slow:**

Future scanning repeated hota hai.

---

## Approach 2: Optimal

**Prerequisites (Agar Koi Chahiye):**
- Sorting
- Interval overlap intuition
- **Why needed:** overlap check ko sirf last merged interval tak limit karna hai

**Intuition (Soch):**

Sort hone ke baad agar current interval overlap karega,
toh woh bas last merged interval se hi karega.

Poore result ko scan karne ki zarurat nahi.

**How it works:**

1. Intervals sort karo by start
2. First interval ko merged list me daal do
3. Har next interval ke liye:
   - agar `currentStart <= lastMergedEnd` ho, merge karo
   - warna new interval ki tarah push karo
4. End me merged list return karo

**Time Complexity:** `O(n log n)`
**Space Complexity:** `O(n)`

**Why optimal:**

Sorting ke baad merge pass linear ho jaata hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(n)` | Sorting basics | Har interval future ko dobara scan kar sakta hai |
| Optimal | `O(n log n)` | `O(n)` | Sorting + overlap intuition | Single linear merge pass after sorting |

---

## Which one to implement?

Current folder me:

- `brute-force.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute se overlap growing idea samjho
- phir optimal me samjho ki last merged interval hi kyun enough hota hai
