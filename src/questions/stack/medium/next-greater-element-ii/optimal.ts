/**
 * NEXT GREATER ELEMENT II - OPTIMAL
 * =================================
 *
 * PROBLEM:
 * Circular array `nums` diya hai.
 * Har element ke liye next greater element find karna hai.
 *
 * Next greater:
 *   current index ke baad clockwise direction me
 *   pehla value jo current value se strictly greater ho
 *
 * Circular:
 *   last index ke baad array index 0 se continue ho sakta hai.
 *
 * INTUITION (Soch):
 * -----------------
 * Stack ko waiting list samjho.
 *
 * Stack me woh indices rahenge jinke liye abhi tak next greater nahi mila.
 *
 * Jab current value stack top value se badi hoti hai:
 *
 *   current value stack top index ka next greater hai
 *
 * Kyunki current value us unresolved index ke right side me pehli badi value
 * ban kar aa rahi hai.
 *
 * Circular behavior ke liye:
 *
 *   array ko imaginary 2 times traverse karo
 *   actual index = i % n
 *
 * Push sirf first pass me karte hain.
 * Second pass sirf bache hue waiting indices ko circular chance deta hai.
 *
 * TIME: O(n)
 *   - each index push at most once
 *   - each index pop at most once
 *
 * SPACE: O(n)
 *   - result array and stack
 */

namespace NextGreaterElementIIOptimal {
  function nextGreaterElements(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array<number>(n).fill(-1);
    const waitingIndices: number[] = [];

    for (let step = 0; step < 2 * n; step++) {
      const currentIndex = step % n;
      const currentValue = nums[currentIndex];

      while (
        waitingIndices.length > 0 &&
        currentValue > nums[waitingIndices[waitingIndices.length - 1]]
      ) {
        // Stack top index ab tak unresolved tha.
        // Current value uske baad circular traversal me pehli strictly greater value bani.
        const resolvedIndex = waitingIndices.pop()!;
        result[resolvedIndex] = currentValue;
      }

      if (step < n) {
        // First pass me har original index ko waiting list me add karte hain.
        // Second pass me push nahi karte, warna same index duplicate wait karega.
        waitingIndices.push(currentIndex);
      }
    }

    return result;
  }

