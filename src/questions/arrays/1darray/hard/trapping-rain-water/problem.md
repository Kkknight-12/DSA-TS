# Trapping Rain Water

Given an array `height` where each element represents the height of a bar of width `1`, return how much rain water can be trapped after raining.

Important:
- width of every bar is `1`
- water only stays where there is a boundary on both sides
- answer total trapped water hai, not per-index array

Example:

```txt
height = [4, 2, 0, 3, 2, 5]
```

Visual (`# = bar`, `. = empty`):

```txt
L5 | . . . . . #
L4 | # . . . . #
L3 | # . . # . #
L2 | # # . # # #
L1 | # # . # # #
     4 2 0 3 2 5
```

Water after rain (`~ = trapped water`):

```txt
L5 | . . . . . #
L4 | # ~ ~ ~ ~ #
L3 | # ~ ~ # ~ #
L2 | # # ~ # # #
L1 | # # ~ # # #
     4 2 0 3 2 5
```

Answer:

```txt
9
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har index `i` par paani kitna trap hoga?

Uske liye do cheezein chahiye:
- `0..i` tak tallest bar, current bar included
- `i..n-1` tak tallest bar, current bar included

Current bar include karna important hai.
Isse `min(leftMax, rightMax)` kabhi `height[i]` se chhota nahi hota,
so water negative nahi banega.

Current bar ke upar maximum water level hoga:

```txt
min(leftMax, rightMax)
```

So:

```txt
waterAtI = min(leftMax, rightMax) - height[i]
```

**How it works:**

1. Har index `i` ke liye left side scan karke `leftMax` nikalo
2. Har index `i` ke liye right side scan karke `rightMax` nikalo
3. `min(leftMax, rightMax) - height[i]` add karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why slow:**

Har index pe leftMax aur rightMax fresh scan karne pad rahe hain.

---

## Approach 2: Better

**Prerequisites (Agar Koi Chahiye):**
- **Prefix max / suffix max idea**
- **Why needed:** same max values baar-baar recompute nahi karne

**Intuition (Soch):**

Brute force ka main waste:

```txt
same leftMax / rightMax values ko baar-baar nikaalna
```

Toh:
- ek `leftMax[]` array bana lo
- ek `rightMax[]` array bana lo

Then each index par water instantly mil jayega.

**How it works:**

1. `leftMax[i]` = `0..i` ka maximum
2. `rightMax[i]` = `i..n-1` ka maximum
3. Har index par:
   `water = min(leftMax[i], rightMax[i]) - height[i]`

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why better than brute:**

Repeated scans hat gaye.

---

## Approach 3: Optimal

**Prerequisites (Agar Koi Chahiye):**
- **Two pointers**
- **Invariant / region thinking**
- **Why needed:** leftMax / rightMax arrays ke bina same logic apply karna

**Intuition (Soch):**

Suppose currently:

```txt
leftMax <= rightMax
```

Toh left side ka water level already decide ho gaya.
Why?

Because `rightMax` already at least `leftMax` hai.
Matlab right side par itni wall mil chuki hai ki current left index ke liye
left boundary hi bottleneck ban sakti hai.

Unknown middle area me kuch bhi ho,
current `left` index ka final limiting side `leftMax` se better nahi ho sakta.

So left position ka water:

```txt
leftMax - height[left]
```

Similarly:

```txt
if rightMax < leftMax
```

toh right side ka water safely decide ho sakta hai:

```txt
rightMax - height[right]
```

**How it works:**

1. `left = 0`, `right = n - 1`
2. `leftMax`, `rightMax` maintain karo
3. Har step par smaller max side process karo
4. Us side ka water add karo
5. Same side pointer move karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

Same core formula use ho rahi hai,
but extra arrays ki zarurat nahi.

---

## Comparison Table

| Approach | Time | Space | Main Idea | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | every index pe left/right max fresh scan | simple but slow |
| Better | `O(n)` | `O(n)` | leftMax/rightMax arrays precompute | easy optimization step |
| Optimal | `O(n)` | `O(1)` | smaller max side process karo | interview-favorite |

---

## Which one to implement?

Current folder me:

- `brute-force.ts`
- `better.ts`
- `optimal.ts`

Learning order:
- pehle brute se formula samjho
- phir better se repeated work hatao
- phir optimal me samjho:
  why one side safely process ki ja sakti hai

Most important memory line:

```txt
water at i = min(left boundary, right boundary) - current height
```
