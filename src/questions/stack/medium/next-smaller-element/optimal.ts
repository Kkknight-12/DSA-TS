/**
 * # Next Smaller Element (Optimal Approach)
 *
 * ## Logic (Hinglish):
 * Is problem mein humein "Next Greater" ka **opposite** dhundna hai -> "Next Smaller".
 * Logic bilkul same rahega (Forward Traversal + Waiting List), bas condition palat jayegi.
 *
 * **Core Concept (Waiting List):**
 * - Stack un elements ke **indices** rakhta hai jo "Wait" kar rahe hain kisi **chote** number ka.
 * - Jab hum `arr[i]` par aate hain, hum puchte hain:
 *   "Kya main (current element) stack ke top wale element se **chota** hoon?"
 *
 * **Steps:**
 * 1. Iterate `i` from `0` to `n-1`.
 * 2. **Check:** Agar `arr[i] < arr[stack.top]`:
 *    - Iska matlab stack top wale element ko usse chota number mil gaya (jo `arr[i]` hai).
 *    - `ans[stack.pop()] = arr[i]`.
 *    - Loop chalta rahega jab tak stack top bada hai current se.
 * 3. `stack.push(i)`: Current element bhi wait karega ki future mein isse bhi koi chota mile.
 *
 * **Stack Property:**
 * - Kyunki hum bade elements ko pop karte jate hain, stack mein hamesha **Increasing Order** (values wise) maintain hota hai.
 * - Example: `[2, 5, 8]` (Bottom -> Top).
 *
 * ---
 *
 * ## Dry Run
 * Input: `arr = [4, 8, 5, 2, 25]`
 * Ans: `[-1, -1, -1, -1, -1]`
 *
 * 1. **i=0** (`val=4`):
 *    - Stack empty. Push 0. Stack: `[0]` (val: 4)
 *
 * 2. **i=1** (`val=8`):
 *    - `8 < 4`? No.
 *    - Push 1. Stack: `[0, 1]` (vals: 4, 8) -> Increasing!
 *
 * 3. **i=2** (`val=5`):
 *    - `5 < 8`? **Yes**.
 *      - Pop 1. `ans[1] = 5`.
 *      - Stack: `[0]`.
 *    - `5 < 4`? No.
 *    - Push 2. Stack: `[0, 2]` (vals: 4, 5) -> Increasing!
 *
 * 4. **i=3** (`val=2`):
 *    - `2 < 5`? **Yes**.
 *      - Pop 2. `ans[2] = 2`.
 *    - `2 < 4`? **Yes**.
 *      - Pop 0. `ans[0] = 2`.
 *    - Stack empty.
 *    - Push 3. Stack: `[3]` (val: 2)
 *
 * 5. **i=4** (`val=25`):
 *    - `25 < 2`? No.
 *    - Push 4. Stack: `[3, 4]` (vals: 2, 25)
 *
 * **End:** Stack elements `[2, 25]` remain. Their ans is `-1`.
 * Final Ans: `[2, 5, 2, -1, -1]`
 */

export namespace NextSmallerElementOptimal {
    export function nextSmallerElement(arr: number[]): number[] {
        const n = arr.length;
        const ans: number[] = new Array(n).fill(-1);
        const stack: number[] = []; // Stores INDICES (Monotonic Increasing Stack)

        for (let i = 0; i < n; i++) {
            const currentVal = arr[i];

            // Resolve NSE for pending elements in stack
            // While current element is SMALLER than stack top
            while (stack.length > 0 && currentVal < arr[stack[stack.length - 1]]) {
                const prevIndex = stack.pop()!;
                ans[prevIndex] = currentVal;
            }

            stack.push(i);
        }

        return ans;
    }
}

// Test Runner
if (require.main === module) {
    const testCases = [
        {
            input: [4, 8, 5, 2, 25],
            expected: [2, 5, 2, -1, -1],
            description: "Example 1"
        },
        {
            input: [10, 9, 8, 7],
            expected: [9, 8, 7, -1],
            description: "Strictly Decreasing (Immediate right is smaller)"
        },
        {
            input: [1, 2, 3, 4, 5],
            expected: [-1, -1, -1, -1, -1],
            description: "Strictly Increasing (No smaller element to right)"
        },
        {
            input: [3, 3, 1, 3],
            expected: [1, 1, -1, -1],
            description: "Duplicates and smaller in middle"
        }
    ];

    console.log("Running Test Cases for Next Smaller Element (Optimal)...");

    testCases.forEach((test, index) => {
        const result = NextSmallerElementOptimal.nextSmallerElement(test.input);
        const isPassed = JSON.stringify(result) === JSON.stringify(test.expected);
        
        console.log(`Test Case ${index + 1}: ${test.description}`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: [${test.expected}]`);
        console.log(`Got:      [${result}]`);
        console.log(`Status: ${isPassed ? "✅ PASS" : "❌ FAIL"}`);
        console.log("-".repeat(40));
    });
}
