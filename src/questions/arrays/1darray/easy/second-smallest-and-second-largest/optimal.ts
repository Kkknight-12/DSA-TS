/**
 * SECOND SMALLEST AND SECOND LARGEST - OPTIMAL ONE PASS
 * ======================================================
 *
 * Problem:
 * Array ke second smallest aur second largest distinct elements find karne hain.
 *
 * Intuition:
 * Har value ko ek hi baar dekhte hue four states maintain karenge:
 *
 *   smallest, secondSmallest, largest, secondLargest
 *
 * Jab new smallest milta hai,
 * old smallest naturally second smallest candidate ban jata hai.
 * Same way, new largest milne par old largest second largest ban jata hai.
 *
 * Algorithm:
 * 1. Four states ko `Infinity` / `-Infinity` sentinels se initialize karo.
 * 2. Har value ke liye smallest side update karo.
 * 3. Value new smallest ho toh old smallest ko secondSmallest me shift karo.
 * 4. Otherwise value smallest se badi aur secondSmallest se chhoti ho toh secondSmallest update karo.
 * 5. Independently largest side update karo.
 * 6. Value new largest ho toh old largest ko secondLargest me shift karo.
 * 7. Otherwise value largest se chhoti aur secondLargest se badi ho toh secondLargest update karo.
 * 8. Unchanged sentinels ko `-1` me convert karke answer return karo.
 *
 * Time Complexity:
 *   O(n), har element exactly ek pass me process hota hai.
 *
 * Space Complexity:
 *   O(1), input size se independent four tracking variables hain.
 */

namespace SecondSmallestAndSecondLargestOptimal {
  interface SecondOrderResult {
    secondSmallest: number;
    secondLargest: number;
  }

  function findSecondOrderElements(arr: number[]): SecondOrderResult {
    let smallest = Infinity;
    let secondSmallest = Infinity;
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (const value of arr) {
      if (value < smallest) {
        // New value sabse chhoti ban gayi.
        // Purani smallest ab exactly uske baad wali best candidate hai.
        secondSmallest = smallest;
        smallest = value;
      } else if (value > smallest && value < secondSmallest) {
        // Strict `value > smallest` smallest ke duplicates ko ignore karta hai.
        secondSmallest = value;
      }

      if (value > largest) {
        // New value sabse badi ban gayi.
        // Purani largest ab second largest position par shift hoti hai.
        secondLargest = largest;
        largest = value;
      } else if (value < largest && value > secondLargest) {
        // Strict `value < largest` largest ke duplicates ko second place lene se rokta hai.
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
   * DRY RUN - REAL ONE-PASS FLOW
   * ==========================================================
   *
   * Input:
   *   [1, 2, 4, 7, 7, 5]
   *
   * Initial:
   *   smallest       = Infinity
   *   secondSmallest = Infinity
   *   largest        = -Infinity
   *   secondLargest  = -Infinity
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ value = 1                                              │
   * │ smallest side: new smallest -> smallest=1             │
   * │ largest side : new largest  -> largest=1              │
   * │ state: [small=1, secondSmall=Inf,                     │
   * │         large=1, secondLarge=-Inf]                    │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ value = 2                                              │
   * │ smallest side: 1 < 2 < Inf -> secondSmallest=2        │
   * │ largest side : 2 > 1 -> old largest 1 shifts          │
   * │ state: [small=1, secondSmall=2,                       │
   * │         large=2, secondLarge=1]                       │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ value = 4                                              │
   * │ smallest side unchanged                                │
   * │ largest side: new largest=4, old largest=2 shifts     │
   * │ state: [small=1, secondSmall=2,                       │
   * │         large=4, secondLarge=2]                       │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ value = 7                                              │
   * │ largest=7, secondLargest=4                             │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ value = 7 again                                        │
   * │ value < largest is false because 7 < 7 is false       │
   * │ duplicate ignored                                      │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ value = 5                                              │
   * │ smallest side unchanged                                │
   * │ 5 < 7 and 5 > 4 -> secondLargest=5                    │
   * └────────────────────────────────────────────────────────┘
   *
   * Final:
   *   secondSmallest = 2
   *   secondLargest = 5
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
      `SecondSmallestAndSecondLargestOptimal: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

SecondSmallestAndSecondLargestOptimal.runTests();

