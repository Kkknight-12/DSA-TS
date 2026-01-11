/*
*
* Original List: 1 → 2 → 3 → 4 → 5 → null

Traverse karte hue values store karo:
Array = [1, 2, 3, 4, 5]
```

### **Step 2: Create New Nodes in Reverse Order**
```
Array ke end se start karo:
- Pehle 5 ka node banao → 5 → null
- Phir 4 ka node banao aur 5 se jodo → 4 → 5 → null
- Phir 3 ka node banao aur 4 se jodo → 3 → 4 → 5 → null
- ... aur aage bhi same
```

### **Step 3: Return New Head**
```
Final Reversed List: 5 → 4 → 3 → 2 → 1 → null
Return: 5 (ye naya head hai)
```

---

## 🎨 Visualization

Chalo visual mein dekhte hain process:
```
ORIGINAL LINKED LIST:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   ↑
  head

STEP 1: TRAVERSE & STORE IN ARRAY
┌─────────────────────────────┐
│  Array = [1, 2, 3, 4, 5]    │
│           ↑           ↑      │
│         index 0    index 4   │
└─────────────────────────────┘

STEP 2: BUILD REVERSED LIST (from array end to start)
Iteration 1: array[4] = 5
┌───┬────┐
│ 5 │null│  ← newHead (stays here!)
└───┴────┘
      ↑
  newCurrent

Iteration 2: array[3] = 4
┌───┬────┐   ┌───┬────┐
│ 5 │ ●──┼──→│ 4 │null│
└───┴────┘   └───┴────┘
   ↑              ↑
newHead      newCurrent (appending to end)

Iteration 3: array[2] = 3
┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 5 │ ●──┼──→│ 4 │ ●──┼──→│ 3 │null│
└───┴────┘   └───┴────┘   └───┴────┘
   ↑                          ↑
newHead                  newCurrent

Iteration 4: array[1] = 2
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 5 │ ●──┼──→│ 4 │ ●──┼──→│ 3 │ ●──┼──→│ 2 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   ↑                                        ↑
newHead                                newCurrent

Iteration 5: array[0] = 1
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 5 │ ●──┼──→│ 4 │ ●──┼──→│ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   ↑                                                      ↑
newHead (FINAL REVERSED LIST)                        newCurrent
* */

/**
 * BRUTE FORCE SOLUTION: Reverse Linked List
 *
 * Purpose: Reverse a singly linked list using extra space (array)
 * Approach: Store all values in array, then rebuild list in reverse order
 * Time Complexity: O(n) - traverse list once to store, once to rebuild
 * Space Complexity: O(n) - array stores all node values
 */

namespace ReverseLinkedListBruteForce {
  /**
   * ListNode class - Represents a single node in the linked list
   */
  class ListNode {
    val: number; // Node ki value
    next: ListNode | null; // Agle node ka reference (null if last node)

    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function to reverse the linked list using brute force approach
   *
   * Algorithm:
   * 1. Traverse the entire list and store all values in an array
   * 2. Build a new linked list by iterating array from end to start
   * 3. Return the new head of reversed list
   *
   * @param head - Head of the original linked list
   * @returns Head of the reversed linked list
   */
  function reverseList(head: ListNode | null): ListNode | null {
    // Edge Case: Agar list empty hai ya sirf ek node hai
    // Toh reverse karne ki zaroorat nahi, seedha return kar do
    if (head === null || head.next === null) {
      return head;
    }

    // Step 1: Sabhi node values ko array mein store karo
    const values: number[] = [];
    let current: ListNode | null = head; // Pointer to traverse the list

    // List ko traverse karke saari values collect karo
    while (current !== null) {
      values.push(current.val); // Current node ki value array mein daalo
      current = current.next; // Agle node pe move karo
    }

    // Debug: Array dekh sakte hain (optional)
    // console.log("Stored values:", values); // [1, 2, 3, 4, 5]

    // Step 2: Naya linked list banao reverse order mein
    // Array ke last element se shuru karo (reverse order ke liye)
    let newHead: ListNode | null = null; // Naye list ka head
    let newCurrent: ListNode | null = null; // Naye list mein current position

    // Array ko reverse order mein traverse karo (end se start tak)
    for (let i = values.length - 1; i >= 0; i--) {
      const newNode = new ListNode(values[i]); // Naya node banao

      // Agar ye pehla node hai (newHead null hai)
      if (newHead === null) {
        newHead = newNode; // Isko head bana do
        newCurrent = newNode; // Current bhi yehi hai
      } else {
        // Agar pehle se nodes hain, toh current ke aage add karo
        newCurrent!.next = newNode; // Previous node ko naye node se connect karo
        newCurrent = newNode; // Current ko naye node pe move karo
      }
    }

    // Step 3: Naye reversed list ka head return karo
    return newHead;
  }

  /**
   * Helper function: Create a linked list from an array
   * Ye test cases ke liye useful hai
   */
  function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;

