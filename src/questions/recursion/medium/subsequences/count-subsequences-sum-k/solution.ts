/**
 * COUNT SUBSEQUENCES SUM K - RECURSION
 * ====================================
 *
 * PROBLEM:
 * Array `nums` aur target `k` diya hai.
 * Count karna hai ki kitni non-empty subsequences ka sum exactly `k` hai.
 *
 * Example:
 *   nums = [4, 5, 1], k = 10
 *   valid subsequence = [4, 5, 1]
 *   answer = 1
 *
 * INTUITION (Soch):
 * -----------------
 * Har element par 2 choices hoti hain:
 *
 *   1. Pick karo     -> currentSum me nums[index] add hoga
 *   2. Not pick karo -> currentSum same rahega
 *
 * Check problem me first true enough tha.
 * Count problem me first valid path enough nahi hai.
 *
 * Kyun?
 *   Hume saari valid subsequences ka count chahiye.
 *   Isliye pick aur not-pick dono branches explore karni padti hain.
 *
 * Algorithm:
 * ----------
 * 1. Start recursion from index 0 and currentSum 0.
 * 2. Har element par pick branch explore karo.
 * 3. Pick branch me currentSum + nums[index] ke saath next index par jao.
 * 4. Har element par not-pick branch bhi explore karo.
 * 5. Not-pick branch me currentSum same rakho and next index par jao.
 * 6. Base case par agar currentSum target ke equal hai, return 1.
 * 7. Base case par agar currentSum target ke equal nahi hai, return 0.
 * 8. Current frame ka answer = pickCount + notPickCount.
 *
 * TIME: O(2^n) worst case
 *   - har element ke pick / not-pick branches explore ho sakte hain
 *
 * SPACE: O(n)
 *   - recursion depth maximum array length tak ja sakti hai
 */

namespace CountSubsequencesSumKRecursion {
  export function countSubsequencesWithSumK(
    nums: number[],
    target: number
  ): number {
    if (target <= 0) {
      // Is problem setup me empty subsequence count nahi hoti.
      // Values positive hain, so non-empty subsequence se 0 ya negative target
      // banana possible nahi maana ja raha.
      return 0;
    }

    return countFromIndex(0, 0, nums, target);
  }

  function countFromIndex(
    index: number,
    currentSum: number,
    nums: number[],
    target: number
  ): number {
    if (index === nums.length) {
      // Ek complete decision path ban chuka hai.
      // Ye path exactly one subsequence represent karta hai.
      return currentSum === target ? 1 : 0;
    }

    if (currentSum > target) {
      // Values positive hain.
      // Current sum target se aage nikal gaya, so future picks ise kam nahi kar sakte.
      return 0;
    }

    const pickCount = countFromIndex(
      index + 1,
      currentSum + nums[index],
      nums,
      target
    );

    const notPickCount = countFromIndex(
      index + 1,
      currentSum,
      nums,
      target
    );

    // Count problem me dono branches zaroori hain.
    // Pick branch ke valid paths + not-pick branch ke valid paths = total paths.
    return pickCount + notPickCount;
  }

