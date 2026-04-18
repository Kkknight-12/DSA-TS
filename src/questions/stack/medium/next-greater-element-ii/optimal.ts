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
      // `step` virtual circular walk hai: 0..2n-1.
      // Modulo us virtual position ko real array index ke andar wrap karta hai.
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
   * DRY RUN - WAITING LIST STACK WITH EVERY STACK CHANGE
   * ==========================================================
   *
   * Example:
   * nums = [2, 1, 2, 4, 3]
   *
   * Stack notation:
   *   [0:2, 1:1]
   *
   * Meaning:
   *   index 0 has value 2
   *   index 1 has value 1
   *
   * Stack direction:
   *   left side  = bottom
   *   right side = top
   *
   * So:
   *   [0:2, 1:1]
   *          top is index 1, value 1
   *
   * Important meaning:
   *   waitingIndices stack me sirf unresolved indices hote hain.
   *   Unresolved ka matlab:
   *     "is index ka next greater abhi tak nahi mila"
   *
   * Start:
   *   result = [-1, -1, -1, -1, -1]
   *   waitingIndices = [] / stack = []
   *
   * We traverse 2n steps:
   *
   *   normal indices: 0, 1, 2, 3, 4
   *   circular view: 0, 1, 2, 3, 4, 0, 1, 2, 3, 4
   *
   * step % n gives actual index:
   *
   *   step 5 -> 5 % 5 = 0
   *   step 6 -> 6 % 5 = 1
   *
   * This is how array behaves circularly without creating a new doubled array.
   *
   * ==========================================================
   * First pass: step 0 to 4
   * ==========================================================
   *
   * First pass ka kaam:
   *   1. current value se old waiting indices resolve karna
   *   2. current index ko stack me add karna, kyunki iska answer future me milega
   *
   * step = 0, currentIndex = 0, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | before stack: []                                      |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | stack empty hai, so compare karne ke liye top nahi.   |
   * | index 0 ka next greater abhi nahi mila.               |
   * | First pass hai, so index 0 ko waiting list me daalo.  |
   * |                                                        |
   * | push 0                                                |
   * | after stack: [0:2]                                    |
   * | result after: [-1, -1, -1, -1, -1]                    |
   * +--------------------------------------------------------+
   *
   * step = 1, currentIndex = 1, currentValue = 1
   *
   * +--------------------------------------------------------+
   * | before stack: [0:2]                                   |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | top = 0:2                                             |
   * | current value 1 > top value 2 ? false                 |
   * |                                                        |
   * | Meaning: value 1, index 0 ka next greater nahi ban    |
   * | sakta because 1 is smaller than 2.                    |
   * |                                                        |
   * | index 1 ka bhi answer abhi nahi mila.                 |
   * | First pass hai, so index 1 ko waiting list me daalo.  |
   * |                                                        |
   * | push 1                                                |
   * | after stack: [0:2, 1:1]                               |
   * | result after: [-1, -1, -1, -1, -1]                    |
   * +--------------------------------------------------------+
   *
   * step = 2, currentIndex = 2, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | before stack: [0:2, 1:1]                              |
   * | result before: [-1, -1, -1, -1, -1]                   |
   * |                                                        |
   * | top = 1:1                                             |
   * | current value 2 > top value 1 ? true                  |
   * |                                                        |
   * | Meaning: index 1 value 1 ko apna next greater mil gaya.|
   * | Current index 2 uske right side me aaya aur value 2   |
   * | strictly greater hai.                                 |
   * |                                                        |
   * | pop 1                                                 |
   * | result[1] = 2                                         |
   * | stack now: [0:2]                                      |
   * |                                                        |
   * | next top = 0:2                                        |
   * | current value 2 > top value 2 ? false                 |
   * |                                                        |
   * | Equal value next greater nahi hoti, because problem    |
   * | strictly greater maangta hai.                         |
   * |                                                        |
   * | index 2 ka answer abhi nahi mila.                     |
   * | First pass hai, so index 2 ko wait karwa do.          |
   * |                                                        |
   * | push 2                                                |
   * | after stack: [0:2, 2:2]                               |
   * | result after: [-1, 2, -1, -1, -1]                     |
   * +--------------------------------------------------------+
   *
   * step = 3, currentIndex = 3, currentValue = 4
   *
   * +--------------------------------------------------------+
   * | before stack: [0:2, 2:2]                              |
   * | result before: [-1, 2, -1, -1, -1]                    |
   * |                                                        |
   * | top = 2:2                                             |
   * | current value 4 > top value 2 ? true                  |
   * |                                                        |
   * | index 2 value 2 ka next greater current value 4 hai.  |
   * | pop 2                                                 |
   * | result[2] = 4                                         |
   * | stack now: [0:2]                                      |
   * |                                                        |
   * | next top = 0:2                                        |
   * | current value 4 > top value 2 ? true                  |
   * |                                                        |
   * | index 0 value 2 bhi ab resolve ho gaya.               |
   * | index 1 value 1 already pop ho chuka tha, so 4 usko   |
   * | dobara touch nahi karega.                             |
   * |                                                        |
   * | pop 0                                                 |
   * | result[0] = 4                                         |
   * | stack now: []                                         |
   * |                                                        |
   * | index 3 ka answer abhi nahi mila.                     |
   * | First pass hai, so index 3 ko wait karwa do.          |
   * |                                                        |
   * | push 3                                                |
   * | after stack: [3:4]                                    |
   * | result after: [4, 2, 4, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * step = 4, currentIndex = 4, currentValue = 3
   *
   * +--------------------------------------------------------+
   * | before stack: [3:4]                                   |
   * | result before: [4, 2, 4, -1, -1]                      |
   * |                                                        |
   * | top = 3:4                                             |
   * | current value 3 > top value 4 ? false                 |
   * |                                                        |
   * | Meaning: value 3, index 3 value 4 ka next greater     |
   * | nahi ban sakta.                                      |
   * |                                                        |
   * | index 4 ka answer bhi abhi nahi mila.                 |
   * | First pass ka last index hai, isko bhi wait karwa do. |
   * |                                                        |
   * | push 4                                                |
   * | after stack: [3:4, 4:3]                               |
   * | result after: [4, 2, 4, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * Second pass: step 5 to 9
   * ==========================================================
   *
   * Second pass ka kaam:
   *   array ke starting elements ko circular right side ki tarah use karna.
   *
   * Second pass me push nahi hota because:
   *   original index already first pass me stack me aa chuka hai.
   *   agar second pass me dobara push karenge, same index duplicate wait karega.
   *
   * Current stack after first pass:
   *   [3:4, 4:3]
   *
   * Meaning:
   *   index 3 value 4 unresolved hai
   *   index 4 value 3 unresolved hai
   *
   * Now circular chance:
   *   index 4 ke baad index 0, 1, 2, 3... consider ho sakte hain.
   *
   * step = 5, currentIndex = 0, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | before stack: [3:4, 4:3]                              |
   * | result before: [4, 2, 4, -1, -1]                      |
   * |                                                        |
   * | step 5 means circularly we came back to index 0.      |
   * | top = 4:3                                             |
   * | current value 2 > top value 3 ? false                 |
   * |                                                        |
   * | index 4 value 3 ko 2 se answer nahi mil sakta.        |
   * | Second pass hai, so index 0 ko push nahi karna.       |
   * |                                                        |
   * | after stack: [3:4, 4:3]                               |
   * | result after: [4, 2, 4, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * step = 6, currentIndex = 1, currentValue = 1
   *
   * +--------------------------------------------------------+
   * | before stack: [3:4, 4:3]                              |
   * | result before: [4, 2, 4, -1, -1]                      |
   * |                                                        |
   * | top = 4:3                                             |
   * | current value 1 > top value 3 ? false                 |
   * |                                                        |
   * | index 4 still unresolved rahega.                      |
   * | Second pass hai, so no push.                          |
   * |                                                        |
   * | after stack: [3:4, 4:3]                               |
   * | result after: [4, 2, 4, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * step = 7, currentIndex = 2, currentValue = 2
   *
   * +--------------------------------------------------------+
   * | before stack: [3:4, 4:3]                              |
   * | result before: [4, 2, 4, -1, -1]                      |
   * |                                                        |
   * | top = 4:3                                             |
   * | current value 2 > top value 3 ? false                 |
   * |                                                        |
   * | index 4 value 3 ko abhi bhi greater value nahi mili.  |
   * | Second pass hai, so no push.                          |
   * |                                                        |
   * | after stack: [3:4, 4:3]                               |
   * | result after: [4, 2, 4, -1, -1]                       |
   * +--------------------------------------------------------+
   *
   * step = 8, currentIndex = 3, currentValue = 4
   *
   * +--------------------------------------------------------+
   * | before stack: [3:4, 4:3]                              |
   * | result before: [4, 2, 4, -1, -1]                      |
   * |                                                        |
   * | top = 4:3                                             |
   * | current value 4 > top value 3 ? true                  |
   * |                                                        |
   * | Circularly, index 4 ke baad index 0,1,2,3 aate hain.  |
   * | Index 3 value 4, index 4 value 3 ka next greater hai. |
   * |                                                        |
   * | pop 4                                                 |
   * | result[4] = 4                                         |
   * | stack now: [3:4]                                      |
   * |                                                        |
   * | next top = 3:4                                        |
   * | current value 4 > top value 4 ? false                 |
   * |                                                        |
   * | Equal value greater nahi hoti.                        |
   * | Also index 3 khud currentIndex hai in circular pass,  |
   * | but self cannot be its own next greater. Strict check |
   * | naturally prevents this here.                         |
   * |                                                        |
   * | Second pass hai, so no push.                          |
   * | after stack: [3:4]                                    |
   * | result after: [4, 2, 4, -1, 4]                        |
   * +--------------------------------------------------------+
   *
   * step = 9, currentIndex = 4, currentValue = 3
   *
   * +--------------------------------------------------------+
   * | before stack: [3:4]                                   |
   * | result before: [4, 2, 4, -1, 4]                       |
   * |                                                        |
   * | top = 3:4                                             |
   * | current value 3 > top value 4 ? false                 |
   * |                                                        |
   * | index 3 value 4 ko poore circular scan me koi strictly|
   * | greater value nahi mila.                              |
   * |                                                        |
   * | Second pass hai, so no push.                          |
   * | after stack: [3:4]                                    |
   * | result after: [4, 2, 4, -1, 4]                        |
   * +--------------------------------------------------------+
   *
   * Loop ends.
   *
   * Stack me jo indices bache:
   *   [3:4]
   *
   * Meaning:
   *   inka next greater exist nahi karta.
   *   result default -1 already hai, so kuch update nahi karna.
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