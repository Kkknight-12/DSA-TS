/**
 * Linked List Cycle II - Optimal Approach (Floyd's Cycle Detection Algorithm)
 *
 * Problem: Given the head of a linked list, return the node where the cycle begins.
 *          If there is no cycle, return null.
 *
 * Approach: Floyd's Two-Pointer Algorithm (Slow-Fast Pointers)
 *
 * Time Complexity: O(n) - visit each node at most twice
 * Space Complexity: O(1) - only two pointers used ✅ Follow-up satisfied!
 *
 * Where n = number of nodes in linked list
 */

namespace LinkedListCycleIIOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Detect cycle start using Floyd's Algorithm
   *
   * Two Phases:
   * Phase 1: Detect if cycle exists (slow/fast pointers)
   * Phase 2: Find cycle start (mathematical approach)
   *
   * Mathematical Proof:
   * Let L = distance from head to cycle start
   * Let C = cycle length
   * Let k = distance from cycle start to meeting point
   *
   * When slow and fast meet:
   *   Slow traveled: L + k
   *   Fast traveled: L + k + nC (n complete cycles)
   *
   * Since fast is 2x speed:
   *   2(L + k) = L + k + nC
   *   2L + 2k = L + k + nC
   *   L + k = nC
   *   L = nC - k
   *
   * This means: Distance from head to cycle start = Distance from meeting point to cycle start!
   */
  function detectCycle(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list
    // Agar list hi empty hai toh cycle ho hi nahi sakta
    if (head === null) {
      return null;
    }

    // PHASE 1: Detect if cycle exists using Floyd's algorithm
    // Slow pointer 1 step chalega, Fast pointer 2 steps chalega

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // Jab tak fast null nahi hota (ya fast.next null nahi hota)
    // WHY: Fast do steps leta hai, isliye fast.next bhi check karna padega
    while (fast !== null && fast.next !== null) {
      // Move slow pointer 1 step forward
      slow = slow!.next;

      // Move fast pointer 2 steps forward
      // WHY: Fast double speed se chalta hai
      fast = fast.next.next;

      // CHECK: Kya slow aur fast mile?
      // Agar haan, matlab cycle exists!
      if (slow === fast) {
        // PHASE 2: Find the cycle start node
        // Ab hume pata hai cycle hai, ab start node dhoondhna hai

        // MATHEMATICAL APPROACH:
        // Ek pointer head se start karo
        // Dusra pointer meeting point se start karo
        // Dono ko 1-1 step se chalao
        // Jahan mile, wahi cycle start hai!

        let ptr1: ListNode | null = head; // Head se start
        let ptr2: ListNode | null = slow; // Meeting point se start

        // Jab tak dono pointers same node pe nahi aa jaate
        while (ptr1 !== ptr2) {
          // Dono ko 1 step aage badhao
          // WHY: Mathematical proof se pata hai same distance travel karenge
          ptr1 = ptr1!.next;
          ptr2 = ptr2!.next;
        }

        // Jab loop break hoga, ptr1 aur ptr2 cycle start pe honge
        return ptr1; // Ya ptr2, dono same hain
      }
    }

    // Agar loop se bahar aa gaye (fast === null ya fast.next === null)
    // Matlab cycle nahi hai
    return null;
  }

  /**
   * ================================
   * DRY RUN - COMPLETE VISUALIZATION
   * ================================
   *
   * Input: head = [3, 2, 0, -4], pos = 1
   *
   * List structure:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2  │ ●──┼──→│ 0 │ ●──┼──→│-4  │ ●  │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *                   ↑                              │
   *                   └───────────────────────────┘
   *
   * Cycle starts at node 2 (pos = 1)
   *
   * Let's trace:
   * L = 1 (head to cycle start: 3 → 2)
   * C = 3 (cycle length: 2 → 0 → -4 → back to 2)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: DETECT CYCLE (Slow-Fast Pointers)
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 1:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   slow = 3
   *   fast = 3
   *
   * Move:
   *   slow moves 1 step → slow = 2
   *   fast moves 2 steps → fast = 0
   *
   * Check: slow === fast?
   *   2 === 0? No!
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2  │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *                 ↑ slow       ↑ fast             │
   *                    ←─────────────────────────┘
   *
   * Continue...
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 2:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   slow = 2
   *   fast = 0
   *
   * Move:
   *   slow moves 1 step → slow = 0
   *   fast moves 2 steps → fast = 2
   *
   * Check: slow === fast?
   *   0 === 2? No!
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2  │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●   │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *                 ↑ fast       ↑ slow             │
   *                    ←─────────────────────────┘
   *
   * Continue...
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 3:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   slow = 0
   *   fast = 2
   *
   * Move:
   *   slow moves 1 step → slow = -4
   *   fast moves 2 steps → fast = -4
   *     (fast: 2 → 0 → -4)
   *
   * Check: slow === fast?
   *   -4 === -4? YES! ✅ CYCLE DETECTED!
   *
   * Meeting Point: -4
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2  │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *                                            ↑    │
   *                         slow & fast meet here   │
   *                     ←─────────────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: FIND CYCLE START (Mathematical Approach)
   * ═════════════════════════════════════════════════════════════════
   *
   * Setup:
   *   ptr1 = head = 3
   *   ptr2 = meeting point = -4
   *
   * Strategy: Move both 1 step at a time until they meet
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 1:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   ptr1 = 3 (at head)
   *   ptr2 = -4 (at meeting point)
   *
   * Check: ptr1 === ptr2?
   *   3 === -4? No!
   *
   * Move:
   *   ptr1 moves 1 step → ptr1 = 2
   *   ptr2 moves 1 step → ptr2 = 2
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2  │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●   │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *     ↑          ↑                              ↑ │
   *   ptr1      Next pos                       ptr2 │
   *                     ←─────────────────────────┘
   *
   * After move:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2  │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *                 ↑ ↑                             │
   *           ptr1 ptr2 (BOTH AT NODE 2!)           │
   *                  ←────────────────────────────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 2:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   ptr1 = 2
   *   ptr2 = 2
   *
   * Check: ptr1 === ptr2?
   *   2 === 2? YES! ✅ FOUND CYCLE START!
   *
   * Loop breaks, return ptr1 (or ptr2, both are same)
   *
   * Final Answer: Node 2 (index 1) ✅
   */

  /**
   * ================================
   * ITERATION TABLE
   * ================================
   */
  /*
   * PHASE 1: CYCLE DETECTION
   *
   * | Iteration | slow | fast | slow moves to | fast moves to | slow === fast? | Action           |
   * |-----------|------|------|---------------|---------------|----------------|------------------|
   * | Initial   | 3    | 3    | -             | -             | No             | Setup            |
   * | 1         | 3    | 3    | 2             | 0             | No             | Continue         |
   * | 2         | 2    | 0    | 0             | 2             | No             | Continue         |
   * | 3         | 0    | 2    | -4            | -4            | **Yes** ✅     | Cycle detected!  |
   *
   * Meeting point: -4
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * PHASE 2: FIND CYCLE START
   *
   * | Iteration | ptr1 | ptr2 | ptr1 moves to | ptr2 moves to | ptr1 === ptr2? | Action           |
   * |-----------|------|------|---------------|---------------|----------------|------------------|
   * | Initial   | 3    | -4   | -             | -             | No             | Setup            |
   * | 1         | 3    | -4   | 2             | 2             | No (before)    | Move both        |
   * | 2         | 2    | 2    | -             | -             | **Yes** ✅     | Cycle start found!|
   *
   * Final Answer: Node 2 (index 1)
   */

  /**
   * ================================
   * MATHEMATICAL PROOF - WHY THIS WORKS
   * ================================
   *
   * This is the MOST IMPORTANT part to understand!
   *
   * Let's define:
   * - L = distance from head to cycle start
   * - C = cycle length
   * - k = distance from cycle start to meeting point
   *
   * Visual representation:
   *
   * Head ─────────→ Cycle Start ─────────→ Meeting Point
   *       (L steps)      ↑        (k steps)      ↓
   *                      │                       │
   *                      └─────────────────────┘
   *                            (C - k steps)
   *
   * Total cycle = k + (C - k) = C
   *
   * When slow and fast meet:
   * - Slow has traveled: L + k
   * - Fast has traveled: L + k + nC (where n = number of complete cycles)
   *
   * Since fast moves at 2x speed of slow:
   *   Distance(fast) = 2 × Distance(slow)
   *   L + k + nC = 2(L + k)
   *   L + k + nC = 2L + 2k
   *   nC = L + k
   *   L = nC - k
   *
   * What does L = nC - k mean?
   *
   * It means: Distance from HEAD to CYCLE START = nC - k
   *
   * Now, if we start from meeting point and travel (nC - k) steps:
   * - We'll complete (n-1) full cycles: (n-1)C steps
   * - Plus (C - k) more steps
   * - This brings us back to CYCLE START!
   *
   * Visual example with our test case:
   *
   * List: 3 → 2 → 0 → -4 → (back to 2)
   *       ↑   ↑
   *       L=1 Cycle Start
   *
   * Cycle: 2 → 0 → -4 → (back to 2)
   * Cycle length C = 3
   *
   * Meeting point: -4
   * k = distance from cycle start (2) to meeting point (-4) = 2
   *   (2 → 0 → -4, that's 2 steps)
   *
   * Using formula: L = nC - k
   *   1 = n(3) - 2
   *   1 = 3n - 2
   *   3n = 3
   *   n = 1
   *
   * So L = 1 × 3 - 2 = 1 ✅ (Matches our L = 1!)
   *
   * Therefore:
   * - Start from HEAD: travel L steps → reach cycle start
   * - Start from MEETING POINT: travel L steps → reach cycle start
   * - BOTH will meet at CYCLE START! 🎯
   */

  /**
   * ================================
   * WHY FLOYD'S ALGORITHM ALWAYS DETECTS CYCLE
   * ================================
   *
   * Question: Kya slow aur fast hamesha milenge agar cycle hai?
   * Answer: Haan! Always!
   *
   * Proof:
   *
   * Assume cycle exists.
   * Once both pointers enter the cycle:
   * - Slow is at some position
   * - Fast is somewhere ahead
   * - Each iteration, fast gets 1 step closer to slow (relative speed = 1)
   * - Eventually, distance becomes 0 → they meet!
   *
   * Example:
   * Cycle: A → B → C → D → back to A
   *
   * Scenario: slow at A, fast at C
   * Distance between them = 2
   *
   * Iteration 1:
   *   slow: A → B (distance = 1)
   *   fast: C → D → A (distance becomes 1)
   *
   * Iteration 2:
   *   slow: B → C (distance = 0)
   *   fast: A → B → C (distance becomes 0)
   *   MEET! ✅
   *
   * They will NEVER miss each other because relative speed is exactly 1.
   * If fast was 3x or 4x speed, they might miss! But 2x is perfect.
   */

  /**
   * ================================
   * EDGE CASES
   * ================================
   */

  /**
   * EDGE CASE 1: Empty list
   * Input: head = null
   *
   * ┌─────┐
   * │null │
   * └─────┘
   *
   * Action: Return null immediately at first check
   */

  /**
   * EDGE CASE 2: Single node, no cycle
   * Input: head = [1], pos = -1
   *
   * ┌───┬────┐
   * │ 1 │null│
   * └───┴────┘
   *
   * Phase 1:
   *   Initial: slow = 1, fast = 1
   *   Loop condition: fast !== null && fast.next !== null
   *   fast.next = null, so loop doesn't execute
   *
   * Return: null (no cycle)
   */

  /**
   * EDGE CASE 3: Single node with self-loop
   * Input: head = [1], pos = 0
   *
   * ┌───┬────┐
   * │ 1 │  ●──┼──┐
   * └───┴─┬──┘   │
   *        └─────┘
   *
   * Phase 1:
   *   Initial: slow = 1, fast = 1
   *   Iteration 1:
   *     slow moves: 1 → 1 (self loop)
   *     fast moves: 1 → 1 → 1 (two steps in self loop = same position)
   *     slow === fast? YES! ✅
   *
   * Phase 2:
   *   ptr1 = head = 1
   *   ptr2 = meeting point = 1
   *   ptr1 === ptr2? YES immediately!
   *
   * Return: Node 1 (cycle starts at itself)
   */

  /**
   * EDGE CASE 4: Two nodes forming cycle
   * Input: head = [1, 2], pos = 0
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2  │ ●  │
   * └───┴────┘   └───┴─┬──┘
   *      ↑              │
   *      └─────────────┘
   *
   * Phase 1:
   *   Initial: slow = 1, fast = 1
   *   Iteration 1:
   *     slow: 1 → 2
   *     fast: 1 → 2 → 1
   *     slow ≠ fast
   *   Iteration 2:
   *     slow: 2 → 1
   *     fast: 1 → 2 → 1
   *     slow === fast? 1 === 1? YES! ✅
   *
   * Phase 2:
   *   ptr1 = head = 1
   *   ptr2 = meeting point = 1
   *   ptr1 === ptr2? YES immediately!
   *
   * Return: Node 1 (cycle starts at head)
   */

  /**
   * EDGE CASE 5: All nodes in cycle (cycle at head)
   * Input: head = [1, 2, 3], pos = 0
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2  │ ●──┼──→│ 3 │ ●  │
   * └───┴────┘   └───┴────┘   └───┴─┬──┘
   *      ↑                            │
   *      └──────────────────────────┘
   *
   * L = 0 (no distance to cycle start)
   * Meeting point can be any node in cycle
   *
   * Phase 2:
   *   ptr1 starts at head (which is cycle start)
   *   ptr2 starts at meeting point
   *   They will meet at cycle start (head) after some iterations
   *
   * Return: Node 1 (head)
   */

  /**
   * ================================
   * PROS AND CONS
   * ================================
   *
   * ✅ Advantages:
   * 1. O(1) space complexity - Only 2-4 pointers used!
   * 2. Satisfies follow-up requirement perfectly
   * 3. Elegant mathematical solution
   * 4. No extra data structures needed
   * 5. Interview favorite - shows deep understanding
   *
   * ❌ Disadvantages:
   * 1. Harder to understand initially (requires mathematical proof)
   * 2. Less intuitive than HashSet approach
   * 3. Two phases can be confusing for beginners
   *
   * When to use:
   * - ✅ In interviews (shows optimal thinking)
   * - ✅ When space is limited
   * - ✅ When dealing with very large lists
   * - ❌ When code clarity is more important than space (use HashSet)
   */

  /**
   * ================================
   * COMPARISON: BRUTE FORCE VS OPTIMAL
   * ================================
   *
   * | Metric           | Brute Force (HashSet) | Optimal (Floyd's) |
   * |------------------|-----------------------|-------------------|
   * | Time Complexity  | O(n)                  | O(n)              |
   * | Space Complexity | O(n)                  | O(1) ✅           |
   * | Ease of Understanding | Easy           | Medium            |
   * | Interview Score  | Good                  | Excellent ✅      |
   * | Code Length      | Shorter               | Slightly longer   |
   * | Follow-up        | ❌ Doesn't satisfy    | ✅ Satisfies      |
   *
   * Key Difference:
   * - Brute Force: Store all visited nodes (O(n) space)
   * - Optimal: Use mathematical insight (O(1) space)
   */

  /**
   * ================================
   * COMMON MISTAKES
   * ================================
   */

  /**
   * MISTAKE 1: Not checking fast.next in while condition
   *
   * ❌ WRONG:
   * while (fast !== null) {
   *   slow = slow.next;
   *   fast = fast.next.next;  // Crash if fast.next is null!
   * }
   *
   * Problem: If fast.next is null, then fast.next.next will crash!
   *
   * ✅ CORRECT:
   * while (fast !== null && fast.next !== null) {
   *   slow = slow.next;
   *   fast = fast.next.next;  // Safe now
   * }
   */

  /**
   * MISTAKE 2: Moving pointers at different speeds in Phase 2
   *
   * ❌ WRONG:
   * // Phase 2
   * let ptr1 = head;
   * let ptr2 = slow;
   * while (ptr1 !== ptr2) {
   *   ptr1 = ptr1.next;
   *   ptr2 = ptr2.next.next;  // Wrong! Should be same speed
   * }
   *
   * Problem: Mathematical proof works only if both move at SAME speed (1 step each)
   *
   * ✅ CORRECT:
   * while (ptr1 !== ptr2) {
   *   ptr1 = ptr1.next;
   *   ptr2 = ptr2.next;  // Both 1 step
   * }
   */

  /**
   * MISTAKE 3: Returning slow instead of starting Phase 2
   *
   * ❌ WRONG:
   * if (slow === fast) {
   *   return slow;  // Wrong! slow is at meeting point, not cycle start
   * }
   *
   * Problem: Meeting point ≠ Cycle start (usually)
   *
   * ✅ CORRECT:
   * if (slow === fast) {
   *   // Start Phase 2 to find actual cycle start
   *   let ptr1 = head;
   *   let ptr2 = slow;
   *   while (ptr1 !== ptr2) {
   *     ptr1 = ptr1.next;
   *     ptr2 = ptr2.next;
   *   }
   *   return ptr1;
   * }
   */

  /**
   * MISTAKE 4: Forgetting to handle empty list
   *
   * ❌ WRONG:
   * function detectCycle(head: ListNode | null): ListNode | null {
   *   let slow = head;
   *   let fast = head;
   *   // If head is null, slow and fast are null, but code might crash later
   * }
   *
   * ✅ CORRECT:
   * function detectCycle(head: ListNode | null): ListNode | null {
   *   if (head === null) return null;  // Explicit check
   *   let slow = head;
   *   let fast = head;
   * }
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log("=== Linked List Cycle II - Optimal (Floyd's Algorithm) ===\n");

    // Test 1: Cycle at index 1 (Example 1)
    console.log('Test 1: Cycle at index 1');
    console.log('Input: [3,2,0,-4], pos = 1');

    const node1 = new ListNode(3);
    const node2 = new ListNode(2);
    const node3 = new ListNode(0);
    const node4 = new ListNode(-4);

    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node2; // Cycle to node2

    const result1 = detectCycle(node1);
    console.log('Expected: Node with value 2');
    console.log('Got:', result1?.val);
    console.log('Test Pass:', result1 === node2 && result1?.val === 2);
    console.log('---\n');

    // Test 2: Cycle at index 0 (Example 2)
    console.log('Test 2: Cycle at index 0 (all nodes in cycle)');
    console.log('Input: [1,2], pos = 0');

    const a = new ListNode(1);
    const b = new ListNode(2);
    a.next = b;
    b.next = a; // Cycle to a

    const result2 = detectCycle(a);
    console.log('Expected: Node with value 1');
    console.log('Got:', result2?.val);
    console.log('Test Pass:', result2 === a && result2?.val === 1);
    console.log('---\n');

    // Test 3: No cycle (Example 3)
    console.log('Test 3: No cycle');
    console.log('Input: [1], pos = -1');

    const x = new ListNode(1);

    const result3 = detectCycle(x);
    console.log('Expected: null');
    console.log('Got:', result3);
    console.log('Test Pass:', result3 === null);
    console.log('---\n');

    // Test 4: Empty list
    console.log('Test 4: Empty list');
    console.log('Input: [], pos = -1');

    const result4 = detectCycle(null);
    console.log('Expected: null');
    console.log('Got:', result4);
    console.log('Test Pass:', result4 === null);
    console.log('---\n');

    // Test 5: Single node with self-loop
    console.log('Test 5: Single node with self-loop');
    console.log('Input: [1], pos = 0');

    const single = new ListNode(1);
    single.next = single; // Self loop

    const result5 = detectCycle(single);
    console.log('Expected: Node with value 1');
    console.log('Got:', result5?.val);
    console.log('Test Pass:', result5 === single && result5?.val === 1);
    console.log('---\n');

    // Test 6: Two nodes, no cycle
    console.log('Test 6: Two nodes, no cycle');
    console.log('Input: [1,2], pos = -1');

    const p = new ListNode(1);
    const q = new ListNode(2);
    p.next = q;

    const result6 = detectCycle(p);
    console.log('Expected: null');
    console.log('Got:', result6);
    console.log('Test Pass:', result6 === null);
    console.log('---\n');

    // Test 7: Large cycle in middle
    console.log('Test 7: Large cycle in middle of list');
    console.log('Input: [1,2,3,4,5,6], pos = 2 (cycle starts at 3)');

    const m1 = new ListNode(1);
    const m2 = new ListNode(2);
    const m3 = new ListNode(3);
    const m4 = new ListNode(4);
    const m5 = new ListNode(5);
    const m6 = new ListNode(6);

    m1.next = m2;
    m2.next = m3;
    m3.next = m4;
    m4.next = m5;
    m5.next = m6;
    m6.next = m3; // Cycle back to m3

    const result7 = detectCycle(m1);
    console.log('Expected: Node with value 3');
    console.log('Got:', result7?.val);
    console.log('Test Pass:', result7 === m3 && result7?.val === 3);
    console.log('---\n');

    // Test 8: Cycle at end
    console.log('Test 8: Cycle at end (last 2 nodes)');
    console.log('Input: [1,2,3,4], pos = 3 (cycle starts at 4)');

    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);

    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n4; // Self loop at end

    const result8 = detectCycle(n1);
    console.log('Expected: Node with value 4');
    console.log('Got:', result8?.val);
    console.log('Test Pass:', result8 === n4 && result8?.val === 4);
    console.log('---\n');

    console.log('✅ All tests completed!');
  }
}

// Run the tests
LinkedListCycleIIOptimal.runTests();