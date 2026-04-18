/**
 * NEXT GREATER ELEMENT - OPTIMAL LEFT TO RIGHT
 * ============================================
 *
 * PROBLEM:
 * Ek linear array `arr` diya hai.
 * Har index ke liye right side me pehla strictly greater value find karni hai.
 *
 * Example:
 *   arr = [1, 3, 2, 4]
 *   answer = [3, 4, 4, -1]
 *
 * IMPORTANT:
 *   Ye circular problem nahi hai.
 *   Last index ke baad array index 0 se continue nahi hota.
 *
 * INTUITION (Soch):
 * -----------------
 * Stack ko waiting list samjho.
 *
 * Stack me indices store honge.
 * Har stored index ka meaning hai:
 *
 *   "is index ka next greater abhi tak nahi mila"
 *
 * Jab current value stack top wale value se badi hoti hai:
 *
 *   current value us pending index ka next greater ban jaati hai
 *
 * Kyunki current value us index ke right side me aa rahi hai,
 * aur strictly greater bhi hai.
 *
 * WHY indices, not values?
 *   - comparison ke liye value chahiye: arr[index]
 *   - answer update ke liye exact index chahiye: result[index]
 *
 * TIME: O(n)
 *   - each index pushes once
 *   - each index pops at most once
 *
 * SPACE: O(n)
 *   - result array and waiting stack
 */

namespace NextGreaterElementLeftToRight {
  function nextGreaterElement(arr: number[]): number[] {
    const result = new Array<number>(arr.length).fill(-1);
    const waitingIndices: number[] = [];

    for (let currentIndex = 0; currentIndex < arr.length; currentIndex++) {
      const currentValue = arr[currentIndex];

      while (
        waitingIndices.length > 0 &&
        currentValue > arr[waitingIndices[waitingIndices.length - 1]]
      ) {
        // Stack top index ab tak unresolved tha.
        // Current value uske right side me pehli strictly greater value ban rahi hai.
        const resolvedIndex = waitingIndices.pop()!;
        result[resolvedIndex] = currentValue;
      }

      // Current index ka answer abhi future me milega.
      // Isliye current index ko waiting list me add karte hain.
      waitingIndices.push(currentIndex);
    }

    return result;
  }

