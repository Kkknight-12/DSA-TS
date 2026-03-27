/**
 * BOOK ALLOCATION - BINARY SEARCH ON ANSWER (OPTIMAL)
 * ====================================================
 *
 * PROBLEM:
 * N books aur M students hain. Har book ke pages arr[i] mein hain.
 * Books ko students mein is tarah allocate karo:
 *   1. Har student ko CONTIGUOUS books milni chahiye (order maintain)
 *   2. Har student ko kam se kam 1 book milni chahiye
 *   3. Maximum pages jo kisi bhi student ko milti hain — woh MINIMIZE karo
 *
 * Example:
 *   arr = [12, 34, 67, 90], students = 2
 *
 *   Option A: [12,34,67] | [90] → max = 113
 *   Option B: [12,34]    | [67,90] → max = 157
 *   Option C: [12]       | [34,67,90] → max = 191
 *
 *   Answer = 113 (Option A is best!)
 *
 * INTUITION (Soch):
 * ─────────────────
 * Hum possible answers ki range pe binary search karenge:
 * "Kya maximum pages = X se allocation possible hai?"
 *cl
 * Agar X pe possible hai → X aur chota try karo (minimize!)
 * Agar X pe possible nahi → X bada karo
 *
 * Yeh MONOTONIC hai:
 * - Agar X possible hai → X+1, X+2 bhi possible honge (zyada space = easier)
 * - Agar X possible nahi → X-1 bhi possible nahi hoga
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  arr = [12, 34, 67, 90], students = 2                    │
 * │                                                          │
 * │  left = max(arr) = 90    (min possible max)              │
 * │  right = sum(arr) = 203  (max possible — 1 student all)  │
 * │                                                          │
 * │  maxPages=90:  [12,34,?] | next student for 67... need   │
 * │                3 students > 2 ✗                          │
 * │  maxPages=113: [12,34,67] | [90] → 2 students ✓          │
 * │  maxPages=150: [12,34,67] | [90] → 2 students ✓          │
 * │  maxPages=203: [12,34,67,90] → 1 student ✓               │
 * │                                                          │
 * │  [✗, ✗, ..., ✓, ✓, ✓, ✓]                                │
 * │               ↑                                          │
 * │          first valid = 113 ✅                            │
 * └──────────────────────────────────────────────────────────┘
 *
 * GREEDY ALLOCATION (isPossible helper):
 * ──────────────────────────────────────
 * Har student ko greedily books do jab tak maxPages cross na ho.
 * Cross hone pe next student ko de do.
 * Agar total students ≤ m → possible!
 *
 * WHY greedy works: Ek student ko jitni zyada books doge, baaki students
 * ke liye books kam honge. Greedy optimal starting point hai.
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = max(arr)   → WHY: Har student ko 1 book chahiye. Sabse badi book
 *                      ki pages se kam max nahi ho sakta.
 * right = sum(arr)   → WHY: Agar 1 student sabhi books le, max = sum.
 *
 * NOTE: left = max(arr) se m > arr.length ka edge case bhi handle hota hai
 *       because isPossible already returns false if we need too many students.
 *
 * ALGORITHM:
 * ──────────
 * 1. Edge case: m > arr.length → return -1 (impossible)
 * 2. left=max(arr), right=sum(arr)
 * 3. Binary search (MINIMIZE → Pattern 2: left < right):
 *    a. mid = (left+right)/2
 *    b. isPossible(mid)? → right=mid (keep candidate, try smaller)
 *    c. else             → left=mid+1 (need bigger max)
 * 4. return left
 *
 * TIME COMPLEXITY: O(n × log(sum-max))
 *   - Binary search: O(log(sum-max)) iterations
 *   - Each isPossible: O(n)
 *
 * SPACE COMPLEXITY: O(1)
 */

