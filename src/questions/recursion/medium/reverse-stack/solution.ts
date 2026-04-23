/**
 * REVERSE STACK USING RECURSION
 * =============================
 *
 * Problem:
 * Array form me stack diya hai.
 * Yahan:
 *
 *   stack[0]             -> bottom
 *   stack[stack.length - 1] -> top
 *
 * Hume isi stack ko recursion se reverse karna hai.
 * Core logic me loop aur extra stack use nahi karna.
 *
 * Example:
 *   [4, 1, 3, 2] -> [2, 3, 1, 4]
 *
 * Intuition:
 * Normal stack me hum bottom directly access nahi kar sakte.
 * Sirf top se hi pop / push hota hai.
 *
 * Isliye recursion do kaam karti hai:
 *
 * 1. reverseStack
 *    top hata kar smaller stack reverse karti hai
 *
 * 2. insertAtBottom
 *    removed element ko bottom me place karti hai
 *
 * Algorithm:
 * 1. Agar stack empty hai, return karo.
 * 2. Top element pop karke current frame me hold karo.
 * 3. Remaining stack ko recursively reverse karo.
 * 4. Held element ko helper se bottom me insert karo.
 * 5. Helper me agar stack empty hai toh value push karo.
 * 6. Warna top pop karo, value ko bottom me insert karo, aur popped top ko wapas push karo.
 *
 * Time Complexity:
 *   O(n^2)
 *   reverseStack ke har frame par insertAtBottom worst case O(n) le sakta hai.
 *
 * Space Complexity:
 *   O(n)
 *   recursion call stack depth ki wajah se.
 */

namespace ReverseStackRecursion {
  export function reverseStack(stack: number[]): void {
    if (stack.length === 0) {
      // Empty stack already reversed hota hai.
      // Yahan aur koi work pending nahi hai.
      return;
    }

    const topElement = stack.pop()!;

    // topElement current frame ka removed top hai.
    // Ab remaining stack chhoti problem ban gayi jise same logic se reverse kar sakte hain.
    reverseStack(stack);

    // Recursive call ke baad `stack` ka remaining part reverse ho chuka hota hai.
    // Ab jo element humne is frame me hataya tha usko bottom me rakhna hai.
    insertAtBottom(stack, topElement);
  }

  function insertAtBottom(stack: number[], valueToInsert: number): void {
    if (stack.length === 0) {
      // Empty stack ka matlab yahi bottom position hai.
      // Isliye value ko yahin push karna hi "insert at bottom" hai.
      stack.push(valueToInsert);
      return;
    }

    const topElement = stack.pop()!;

    // Ye topElement temporarily side me rakha gaya hai
    // taaki hum neeche wali position tak pahunch sakein.
    insertAtBottom(stack, valueToInsert);

    // value bottom me place ho chuki hai.
    // Ab current frame ka removed top apni original relative position preserve karte hue wapas push hota hai.
    stack.push(topElement);
  }

