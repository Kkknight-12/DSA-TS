# Celebrity Problem

**Difficulty:** Medium
**Topics:** Stack, Two Pointers, Graph, Matrix
**Similar LeetCode:** [277. Find the Celebrity](https://leetcode.com/problems/find-the-celebrity/)

---

## Problem Statement (Simple Language Mein)

Ek party mein N log hain (0 to N-1 numbered).

**Celebrity Definition:**
- Celebrity ko SARE log jaante hain (everyone knows celebrity)
- Celebrity KISI ko nahi jaanta (celebrity knows no one)

Tumhe ek N×N matrix `M` diya hai:
- `M[i][j] = 1` means person `i` knows person `j`
- `M[i][j] = 0` means person `i` does NOT know person `j`
- `M[i][i] = 0` always (no one knows themselves)

**Task:** Celebrity ka index find karo, ya -1 return karo agar koi celebrity nahi hai.

---

## Understanding the Matrix (M[i][j] Ka Matlab)

Matrix `M` basically ek "kaun kisko jaanta hai" ka record hai.

### Real Life Example

Imagine karo ek party hai jisme 4 log hain:
- Person 0 = **Amit**
- Person 1 = **Bollywood Star** (Celebrity!)
- Person 2 = **Priya**
- Person 3 = **Raj**

```
Party mein:
┌────────────────────────────────────────────────────┐
│                                                    │
│    Amit ──knows──> Bollywood Star                  │
│    Amit ──knows──> Priya                           │
│                                                    │
│    Bollywood Star knows NOBODY (celebrity hai!)    │
│                                                    │
│    Priya ──knows──> Amit                           │
│    Priya ──knows──> Bollywood Star                 │
│                                                    │
│    Raj ──knows──> Bollywood Star                   │
│    Raj ──knows──> Priya                            │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Isko Matrix Mein Likhte Hain

**M[i][j] = 1** means **Person i** jaanta hai **Person j** ko
**M[i][j] = 0** means **Person i** NAHI jaanta **Person j** ko

```
              Person j (Jisko jaante hain)
                 0      1      2      3
              (Amit) (Star) (Priya) (Raj)
            ┌──────────────────────────────┐
Person i  0 │   0      1      1      0     │  Amit
(Jo       1 │   0      0      0      0     │  Bollywood Star
jaanta    2 │   1      1      0      0     │  Priya
hai)      3 │   0      1      1      0     │  Raj
            └──────────────────────────────┘
```

### Row by Row Samjho:

**Row 0 (Amit):** `[0, 1, 1, 0]`
```
M[0][0] = 0  →  Amit khud ko jaanta hai? (Always 0, ignore)
M[0][1] = 1  →  Amit jaanta hai Star ko? YES ✓
M[0][2] = 1  →  Amit jaanta hai Priya ko? YES ✓
M[0][3] = 0  →  Amit jaanta hai Raj ko? NO ✗

Amit 2 logon ko jaanta hai: Star aur Priya
```

**Row 1 (Bollywood Star):** `[0, 0, 0, 0]`
```
M[1][0] = 0  →  Star jaanta hai Amit ko? NO ✗
M[1][1] = 0  →  (Self - ignore)
M[1][2] = 0  →  Star jaanta hai Priya ko? NO ✗
M[1][3] = 0  →  Star jaanta hai Raj ko? NO ✗

Star KISI ko nahi jaanta! ← CELEBRITY SIGN!
```

**Row 2 (Priya):** `[1, 1, 0, 0]`
```
M[2][0] = 1  →  Priya jaanti hai Amit ko? YES ✓
M[2][1] = 1  →  Priya jaanti hai Star ko? YES ✓
M[2][2] = 0  →  (Self - ignore)
M[2][3] = 0  →  Priya jaanti hai Raj ko? NO ✗

Priya 2 logon ko jaanti hai: Amit aur Star
```

**Row 3 (Raj):** `[0, 1, 1, 0]`
```
M[3][0] = 0  →  Raj jaanta hai Amit ko? NO ✗
M[3][1] = 1  →  Raj jaanta hai Star ko? YES ✓
M[3][2] = 1  →  Raj jaanta hai Priya ko? YES ✓
M[3][3] = 0  →  (Self - ignore)

Raj 2 logon ko jaanta hai: Star aur Priya
```

### Celebrity Kaise Check Karein?

**Celebrity ki 2 conditions:**

```
1. ROW CHECK: Celebrity kisi ko nahi jaanta
   → Celebrity ki row mein sab 0 hone chahiye

2. COLUMN CHECK: Sab celebrity ko jaante hain
   → Celebrity ke column mein sab 1 hone chahiye
```

**Check Person 1 (Star):**

```
ROW 1:    [0, 0, 0, 0]  →  All 0s! Star knows NOBODY ✓

COLUMN 1:
  M[0][1] = 1  →  Amit jaanta hai Star ko ✓
  M[1][1] = 0  →  (Self - skip)
  M[2][1] = 1  →  Priya jaanti hai Star ko ✓
  M[3][1] = 1  →  Raj jaanta hai Star ko ✓

  Everyone knows Star! ✓

CELEBRITY FOUND = Person 1 (Bollywood Star)!
```

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   M[i][j] ka matlab:                                        │
│                                                             │
│   ┌─────┐         ┌─────┐                                   │
│   │  i  │──knows──│  j  │    if M[i][j] = 1                │
│   └─────┘         └─────┘                                   │
│                                                             │
│   ┌─────┐    ✗    ┌─────┐                                   │
│   │  i  │─ ─ ─ ─ ─│  j  │    if M[i][j] = 0                │
│   └─────┘         └─────┘                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ROW i    = Person i KISKO jaanta hai (outgoing)          │
│   COLUMN j = Person j ko KAUN jaanta hai (incoming)        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Celebrity:                                                │
│   • Row = All 0s (knows nobody)                            │
│   • Column = All 1s (known by everyone)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### M[i][i] = 0 Kyun?

```
M[i][i] means: Does person i know person i (themselves)?

Ye question hi meaningless hai!
"Kya Amit khud ko jaanta hai?" - Ye sense nahi banata

So by convention, M[i][i] = 0 always (diagonal is always 0)
```

---

## Examples:

### Example 1:
```
M = [
  [0, 1, 1, 0],   // Person 0 knows: 1, 2
  [0, 0, 0, 0],   // Person 1 knows: nobody ← CELEBRITY!
  [1, 1, 0, 0],   // Person 2 knows: 0, 1
  [0, 1, 1, 0]    // Person 3 knows: 1, 2
]

Check Person 1:
- Does 0 know 1? M[0][1] = 1 ✓
- Does 2 know 1? M[2][1] = 1 ✓
- Does 3 know 1? M[3][1] = 1 ✓
- Does 1 know anyone? Row 1 = [0,0,0,0] → NO ✓

Person 1 is known by everyone and knows no one!
Output: 1
```

### Visual:
```
        Knows →
        0  1  2  3
      ┌───────────┐
    0 │ 0  1  1  0 │   Person 0 knows 1,2
    1 │ 0  0  0  0 │   Person 1 knows NOBODY ← Celebrity
K   2 │ 1  1  0  0 │   Person 2 knows 0,1
n   3 │ 0  1  1  0 │   Person 3 knows 1,2
o     └───────────┘
w
s
↓

Column 1: [1, 0, 1, 1] → Persons 0,2,3 know person 1 ✓
Row 1:    [0, 0, 0, 0] → Person 1 knows nobody ✓

Celebrity = Person 1
```

### Example 2:
```
M = [
  [0, 1],   // Person 0 knows: 1
  [1, 0]    // Person 1 knows: 0
]

Person 0: knows person 1 → NOT a celebrity
Person 1: knows person 0 → NOT a celebrity

Both know each other, no celebrity exists!
Output: -1
```

### Example 3:
```
M = [
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 0]
]