namespace BookAllocationOptimal {
  /**
   * Helper: checks if allocation is possible with given maxPages limit
   * Greedily assigns books to students, switching student when limit crossed
   */
  function isPossible(
    arr: number[],
    students: number,
    maxPages: number
  ): boolean {
    // Ek student se shuru karo — greedy approach
    let studentsNeeded = 1;
    let currentPages = 0;

    for (const pages of arr) {
      // Kya yeh book current student ke budget mein fit hogi?
      if (currentPages + pages > maxPages) {
        // Nahi! Next student ko assign karo
        studentsNeeded++;
        currentPages = pages; // New student yahan se shuru karta hai

        // Agar required students, available students se zyada ho gaye
        if (studentsNeeded > students) return false;
      } else {
        // Haan! Current student le sakta hai
        currentPages += pages;
      }
    }

    // Saari books allocate ho gayi within students limit
    return true;
  }

  /**
   * Finds minimum possible maximum pages allocated to any student
   *
   * @param arr - Array of book pages (contiguous allocation only)
   * @param students - Number of students to allocate to
   * @returns Minimum of maximum pages, or -1 if impossible
   */
  function allocateBooks(arr: number[], students: number): number {
    // Edge case: students se zyada books nahi hain — allocation impossible
    // WHY: Har student ko at least 1 book chahiye
    if (students > arr.length) return -1;

    // Search space: [max(arr) .. sum(arr)]
    // WHY left=max: Sabse badi book sabse bure student ko milegi
    // WHY right=sum: Ek student ko sab books mil sakti hain
    let left = Math.max(...arr);
    let right = arr.reduce((sum, pages) => sum + pages, 0);

    // MINIMIZE pattern: Pattern 2 (left < right)
    // WHY Pattern 2: Sabse chota valid value chahiye → right=mid (keep candidate)
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (isPossible(arr, students, mid)) {
        // mid pe possible hai, but chota bhi ho sakta hai → right=mid
        right = mid;
      } else {
        // mid pe possible nahi → maxPages bada chahiye
        left = mid + 1;
      }
    }