  /**
   * ==========================================================
   * DRY RUN - RECURSION TREE + CALL FRAMES
   * ==========================================================
   *
   * Example:
   * nums = [4, 5, 1], target = 10
   *
   * Expected:
   * 1
   *
   * Why this example?
   *   Ek valid subsequence [4, 5, 1] milti hai.
   *   But count problem hone ki wajah se baaki branches bhi 0 return karke
   *   total count me merge hoti hain.
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Each leaf returns either:
   *   1 -> this path ka sum target hai
   *   0 -> this path ka sum target nahi hai
   *
   * root  (index=0, sum=0, next=4)
   * │
   * ├── PICK 4 -> (index=1, sum=4, next=5)
   * │   │
   * │   ├── PICK 5 -> (index=2, sum=9, next=1)
   * │   │   │
   * │   │   ├── PICK 1 -> (index=3, sum=10)
   * │   │   │   └── BASE CASE: sum === target -> return 1
   * │   │   │
   * │   │   └── NOT PICK 1 -> (index=3, sum=9)
   * │   │       └── BASE CASE: sum !== target -> return 0
   * │   │
   * │   └── NOT PICK 5 -> (index=2, sum=4, next=1)
   * │       │
   * │       ├── PICK 1 -> (index=3, sum=5) -> return 0
   * │       └── NOT PICK 1 -> (index=3, sum=4) -> return 0
   * │
   * └── NOT PICK 4 -> (index=1, sum=0, next=5)
   *     │
   *     ├── PICK 5 -> (index=2, sum=5, next=1)
   *     │   │
   *     │   ├── PICK 1 -> (index=3, sum=6) -> return 0
   *     │   └── NOT PICK 1 -> (index=3, sum=5) -> return 0
   *     │
   *     └── NOT PICK 5 -> (index=2, sum=0, next=1)
   *         │
   *         ├── PICK 1 -> (index=3, sum=1) -> return 0
   *         └── NOT PICK 1 -> (index=3, sum=0) -> return 0
   *
   * Count propagation:
   *   left subtree  = 1
   *   right subtree = 0
   *   final = 1 + 0 = 1
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: countSubsequencesWithSumK([4, 5, 1], 10)
   * - count starts from 0 conceptually
   * - Start: countFromIndex(0, 0, [4,5,1], 10)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: countFromIndex(0, 0, [4,5,1], 10)                            │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ index = 0                                                            │
   * │ currentSum = 0                                                       │
   * │ current element = nums[0] = 4                                        │
   * │ Base: index === nums.length? 0 === 3 -> Nahi                        │
   * │ Prune: currentSum > target? 0 > 10 -> Nahi                          │
   * │                                                                      │
   * │ Try PICK 4: call countFromIndex(1, 4, [4,5,1], 10)                  │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: countFromIndex(1, 4, [4,5,1], 10)                  │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ index = 1                                                  │     │
   * │   │ currentSum = 4                                             │     │
   * │   │ current element = nums[1] = 5                              │     │
   * │   │ Base: index === nums.length? 1 === 3 -> Nahi              │     │
   * │   │ Prune: currentSum > target? 4 > 10 -> Nahi                │     │
   * │   │                                                            │     │
   * │   │ Try PICK 5: countFromIndex(2, 9, [4,5,1], 10)             │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: countFromIndex(2, 9, [4,5,1], 10)        │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2                                        │     │     │
   * │   │   │ currentSum = 9                                   │     │     │
   * │   │   │ current element = nums[2] = 1                    │     │     │
   * │   │   │ Base: index === nums.length? 2 === 3 -> Nahi    │     │     │
   * │   │   │ Prune: currentSum > target? 9 > 10 -> Nahi      │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try PICK 1: countFromIndex(3, 10, [4,5,1], 10)  │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │   ┌────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: countFromIndex(3, 10,          │     │     │     │
   * │   │   │   │         [4,5,1], 10)                   │     │     │     │
   * │   │   │   ├────────────────────────────────────────┤     │     │     │
   * │   │   │   │ index = 3                              │     │     │     │
   * │   │   │   │ currentSum = 10                        │     │     │     │
   * │   │   │   │ Base: index === nums.length?           │     │     │     │
   * │   │   │   │ 3 === 3 -> Haan                        │     │     │     │
   * │   │   │   │ currentSum === target?                 │     │     │     │
   * │   │   │   │ 10 === 10 -> Haan                      │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Return 1                               │     │     │     │
   * │   │   │   └────────────────────────────────────────┘     │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ pickCount = 1                                    │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try NOT PICK 1: countFromIndex(3, 9, ...)        │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │   ┌────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 5: countFromIndex(3, 9,           │     │     │     │
   * │   │   │   │         [4,5,1], 10)                   │     │     │     │
   * │   │   │   ├────────────────────────────────────────┤     │     │     │
   * │   │   │   │ index = 3                              │     │     │     │
   * │   │   │   │ currentSum = 9                         │     │     │     │
   * │   │   │   │ Base: index === nums.length?           │     │     │     │
   * │   │   │   │ 3 === 3 -> Haan                        │     │     │     │
   * │   │   │   │ currentSum === target?                 │     │     │     │
   * │   │   │   │ 9 === 10 -> Nahi                       │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Return 0                               │     │     │     │
   * │   │   │   └────────────────────────────────────────┘     │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ notPickCount = 0                                 │     │     │
   * │   │   │ Return pickCount + notPickCount = 1 + 0 = 1      │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ pickCount from PICK 5 = 1                                  │     │
   * │   │                                                            │     │
   * │   │ Try NOT PICK 5: countFromIndex(2, 4, [4,5,1], 10)          │     │
   * │   │ This subtree returns 0 because sums become 5 or 4.          │     │
   * │   │                                                            │     │
   * │   │ notPickCount from NOT PICK 5 = 0                           │     │
   * │   │ Return 1 + 0 = 1                                           │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ pickCount from PICK 4 = 1                                            │
   * │                                                                      │
   * │ Try NOT PICK 4: countFromIndex(1, 0, [4,5,1], 10)                   │
   * │ This subtree returns 0 because no path reaches sum 10.               │
   * │                                                                      │
   * │ notPickCount from NOT PICK 4 = 0                                     │
   * │ Return pickCount + notPickCount = 1 + 0 = 1                         │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   1
   *
   * ==========================================================
   * WHY BOTH BRANCHES ARE REQUIRED
   * ==========================================================
   *
   * Check problem:
   *   pick branch true -> return true immediately
   *
   * Count problem:
   *   pick branch count milne ke baad bhi not-pick branch run karni padegi
   *
   * Why?
   *   Because not-pick branch me bhi valid subsequences ho sakti hain.
   *
   * Example:
   *   nums = [1, 1, 1], target = 2
   *
   * Valid index pairs:
   *   (0,1), (0,2), (1,2)
   *
   * Agar first valid pair milte hi return kar diya,
   * answer 3 ke bajaye 1 aa sakta hai.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. nums = [5], target = 5
   *    Pick 5 -> one valid path -> 1
   *
   * 2. nums = [5], target = 3
   *    No valid path -> 0
   *
   * 3. nums = [1, 1, 1], target = 2
   *    Three index pairs -> 3
   *
   * 4. nums = [1, 2, 3], target = 6
   *    Whole array works -> 1
   *
   * 5. target = 0
   *    Empty subsequence is not counted in this setup -> 0
   */

