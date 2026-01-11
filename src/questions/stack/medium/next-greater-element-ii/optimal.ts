/**
 * # Next Greater Element II (Optimal Approach - Forward Iteration)
 * https://gemini.google.com/gem/9013c4cd97d5/aa6ae9ce46b57899
 * https://gemini.google.com/gem/9013c4cd97d5/15a038c858a98c43
 *
 * ## Logic (Hinglish):
 * Is approach mein hum array ko **Forward (Left to Right)** traverse karte hain aur **Indices** ko Stack mein store karte hain.
 * Stack un elements ki list hai jo "Wait" kar rahe hain ki kab unhe koi bada number mile.
 *
 * **Core Idea (Waiting List):**
 * 1. Jab hum `nums[i]` par pahunchte hain, hum dekhte hain:
 *    "Kya `nums[i]` stack ke top wale element se bada hai?"
 * 2. **Haan (Bada hai):**
 *    - Iska matlab stack ke top wale element ko uska NGE mil gaya (jo ki `nums[i]` hai).
 *    - Stack se pop karo aur result update karo.
 *    - Repeat karo jab tak stack top chota hai ya stack empty na ho jaye.
 * 3. **Nahi (Chota ya barabar hai):**
 *    - `nums[i]` abhi kisi ka NGE nahi ban sakta.
 *    - Ulta, ab `nums[i]` khud "Waiting List" (Stack) mein jayega taaki future mein koi iska NGE bane.
 *
 * **Circular Handling:**
 * - Circular dependency resolve karne ke liye hum array ko imaginary 2 baar traverse karte hain (`0` to `2*n - 1`).
 * - Second pass (`n` se `2*n - 1`) mein hum stack mein naye indices **push nahi karte**.
 * - Second pass ka maqsad sirf ye hota hai ki agar koi element first pass mein reh gaya (wait kar raha hai), toh shayad array ke shuruwat mein koi bada element ho jo uska NGE ban sake.
 *
 * ---
 *
 * ## Dry Run
 * Input: `nums = [2, 1, 2, 4, 3]`, Length `n = 5`
 * Result `res = [-1, -1, -1, -1, -1]`
 * Stack `st = []`
 *
 * **Iteration 1 (First Pass: i = 0 to 4):**
 *
 * 1. **i = 0** (`val = 2`):
 *    - Stack empty.
 *    - Push index `0`. Stack: `[0]` (Element 2 is waiting)
 *
 * 2. **i = 1** (`val = 1`):
 *    - Is `1 > nums[st.top]` (1 > 2)? No.
 *    - Push index `1`. Stack: `[0, 1]` (Element 1 is waiting)
 *
 * 3. **i = 2** (`val = 2`):
 *    - Is `2 > nums[st.top]` (2 > 1)? **Yes**.
 *      - Pop `1`. `res[1] = 2`.
 *      - Stack: `[0]`.
 *    - Is `2 > nums[st.top]` (2 > 2)? No.
 *    - Push index `2`. Stack: `[0, 2]` (Indices 0(2) and 2(2) waiting)
 *
 * 4. **i = 3** (`val = 4`):
 *    - Is `4 > nums[st.top]` (4 > 2)? **Yes**.
 *      - Pop `2`. `res[2] = 4`.
 *      - Stack: `[0]`.
 *    - Is `4 > nums[st.top]` (4 > 2)? **Yes**.
 *      - Pop `0`. `res[0] = 4`.
 *      - Stack: `[]`.
 *    - Push index `3`. Stack: `[3]` (Element 4 is waiting)
 *
 * 5. **i = 4** (`val = 3`):
 *    - Is `3 > nums[st.top]` (3 > 4)? No.
 *    - Push index `4`. Stack: `[3, 4]`
 *
 * --- First Pass Ends ---
 * Current State: `res = [4, 2, 4, -1, -1]`, Stack = `[3, 4]` (Indices of values 4, 3)
 *
 * **Iteration 2 (Second Pass: i = 5 to 9):**
 * Only popping allowed, no pushing.
 * `idx = i % n`
 *
 * 6. **i = 5** (`idx = 0`, val = 2):
 *    - `2 > nums[st.top]` (2 > 3)? No.
 *
 * 7. **i = 6** (`idx = 1`, val = 1):
 *    - `1 > nums[st.top]` (1 > 3)? No.
 *
 * 8. **i = 7** (`idx = 2`, val = 2):
 *    - `2 > nums[st.top]` (2 > 3)? No.
 *
 * 9. **i = 8** (`idx = 3`, val = 4):
 *    - `4 > nums[st.top]` (4 > 3)? **Yes**.
 *      - Pop `4`. `res[4] = 4`.
 *      - Stack: `[3]`.
 *    - `4 > nums[st.top]` (4 > 4)? No.
 *
 * 10. **i = 9** ...
 *
 * **Final Result:** `[4, 2, 4, -1, 4]`
 */

export namespace NextGreaterElementIIOptimal {
  export function nextGreaterElements(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = new Array(n).fill(-1);
    const stack: number[] = []; // Stores INDICES of elements waiting for NGE

    // Traverse array twice to simulate circular behavior
    // Loop runs 0 to 2*n - 1
    for (let i = 0; i < 2 * n; i++) {
      const index = i % n;
      const currentVal = nums[index];

      // Resolve Next Greater Element for pending indices in stack
      // While current element is greater than the element at stack top index
      while (stack.length > 0 && currentVal > nums[stack[stack.length - 1]]) {
        const prevIndex = stack.pop()!;
        result[prevIndex] = currentVal;
      }

      // We only push indices during the first pass (0 to n-1)
      // Second pass is only to resolve remaining elements using circularity
      if (i < n) {
        stack.push(index);
      }
    }

    return result;
  }
}

// Test Runner
if (require.main === module) {
  const testCases = [
    {
      input: [1, 2, 1],
      expected: [2, -1, 2],
      description: 'Simple circular case',
    },
    {
      input: [1, 2, 3, 4, 3],
      expected: [2, 3, 4, -1, 4],
      description: 'Increasing then decrease',
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: [-1, 5, 5, 5, 5],
      description:
        'Strictly decreasing array (NGE is always the start or prev larger)',
    },
    {
      input: [100, 1, 11, 1, 120, 111, 123, 1, -1, -100],
      expected: [120, 11, 120, 120, 123, 123, -1, 100, 100, 100],
      description: 'Complex mixed values',
    },
    {
      input: [5, 7, 1, 7, 6, 0],
      expected: [7, -1, 7, -1, 7, 5],
      description: 'User Example 2',
    },
  ];

  console.log(
    'Running Test Cases for Next Greater Element II (Forward Optimal)...'
  );

  testCases.forEach((test, index) => {
    const result = NextGreaterElementIIOptimal.nextGreaterElements(test.input);
    const isPassed = JSON.stringify(result) === JSON.stringify(test.expected);

    console.log(`Test Case ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input}]`);
    console.log(`Expected: [${test.expected}]`);
    console.log(`Got:      [${result}]`);
    console.log(`Status: ${isPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log('-'.repeat(40));
  });
}