  /**
   * ==========================================================
   * STACK MENTAL MODEL
   * ==========================================================
   *
   * Array ko stack ki tarah treat kar rahe hain:
   *
   *   push(x) -> array ke end me x add hota hai
   *   pop()   -> array ke end se top remove hota hai
   *
   * Example:
   *
   *   [4, 1, 3, 2]
   *    ^        ^
   * bottom     top
   *
   * top = 2, because last index hi stack ka top hai.
   *
   * ==========================================================
   * HIGH-LEVEL RECURSION TREE
   * ==========================================================
   *
   * reverseStack([4,1,3,2])
   * │
   * ├── pop 2, recurse on [4,1,3]
   * │   ├── pop 3, recurse on [4,1]
   * │   │   ├── pop 1, recurse on [4]
   * │   │   │   ├── pop 4, recurse on []
   * │   │   │   │   └── base case
   * │   │   │   └── insert 4 at bottom -> [4]
   * │   │   └── insert 1 at bottom -> [1,4]
   * │   └── insert 3 at bottom -> [3,1,4]
   * └── insert 2 at bottom -> [2,3,1,4]
   *
   * Key pattern:
   *
   *   expansion phase  -> sirf pop hota hai
   *   unwinding phase  -> actual reverse visible hota hai
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Har frame me decision ye nahi hai ki "pick or not pick".
   * Yahan fixed work hota hai:
   *
   *   1. top hatao
   *   2. rest reverse karo
   *   3. removed top ko bottom me rakho
   *
   * Helper me bhi fixed work hota hai:
   *
   *   1. agar empty ho gaye -> value push
   *   2. warna top hatao
   *   3. neeche recurse karo
   *   4. top wapas rakho
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: reverseStack([4, 1, 3, 2])
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: reverseStack([4, 1, 3, 2])                                    │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ stack = [4, 1, 3, 2]                                                  │
   * │ Base case? stack.length === 0 -> Nahi                                 │
   * │ pop() -> topElement = 2                                                │
   * │ remaining stack = [4, 1, 3]                                           │
   * │ recurse: reverseStack([4, 1, 3])                                      │
   * │                                                                        │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: reverseStack([4, 1, 3])                              │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ stack = [4, 1, 3]                                            │     │
   * │   │ pop() -> topElement = 3                                      │     │
   * │   │ remaining stack = [4, 1]                                     │     │
   * │   │ recurse: reverseStack([4, 1])                                │     │
   * │   │                                                              │     │
   * │   │   ┌────────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: reverseStack([4, 1])                        │     │     │
   * │   │   ├────────────────────────────────────────────────────┤     │     │
   * │   │   │ stack = [4, 1]                                      │     │     │
   * │   │   │ pop() -> topElement = 1                             │     │     │
   * │   │   │ remaining stack = [4]                               │     │     │
   * │   │   │ recurse: reverseStack([4])                          │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │   ┌──────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: reverseStack([4])                │     │     │     │
   * │   │   │   ├──────────────────────────────────────────┤     │     │     │
   * │   │   │   │ stack = [4]                              │     │     │     │
   * │   │   │   │ pop() -> topElement = 4                  │     │     │     │
   * │   │   │   │ remaining stack = []                     │     │     │     │
   * │   │   │   │ recurse: reverseStack([])                │     │     │     │
   * │   │   │   │                                          │     │     │     │
   * │   │   │   │   ┌────────────────────────────────┐     │     │     │     │
   * │   │   │   │   │ CALL 5: reverseStack([])       │     │     │     │     │
   * │   │   │   │   ├────────────────────────────────┤     │     │     │     │
   * │   │   │   │   │ stack = []                     │     │     │     │     │
   * │   │   │   │   │ Base case -> return            │     │     │     │     │
   * │   │   │   │   └────────────────────────────────┘     │     │     │     │
   * │   │   │   │                                          │     │     │     │
   * │   │   │   │ ab insertAtBottom([], 4) chalega         │     │     │     │
   * │   │   │   │ result stack = [4]                       │     │     │     │
   * │   │   │   │ return                                   │     │     │     │
   * │   │   │   └──────────────────────────────────────────┘     │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │ ab stack = [4] reverse ho chuka hai               │     │     │
   * │   │   │ insertAtBottom([4], 1)                            │     │     │
   * │   │   │ pop 4, recurse empty, push 1, push 4 back         │     │     │
   * │   │   │ result stack = [1, 4]                             │     │     │
   * │   │   │ return                                             │     │     │
   * │   │   └────────────────────────────────────────────────────┘     │     │
   * │   │                                                              │     │
   * │   │ ab stack = [1, 4] reverse ho chuka hai                      │     │
   * │   │ insertAtBottom([1, 4], 3)                                   │     │
   * │   │ pop 4, pop 1, recurse empty, push 3, push 1, push 4 back    │     │
   * │   │ result stack = [3, 1, 4]                                    │     │
   * │   │ return                                                        │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │                                                                        │
   * │ ab stack = [3, 1, 4] reverse ho chuka hai                              │
   * │ insertAtBottom([3, 1, 4], 2)                                           │
   * │ pop 4, pop 1, pop 3, recurse empty, push 2, restore 3,1,4             │
   * │ final stack = [2, 3, 1, 4]                                             │
   * │ return                                                                  │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. []          -> already reversed
   * 2. [5]         -> same stack
   * 3. [1, 2]      -> [2, 1]
   * 4. duplicate values bhi same logic se handle hote hain
   */

  function expectStackAfterReverse(input: number[], expected: number[]): void {
    const stack = [...input];
    reverseStack(stack);

    const actual = JSON.stringify(stack);
    const wanted = JSON.stringify(expected);

    if (actual !== wanted) {
      throw new Error(
        `For input ${JSON.stringify(input)}, expected ${wanted} but got ${actual}`
      );
    }
  }

  export function runTests(): void {
    const tests: Array<{ input: number[]; expected: number[] }> = [
      { input: [4, 1, 3, 2], expected: [2, 3, 1, 4] },
      { input: [10, 20, -5, 7, 15], expected: [15, 7, -5, 20, 10] },
      { input: [5], expected: [5] },
      { input: [], expected: [] },
      { input: [1, 2], expected: [2, 1] },
      { input: [7, 7, 7, 7], expected: [7, 7, 7, 7] },
      { input: [-5, 10, -3, 2], expected: [2, -3, 10, -5] },
      { input: [9, 0, 4, 0], expected: [0, 4, 0, 9] },
    ];

    tests.forEach(({ input, expected }) => {
      expectStackAfterReverse(input, expected);
    });

    console.log(`Passed ${tests.length}/${tests.length} tests`);
  }
}

ReverseStackRecursion.runTests();
