/**
 * BINARY SEARCH - CONCEPTS & MENTAL MODELS
 * ==========================================
 *
 * Yeh file conceptual understanding ke liye hai.
 * Working implementations ke liye dekho: binary_search_patterns_code.ts
 * Quick reference ke liye dekho: binary_search_cheatsheet.md
 *
 * Table of Contents:
 * 1. Core Mental Model — Binary Search Ka Asli Kaam
 * 2. Two Core Patterns — Side by Side
 * 3. mid Calculation — Teen Flavors
 * 4. left=mid+1 vs left=mid — Kab Skip Karo Mid
 * 5. Decision Flowchart — Pattern Kaise Chuno
 * 6. Common Mistakes
 * 7. Problem Type → Pattern Lookup Table
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 1: CORE MENTAL MODEL
 * ═══════════════════════════════════════════════════════════════════
 *
 * Binary search ka kaam ek hi hai:
 * HAR STEP MEIN HALF SEARCH SPACE ELIMINATE KARO.
 *
 * Iske liye ek MONOTONIC PROPERTY chahiye:
 * "Ek point ke baad sab valid, ya sab invalid hona chahiye."
 *
 * Visual:
 *
 *   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  target = 7
 *    L                             R
 *                   M = 5
 *
 *   arr[M]=5 < target=7 → left half useless, kill it!
 *
 *   [_, _, _, _, _, 6, 7, 8, 9, 10]
 *                   L            R
 *                        M = 8
 *
 *   arr[M]=8 > target=7 → right half useless, kill it!
 *
 *   [_, _, _, _, _, 6, 7, _,  _,  _]
 *                   L  R
 *                      M = 7 ✅
 *
 * Har step mein problem HALF hoti hai → O(log n)
 *
 * ═══════════════════════════════════════════════════════════════════
 * Binary Search on Answer Space (most useful pattern!):
 * ═══════════════════════════════════════════════════════════════════
 *
 * Kabhi kabhi array sorted nahi hoti, but ANSWER SPACE sorted hoti hai!
 *
 * Example: "Minimum ship capacity dhundo"
 *
 * Capacity:  [10, 11, 12, 13, 14, 15, 16, ... 55]
 *              ✗   ✗   ✗   ✗   ✗   ✓   ✓  ...  ✓
 *                                  ↑
 *                              answer here
 *
 * Yeh monotonic hai! Ek baar valid hua → aage sab valid.
 * Binary search perfectly kaam karta hai yahan.
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 2: TWO CORE PATTERNS — SIDE BY SIDE
 * ═══════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────┬──────────────────────────────────┐
 * │ PATTERN 1                       │ PATTERN 2                        │
 * │ while (left <= right)           │ while (left < right)             │
 * ├─────────────────────────────────┼──────────────────────────────────┤
 * │ right = mid - 1 (skip mid)      │ right = mid (keep mid)           │
 * │ Loop exits: left > right        │ Loop exits: left === right       │
 * │ Return: result variable         │ Return: left (or right, same)    │
 * ├─────────────────────────────────┼──────────────────────────────────┤
 * │ Kab use karo:                   │ Kab use karo:                    │
 * │ - Exact element dhundna         │ - Min/Max valid value            │
 * │ - -1 return karna ho            │ - Answer guaranteed exist karta  │
 * │ - Classic binary search         │ - Insertion position             │
 * │ - Rotated array exact search    │ - Most optimization problems     │
 * └─────────────────────────────────┴──────────────────────────────────┘
 *
 * ───────────────────────────────────────────────────────────────────
 * WHY Pattern 2 is SAFER for optimization problems:
 * ───────────────────────────────────────────────────────────────────
 *
 * Problem: minimum valid value >= 8 in range [5..15]
 *
 * PATTERN 1 risk:
 *   mid=10 is valid → right = mid - 1 = 9  ← 10 gaya!
 *   mid=7  invalid  → left = 8
 *   mid=8  is valid → right = mid - 1 = 7  ← 8 bhi gaya!
 *   left=8 > right=7 → loop ends
 *   But we LOST 8... isliye MUST save: answer = 8 pehle!
 *
 * PATTERN 2 safety:
 *   mid=10 is valid → right = mid = 10  ← 10 range mein hai!
 *   mid=7  invalid  → left = 8
 *   mid=8  is valid → right = mid = 8   ← 8 range mein hai!
 *   left=8 === right=8 → loop ends
 *   Return left = 8 ✅ — answer khud aa gaya, save karne ki zaroorat nahi!
 *
 * ───────────────────────────────────────────────────────────────────
 * WARNING: Pattern 2 can't detect "not found"!
 * ───────────────────────────────────────────────────────────────────
 *
 * Pattern 2 assumes answer ALWAYS exists in range.
 * Agar exact match nahi mila toh bhi left = right pe koi value hogi.
 * That's why -1 return karne wale problems mein Pattern 1 use karo.
 *
 * // ❌ WRONG — Pattern 2 for exact match
 * while (left < right) {
 *   ...
 *   else right = mid; // Infinite loop agar target exist na kare!
 * }
 * return arr[left] === target ? left : -1; // Extra check chahiye
 *
 * // ✅ CORRECT — Pattern 1 for exact match
 * while (left <= right) {
 *   if (arr[mid] === target) return mid;
 *   ...
 * }
 * return -1;
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 3: MID CALCULATION — TEEN FLAVORS
 * ═══════════════════════════════════════════════════════════════════
 *
 * ┌──────────────────────────────────────┬───────────────────────────┐
 * │ Formula                              │ Kab use karo              │
 * ├──────────────────────────────────────┼───────────────────────────┤
 * │ Math.floor((left + right) / 2)       │ Default. Most cases.      │
 * │  → LOWER mid                         │ When right = mid          │
 * ├──────────────────────────────────────┼───────────────────────────┤
 * │ left + Math.floor((right - left) / 2)│ Same as above +           │
 * │  → LOWER mid (overflow safe)         │ prevents integer overflow │
 * ├──────────────────────────────────────┼───────────────────────────┤
 * │ Math.floor((left + right + 1) / 2)   │ When left = mid           │
 * │  → UPPER mid                         │ Maximization problems     │
 * └──────────────────────────────────────┴───────────────────────────┘
 *
 * WHY upper mid matters — infinite loop scenario:
 *
 *   left = 2, right = 3
 *
 *   With LOWER mid:
 *     mid = floor((2+3)/2) = 2
 *     Condition true → left = mid = 2  ← LEFT NAHI BADA! Infinite loop ♾️
 *
 *   With UPPER mid:
 *     mid = floor((2+3+1)/2) = 3
 *     Condition true → left = mid = 3  ← left = right → loop ends ✅
 *
 * SIMPLE RULE:
 *   Jab bhi  left = mid  likho → UPPER mid use karo
 *   Jab bhi right = mid  likho → LOWER mid safe hai (default)
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 4: left=mid+1 vs left=mid — KAB SKIP KARO MID
 * ═══════════════════════════════════════════════════════════════════
 *
 * Yeh binary search ka sabse confusing part hai. Ek simple question:
 *
 * ┌─────────────────────────────────────────────────────┐
 * │  "Kya mid ab bhi answer ban sakta hai?"              │
 * │                                                     │
 * │  YES → mid ko range mein rakho                      │
 * │         right = mid    (shrink from top, keep mid)  │
 * │         left  = mid    (shrink from bottom, rare)   │
 * │                                                     │
 * │  NO  → mid ko skip karo                             │
 * │         right = mid - 1  (skip mid, go left)        │
 * │         left  = mid + 1  (skip mid, go right)       │
 * └─────────────────────────────────────────────────────┘
 *
 * ───────────────────────────────────────────────────────────────────
 * Concrete examples:
 * ───────────────────────────────────────────────────────────────────
 *
 * Example A — Find Square Root:
 *   mid² < n → mid valid candidate hai, but bada exist kar sakta hai
 *              Save result = mid, then left = mid + 1 (mid already saved!)
 *   mid² > n → mid too big, definitely wrong → right = mid - 1
 *
 * Example B — Find First Occurrence:
 *   arr[mid] === target → mid COULD be first occurrence!
 *                         right = mid (keep mid, search for earlier)
 *   arr[mid] < target  → mid definitely not target → left = mid + 1
 *   arr[mid] > target  → mid definitely not target → right = mid - 1
 *
 * Example C — Koko Eating Bananas (Minimize speed):
 *   canEat(mid) === true → mid valid, but smaller might work
 *                          right = mid (keep mid as candidate)
 *   canEat(mid) === false → mid too slow, need faster → left = mid + 1
 *
 * ───────────────────────────────────────────────────────────────────
 * Summary table:
 * ───────────────────────────────────────────────────────────────────
 *
 * ┌───────────────────────────┬──────────────┬────────────────────────┐
 * │ Situation                 │ Update       │ Why                    │
 * ├───────────────────────────┼──────────────┼────────────────────────┤
 * │ Mid invalid, need bigger  │ left=mid+1   │ Skip mid               │
 * │ Mid invalid, need smaller │ right=mid-1  │ Skip mid               │
 * │ Mid valid, need smaller   │ right=mid    │ Keep mid as candidate  │
 * │ Mid valid, need bigger    │ left=mid     │ Keep mid (+ upper mid!)│
 * │ Mid valid, save & shrink  │ result=mid   │ Pattern 1 style        │
 * │                           │ left=mid+1   │                        │
 * └───────────────────────────┴──────────────┴────────────────────────┘
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 5: DECISION FLOWCHART — PATTERN KAISE CHUNO
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Problem dekho
 *       │
 *       ▼
 *  Exact element dhundh rahe ho?
 *  Ya -1 return karna ho agar na mile?
 *       │
 *    YES│                    NO│
 *       ▼                      ▼
 *  PATTERN 1             Answer guaranteed exist karta hai
 *  left <= right         (range mein koi answer zaroor hai)?
 *  right = mid - 1            │
 *  return result         YES  │
 *                             ▼
 *                        PATTERN 2
 *                        left < right
 *                             │
 *                    ┌────────┴────────┐
 *                    │                 │
 *               Minimize?         Maximize?
 *                    │                 │
 *                    ▼                 ▼
 *             right = mid        left = mid
 *             (lower mid ok)     (UPPER mid!)
 *             return left        return left
 *
 * ───────────────────────────────────────────────────────────────────
 * Quick check — agar aap confused ho Pattern 1 ya 2 mein:
 * ───────────────────────────────────────────────────────────────────
 *
 * Soch: "Agar mujhe answer milta hai (valid value), toh kya mujhe
 *        us value ko RANGE MEIN RAKHNA hai ya SKIP KARNA hai?"
 *
 *   RANGE MEIN RAKHNA hai (could be answer) → Pattern 2 (right = mid)
 *   SKIP KARNA hai (save & move on)          → Pattern 1 (result = mid, right = mid-1)
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 6: COMMON MISTAKES
 * ═══════════════════════════════════════════════════════════════════
 *
 * Mistake 1: INFINITE LOOP — left = mid with lower mid
 * ────────────────────────────────────────────────────
 *   ❌  left = Math.floor((left + right) / 2)     // lower mid
 *   ✅  left = Math.floor((left + right + 1) / 2) // upper mid
 *
 *   Jab bhi left = mid likho, upper mid use karo. Always.
 *
 * Mistake 2: LOST ANSWER — Pattern 1 without saving
 * ─────────────────────────────────────────────────
 *   ❌ if (isValid(mid)) right = mid - 1; // mid gaya, answer bhi gaya!
 *   ✅ if (isValid(mid)) { result = mid; right = mid - 1; } // save first
 *
 * Mistake 3: WRONG BOUNDARY for insertion position
 * ─────────────────────────────────────────────────
 *   ❌ let right = arr.length - 1; // Can't insert at end!
 *   ✅ let right = arr.length;     // Insertion can be at index n
 *
 * Mistake 4: PATTERN 2 for "not found" case
 * ──────────────────────────────────────────
 *   Pattern 2 loop always converges to SOME index.
 *   Agar target exist na kare, wrong answer milega.
 *   Exact match + -1 fallback = Pattern 1 only.
 *
 * Mistake 5: WRONG RETURN VALUE
 * ─────────────────────────────
 *   Pattern 1: Return result (saved during search), NOT left or right
 *   Pattern 2: Return left (= right at loop exit)
 *   Rotated min: Return nums[left], not left
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * SECTION 7: PROBLEM TYPE → PATTERN LOOKUP
 * ═══════════════════════════════════════════════════════════════════
 *
 * ┌────────────────────────────────────┬───────────┬──────────────────────────────┐
 * │ Problem                            │ Pattern   │ When valid, update           │
 * ├────────────────────────────────────┼───────────┼──────────────────────────────┤
 * │ Classic binary search              │ 1         │ Exact match → return mid     │
 * │ Search in rotated array            │ 1         │ Exact match → return mid     │
 * │ K-th missing positive              │ 1         │ —                            │
 * ├────────────────────────────────────┼───────────┼──────────────────────────────┤
 * │ Lower bound (first >= target)      │ 2         │ right = mid                  │
 * │ Upper bound (first > target)       │ 2         │ right = mid                  │
 * │ Search insert position             │ 2         │ right = mid                  │
 * │ First occurrence                   │ 2         │ right = mid                  │
 * │ Find min in rotated array          │ 2         │ right = mid                  │
 * │ Peak element                       │ 2         │ right = mid                  │
 * │ Koko bananas (min speed)           │ 2         │ right = mid                  │
 * │ Ship packages (min capacity)       │ 2         │ right = mid                  │
 * │ Book allocation (min pages)        │ 2         │ right = mid                  │
 * │ Split array largest sum            │ 2         │ right = mid                  │
 * ├────────────────────────────────────┼───────────┼──────────────────────────────┤
 * │ Last occurrence                    │ 2 (upper) │ left = mid (upper mid!)      │
 * │ Aggressive cows (max min-dist)     │ 2 (upper) │ left = mid (upper mid!)      │
 * │ Find sqrt (floor)                  │ 1         │ result=mid, left=mid+1       │
 * │ Nth root                           │ 1         │ result=mid, left=mid+1       │
 * │ Median of two sorted arrays        │ 1         │ partition search             │
 * └────────────────────────────────────┴───────────┴──────────────────────────────┘
 *
 * Pattern 2 dominates! Most real problems are optimization/boundary problems.
 * Pattern 1 only for: exact match, -1 fallback, or mathematical floor problems.
 */

export {}; // Makes this a module to avoid global namespace pollution
