/**
 * NEXT SMALLER ELEMENT - OPTIMAL
 * ==============================
 *
 * PROBLEM:
 * Ek linear array `arr` diya hai.
 * Har index ke liye right side me pehla strictly smaller value find karni hai.
 *
 * Example:
 *   arr = [4, 8, 5, 2, 25]
 *   answer = [2, 5, 2, -1, -1]
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
 *   "is index ka next smaller abhi tak nahi mila"
 *
 * Jab current value stack top wale value se choti hoti hai:
 *
 *   current value us pending index ka next smaller ban jaati hai
 *
 * Kyunki current value us index ke right side me aa rahi hai,
 * aur strictly smaller bhi hai.
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

namespace NextSmallerElementOptimal {
  function nextSmallerElement(arr: number[]): number[] {
    const result = new Array<number>(arr.length).fill(-1);
    const waitingIndices: number[] = [];

    for (let currentIndex = 0; currentIndex < arr.length; currentIndex++) {
      const currentValue = arr[currentIndex];

      while (
        waitingIndices.length > 0 &&
        currentValue < arr[waitingIndices[waitingIndices.length - 1]]
      ) {
        // Stack top index ab tak unresolved tha.
        // Current value uske right side me pehli strictly smaller value ban rahi hai.
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
   * arr = [4, 8, 5, 2, 25]
   *
   * Expected:
   * [2, 5, 2, -1, -1]
   *
   * Stack notation:
   *   [0:4, 1:8]
   *
   * Meaning:
   *   index 0 has value 4
   *   index 1 has value 8
   *
   * Stack direction:
   *   left side  = bottom
   *   right side = top
   *
   * Important:
   *   waitingIndices stack me sirf unresolved indices hote hain.
   *   Unresolved means: "is index ka next smaller abhi nahi mila".
   *
   * Start:
   *   result = [-1, -1, -1, -1, -1]
   *   stack = []
   *
   * ==========================================================
   * i = 0, currentValue = 4
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: []                                      |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | Stack empty hai, so current value kisi old index ko   |
   * | resolve nahi kar sakti.                               |
   * |                                                        |
   * | Index 0 ka next smaller abhi nahi mila.               |
   * | Isko future ke liye waiting list me daal do.          |
   * |                                                        |
   * | push 0                                                |
   * | after stack: [0:4]                                    |
   * | result after: [-1, -1, -1, -1, -1]                    |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 1, currentValue = 8
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [0:4]                                   |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | top = 0:4                                             |
   * | current value 8 < top value 4 ? false                 |
   * |                                                        |
   * | Meaning: value 8, index 0 value 4 ka next smaller     |
   * | nahi ban sakta because 8 is bigger than 4.            |
   * |                                                        |
   * | Index 1 ka next smaller bhi abhi nahi mila.           |
   * | Isko future ke liye wait karwa do.                    |
   * |                                                        |
   * | push 1                                                |
   * | after stack: [0:4, 1:8]                               |
   * | result after: [-1, -1, -1, -1, -1]                    |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 2, currentValue = 5
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [0:4, 1:8]                              |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | top = 1:8                                             |
   * | current value 5 < top value 8 ? true                  |
   * |                                                        |
   * | Meaning: index 1 value 8 ko apna next smaller mil gaya.|
   * | Current index 2, index 1 ke right side me hai, aur    |
   * | value 5 strictly smaller hai.                         |
   * |                                                        |
   * | pop 1                                                 |
   * | result[1] = 5                                         |
   * | stack now: [0:4]                                      |
   * |                                                        |
   * | next top = 0:4                                        |
   * | current value 5 < top value 4 ? false                 |
   * |                                                        |
   * | value 5, index 0 value 4 ka answer nahi ban sakta.    |
   * | Index 2 ka answer future me mil sakta hai, so push it.|
   * |                                                        |
   * | push 2                                                |
   * | after stack: [0:4, 2:5]                               |
   * | result after: [-1, 5, -1, -1, -1]                     |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 3, currentValue = 2
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [0:4, 2:5]                              |
   * | result before: [-1, 5, -1, -1, -1]                    |
   * |                                                        |
   * | top = 2:5                                             |
   * | current value 2 < top value 5 ? true                  |
   * |                                                        |
   * | index 2 value 5 ka next smaller current value 2 hai.  |
   * | pop 2                                                 |
   * | result[2] = 2                                         |
   * | stack now: [0:4]                                      |
   * |                                                        |
   * | next top = 0:4                                        |
   * | current value 2 < top value 4 ? true                  |
   * |                                                        |
   * | index 0 value 4 ka next smaller bhi current value 2 hai.|
   * | pop 0                                                 |
   * | result[0] = 2                                         |
   * | stack now: []                                         |
   * |                                                        |
   * | Index 3 value 2 ka answer abhi nahi mila.             |
   * | Isko future ke liye wait karwa do.                    |
   * |                                                        |
   * | push 3                                                |
   * | after stack: [3:2]                                    |
   * | result after: [2, 5, 2, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * i = 4, currentValue = 25
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | before stack: [3:2]                                   |
   * | result before: [2, 5, 2, -1, -1]                      |
   * |                                                        |
   * | top = 3:2                                             |
   * | current value 25 < top value 2 ? false                |
   * |                                                        |
   * | value 25, index 3 value 2 ka next smaller nahi ban    |
   * | sakta.                                                |
   * |                                                        |
   * | Index 4 ka answer future me mil sakta tha, but array  |
   * | yahin end ho raha hai. Code phir bhi push karta hai;  |
   * | loop ke baad unresolved indices default -1 rahenge.   |
   * |                                                        |
   * | push 4                                                |
   * | after stack: [3:2, 4:25]                              |
   * | result after: [2, 5, 2, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * LOOP END
   * ==========================================================
   *
   * Stack me bache indices:
   *   [3:2, 4:25]
   *
   * Meaning:
   *   index 3 value 2 ke right side me koi smaller nahi mila.
   *   index 4 value 25 ke right side me koi element hi nahi bacha.
   *
   * Inka answer default -1 hi rahega.
   *
   * Final answer:
   *   [2, 5, 2, -1, -1]
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
   * 3. Strictly decreasing:
   *    [4, 3, 2, 1] -> [3, 2, 1, -1]
   *
   * 4. Strictly increasing:
   *    [1, 2, 3, 4] -> [-1, -1, -1, -1]
   *
   * 5. Equal values:
   *    [2, 2, 2] -> [-1, -1, -1]
   *
   * 6. Duplicates with smaller later:
   *    [5, 5, 2] -> [2, 2, -1]
   */

  export function runTests(): void {
    console.log('Testing Next Smaller Element - OPTIMAL\n');

    const tests: Array<{
      arr: number[];
      expected: number[];
      description: string;
    }> = [
      {
        arr: [4, 8, 5, 2, 25],
        expected: [2, 5, 2, -1, -1],
        description: 'Standard dry-run case',
      },
      {
        arr: [10, 9, 8, 7],
        expected: [9, 8, 7, -1],
        description: 'Strictly decreasing',
      },
      {
        arr: [1, 2, 3, 4, 5],
        expected: [-1, -1, -1, -1, -1],
        description: 'Strictly increasing',
      },
      {
        arr: [3, 3, 1, 3],
        expected: [1, 1, -1, -1],
        description: 'Duplicates and smaller in middle',
      },
      {
        arr: [2, 2, 2],
        expected: [-1, -1, -1],
        description: 'All equal values are not smaller',
      },
      {
        arr: [5, 5, 2],
        expected: [2, 2, -1],
        description: 'Duplicate values resolved by same smaller value',
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
        expected: [1, -1, 3, 2, 2, -1, -1],
        description: 'Long mixed example',
      },
    ];

    let passed = 0;

    tests.forEach(({ arr, expected, description }, index) => {
      const result = nextSmallerElement(arr);
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

NextSmallerElementOptimal.runTests();