Person 2:
- Known by 0 and 1 ✓
- Knows nobody ✓

Output: 2
```

---

## Constraints:
- `2 <= N <= 1000`
- `M[i][j]` is 0 or 1
- `M[i][i] = 0`
- At most one celebrity exists

---

## Key Insight! 🔑

**Every comparison eliminates ONE person!**

```
If A knows B:
  → A is NOT a celebrity (celebrities don't know anyone)
  → Eliminate A

If A does NOT know B:
  → B is NOT a celebrity (everyone should know celebrity)
  → Eliminate B

Either way, ONE person is eliminated!
```

### Visual:

```
Compare Person A and Person B:

Case 1: A knows B (M[A][B] = 1)
  ┌─────────────────────────────┐
  │  A ──knows──> B             │
  │                             │
  │  A knows someone            │
  │  → A can't be celebrity     │
  │  → Eliminate A              │
  └─────────────────────────────┘

Case 2: A does NOT know B (M[A][B] = 0)
  ┌─────────────────────────────┐
  │  A ──✗──> B                 │
  │                             │
  │  Someone doesn't know B     │
  │  → B can't be celebrity     │
  │  → Eliminate B              │
  └─────────────────────────────┘
```

---

## Celebrity Properties:

```
┌─────────────────────────────────────────────────────────────┐
│  For person X to be a celebrity:                            │
│                                                             │
│  1. Row X should be all 0s                                  │
│     → Celebrity knows NO ONE                                │
│                                                             │
│  2. Column X should be all 1s (except M[X][X])             │
│     → EVERYONE knows celebrity                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- Matrix traversal
- Stack basics (for stack approach)
- Two pointer technique (for optimal approach)

---

## Approach 1: Brute Force

### Intuition:
Check each person - do they satisfy both celebrity conditions?

### Algorithm:
```
for each person i from 0 to n-1:
    isCelebrity = true

    // Check: Does i know anyone? (Row check)
    for j from 0 to n-1:
        if i != j and M[i][j] == 1:
            isCelebrity = false
            break

    // Check: Does everyone know i? (Column check)
    if isCelebrity:
        for j from 0 to n-1:
            if i != j and M[j][i] == 0:
                isCelebrity = false
                break

    if isCelebrity:
        return i

return -1
```

### Complexity:
- **Time:** O(n²) - For each of n persons, check n-1 others
- **Space:** O(1)

---

## Approach 2: Using Stack

[visualiser](https://gemini.google.com/gem/9013c4cd97d5/391935126ba966e6)

### Intuition:
Use a stack to eliminate non-celebrities.

1. Push all persons (0 to n-1) onto stack
2. Pop two persons, compare, push back the potential celebrity
3. Repeat until one person remains
4. Verify if that person is actually a celebrity

### Algorithm:
```typescript
function findCelebrity(M: number[][]): number {
    const n = M.length;
    const stack: number[] = [];

    // Push all persons
    for (let i = 0; i < n; i++) {
        stack.push(i);
    }

    // Eliminate until one remains
    while (stack.length > 1) {
        const a = stack.pop()!;
        const b = stack.pop()!;

        if (M[a][b] === 1) {
            // A knows B → A is not celebrity
            stack.push(b);
        } else {
            // A doesn't know B → B is not celebrity
            stack.push(a);
        }
    }

    // Verify the candidate
    const candidate = stack.pop()!;
    for (let i = 0; i < n; i++) {
        if (i !== candidate) {
            // Candidate should not know anyone
            if (M[candidate][i] === 1) return -1;
            // Everyone should know candidate
            if (M[i][candidate] === 0) return -1;
        }
    }

    return candidate;
}
```

### Why Verify?
```
Stack elimination finds a CANDIDATE, not guaranteed celebrity.

Example: M = [[0,1], [1,0]]

Elimination:
- Compare 0 and 1
- 0 knows 1 → eliminate 0, keep 1

Candidate = 1

But verify: Does 1 know anyone?
- M[1][0] = 1 → YES! 1 knows 0

So 1 is NOT a celebrity!
Return -1
```

---

### How Does Elimination Check All Combinations?

**Important:** Hum combinations CHECK nahi kar rahe, hum ELIMINATE kar rahe hain!

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Har comparison se EK person PAKKA eliminate hota hai          │
│                                                                 │
│   Case 1: A knows B                                             │
│     → A jaanta hai kisi ko                                      │
│     → Celebrity kisi ko nahi jaanta                             │
│     → A KABHI BHI celebrity nahi ho sakta                       │
│     → A ko hamesha ke liye eliminate karo!                      │
│                                                                 │
│   Case 2: A doesn't know B                                      │
│     → Ek aadmi hai jo B ko nahi jaanta                          │
│     → Celebrity ko SAB jaante hain                              │
│     → B KABHI BHI celebrity nahi ho sakta                       │
│     → B ko hamesha ke liye eliminate karo!                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Example with 4 people:**

```
Stack: [0, 1, 2, 3]

Comparison 1: Raj(3) vs Priya(2)
  M[3][2] = 1 → Raj knows Priya
  → Raj jaanta hai kisi ko → Raj ELIMINATED!
  Stack: [0, 1, 2]

Comparison 2: Priya(2) vs Star(1)
  M[2][1] = 1 → Priya knows Star
  → Priya jaanti hai kisi ko → Priya ELIMINATED!
  Stack: [0, 1]

Comparison 3: Star(1) vs Amit(0)
  M[1][0] = 0 → Star doesn't know Amit
  → Koi hai jo Amit ko nahi jaanta → Amit ELIMINATED!
  Stack: [1]

4 log → 3 comparisons → 3 eliminated → 1 CANDIDATE
```

**"But Humne Raj vs Amit check nahi kiya!"**

```
Karne ki zarurat nahi!

Raj already Priya ko jaanta hai,
toh wo celebrity ho hi nahi sakta -
chahe wo Amit ko jaane ya na jaane!

┌─────────────────────────────────────────────────────────────────┐
│   Agar A kisi EK bande ko bhi jaanta hai                        │
│   → A celebrity nahi ho sakta                                   │
│   → Baaki logon se compare karna bekar hai                      │
└─────────────────────────────────────────────────────────────────┘
```

---

### Important Doubt: What If Both Don't Know Each Other?

**Scenario:** When comparing 1 vs 0:
- M[1][0] = 0 → 1 doesn't know 0 → We eliminate 0
- But what if M[0][1] = 0 too? → 0 also doesn't know 1!
- Shouldn't 0 also be a potential candidate?

**Answer:** NO! And here's why:

```
Celebrity ki DO conditions hain:

1. Celebrity kisi ko NAHI jaanta (Row = all 0s)
2. SAB celebrity ko jaante hain (Column = all 1s)

Jab 1 doesn't know 0:
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1 ──✗──> 0                                                    │
│                                                                 │
│   Person 1 nahi jaanta Person 0 ko                              │
│                                                                 │
│   Iska matlab: Ek aadmi hai (Person 1) jo 0 ko nahi jaanta     │
│                                                                 │
│   Celebrity ko SAB jaante hain!                                 │
│   But 1 nahi jaanta 0 ko                                        │
│   → 0 celebrity NAHI ho sakta!                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Ye matter nahi karta ki 0 bhi 1 ko nahi jaanta.
0 already disqualified hai kyunki 1 usko nahi jaanta!
```

**Visual Example:**

```
M = [
  [0, 0],    // Person 0 knows: nobody
  [0, 0]     // Person 1 knows: nobody
]

Both don't know anyone! Are both celebrities?

Let's check:

Person 0:
  ✓ Knows nobody (Row 0 = [0,0])
  ✗ But does everyone know 0? M[1][0] = 0 → Person 1 doesn't know 0!
  → 0 is NOT celebrity

Person 1:
  ✓ Knows nobody (Row 1 = [0,0])
  ✗ But does everyone know 1? M[0][1] = 0 → Person 0 doesn't know 1!
  → 1 is NOT celebrity

Result: -1 (No celebrity exists)
```

**The Key Insight:**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   "Kisi ko nahi jaanta" → NECESSARY condition (zaruri hai)      │
│   "Sab usko jaante hain" → ALSO NECESSARY (ye bhi zaruri hai)   │
│                                                                 │
│   Sirf ek condition satisfy karna kaafi nahi!                   │
│   DONO conditions satisfy karni padti hain!                     │
│                                                                 │
│   Elimination phase mein:                                       │
│   - Jab A doesn't know B → B fails "sab jaante hain" condition  │
│   - B eliminate ho gaya, even if B doesn't know anyone          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Another Example:**

```
Compare: Star(1) vs Amit(0)
M[1][0] = 0 → Star doesn't know Amit

Q: "But Amit bhi Star ko nahi jaanta ho sakta hai!"

A: Let's check M[0][1]:

   Case A: M[0][1] = 1 (Amit knows Star)
     → Amit jaanta hai kisi ko → Amit not celebrity anyway!
     → We correctly eliminated Amit

   Case B: M[0][1] = 0 (Amit doesn't know Star)
     → Amit kisi ko nahi jaanta ✓
     → But Star nahi jaanta Amit ko!
     → Amit fails "sab jaante hain" condition
     → Amit not celebrity!
     → We correctly eliminated Amit

Either way, eliminating Amit is CORRECT!
```

### Complexity:
- **Time:** O(n) - Elimination is O(n), verification is O(n)
- **Space:** O(n) - Stack space

---

## Approach 3: Two Pointers (Optimal)

### Intuition:
Same elimination logic, but without stack!

Use two pointers: `left = 0`, `right = n-1`
- If left knows right → left is not celebrity, move left++
- If left doesn't know right → right is not celebrity, move right--
- When left == right, we have our candidate

### Algorithm:
```typescript
function findCelebrity(M: number[][]): number {
    const n = M.length;
    let left = 0;
    let right = n - 1;

    // Find candidate
    while (left < right) {
        if (M[left][right] === 1) {
            // left knows right → left is not celebrity
            left++;
        } else {
            // left doesn't know right → right is not celebrity
            right--;
        }
    }

    // left == right is our candidate
    const candidate = left;

    // Verify
    for (let i = 0; i < n; i++) {
        if (i !== candidate) {
            if (M[candidate][i] === 1) return -1;
            if (M[i][candidate] === 0) return -1;
        }
    }

    return candidate;
}
```

### Complexity:
- **Time:** O(n)
- **Space:** O(1) - No extra space!

---

## Detailed Dry Run (Stack Approach)

```
M = [
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0]
]

═══════════════════════════════════════════════════════════════
PHASE 1: Push all persons to stack
═══════════════════════════════════════════════════════════════

Stack: [0, 1, 2, 3]

═══════════════════════════════════════════════════════════════
PHASE 2: Elimination
═══════════════════════════════════════════════════════════════

Iteration 1:
  Pop a=3, b=2
  M[3][2] = 1 → 3 knows 2 → 3 is NOT celebrity
  Push 2
  Stack: [0, 1, 2]

Iteration 2:
  Pop a=2, b=1
  M[2][1] = 1 → 2 knows 1 → 2 is NOT celebrity
  Push 1
  Stack: [0, 1]

Iteration 3:
  Pop a=1, b=0
  M[1][0] = 0 → 1 doesn't know 0 → 0 is NOT celebrity
  Push 1
  Stack: [1]

Only one person left: candidate = 1

═══════════════════════════════════════════════════════════════
PHASE 3: Verification
═══════════════════════════════════════════════════════════════

Check if candidate 1 is really celebrity:

Row check (1 should not know anyone):
  M[1][0] = 0 ✓
  M[1][2] = 0 ✓
  M[1][3] = 0 ✓
  Person 1 knows nobody ✓

Column check (everyone should know 1):
  M[0][1] = 1 ✓ (0 knows 1)
  M[2][1] = 1 ✓ (2 knows 1)
  M[3][1] = 1 ✓ (3 knows 1)
  Everyone knows 1 ✓

═══════════════════════════════════════════════════════════════
RESULT: Celebrity = 1 ✓
═══════════════════════════════════════════════════════════════
```

---

## Detailed Dry Run (Two Pointer Approach)

```
M = [
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0]
]

═══════════════════════════════════════════════════════════════
PHASE 1: Find Candidate
═══════════════════════════════════════════════════════════════

left = 0, right = 3

Iteration 1:
  M[0][3] = 0 → 0 doesn't know 3 → 3 is NOT celebrity
  right-- → right = 2
  left = 0, right = 2

Iteration 2:
  M[0][2] = 1 → 0 knows 2 → 0 is NOT celebrity
  left++ → left = 1
  left = 1, right = 2

Iteration 3:
  M[1][2] = 0 → 1 doesn't know 2 → 2 is NOT celebrity
  right-- → right = 1
  left = 1, right = 1

left == right → candidate = 1

═══════════════════════════════════════════════════════════════
PHASE 2: Verification (same as stack approach)
═══════════════════════════════════════════════════════════════

Person 1 knows nobody ✓
Everyone knows person 1 ✓

═══════════════════════════════════════════════════════════════
RESULT: Celebrity = 1 ✓
═══════════════════════════════════════════════════════════════
```

---

## Why Verification is Needed?

```
Example: M = [[0,0], [0,0]]

Neither person knows anyone!

Elimination gives candidate = 0 or 1
But verification fails: M[i][candidate] = 0 for some i

Both could be celebrities by "knowing no one" rule,
but neither is known by everyone.

Return -1
```

---

## Comparison Table

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Brute Force** | O(n²) | O(1) | Check each person |
| **Stack** | O(n) | O(n) | Eliminate with comparisons |
| **Two Pointers** | O(n) | O(1) | Optimal! |

---

## Edge Cases

1. **No celebrity:** Everyone knows someone → return -1
2. **Celebrity at index 0:** First person is celebrity
3. **Celebrity at last index:** Last person is celebrity
4. **Two people, both know each other:** No celebrity
5. **Two people, neither knows the other:** No celebrity (no one is known by all)

---

## Related Problems:

- **277. Find the Celebrity** (Medium) - LeetCode Premium
- **997. Find the Town Judge** (Easy) - Similar concept

---

**Konsa approach dekhna hai? Brute Force, Stack, ya Two Pointers?** 🎯