  export function runTests(): void {
    type TestCase = {
      nums: number[];
      target: number;
      expected: number;
      description: string;
    };

    const tests: TestCase[] = [
      {
        nums: [4, 9, 2, 5, 1],
        target: 10,
        expected: 2,
        description: 'two valid subsequences',
      },
      {
        nums: [4, 2, 10, 5, 1, 3],
        target: 5,
        expected: 3,
        description: 'three different subsequences',
      },
      {
        nums: [1, 2, 3],
        target: 6,
        expected: 1,
        description: 'all elements needed',
      },
      {
        nums: [1, 1, 1],
        target: 2,
        expected: 3,
        description: 'same values but different index pairs',
      },
      {
        nums: [1, 2, 3],
        target: 10,
        expected: 0,
        description: 'no valid subsequence',
      },
      {
        nums: [5],
        target: 5,
        expected: 1,
        description: 'single element equals target',
      },
      {
        nums: [5],
        target: 3,
        expected: 0,
        description: 'single element does not equal target',
      },
      {
        nums: [2, 3, 5],
        target: 10,
        expected: 1,
        description: 'whole array forms target',
      },
      {
        nums: [1, 2, 1, 2],
        target: 3,
        expected: 4,
        description: 'multiple index combinations with repeated values',
      },
      {
        nums: [1, 2, 3],
        target: 0,
        expected: 0,
        description: 'zero target does not count empty subsequence',
      },
    ];

    let passed = 0;

    console.log('Testing Count Subsequences Sum K - Recursion\n');

    tests.forEach(({ nums, target, expected, description }, index) => {
      const actual = countSubsequencesWithSumK(nums, target);
      const bruteExpected = verifyByBruteForce(nums, target);
      const pass = actual === expected && actual === bruteExpected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  nums=[${nums.join(', ')}], target=${target}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Brute:    ${bruteExpected}`);
      console.log(`  Got:      ${actual}`);
      console.log(`  Result:   ${pass ? 'PASS' : 'FAIL'}`);
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }

  function verifyByBruteForce(nums: number[], target: number): number {
    if (target <= 0) {
      return 0;
    }

    const totalMasks = 2 ** nums.length;
    let count = 0;

    for (let mask = 1; mask < totalMasks; mask++) {
      let sum = 0;

      for (let index = 0; index < nums.length; index++) {
        if ((mask & (1 << index)) !== 0) {
          sum += nums[index];
        }
      }

      if (sum === target) {
        count++;
      }
    }

    return count;
  }
}

const countSubsequencesWithSumK =
  CountSubsequencesSumKRecursion.countSubsequencesWithSumK;

CountSubsequencesSumKRecursion.runTests();

export { countSubsequencesWithSumK, CountSubsequencesSumKRecursion };
