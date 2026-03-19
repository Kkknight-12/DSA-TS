/**
 * BINARY SEARCH ON ANSWER — CONCEPT GUIDE
 * =========================================
 *
 * ═══════════════════════════════════════════════════════════════════
 * REGULAR BINARY SEARCH vs BINARY SEARCH ON ANSWER
 * ═══════════════════════════════════════════════════════════════════
 *
 * REGULAR BINARY SEARCH:
 * ──────────────────────
 * Array pe search karte hain. Search space = array ke elements.
 *
 *   arr = [3, 7, 12, 19, 25, 40],  target = 19
 *          ↑                  ↑
 *         left               right
 *
 *   Array ke elements mein se target dhundho.
 *   Array sorted hoti hai → binary search possible hai.
 *
 * ─────────────────────────────────────────────────────────────────
 *
 * BINARY SEARCH ON ANSWER:
 * ────────────────────────
 * Array pe nahi, POSSIBLE ANSWERS ki range pe search karte hain.
 *
 *   "Minimum ship capacity kya hai jo D days mein sab ship kare?"
 *
 *   Possible answers: [max_weight, ..., sum_of_weights]
 *                      ↑                      ↑
 *                     left                   right
 *
 *   Answers ki range mein binary search karo!
 *   Array sorted nahi bhi ho sakti — sirf ANSWERS ki range sorted hoti hai.
 *
 * ═══════════════════════════════════════════════════════════════════
 * THE KEY INSIGHT — Monotonic Property
 * ═══════════════════════════════════════════════════════════════════
 *
 * Binary Search on Answer tab kaam karta hai jab:
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │  Ek point ke baad:                                           │
 * │  sab answers VALID hain  →  ya  ←  sab answers INVALID hain │
 * │                                                              │
 * │  [INVALID, INVALID, INVALID, VALID, VALID, VALID, VALID]    │
 * │                              ↑                               │
 * │                         answer here                          │
 * └──────────────────────────────────────────────────────────────┘
 *
 * Example — Ship capacity:
 *   capacity=10: ✗ (too less, more days needed)
 *   capacity=11: ✗
 *   capacity=15: ✓ (ships in D days)
 *   capacity=16: ✓
 *   capacity=55: ✓ (1 day, all at once)
 *
 *   [✗, ✗, ✗, ✗, ✓, ✓, ✓, ✓, ✓]
 *               ↑
 *           minimum valid answer = 15
 *
 * ═══════════════════════════════════════════════════════════════════
 * PEHCHAAN KAISE KAREIN — Problem Recognition
 * ═══════════════════════════════════════════════════════════════════
 *
 * Yeh phrases dikhein toh BS on Answer socho:
 *
 *   ✅ "minimum X dhundo such that condition satisfied ho"
 *   ✅ "maximum X dhundo such that condition satisfied ho"
 *   ✅ "minimum days / speed / capacity / pages"
 *   ✅ "maximize the minimum distance"
 *   ✅ "kya X possible hai?" type helper function ban sakti hai
 *
 * Aur yeh check karo:
 *   1. Kya possible answers ki ek clear RANGE define ho sakti hai?
 *   2. Kya ek isPossible(x) function likh sakte hain?
 *   3. Kya "agar x possible hai toh x+1 bhi possible hai" (ya vice versa)?
 *      → Agar haan, monotonic property hai → BS on Answer use karo!
 *
 * ═══════════════════════════════════════════════════════════════════
 * TEMPLATE
 * ═══════════════════════════════════════════════════════════════════
 *
 * // MINIMIZE karna hai (sabse chhota valid value)
 * function solveMinimize(): number {
 *   let left = minPossibleAnswer;
 *   let right = maxPossibleAnswer;
 *
 *   while (left < right) {
 *     const mid = Math.floor((left + right) / 2);
 *
 *     if (isPossible(mid)) {
 *       right = mid;      // mid valid hai, chota try karo
 *     } else {
 *       left = mid + 1;   // mid invalid, bada chahiye
 *     }
 *   }
 *   return left; // minimum valid answer
 * }
 *
 * // MAXIMIZE karna hai (sabse bada valid value)
 * function solveMaximize(): number {
 *   let left = minPossibleAnswer;
 *   let right = maxPossibleAnswer;
 *   let result = -1;
 *
 *   while (left <= right) {
 *     const mid = Math.floor((left + right) / 2);
 *
 *     if (isPossible(mid)) {
 *       result = mid;     // mid valid hai, bada try karo
 *       left = mid + 1;
 *     } else {
 *       right = mid - 1;  // mid invalid, chota chahiye
 *     }
 *   }
 *   return result;
 * }
 *
 * // Helper — yeh problem-specific hoti hai, O(n) usually
 * function isPossible(value: number): boolean {
 *   // Check: kya is value se condition satisfy hoti hai?
 * }
 *
 * ═══════════════════════════════════════════════════════════════════
 * HOW SEARCH SPACE IS DEFINED — Yeh sabse important step hai!
 * ═══════════════════════════════════════════════════════════════════
 *
 * ┌──────────────────────────────────────────────────────────────────┐
 * │ Problem                 │ left (min)        │ right (max)        │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Ship capacity           │ max(weights)       │ sum(weights)       │
 * │   WHY left: heaviest    │                   │ WHY right: 1 din   │
 * │   package fit hona      │                   │ mein sab ship      │
 * │   chahiye               │                   │                    │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Koko bananas (min speed)│ 1                  │ max(piles)         │
 * │   WHY left: eat at      │                   │ WHY right: ek pile │
 * │   least 1 banana/hr     │                   │ ek ghante mein     │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Book allocation         │ max(pages)         │ sum(pages)         │
 * │   (min max pages)       │ WHY: 1 student     │ WHY: 1 student     │
 * │                         │ gets heaviest book │ gets all books     │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Aggressive cows         │ 1                  │ max(pos)-min(pos)  │
 * │   (max min distance)    │ WHY: min dist=1    │ WHY: 2 cows at     │
 * │                         │                   │ extreme ends       │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Nth root of m           │ 1                  │ m                  │
 * │                         │ WHY: root >= 1     │ WHY: x^1 = x       │
 * └──────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════
 * VISUAL COMPARISON — Same problem, two approaches
 * ═══════════════════════════════════════════════════════════════════
 *
 * Problem: Find cube root of 27
 *
 * REGULAR BS approach (wrong thinking):
 *   "Array [1..27] mein 27 ka cube root dhundho"
 *   → Yeh awkward hai, array banana padega
 *
 * BS ON ANSWER approach (correct thinking):
 *   "Possible answers [1..27] mein se x dhundho jahan x³ = 27"
 *   mid=14: 14³=2744 > 27 → right=13   (answers 14..27 eliminate)
 *   mid=7:  7³=343  > 27 → right=6    (answers 7..13 eliminate)
 *   mid=3:  3³=27   = 27 → return 3 ✅
 *
 * ═══════════════════════════════════════════════════════════════════
 * PROBLEMS IN THIS PROJECT (src/questions/binary_search/on-answer/)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Easy:
 *   - nth-root-of-number    → x^n = m?
 *   - find-square-root      → x² ≤ n (floor)
 *
 * Medium:
 *   - koko-eating-bananas   → minimize eating speed
 *   - capacity-to-ship      → minimize ship capacity
 *   - smallest-divisor      → minimize divisor
 *   - kth-missing-positive  → find kth missing number
 *
 * Hard:
 *   - book-allocation       → minimize max pages per student
 *   - painter-partition     → minimize max time
 *   - aggressive-cows       → maximize min distance
 *   - split-array-largest   → minimize largest sum
 *   - min-days-bouquets     → find minimum days
 *   - min-max-gas-station   → minimize max distance
 *   - median-two-sorted-arrays → partition-based BS
 */

export {};
