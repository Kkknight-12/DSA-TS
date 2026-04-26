/**
 * SORT STACK USING RECURSION
 * ==========================
 *
 * Problem:
 * Array form me stack diya hai jahan:
 *
 *   stack[0] -> bottom
 *   stack[stack.length - 1] -> top
 *
 * Hume stack ko in-place sort karna hai such that:
 *
 *   smallest element bottom par ho
 *   largest element top par ho
 *
 * Example:
 *   [4, 1, 3, 2] -> [1, 2, 3, 4]
 *
 * Intuition:
 * Stack me hum sirf top se hi kaam kar sakte hain.
 * Isliye recursion ka use karke top elements temporarily call stack me rakhte hain.
 *
 * Pehle smaller stack ko sort karte hain.
 * Phir current removed top ko helper ki help se sorted position me wapas insert karte hain.
 *
 * Algorithm:
 * 1. Agar stack empty ya single element hai, return karo.
 * 2. Top element pop karke current frame me hold karo.
 * 3. Remaining stack ko recursively sort karo.
 * 4. Held element ko already-sorted stack me correct position par insert karo.
 * 5. Helper me agar stack empty hai, value push karo.
 * 6. Agar current top valueToInsert se chhota ya equal hai, value ko top par push karo.
 * 7. Warna current top ko temporarily hatao, neeche recurse karo, aur phir removed top ko wapas push karo.
 *
 * Time Complexity:
 *   O(n^2)
 *   Har element ke liye insertion worst case O(n) ja sakta hai.
 *
 * Space Complexity:
 *   O(n)
 *   Recursion call stack depth ki wajah se.
 */

namespace SortStackRecursion {
  export function sortStack(stack: number[]): void {
    if (stack.length <= 1) {
      // Empty ya single-element stack already sorted hota hai.
      // Yahan compare karne ya reorder karne ke liye kuch bacha hi nahi.
      return;
    }

    const topElement = stack.pop()!;

    // topElement current frame ka removed top hai.
    // Ab remaining stack chhoti problem ban gayi hai jise same recursion se sort kar sakte hain.
    sortStack(stack);

    // Recursive call ke baad current `stack` sorted guarantee hoti hai.
    // Ab sirf removed top ko sorted order break kiye bina sahi jagah insert karna hai.
    insertSorted(stack, topElement);
  }