  /**
   * ==========================================================
   * DRY RUN - STACK AS WAITING LIST
   * ==========================================================
   *
   * Example:
   * arr = [6, 8, 0, 1, 3]
   *
   * Expected:
   * [8, -1, 1, 3, -1]
   *
   * Stack notation:
   *   [0:6, 2:0]
   *
   * Meaning:
   *   index 0 has value 6
   *   index 2 has value 0
   *
   * Stack direction:
   *   left side  = bottom
   *   right side = top
   *
   * Important:
   *   waitingIndices stack me sirf unresolved indices hote hain.
   *   Unresolved means: "is index ka next greater abhi nahi mila".
   *
   * Start:
   *   result = [-1, -1, -1, -1, -1]
   *   stack = []
   *
   * ==========================================================
   * i = 0, currentValue = 6
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: []                                      |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | Stack empty hai, so current value kisi old index ko   |
   * | resolve nahi kar sakti.                               |
   * |                                                        |
   * | Index 0 ka answer abhi nahi mila.                     |
   * | Isko future ke liye waiting list me daal do.          |
   * |                                                        |
   * | push 0                                                |
   * | after stack: [0:6]                                    |
   * | result after: [-1, -1, -1, -1, -1]                    |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 1, currentValue = 8
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [0:6]                                   |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | top = 0:6                                             |
   * | current value 8 > top value 6 ? true                  |
   * |                                                        |
   * | Meaning: index 0 value 6 ko apna next greater mil gaya.|
   * | Current index 1, index 0 ke right side me hai, aur    |
   * | value 8 strictly greater hai.                         |
   * |                                                        |
   * | pop 0                                                 |
   * | result[0] = 8                                         |
   * | stack now: []                                         |
   * |                                                        |
   * | Index 1 value 8 ka answer abhi nahi mila.             |
   * | Isko future ke liye wait karwa do.                    |
   * |                                                        |
   * | push 1                                                |
   * | after stack: [1:8]                                    |
   * | result after: [8, -1, -1, -1, -1]                     |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 2, currentValue = 0
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [1:8]                                   |
   * | result before: [8, -1, -1, -1, -1]                    |
   * |                                                        |
   * | top = 1:8                                             |
   * | current value 0 > top value 8 ? false                 |
   * |                                                        |
   * | Meaning: value 0, index 1 value 8 ka next greater     |
   * | nahi ban sakta.                                      |
   * |                                                        |
   * | Index 2 ka answer bhi abhi nahi mila.                 |
   * | Isko stack me wait karwa do.                          |
   * |                                                        |
   * | push 2                                                |
   * | after stack: [1:8, 2:0]                               |
   * | result after: [8, -1, -1, -1, -1]                     |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 3, currentValue = 1
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [1:8, 2:0]                              |
   * | result before: [8, -1, -1, -1, -1]                    |
   * |                                                        |
   * | top = 2:0                                             |
   * | current value 1 > top value 0 ? true                  |
   * |                                                        |
   * | index 2 value 0 ka next greater current value 1 hai.  |
   * | pop 2                                                 |
   * | result[2] = 1                                         |
   * | stack now: [1:8]                                      |
   * |                                                        |
   * | next top = 1:8                                        |
   * | current value 1 > top value 8 ? false                 |
   * |                                                        |
   * | value 1, index 1 value 8 ko resolve nahi kar sakta.   |
   * | Index 3 ka answer abhi nahi mila, so push it.         |
   * |                                                        |
   * | push 3                                                |
   * | after stack: [1:8, 3:1]                               |
   * | result after: [8, -1, 1, -1, -1]                      |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 4, currentValue = 3
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [1:8, 3:1]                              |
   * | result before: [8, -1, 1, -1, -1]                     |
   * |                                                        |
   * | top = 3:1                                             |
   * | current value 3 > top value 1 ? true                  |
   * |                                                        |
   * | index 3 value 1 ka next greater current value 3 hai.  |
   * | pop 3                                                 |
   * | result[3] = 3                                         |
   * | stack now: [1:8]                                      |
   * |                                                        |
   * | next top = 1:8                                        |
   * | current value 3 > top value 8 ? false                 |
   * |                                                        |
   * | value 3, index 1 value 8 ka answer nahi ban sakta.    |
   * | Index 4 ka answer future me mil sakta tha, but array  |
   * | yahin end ho raha hai. Code phir bhi push karta hai;  |
   * | loop ke baad unresolved indices default -1 rahenge.   |
   * |                                                        |
   * | push 4                                                |
   * | after stack: [1:8, 4:3]                               |
   * | result after: [8, -1, 1, 3, -1]                       |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * LOOP END
   * ==========================================================
   *
   * Stack me bache indices:
   *   [1:8, 4:3]
   *
   * Meaning:
   *   index 1 value 8 ke right side me koi greater nahi mila.
   *   index 4 value 3 ke right side me koi element hi nahi bacha.
   *
   * Inka answer default -1 hi rahega.
   *
   * Final answer:
   *   [8, -1, 1, 3, -1]
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
   * 3. Strictly increasing:
   *    [1, 2, 3, 4] -> [2, 3, 4, -1]
   *
   * 4. Strictly decreasing:
   *    [4, 3, 2, 1] -> [-1, -1, -1, -1]
   *
   * 5. Equal values:
   *    [2, 2, 2] -> [-1, -1, -1]
   *
   * 6. Duplicates with greater later:
   *    [2, 2, 3] -> [3, 3, -1]
   */

  export function runTests(): void {
    console.log('Testing Next Greater Element - Left To Right\n');

    const tests: Array<{
      arr: number[];
      expected: number[];
      description: string;
    }> = [
      {
        arr: [1, 3, 2, 4],
        expected: [3, 4, 4, -1],
        description: 'Basic example with multiple resolves',
      },
      {
        arr: [6, 8, 0, 1, 3],
        expected: [8, -1, 1, 3, -1],
        description: 'Standard dry-run case',
      },
      {
        arr: [4, 3, 2, 1],
        expected: [-1, -1, -1, -1],
        description: 'Strictly decreasing',
      },
      {
        arr: [1, 2, 3, 4],
        expected: [2, 3, 4, -1],
        description: 'Strictly increasing',
      },
      {
        arr: [2, 2, 2],
        expected: [-1, -1, -1],
        description: 'All equal values are not greater',
      },
      {
        arr: [2, 2, 3],
        expected: [3, 3, -1],
        description: 'Duplicates resolved by same greater value',
      },
      {
        arr: [5],
        expected: [-1],
        description: 'Single element',
      },
      {
        arr: [],
        expected: [],
        description: 'Empty array',
      },
      {
        arr: [9, 1, 5, 3, 6, 2, 8],
        expected: [-1, 5, 6, 6, 8, 8, -1],
        description: 'Long mixed example',
      },
    ];

    let passed = 0;

    tests.forEach(({ arr, expected, description }, index) => {
      const result = nextGreaterElement(arr);
      const pass = JSON.stringify(result) === JSON.stringify(expected);

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  arr=[${arr.join(', ')}]`);
      console.log(
        `  Expected: [${expected.join(', ')}] | Got: [${result.join(', ')}] -> ${
          pass ? 'PASS' : 'FAIL'
        }`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

NextGreaterElementLeftToRight.runTests();