    // left === right → minimum valid maxPages
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr = [12, 34, 67, 90], students = 2
   *
   * Search space:
   *   left  = max(12,34,67,90) = 90
   *   right = 12+34+67+90 = 203
   *
   * Visual search space:
   *   [90 ──────────────────────────────── 203]
   *    ↑                                    ↑
   *   min possible                     max possible
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=90, right=203, mid=146                            │
   * │ isPossible(maxPages=146)?                              │
   * │   S1: 12 → 12+34=46 → 46+67=113 → 113+90=203>146 ✗  │
   * │   S2: 90 (studentsNeeded=2 ≤ 2 ✓)                    │
   * │   Allocation: [12,34,67] | [90] → TRUE                │
   * │ → right = 146 (146 is valid, try smaller)              │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=90, right=146, mid=118                            │
   * │ isPossible(maxPages=118)?                              │
   * │   S1: 12 → 46 → 113 → 113+90=203>118 ✗              │
   * │   S2: 90 (studentsNeeded=2 ≤ 2 ✓)                    │
   * │   Allocation: [12,34,67] | [90] → TRUE                │
   * │ → right = 118                                          │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=90, right=118, mid=104                            │
   * │ isPossible(maxPages=104)?                              │
   * │   S1: 12 → 46 → 46+67=113>104 ✗                      │
   * │   S2: 67 → 67+90=157>104 ✗                           │
   * │   S3 needed: studentsNeeded=3 > 2 → FALSE             │
   * │ → left = 105                                           │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 4:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=105, right=118, mid=111                           │
   * │ isPossible(maxPages=111)?                              │
   * │   S1: 12 → 46 → 46+67=113>111 ✗                      │
   * │   S2: 67 → 67+90=157>111 ✗                           │
   * │   S3 needed: studentsNeeded=3 > 2 → FALSE             │
   * │ → left = 112                                           │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 5:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=112, right=118, mid=115                           │
   * │ isPossible(maxPages=115)?                              │
   * │   S1: 12 → 46 → 113 → 113+90=203>115 ✗              │
   * │   S2: 90 (studentsNeeded=2 ≤ 2 ✓) → TRUE             │
   * │ → right = 115                                          │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 6:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=112, right=115, mid=113                           │
   * │ isPossible(maxPages=113)?                              │
   * │   S1: 12 → 46 → 113 → 113+90=203>113 ✗              │
   * │   S2: 90 (studentsNeeded=2 ≤ 2 ✓) → TRUE             │
   * │ → right = 113                                          │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 7:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=112, right=113, mid=112                           │
   * │ isPossible(maxPages=112)?                              │
   * │   S1: 12 → 46 → 46+67=113>112 ✗                      │
   * │   S2: 67 → 67+90=157>112 ✗                           │
   * │   S3 needed: studentsNeeded=3 > 2 → FALSE             │
   * │ → left = 113                                           │
   * └────────────────────────────────────────────────────────┘
   *
   * left=113 === right=113 → EXIT LOOP
   * return 113 ✅
   *
   * Search space narrowing:
   *   [90 ─────────────── 203]
   *   [90 ──── 146]             (146 valid, try smaller)
   *   [90 ── 118]               (118 valid, try smaller)
   *   [105 ── 118]              (104 invalid, go right)
   *   [112 ── 118]              (111 invalid, go right)
   *   [112 ── 115]              (115 valid, try smaller)
   *   [112 ── 113]              (113 valid, try smaller)
   *   [113 == 113]              (112 invalid, go right) → answer!
   *
   * Final allocation for maxPages=113:
   *   Books:    [12,  34,  67]  |  [90]
   *   Student:  ←── S1: 113 ──→  ←─ S2: 90 ─→
   *             (12+34+67=113)    (90≤113 ✓)
   *   Max pages = 113 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. students > arr.length → -1
   *    4 students ke liye 3 books — impossible! Har student ko 1 book chahiye.
   *
   * 2. students = 1:
   *    1 student ko sab books → answer = sum(arr)
   *    left = max, right = sum → isPossible(sum) always true → converges to sum
   *
   * 3. students = arr.length:
   *    Har student ko exactly 1 book → answer = max(arr)
   *    isPossible(max) with n students always true → left never moves → answer = max
   *
   * 4. Single book [100], students = 1:
   *    left = right = 100 → loop never runs → return 100 ✓
   *
   * 5. All books same pages [5,5,5,5], students = 2:
   *    left=5, right=20, mid=12 → [5,5] | [5,5] → max=10 → right=12
   *    mid=8 → [5,5] | [5,5] still → max=10 → ...converges to 10
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Book Allocation - BINARY SEARCH ON ANSWER (OPTIMAL)\n'
    );

    const testCases: {
      arr: number[];
      students: number;
      expected: number;
      description: string;
    }[] = [
      // Classic examples
      {
        arr: [12, 34, 67, 90],
        students: 2,
        expected: 113,
        description: 'Classic: [12,34,67] | [90] → max=113',
      },
      {
        arr: [10, 20, 30, 40],
        students: 2,
        expected: 60,
        description: '[10,20,30] | [40] → max=60',
      },
      {
        arr: [15, 17, 20],
        students: 2,
        expected: 32,
        description: '[15,17] | [20] → max=32',
      },

      // Edge cases
      {
        arr: [10, 20, 30],
        students: 4,
        expected: -1,
        description: 'More students than books → impossible (-1)',
      },
      {
        arr: [100],
        students: 1,
        expected: 100,
        description: 'Single book, single student → 100',
      },
      {
        arr: [5, 5, 5, 5],
        students: 2,
        expected: 10,
        description: 'Equal books, 2 students → each gets 2 books, max=10',
      },
      {
        arr: [1, 2, 3, 4, 5],
        students: 5,
        expected: 5,
        description: '5 books, 5 students → each gets 1 book, max=5',
      },
      {
        arr: [1, 2, 3, 4, 5],
        students: 1,
        expected: 15,
        description: '1 student gets all books → sum = 15',
      },

      // Larger cases
      {
        arr: [73, 75, 20, 70, 35, 55, 30],
        students: 3,
        expected: 145,
        description: '7 books, 3 students: balanced allocation',
      },
      {
        arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        students: 3,
        expected: 4,
        description: '10 equal books, 3 students: ceil(10/3)=4 pages each',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { arr, students, expected, description } of testCases) {
      const result = allocateBooks([...arr], students); // spread to avoid mutation
      const status = result === expected ? '✅' : '❌';

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}], students=${students}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}], students=${students}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('═'.repeat(60));
  }
}

// Run tests
BookAllocationOptimal.runTests();