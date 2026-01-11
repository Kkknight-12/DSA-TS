# 735. Asteroid Collision

**Difficulty:** Medium
**Topics:** Stack, Array, Simulation
**LeetCode Link:** [735. Asteroid Collision](https://leetcode.com/problems/asteroid-collision/)

---

## Problem Statement (Simple Language Mein)

Tumhe ek array `asteroids` diya gaya hai jisme integers hain jo asteroids ko represent karte hain.

**Key Points:**
- **Positive number (+)** → Asteroid RIGHT direction mein move kar raha hai →
- **Negative number (-)** → Asteroid LEFT direction mein move kar raha hai ←
- **Absolute value** → Asteroid ka size

**Collision Rules:**
1. Agar do asteroids **opposite directions** mein move kar rahe hain aur meet karte hain → **Collision!**
2. Collision mein **chhota asteroid** explode ho jayega
3. Agar **dono same size** ke hain → **Dono explode** ho jayenge
4. **Same direction** mein move karne wale asteroids **kabhi nahi milenge**

**Return:** Sabhi collisions ke baad jo asteroids survive karte hain unka array.

---

## When Does Collision Happen? (Critical Understanding!)

```
Collision:        ← →  (Moving TOWARDS each other)
                  [-5, 10]  ← Wait, this is wrong!

Actually:
[10, -5]  →  ←   = Collision! (10 moving right, -5 moving left)
[-5, 10]  ←  →   = No Collision! (Moving AWAY from each other)
[5, 10]   →  →   = No Collision! (Same direction)
[-5, -10] ←  ←   = No Collision! (Same direction)
```

**Only Collision Case:**
```
POSITIVE followed by NEGATIVE = Collision possible!
[+ve, -ve] → ← = They will meet!
```

---

## Visual Examples

### Example 1: `[5, 10, -5]`
```
Initial:   5→   10→   ←5

Step 1: 10→ and ←5 collide
        |10| > |-5| → 10 wins, -5 explodes

Result:    5→   10→

Output: [5, 10]
```

### Example 2: `[8, -8]`
```
Initial:   8→   ←8

Collision: |8| = |-8| → Both explode!

Result:    (empty)

Output: []
```

### Example 3: `[10, 2, -5]`
```
Initial:   10→   2→   ←5

Step 1: 2→ and ←5 collide
        |2| < |-5| → -5 wins, 2 explodes

State:     10→   ←5

Step 2: 10→ and ←5 collide
        |10| > |-5| → 10 wins, -5 explodes

Result:    10→

Output: [10]
```

### Example 4: `[3, 5, -6, 2, -1, 4]` (Complex!)
```
Initial:   3→   5→   ←6   2→   ←1   4→

Step 1: 5→ and ←6 collide
        |5| < |-6| → -6 wins, 5 explodes

State:     3→   ←6   2→   ←1   4→

Step 2: 3→ and ←6 collide
        |3| < |-6| → -6 wins, 3 explodes

State:     ←6   2→   ←1   4→

Step 3: ←6 and 2→ - No collision! (Moving away from each other)
        -6 is already to the left, 2 is to the right

Step 4: 2→ and ←1 collide
        |2| > |-1| → 2 wins, -1 explodes

State:     ←6   2→   4→

Step 5: 2→ and 4→ - No collision! (Same direction)

Result:    ←6   2→   4→

Output: [-6, 2, 4]
```

---

## Prerequisites (Agar Koi Chahiye)

- **Stack basics** - LIFO operations
- **Simulation problems** - Process elements one by one

---

## Approach 1: Stack Simulation (Optimal)

### Prerequisites:
- Stack data structure
- Understanding of collision conditions

### Intuition (Soch):

**Key Observation:**
- Asteroids moving RIGHT (+ve) are "waiting" for potential collisions
- Asteroids moving LEFT (-ve) may collide with waiting asteroids

**Stack is perfect here because:**
1. We process asteroids left to right
2. Positive asteroids "wait" on stack for potential collisions
3. When negative asteroid comes, it collides with stack's top (most recent positive asteroid)
4. This continues until collision is resolved

**When do we push to stack?**
- Always push **positive** asteroids (they're waiting for collision)
- Push **negative** asteroid only if:
  - Stack is empty (no one to collide with)
  - Stack top is negative (both moving left, no collision)
  - Negative asteroid wins all battles

**When do we pop from stack?**
- When negative asteroid is BIGGER than stack top (positive asteroid explodes)
- When both are EQUAL size (positive asteroid explodes, negative doesn't get pushed)

### Visual Algorithm:

```
Stack = []
For each asteroid in array:

  If asteroid > 0 (moving right):
    Push to stack (wait for collision)

  Else (asteroid < 0, moving left):
    While (stack not empty AND stack.top > 0 AND stack.top < |asteroid|):
      Pop from stack (positive loses)

    If stack is empty OR stack.top < 0:
      Push asteroid (negative survives)
    Elif stack.top == |asteroid|:
      Pop from stack (both explode)
    // Else: positive wins, negative explodes (do nothing)

Return stack as array
```

### Dry Run: `[10, 2, -5]`

```
Initial: asteroids = [10, 2, -5], stack = []

─────────────────────────────────────────────────
Step 1: Process asteroid = 10 (positive)
─────────────────────────────────────────────────
  10 > 0? YES → Push to stack

  stack = [10]

─────────────────────────────────────────────────
Step 2: Process asteroid = 2 (positive)
─────────────────────────────────────────────────
  2 > 0? YES → Push to stack

  stack = [10, 2]

─────────────────────────────────────────────────
Step 3: Process asteroid = -5 (negative, size 5)
─────────────────────────────────────────────────
  -5 < 0 → Check for collisions!

  Collision loop:
    stack.top = 2 (positive)
    Is 2 > 0 AND 2 < 5? YES → 2 explodes, pop!

    stack = [10]

    stack.top = 10 (positive)
    Is 10 > 0 AND 10 < 5? NO (10 > 5)
    Loop ends

  After loop:
    stack.top = 10 (positive)
    Is 10 == 5? NO
    Is 10 > 5? YES → 10 wins, -5 explodes
    Don't push -5

  stack = [10]

─────────────────────────────────────────────────
Result: stack = [10]
─────────────────────────────────────────────────
Output: [10] ✓
```

### Dry Run: `[3, 5, -6, 2, -1, 4]`

```
Initial: stack = []

Step 1: 3 (positive) → Push
stack = [3]

Step 2: 5 (positive) → Push
stack = [3, 5]

Step 3: -6 (negative, size 6)
  Collision: 5 < 6 → 5 explodes, pop
  stack = [3]

  Collision: 3 < 6 → 3 explodes, pop
  stack = []

  Stack empty → Push -6
  stack = [-6]

Step 4: 2 (positive) → Push
stack = [-6, 2]  ← Note: -6 and 2 don't collide! (moving away)

Step 5: -1 (negative, size 1)
  Collision check: stack.top = 2 (positive)
  2 > 1 → 2 wins, -1 explodes
  Don't push -1
  stack = [-6, 2]

Step 6: 4 (positive) → Push
stack = [-6, 2, 4]

─────────────────────────────────────────────────
Result: [-6, 2, 4] ✓
```

### Algorithm Steps:

1. Initialize empty stack
2. For each asteroid in array:
   - If positive: Push to stack
   - If negative:
     - Keep popping while stack has smaller positive asteroids
     - Handle tie case (both explode)
     - Push negative if it survives
3. Return stack as array

### Complexity Analysis:

**Time Complexity:** O(n)
- Each asteroid is pushed to stack at most once: O(n)
- Each asteroid is popped from stack at most once: O(n)
- Total: O(n)

**Space Complexity:** O(n)
- Stack can hold at most n asteroids (worst case: all same direction)

---

## Edge Cases

### 1. All Positive
```
Input: [1, 2, 3]
Output: [1, 2, 3]
Explanation: All moving right, no collisions
```

### 2. All Negative
```
Input: [-1, -2, -3]
Output: [-1, -2, -3]
Explanation: All moving left, no collisions
```

### 3. Negative Then Positive
```
Input: [-5, 10]
Output: [-5, 10]
Explanation: -5 moving left, 10 moving right - they're moving AWAY!
```

### 4. Equal Size Collision
```
Input: [5, -5]
Output: []
Explanation: Both explode
```

### 5. Chain Destruction
```
Input: [1, 2, 3, 4, -10]
Output: [-10]
Explanation: -10 destroys all positive asteroids
```

### 6. Survivor in Middle
```
Input: [5, -3, 4]
Output: [5, 4]
Explanation: 5 destroys -3, then 4 has no one to collide with
```

---

## Comparison Table

| Approach | Time Complexity | Space Complexity | Notes |
|----------|----------------|------------------|-------|
| **Stack Simulation** | O(n) | O(n) | Optimal! Clean solution |

---

## Key Insights to Remember:

1. **Collision only when:** Positive followed by Negative `[+ve, -ve]`
2. **No collision when:**
   - Same direction `[+ve, +ve]` or `[-ve, -ve]`
   - Moving away `[-ve, +ve]`
3. **Stack tracks** asteroids waiting for collision
4. **While loop** handles chain collisions (one negative destroying multiple positives)

---

## Interview Tips 🎤

### What to Say:

> "I'll use a stack to simulate the collisions. Positive asteroids wait on the stack for potential collisions. When a negative asteroid comes, I'll resolve all collisions with the stack's top until the negative either explodes or survives."

### Common Mistakes:

❌ Forgetting that `[-5, 10]` is NOT a collision (moving away)
❌ Not handling chain collisions (one negative destroying multiple positives)
❌ Not handling the tie case (both explode)
❌ Using absolute value incorrectly

### Follow-up Questions:

**Q: What if asteroids have different speeds?**
> Then we'd need to consider time-based simulation - much more complex!

**Q: What if asteroids can come from 2D space?**
> We'd need 2D collision detection - completely different problem!

---

# ✅ SOLUTION - Stack Simulation

## Complete Code

```typescript
function asteroidCollision(asteroids: number[]): number[] {
    const stack: number[] = [];

    for (const asteroid of asteroids) {
        let survives = true;

        // Collision: current is negative AND stack top is positive
        while (
            survives &&
            stack.length > 0 &&
            stack[stack.length - 1] > 0 &&
            asteroid < 0
        ) {
            const top = stack[stack.length - 1];
            const currentSize = Math.abs(asteroid);
            const topSize = Math.abs(top);

            if (topSize < currentSize) {
                // Negative wins - pop positive, continue
                stack.pop();
            } else if (topSize === currentSize) {
                // Tie - both explode
                stack.pop();
                survives = false;
            } else {
                // Positive wins - negative dies
                survives = false;
            }
        }

        if (survives) {
            stack.push(asteroid);
        }
    }

    return stack;
}
```

## Code Explanation (Line by Line)

```typescript
let survives = true;
// WHY? Track if current asteroid survives all collisions
// Negative asteroid might destroy multiple positives before dying

while (
    survives &&                        // Still alive?
    stack.length > 0 &&                // Anyone to collide with?
    stack[stack.length - 1] > 0 &&     // Top moving right?
    asteroid < 0                        // Current moving left?
) {
// WHY these 4 conditions?
// Only [positive, negative] pattern causes collision
// If any fails → no collision possible
```

**Collision Resolution:**
```typescript
if (topSize < currentSize) {
    stack.pop();              // Positive explodes
    // survives stays true   // Keep checking more positives
}
else if (topSize === currentSize) {
    stack.pop();              // Positive explodes
    survives = false;         // Negative also explodes
}
else {
    survives = false;         // Negative explodes
}
```

---

## Summary

| Aspect | Detail |
|--------|--------|
| **Approach** | Stack Simulation |
| **Time** | O(n) - each element pushed/popped at most once |
| **Space** | O(n) - stack holds all survivors |
| **Key Pattern** | Collision only when `[+ve, -ve]` |

## Critical Insight

```
Collision: [10, -5] → ← = YES!
No Collision: [-5, 10] ← → = Moving AWAY!
```

**Common Mistake:** Thinking `[-5, 10]` causes collision. It doesn't! They're moving in opposite directions AWAY from each other.

---

## Related Problems

- **Valid Parentheses** - Similar stack matching pattern
- **Daily Temperatures** - Stack tracking pattern
- **Remove K Digits** - Stack simulation with removal

🎉 **Asteroid Collision Complete!**