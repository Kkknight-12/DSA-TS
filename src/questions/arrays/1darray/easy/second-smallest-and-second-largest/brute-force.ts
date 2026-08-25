/**
 * SECOND SMALLEST AND SECOND LARGEST - BRUTE FORCE
 * =================================================
 *
 * Problem:
 * Array ke second smallest aur second largest distinct elements find karne hain.
 * Agar second distinct value exist nahi karti, `-1` return karna hai.
 *
 * Intuition:
 * Sorted array me order already visible hota hai.
 * Smallest left end par aur largest right end par milta hai.
 * Fir dono sides se first different value dhoondh sakte hain.
 *
 * Algorithm:
 * 1. Agar array me 2 se kam elements hain, dono answers `-1` return karo.
 * 2. Original input preserve karne ke liye sorted copy banao.
 * 3. Leftmost value ko `smallest` aur rightmost value ko `largest` maan lo.
 * 4. Left se scan karke first value dhoondo jo `smallest` se different ho.
 * 5. Right se scan karke first value dhoondo jo `largest` se different ho.
 * 6. Jo distinct candidate na mile uske liye `-1` return karo.
 *
 * Time Complexity:
 *   O(n log n), sorting dominant operation hai.
 *
 * Space Complexity:
 *   O(n), kyunki original array preserve karne ke liye copy sort karte hain.
 */

namespace SecondSmallestAndSecondLargestBruteForce {
  interface SecondOrderResult {
    secondSmallest: number;
    secondLargest: number;
  }

  function findSecondOrderElements(arr: number[]): SecondOrderResult {
    if (arr.length < 2) {
      return { secondSmallest: -1, secondLargest: -1 };
    }

    const sorted = [...arr].sort((first, second) => first - second);
    const smallest = sorted[0];
    const largest = sorted[sorted.length - 1];

    let secondSmallest: number | null = null;
    let secondLargest: number | null = null;

    for (let index = 1; index < sorted.length; index++) {
      // Sorted order me smallest ke baad milne wali first different value
      // hi smallest se immediately badi distinct value hogi.
      if (sorted[index] !== smallest) {
        secondSmallest = sorted[index];
        break;
      }
    }

    for (let index = sorted.length - 2; index >= 0; index--) {
      // Right side se largest duplicates skip karne ke baad jo first different
      // value milti hai, wahi second largest distinct value hoti hai.
      if (sorted[index] !== largest) {
        secondLargest = sorted[index];
        break;
      }
    }

    return {
      secondSmallest: secondSmallest ?? -1,
      secondLargest: secondLargest ?? -1,
    };
  }

  /**
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   [1, 2, 4, 7, 7, 5]
   *
   * Sorted copy:
   *   [1, 2, 4, 5, 7, 7]
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ smallest = 1                                           │
   * │ scan from index 1                                      │
   * │ sorted[1] = 2, and 2 !== 1                            │
   * │ secondSmallest = 2                                     │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ largest = 7                                            │
   * │ index 4: sorted[4] = 7 -> duplicate, skip             │
   * │ index 3: sorted[3] = 5 -> different                    │
   * │ secondLargest = 5                                      │
   * └────────────────────────────────────────────────────────┘
   *
   * Answer:
   *   { secondSmallest: 2, secondLargest: 5 }
   *
   * EDGE CASES:
   * 1. [1] -> {-1, -1}
   * 2. [7,7,7] -> {-1, -1}
   * 3. [1,2] -> {2, 1}
   */

  function resultsEqual(
    actual: SecondOrderResult,
    expected: SecondOrderResult
  ): boolean {
    return (
      actual.secondSmallest === expected.secondSmallest &&
      actual.secondLargest === expected.secondLargest
    );
  }

  export function runTests(): void {
    const testCases: Array<{
      name: string;
      input: number[];
      expected: SecondOrderResult;
    }> = [
      {
        name: "given example",
        input: [1, 2, 4, 7, 7, 5],
        expected: { secondSmallest: 2, secondLargest: 5 },
      },
      {
        name: "single element",
        input: [1],
        expected: { secondSmallest: -1, secondLargest: -1 },
      },
      {
        name: "all equal",
        input: [7, 7, 7],
        expected: { secondSmallest: -1, secondLargest: -1 },
      },
      {
        name: "two distinct elements",
        input: [1, 2],
        expected: { secondSmallest: 2, secondLargest: 1 },
      },
      {
        name: "three distinct with duplicates",
        input: [2, 1, 2, 3, 3],
        expected: { secondSmallest: 2, secondLargest: 2 },
      },
      {
        name: "unsorted duplicates",
        input: [10, 5, 10, 3, 5, 2],
        expected: { secondSmallest: 3, secondLargest: 5 },
      },
      {
        name: "empty array",
        input: [],
        expected: { secondSmallest: -1, secondLargest: -1 },
      },
      {
        name: "larger values",
        input: [100, 50, 75, 100, 25],
        expected: { secondSmallest: 50, secondLargest: 75 },
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const result = findSecondOrderElements(testCase.input);

      if (resultsEqual(result, testCase.expected)) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error("Expected:", testCase.expected);
        console.error("Received:", result);
      }
    }

    console.log(
      `SecondSmallestAndSecondLargestBruteForce: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

SecondSmallestAndSecondLargestBruteForce.runTests();