  /**
   * ==========================================================
   * DRY RUN - WAITING LIST STACK
   * ==========================================================
   *
   * Example:
   * nums = [2, 1, 2, 4, 3]
   *
   * Start:
   *   result = [-1, -1, -1, -1, -1]
   *   waitingIndices = []
   *
   * ==========================================================
   * First pass: step 0 to 4
   * ==========================================================
   *
   * step = 0, currentIndex = 0, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | stack empty                                           |
   * | push index 0                                          |
   * | waitingIndices = [0]                                  |
   * +--------------------------------------------------------+
   *
   * step = 1, currentIndex = 1, currentValue = 1
   *
   * +--------------------------------------------------------+
   * | top index = 0, nums[0] = 2                            |
   * | 1 > 2 ? false                                         |
   * | push index 1                                          |
   * | waitingIndices = [0, 1]                               |
   * +--------------------------------------------------------+
   *
   * step = 2, currentIndex = 2, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | top index = 1, nums[1] = 1                            |
   * | 2 > 1 ? true                                          |
   * | pop 1, result[1] = 2                                  |
   * | next top index = 0, nums[0] = 2                       |
   * | 2 > 2 ? false, equal is not greater                   |
   * | push index 2                                          |
   * | waitingIndices = [0, 2]                               |
   * | result = [-1, 2, -1, -1, -1]                          |
   * +--------------------------------------------------------+
   *
   * step = 3, currentIndex = 3, currentValue = 4
   *
   * +--------------------------------------------------------+
   * | top index = 2, nums[2] = 2                            |
   * | 4 > 2 ? true -> pop 2, result[2] = 4                  |
   * | top index = 0, nums[0] = 2                            |
   * | 4 > 2 ? true -> pop 0, result[0] = 4                  |
   * | stack empty                                           |
   * | push index 3                                          |
   * | waitingIndices = [3]                                  |
   * | result = [4, 2, 4, -1, -1]                            |
   * +--------------------------------------------------------+
   *
   * step = 4, currentIndex = 4, currentValue = 3
   *
   * +--------------------------------------------------------+
   * | top index = 3, nums[3] = 4                            |
   * | 3 > 4 ? false                                         |
   * | push index 4                                          |
   * | waitingIndices = [3, 4]                               |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * Second pass: step 5 to 9
   * ==========================================================
   *
   * Second pass me push nahi hota.
   * Sirf circular values unresolved indices ko resolve kar sakti hain.
   *
   * step = 5, currentIndex = 0, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | top index = 4, nums[4] = 3                            |
   * | 2 > 3 ? false                                         |
   * | no push                                               |
   * +--------------------------------------------------------+
   *
   * step = 6, currentIndex = 1, currentValue = 1
   *
   * +--------------------------------------------------------+
   * | top index = 4, nums[4] = 3                            |
   * | 1 > 3 ? false                                         |
   * | no push                                               |
   * +--------------------------------------------------------+
   *
   * step = 7, currentIndex = 2, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | top index = 4, nums[4] = 3                            |
   * | 2 > 3 ? false                                         |
   * | no push                                               |
   * +--------------------------------------------------------+
   *
   * step = 8, currentIndex = 3, currentValue = 4
   *
   * +--------------------------------------------------------+
   * | top index = 4, nums[4] = 3                            |
   * | 4 > 3 ? true                                          |
   * | pop 4, result[4] = 4                                  |
   * | next top index = 3, nums[3] = 4                       |
   * | 4 > 4 ? false                                         |
   * | result = [4, 2, 4, -1, 4]                             |
   * +--------------------------------------------------------+
   *
   * step = 9, currentIndex = 4, currentValue = 3
   *
   * +--------------------------------------------------------+
   * | top index = 3, nums[3] = 4                            |
   * | 3 > 4 ? false                                         |
   * | index 3 remains -1 because no greater value exists     |
   * +--------------------------------------------------------+
   *
   * Final answer:
   *   [4, 2, 4, -1, 4]
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty array:
   *    [] -> []
   *
   * 2. Single element:
   *    [5] -> [-1]
   *
   * 3. All equal:
   *    [2, 2, 2] -> [-1, -1, -1]
   *
   * 4. Strictly decreasing:
   *    [5, 4, 3, 2, 1] -> [-1, 5, 5, 5, 5]
   *
   * 5. Circular needed:
   *    [1, 2, 1] -> [2, -1, 2]
   */

  export function runTests(): void {
    console.log('Testing Next Greater Element II - OPTIMAL\n');

    const tests: Array<{
      nums: number[];
      expected: number[];
      description: string;
    }> = [
      {
        nums: [1, 2, 1],
        expected: [2, -1, 2],
        description: 'Simple circular case',
      },
      {
        nums: [2, 1, 2, 4, 3],
        expected: [4, 2, 4, -1, 4],
        description: 'Standard stack dry-run case',
      },
      {
        nums: [5, 7, 1, 7, 6, 0],
        expected: [7, -1, 7, -1, 7, 5],
        description: 'Duplicates and circular wrap',
      },
      {
        nums: [5, 4, 3, 2, 1],
        expected: [-1, 5, 5, 5, 5],
        description: 'Strictly decreasing circular case',
      },
      {
        nums: [2, 2, 2],
        expected: [-1, -1, -1],
        description: 'All equal values',
      },
      {
        nums: [5],
        expected: [-1],
        description: 'Single element',
      },
      {
        nums: [],
        expected: [],
        description: 'Empty array',
      },
      {
        nums: [3, 10, 4, 2, 1, 2, 6, 1, 7, 2, 9],
        expected: [10, -1, 6, 6, 2, 6, 7, 7, 9, 9, 10],
        description: 'Long mixed example',
      },
    ];

    let passed = 0;

    tests.forEach(({ nums, expected, description }, index) => {
      const result = nextGreaterElements(nums);
      const pass = JSON.stringify(result) === JSON.stringify(expected);

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  nums=[${nums.join(', ')}]`);
      console.log(
        `  Expected: [${expected.join(', ')}] | Got: [${result.join(', ')}] -> ${
          pass ? 'PASS' : 'FAIL'
        }`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

NextGreaterElementIIOptimal.runTests();