  function insertSorted(stack: number[], valueToInsert: number): void {
    if (stack.length === 0) {
      // Empty stack me value ko push karna hi correct insertion hai,
      // kyunki compare karne ke liye koi existing top bacha hi nahi.
      stack.push(valueToInsert);
      return;
    }

    const currentTop = stack[stack.length - 1];

    if (currentTop <= valueToInsert) {
      // currentTop stack ka abhi ka largest visible top side element hai.
      // Agar woh valueToInsert se chhota ya equal hai, toh value ko uske upar rakhne se
      // bottom-se-top ascending order preserve rahega.
      stack.push(valueToInsert);
      return;
    }

    const removedTop = stack.pop()!;

    // removedTop valueToInsert se bada hai.
    // Isliye valueToInsert ko iske neeche kahin place karna hoga.
    insertSorted(stack, valueToInsert);

    // Neeche insertion complete ho chuki hai.
    // Ab removedTop ko wapas push karna zaroori hai taaki bigger elements top side par rahein.
    stack.push(removedTop);
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
   * Sorted stack ka meaning:
   *
   *   [1, 2, 3, 4]
   *    ^        ^
   * bottom     top
   *
   * Yani left se right tak values ascending honi chahiye.
   *
   * ==========================================================
   * HIGH-LEVEL RECURSION TREE
   * ==========================================================
   *
   * sortStack([4,1,3,2])
   * │
   * ├── pop 2, recurse on [4,1,3]
   * │   ├── pop 3, recurse on [4,1]
   * │   │   ├── pop 1, recurse on [4]
   * │   │   │   └── base case: [4] already sorted
   * │   │   └── insert 1 into [4] -> [1,4]
   * │   └── insert 3 into [1,4] -> [1,3,4]
   * └── insert 2 into [1,3,4] -> [1,2,3,4]
   *
   * Key pattern:
   *
   *   expansion phase -> top elements remove hote hain
   *   unwinding phase -> actual sorted order build hota hai
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * sortStack frame fixed kaam karta hai:
   *
   *   1. top hatao
   *   2. remaining stack sort karo
   *   3. removed top ko correct position par insert karo
   *
   * insertSorted frame fixed decision leta hai:
   *
   *   1. empty? -> push
   *   2. top <= value? -> push on top
   *   3. otherwise top hatao, deeper recurse karo, phir top wapas rakho
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: sortStack([4, 1, 3, 2])
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: sortStack([4, 1, 3, 2])                                        │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ stack = [4, 1, 3, 2]                                                   │
   * │ Base case? stack.length <= 1 -> Nahi                                   │
   * │ pop() -> topElement = 2                                                 │
   * │ remaining stack = [4, 1, 3]                                            │
   * │ recurse: sortStack([4, 1, 3])                                          │
   * │                                                                        │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: sortStack([4, 1, 3])                                 │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ stack = [4, 1, 3]                                             │     │
   * │   │ pop() -> topElement = 3                                       │     │
   * │   │ remaining stack = [4, 1]                                      │     │
   * │   │ recurse: sortStack([4, 1])                                    │     │
   * │   │                                                                │     │
   * │   │   ┌────────────────────────────────────────────────────┐       │     │
   * │   │   │ CALL 3: sortStack([4, 1])                           │       │     │
   * │   │   ├────────────────────────────────────────────────────┤       │     │
   * │   │   │ stack = [4, 1]                                      │       │     │
   * │   │   │ pop() -> topElement = 1                             │       │     │
   * │   │   │ remaining stack = [4]                               │       │     │
   * │   │   │ recurse: sortStack([4])                             │       │     │
   * │   │   │                                                      │       │     │
   * │   │   │   ┌────────────────────────────────────────────┐     │       │     │
   * │   │   │   │ CALL 4: sortStack([4])                     │     │       │     │
   * │   │   │   ├────────────────────────────────────────────┤     │       │     │
   * │   │   │   │ stack = [4]                                │     │       │     │
   * │   │   │   │ Base case? 1 <= 1 -> Haan                  │     │       │     │
   * │   │   │   │ [4] already sorted, return                 │     │       │     │
   * │   │   │   └────────────────────────────────────────────┘     │       │     │
   * │   │   │                                                      │       │     │
   * │   │   │ ab remaining stack [4] sorted hai                   │       │     │
   * │   │   │ insertSorted([4], 1)                                │       │     │
   * │   │   │ currentTop = 4                                       │       │     │
   * │   │   │ 4 <= 1 ? Nahi                                        │       │     │
   * │   │   │ pop 4, recurse empty, push 1, push 4 back            │       │     │
   * │   │   │ result stack = [1, 4]                                │       │     │
   * │   │   │ return                                                │       │     │
   * │   │   └────────────────────────────────────────────────────┘       │     │
   * │   │                                                                │     │
   * │   │ ab remaining stack [1, 4] sorted hai                          │     │
   * │   │ insertSorted([1, 4], 3)                                       │     │
   * │   │ currentTop = 4                                                 │     │
   * │   │ 4 <= 3 ? Nahi                                                  │     │
   * │   │ pop 4                                                          │     │
   * │   │ insertSorted([1], 3)                                           │     │
   * │   │   currentTop = 1                                               │     │
   * │   │   1 <= 3 ? Haan -> push 3                                      │     │
   * │   │   stack becomes [1, 3]                                         │     │
   * │   │ push 4 back                                                    │     │
   * │   │ result stack = [1, 3, 4]                                       │     │
   * │   │ return                                                          │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │                                                                        │
   * │ ab remaining stack [1, 3, 4] sorted hai                                │
   * │ insertSorted([1, 3, 4], 2)                                             │
   * │ currentTop = 4                                                          │
   * │ 4 <= 2 ? Nahi                                                           │
   * │ pop 4                                                                   │
   * │ insertSorted([1, 3], 2)                                                 │
   * │   currentTop = 3                                                        │
   * │   3 <= 2 ? Nahi                                                         │
   * │   pop 3                                                                 │
   * │   insertSorted([1], 2)                                                  │
   * │     currentTop = 1                                                      │
   * │     1 <= 2 ? Haan -> push 2                                             │
   * │     stack becomes [1, 2]                                                │
   * │   push 3 back -> [1, 2, 3]                                              │
   * │ push 4 back -> [1, 2, 3, 4]                                             │
   * │ final sorted stack = [1, 2, 3, 4]                                       │
   * │ return                                                                   │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. []          -> already sorted
   * 2. [5]         -> already sorted
   * 3. [2, 1]      -> [1, 2]
   * 4. duplicates  -> same comparison logic se sort ho jate hain
   */

  function expectSortedStack(input: number[], expected: number[]): void {
    const stack = [...input];
    sortStack(stack);

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
      { input: [4, 1, 3, 2], expected: [1, 2, 3, 4] },
      { input: [41, 3, 32, 2, 11], expected: [2, 3, 11, 32, 41] },
      { input: [5], expected: [5] },
      { input: [], expected: [] },
      { input: [2, 1], expected: [1, 2] },
      { input: [7, 7, 7, 7], expected: [7, 7, 7, 7] },
      { input: [-5, 10, -3, 2], expected: [-5, -3, 2, 10] },
      { input: [9, 0, 4, 0], expected: [0, 0, 4, 9] },
    ];

    tests.forEach(({ input, expected }) => {
      expectSortedStack(input, expected);
    });

    console.log(`Passed ${tests.length}/${tests.length} tests`);
  }
}

SortStackRecursion.runTests();
