# Sort Colors

Given an array `nums` containing only `0`, `1`, and `2`, sort it in-place.

Color meaning:
- `0` = red
- `1` = white
- `2` = blue

Important:
- in-place sort karna hai
- built-in sort ka intended use nahi hai
- values sirf `0`, `1`, `2` hi hain

Example:

```txt
nums = [2, 0, 2, 1, 1, 0]

sorted = [0, 0, 1, 1, 2, 2]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Sabse seedha idea:
- normal sort kar do

Kyuki values comparable hain,
sorting se answer mil jayega.

**How it works:**

1. Array ko sort karo
2. In-place overwrite ho jayega

**Time Complexity:** `O(n log n)`
**Space Complexity:** depends on sort implementation

**Why weak:**

Problem ka real pattern use hi nahi kar raha.
Yahan values sirf 3 types ki hain, so general sort overkill hai.

---

## Approach 2: Better

**Prerequisites (Agar Koi Chahiye):**
- **Counting / frequency idea**
- **Why needed:** sirf `0`, `1`, `2` count karke array rebuild kar sakte hain

**Intuition (Soch):**

Kyuki values sirf 3 hi possible hain,
hum:
- कितने `0`
- कितने `1`
- कितने `2`

ye count kar sakte hain,
phir array ko us count ke basis par refill kar sakte hain.

**How it works:**

1. `count0`, `count1`, `count2` track karo
2. Array traverse karke counts nikaalo
3. Pehle `0`s bharo
4. Phir `1`s bharo
5. Phir `2`s bharo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why still not optimal from interview viewpoint:**

Correct hai, simple bhi hai,
but problem ka most famous in-place one-pass solution abhi bhi better hai.

---

## Approach 3: Optimal (Dutch National Flag)

**Prerequisites (Agar Koi Chahiye):**
- **Two/three pointer thinking**
- **Partition / region invariant**
- **Why needed:** array ko multiple sorted regions + unknown region me sochna hai

**Intuition (Soch):**

Array ko 4 regions me split karke chalo:

```txt
[0 ... low-1]    -> 0s
[low ... mid-1]  -> 1s
[mid ... high]   -> unknown
[high+1 ... n-1] -> 2s
```

Ab bas `mid` ko inspect karke unknown region ko consume karna hai.

- `0` mila -> left region me bhejo
- `1` mila -> beech me hi rehne do
- `2` mila -> right region me bhejo

**How it works:**

1. `low = 0`, `mid = 0`, `high = n - 1`
2. Jab tak `mid <= high`
3. `nums[mid] == 0`
   - `low` ke saath swap
   - `low++`, `mid++`
4. `nums[mid] == 1`
   - `mid++`
5. `nums[mid] == 2`
   - `high` ke saath swap
   - `high--`
   - `mid` same rahega

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

Ek pass me array sort ho raha hai,
aur extra storage bhi nahi chahiye.

---

## Comparison Table

| Approach | Time | Space | Main Idea | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n log n)` | sort-dependent | normal sort | simple but ignores problem structure |
| Better | `O(n)` | `O(1)` | count 0/1/2 then rewrite | good, but 2-pass style |
| Optimal | `O(n)` | `O(1)` | three pointers + regions | one-pass in-place solution |

---

## Which one to implement?

Current folder me:

- `optimal.ts`

Learning order:
- pehle counting idea samjho
- phir Dutch National Flag ka region-based soch pakdo

Most important interview insight:

```txt
mid unknown region ko inspect karta hai
low 0s ka end maintain karta hai
high 2s ka start maintain karta hai
```
