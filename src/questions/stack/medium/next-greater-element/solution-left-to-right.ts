/**
 * # Next Greater Element (Linear) - Optimal (Forward Iteration)
 *
 * ## Logic (Hinglish):
 * Is approach mein hum array ko **Left to Right** traverse karte hain.
 * Hum ek Stack use karte hain jo **Indices** store karta hai.
 * Is Stack ko hum "Waiting List" ki tarah treat karte hain.
 *
 * **Core Logic:**
 * 1. Stack un elements ke indices rakhta hai jinka Next Greater Element (NGE) abhi tak nahi mila.
 * 2. Jab hum naye element `arr[i]` par aate hain, hum check karte hain:
 *    "Kya ye naya element `arr[i]` stack ke top wale element se bada hai?"
 * 3. **Haan (Bada hai):**
 *    - Iska matlab `arr[i]` hi wo element hai jiska stack ka top wala element wait kar raha tha.
 *    - Stack se pop karo aur answer update karo: `ans[stack.pop()] = arr[i]`.
 *    - Process repeat karo jab tak stack top chota hai ya stack empty na ho jaye.
 * 4. **Nahi (Chota ya barabar hai):**
 *    - `arr[i]` abhi kisi ka NGE nahi ban sakta.
 *    - `arr[i]` khud ab wait karega. Iska index stack mein push kardo.
 *
 * **Difference from NGE II:**
 * - Yahan array circular nahi hai.
 * - Loop sirf `0` se `n-1` tak chalega (Single Pass).
 * - Modulo operator ki zaroorat nahi hai.
 *
 * ---
 *
 * ## Dry Run
 * Input: `arr = [1, 3, 2, 4]`
 * Result `ans = [-1, -1, -1, -1]`
 * Stack `st = []`
 *
 * **Iteration:**
 *
 * 1. **i = 0** (`val = 1`):
 *    - Stack empty.
 *    - Push index `0`. Stack: `[0]` (Element 1 is waiting)
 *
 * 2. **i = 1** (`val = 3`):
 *    - `3 > arr[st.top]` (3 > 1)? **Yes**.
 *      - Pop `0`. `ans[0] = 3`.
 *      - Stack: `[]`.
 *    - Push index `1`. Stack: `[1]` (Element 3 is waiting)
 *
 * 3. **i = 2** (`val = 2`):
 *    - `2 > arr[st.top]` (2 > 3)? No.
 *    - Push index `2`. Stack: `[1, 2]` (Indices 1(3) and 2(2) waiting)
 *
 * 4. **i = 3** (`val = 4`):
 *    - `4 > arr[st.top]` (4 > 2)? **Yes**.
 *      - Pop `2`. `ans[2] = 4`.
 *      - Stack: `[1]`.
 *    - `4 > arr[st.top]` (4 > 3)? **Yes**.
 *      - Pop `1`. `ans[1] = 4`.
 *      - Stack: `[]`.
 *    - Push index `3`. Stack: `[3]` (Element 4 is waiting)
 *
 * **Loop End.**
 * Stack `[3]` mein index 3 bacha hai. Uska answer `-1` hi rahega (jo default tha).
 *
 * **Final Result:** `[3, 4, 4, -1]`
 */

export namespace NextGreaterElementOptimal {
    export function nextGreaterElement(arr: number[]): number[] {
        const n = arr.length;
        const ans: number[] = new Array(n).fill(-1);
        const stack: number[] = []; // Stores INDICES of elements waiting for NGE

        for (let i = 0; i < n; i++) {
            const currentVal = arr[i];

            // Resolve NGE for pending elements in stack
            // Agar current element stack ke top element se bada hai,
            // toh wahi uska Next Greater Element hai.
            while (stack.length > 0 && currentVal > arr[stack[stack.length - 1]]) {
                const prevIndex = stack.pop()!;
                ans[prevIndex] = currentVal;
            }

            // Current index ko waiting list (stack) mein daalo
            stack.push(i);
        }

        return ans;
    }
}

// Test Runner
if (require.main === module) {
    const testCases = [
        {
            input: [1, 3, 2, 4],
            expected: [3, 4, 4, -1],
            description: "Example 1"
        },
        {
            input: [6, 8, 0, 1, 3],
            expected: [8, -1, 1, 3, -1],
            description: "Example 2"
        },
        {
            input: [5, 4, 3, 2, 1],
            expected: [-1, -1, -1, -1, -1],
            description: "Strictly Decreasing (No NGE to right)"
        },
        {
            input: [1, 2, 3, 4, 5],
            expected: [2, 3, 4, 5, -1],
            description: "Strictly Increasing (Next element is always NGE)"
        }
    ];

    console.log("Running Test Cases for Next Greater Element (Forward Optimal)...");

    testCases.forEach((test, index) => {
        const result = NextGreaterElementOptimal.nextGreaterElement(test.input);
        const isPassed = JSON.stringify(result) === JSON.stringify(test.expected);
        
        console.log(`Test Case ${index + 1}: ${test.description}`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: [${test.expected}]`);
        console.log(`Got:      [${result}]`);
        console.log(`Status: ${isPassed ? "✅ PASS" : "❌ FAIL"}`);
        console.log("-".repeat(40));
    });
}