    const head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Helper function: Convert linked list to array for easy printing
   */
  function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  /**
   * Test function: Multiple test cases run karta hai
   */
  export function runTests(): void {
    console.log('🧪 Testing Reverse Linked List - BRUTE FORCE APPROACH\n');

    // Test Case 1: Normal list with multiple nodes
    console.log('Test Case 1: [1,2,3,4,5]');
    let head1 = createLinkedList([1, 2, 3, 4, 5]);
    let reversed1 = reverseList(head1);
    console.log('Input:  [1,2,3,4,5]');
    console.log('Output:', listToArray(reversed1));
    console.log('Expected: [5,4,3,2,1]');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed1)) === JSON.stringify([5, 4, 3, 2, 1])
    );
    console.log();

    // Test Case 2: List with two nodes
    console.log('Test Case 2: [1,2]');
    let head2 = createLinkedList([1, 2]);
    let reversed2 = reverseList(head2);
    console.log('Input:  [1,2]');
    console.log('Output:', listToArray(reversed2));
    console.log('Expected: [2,1]');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed2)) === JSON.stringify([2, 1])
    );
    console.log();

    // Test Case 3: Empty list
    console.log('Test Case 3: []');
    let head3 = createLinkedList([]);
    let reversed3 = reverseList(head3);
    console.log('Input:  []');
    console.log('Output:', listToArray(reversed3));
    console.log('Expected: []');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed3)) === JSON.stringify([])
    );
    console.log();

    // Test Case 4: Single node
    console.log('Test Case 4: [1]');
    let head4 = createLinkedList([1]);
    let reversed4 = reverseList(head4);
    console.log('Input:  [1]');
    console.log('Output:', listToArray(reversed4));
    console.log('Expected: [1]');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed4)) === JSON.stringify([1])
    );
    console.log();

    // Test Case 5: Larger list
    console.log('Test Case 5: [10,20,30,40,50,60]');
    let head5 = createLinkedList([10, 20, 30, 40, 50, 60]);
    let reversed5 = reverseList(head5);
    console.log('Input:  [10,20,30,40,50,60]');
    console.log('Output:', listToArray(reversed5));
    console.log('Expected: [60,50,40,30,20,10]');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed5)) ===
        JSON.stringify([60, 50, 40, 30, 20, 10])
    );
  }
}

// Namespace ke bahar se test function call karo
ReverseLinkedListBruteForce.runTests();
/*

---

## 🏃‍♂️ Dry Run - Table Format

Chalo **Example: [1,2,3,4,5]** ke saath step-by-step dry run karte hain:

### **Phase 1: Values Ko Array Mein Store Karna**

| Iteration | current.val | values Array | current moves to |
|-----------|-------------|--------------|------------------|
| Initial   | 1           | []           | Node(1)          |
| 1         | 1           | [1]          | Node(2)          |
| 2         | 2           | [1,2]        | Node(3)          |
| 3         | 3           | [1,2,3]      | Node(4)          |
| 4         | 4           | [1,2,3,4]    | Node(5)          |
| 5         | 5           | [1,2,3,4,5]  | null             |
| End       | -           | [1,2,3,4,5]  | Loop ends        |

### **Phase 2: Reverse Order Mein Naya List Banana**

| Iteration | i | values[i] | newNode | newHead | newCurrent | Action |
|-----------|---|-----------|---------|---------|------------|--------|
| Initial   | - | -         | null    | null    | null       | Setup |
| 1         | 4 | 5         | Node(5) | Node(5) | Node(5)    | First node, head banaya |
| 2         | 3 | 4         | Node(4) | Node(5) | Node(4)    | Node(5).next = Node(4) |
| 3         | 2 | 3         | Node(3) | Node(5) | Node(3)    | Node(4).next = Node(3) |
| 4         | 1 | 2         | Node(2) | Node(5) | Node(2)    | Node(3).next = Node(2) |
| 5         | 0 | 1         | Node(1) | Node(5) | Node(1)    | Node(2).next = Node(1) |
| End       | - | -         | -       | Node(5) | Node(1)    | Return Node(5) as head |

### **Final Result:**
```
Original: 1 → 2 → 3 → 4 → 5 → null
Reversed: 5 → 4 → 3 → 2 → 1 → null
  ```

---

## 🔑 Key Ideas (Yaad Rakhne Wali Baatein)

1. **Array As Intermediate Storage** 📦
   - Linked list ko array mein convert karna makes reversal easy
   - Array ko reverse order mein access kar sakte hain (backwards traversal)

2. **Two-Phase Approach** 🔄
   - **Phase 1:** Traverse & Store (left to right)
   - **Phase 2:** Rebuild & Connect (right to left)

3. **Edge Cases Handle Karo** ⚠️
   - Empty list: `if (head === null)` → return null
   - Single node: `if (head.next === null)` → return head
   - Dono cases mein reversal ki zaroorat nahi

4. **Extra Space Trade-off** 💾
   - Simple approach hai but O(n) extra space use karta hai
   - Production mein usually O(1) space solution prefer hoti hai

5. **Node Creation** 🏗️
   - Har value ke liye **naya node create** karna padta hai
   - Original nodes reuse nahi kar rahe (unlike optimal approach)

---

## 📊 Complexity Analysis

### **Time Complexity: O(n)**

**Breakdown:**
- **Phase 1 (Traversal):** O(n) - har node ko ek baar visit karte hain
- **Phase 2 (Reconstruction):** O(n) - har value ke liye naya node banate hain
- **Total:** O(n) + O(n) = O(n)

Jahan `n` = number of nodes in linked list

### **Space Complexity: O(n)**

**Breakdown:**
- **Array Storage:** O(n) - saari values store karte hain
- **New Linked List:** O(n) - naye nodes create karte hain (but ye output hai, extra nahi count hota usually)
- **Auxiliary Space (actual extra):** O(n) for the array

**Note:** Ye approach **space-intensive** hai, isliye interview mein optimal approach prefer hoti hai.

---

## 🎯 Interview-Focused Notes

### **1. Interviewer Se Kya Discuss Karna Hai:**
```
Tumhara Response:
  "Main brute force approach se start karta hoon. Isme main saari values
ko pehle array mein store karunga, phir reverse order mein naya list
banaunga. Ye O(n) time aur O(n) space use karega.

  Lekin agar aap chahein toh main ek optimized approach bhi dikha sakta
hoon jo O(1) space use karti hai using three pointers."

 */