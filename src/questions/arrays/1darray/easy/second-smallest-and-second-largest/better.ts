/**
 * SECOND SMALLEST AND SECOND LARGEST - BETTER TWO PASS
 * =====================================================
 *
 * Problem:
 * Array ke second smallest aur second largest distinct elements find karne hain.
 *
 * Intuition:
 * Pehle smallest aur largest boundaries find kar lo.
 * Fir second pass me un boundaries ke closest valid distinct candidates dhoondo.
 *
 * Algorithm:
 * 1. Agar array me 2 se kam elements hain, dono answers `-1` return karo.
 * 2. First pass me `smallest` aur `largest` find karo.
 * 3. `secondSmallest = Infinity` aur `secondLargest = -Infinity` rakho.
 * 4. Second pass me smallest se badi but current secondSmallest se chhoti value track karo.
 * 5. Second pass me largest se chhoti but current secondLargest se badi value track karo.
 * 6. Infinity sentinel unchanged ho toh corresponding answer `-1` return karo.
 *
 * Time Complexity:
 *   O(n), do linear passes O(2n) hote hain, constants ignore karke O(n).
 *
 * Space Complexity:
 *   O(1), sirf fixed variables use ho rahe hain.
 */

namespace SecondSmallestAndSecondLargestBetter {
  interface SecondOrderResult {
    secondSmallest: number;
    secondLargest: number;
  }

  function findSecondOrderElements(arr: number[]): SecondOrderResult {
    if (arr.length < 2) {
      return { secondSmallest: -1, secondLargest: -1 };
    }

    let smallest = Infinity;
    let largest = -Infinity;

    for (const value of arr) {
      smallest = Math.min(smallest, value);
      largest = Math.max(largest, value);
    }

    let secondSmallest = Infinity;
    let secondLargest = -Infinity;

    for (const value of arr) {
      // Candidate smallest se strictly bada hona chahiye,
      // warna smallest ka duplicate second smallest ban jayega.
      if (value > smallest && value < secondSmallest) {
        secondSmallest = value;
      }

      // Candidate largest se strictly chhota hona chahiye,
      // warna largest ka duplicate second largest ban jayega.
      if (value < largest && value > secondLargest) {
        secondLargest = value;
      }
    }

    return {
      secondSmallest: secondSmallest === Infinity ? -1 : secondSmallest,
      secondLargest: secondLargest === -Infinity ? -1 : secondLargest,
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
   * ┌────────────────────────────────────────────────────────┐
   * │ PASS 1                                                  │
   * │ smallest = 1                                           │
   * │ largest = 7                                            │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ PASS 2                                                  │
   * │ value 1 -> equals smallest, skip                       │
   * │ value 2 -> secondSmallest=2, secondLargest=2           │
   * │ value 4 -> secondLargest=4                             │
   * │ value 7 -> equals largest, skip                        │
   * │ value 7 -> duplicate largest, skip                     │
   * │ value 5 -> secondLargest=5                             │
   * └────────────────────────────────────────────────────────┘
   *
   * Answer:
   *   { secondSmallest: 2, secondLargest: 5 }
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
      `SecondSmallestAndSecondLargestBetter: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

SecondSmallestAndSecondLargestBetter.runTests();

