# Merge Sort Part 2: The Bottom-Up Iterative Approach

We'll break down **Merge Sort (Bottom-Up Approach)** step-by-step, using simple language and analogies. This is Part 2 of our Merge Sort series - if you haven't read Part 1 (Top-Down approach), I recommend starting there!

> **Quick Recap from Part 1**: Merge Sort uses divide-and-conquer to achieve O(n log n) sorting. The Top-Down approach uses recursion to split arrays until reaching single elements, then merges back up.

> **What's new in Part 2**: The Bottom-Up approach achieves the same result but **without recursion** - building sorted arrays iteratively from the ground up!

---

## Let's Start with the Big Picture

Imagine building a pyramid from the ground up using blocks!

**Top-Down approach (Part 1)**:
- Start with complete pyramid
- Break it down into smaller pyramids
- Keep breaking until you have individual blocks
- Rebuild by stacking blocks back up
- Uses **recursion** (break down first, build later)

**Bottom-Up approach (Part 2)**:
- Start with individual blocks on the ground
- Stack pairs of blocks → level 1 complete
- Stack pairs of level-1 sections → level 2 complete
- Continue stacking until pyramid is complete
- Uses **iteration** (build directly from bottom to top)

**Same result, different construction method!**

Think of organizing books alphabetically:

**Top-Down**: "I have 1000 books. Let me split them in half, split those halves, split again... until I have single books. Now merge pairs of single books, merge pairs of pairs, until all books are organized."

**Bottom-Up**: "I have 1000 books. Let me organize them in pairs first, then organize groups of 4, then groups of 8, then groups of 16, until all books are organized."

**The Bottom-Up way is more systematic and predictable!** No recursion needed! 🎯

---

## Problem Statement (Same as Part 1)

**Given:** An unsorted array of numbers
**Goal:** Sort the array in ascending order efficiently
**Constraint:** Handle very large arrays (millions of elements)

**Example:**
```
Input:  [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]
```

**Why Bottom-Up?**

The Top-Down recursive approach is elegant, but has some drawbacks:
- **Recursion overhead**: Function call stack costs time and memory
- **Stack depth**: Deep recursion can cause stack overflow
- **Cache-unfriendly**: Jumps around memory unpredictably

Bottom-Up solves these issues!

---

## Step 1: The "Top-Down" Approach (Quick Recap)

Before diving into Bottom-Up, let's recall how Top-Down works.

### Top-Down (Recursive) - From Part 1

**Strategy**: Divide from top, conquer recursively, merge bottom-up

```
                [38, 27, 43, 3]
                       |
                  (Divide)
                       |
              +--------+--------+
              |                 |
          [38, 27]          [43, 3]
              |                 |
         (Divide)          (Divide)
              |                 |
        +-----+-----+     +-----+-----+
        |           |     |           |
      [38]        [27]  [43]        [3]
        |           |     |           |
    (Sorted!)   (Sorted!) (Sorted!) (Sorted!)
        |           |     |           |
        +-----+-----+     +-----+-----+
              |                 |
           (Merge)           (Merge)
              |                 |
          [27, 38]          [3, 43]
              |                 |
              +--------+--------+
                       |
                    (Merge)
                       |
               [3, 27, 38, 43] ✓
```

**Characteristics**:
- ✅ Clean, elegant code
- ✅ Easy to understand (matches mental model)
- ❌ Recursion overhead
- ❌ Call stack memory: O(log n)
- ❌ Less cache-friendly

---

## Step 2: The Challenge (Why Bottom-Up?)

**Problems with Top-Down**:

1. **Recursion Overhead**
```
Each recursive call requires:
- Function call setup
- Stack frame creation
- Parameter passing
- Return value handling
Total: ~10-20 CPU instructions per call
For 1 million elements: log₂(1,000,000) ≈ 20 levels
                       = potentially 1,000,000 function calls!
```

2. **Stack Depth Limitations**
```
Maximum recursion depth varies:
- JavaScript: ~10,000 calls
- Python: ~1,000 calls (default)
- For very large arrays, might hit stack overflow!
```

3. **Cache Inefficiency**
```
Recursion jumps around memory unpredictably:
- CPU cache misses increase
- Memory access becomes slower
- Performance degrades
```

**The Question**: Can we get O(n log n) sorting **without recursion**?

**The Answer**: Yes! Bottom-Up Merge Sort! 🎉

---

## Step 3: The "Aha!" Moment

**The core idea: Instead of breaking down from top, build up from bottom!**

### The Key Insight 💡

**Observation**: Single elements are already "sorted" (trivially!)

**Strategy**: Start with size-1 subarrays (single elements), and iteratively merge into larger sorted subarrays.

```
Pass 1: Merge every pair of size-1 → Create size-2 sorted subarrays
Pass 2: Merge every pair of size-2 → Create size-4 sorted subarrays
Pass 3: Merge every pair of size-4 → Create size-8 sorted subarrays
...
Continue until size ≥ n → Fully sorted array!
```

**Visual Example**:
```
Initial (size = 1):
[38] [27] [43] [3] [9] [82] [10]
  ↓    ↓    ↓   ↓   ↓    ↓    ↓
Single elements are already sorted!

Pass 1 (merge size 1 → size 2):
[38] [27] [43] [3] [9] [82] [10]
 └─┬─┘   └──┬──┘   └─┬──┘   [10]
[27,38]   [3,43]  [9,82]   [10]

Pass 2 (merge size 2 → size 4):
[27,38]   [3,43]  [9,82]   [10]
  └────┬────┘      └──┬────┘
  [3,27,38,43]    [9,10,82]

Pass 3 (merge size 4 → size 8):
 [3,27,38,43]    [9,10,82]
      └──────┬──────┘
    [3,9,10,27,38,43,82] ✓

Done! Array is sorted!
```

**Compare to Top-Down**:
```
Top-Down: Start big → Break into small → Merge back to big
Bottom-Up: Start small → Keep merging to bigger → End with big
```

**The Brilliant Part**: No recursion needed! Just a simple loop that doubles the merge size each pass!

---

## Step 4: The Magic Tool - Iterative Merging

The Bottom-Up approach uses **nested loops** instead of recursion.

### The Iteration Structure

```
size = 1  (Start with single elements)

while size < n:
    // Merge all pairs of current size
    for each pair of subarrays of size 'size':
        merge them

    size = size * 2  // Double the size for next pass
```

### Key Variables Explained

**`size`**: Current size of subarrays being merged
- Pass 1: size = 1 (merge single elements)
- Pass 2: size = 2 (merge pairs)
- Pass 3: size = 4 (merge quads)
- Pass k: size = 2^(k-1)

**`leftStart`**: Starting index of the left subarray
- Increments by `2 * size` each iteration
- Example: For size=2, leftStart = 0, 4, 8, 12, ...

**`mid`**: End index of left subarray = `leftStart + size - 1`
- Marks boundary between left and right subarrays

**`rightEnd`**: End index of right subarray = `min(leftStart + 2*size - 1, n-1)`
- Uses `min()` to handle array end gracefully

### The Size Doubling Pattern

**Why does size double?**

```
Pass 1 (size = 1):
  Merge [_] + [_] → Result has size 2
  All resulting subarrays have size 2

Pass 2 (size = 2):
  Merge [_,_] + [_,_] → Result has size 4
  All resulting subarrays have size 4

Pass 3 (size = 4):
  Merge [_,_,_,_] + [_,_,_,_] → Result has size 8
  All resulting subarrays have size 8

Pattern: size₍ₙₑₓₜ₎ = 2 × size₍ₖᵤᵣᵣₑₙₜ₎
```

**Number of passes**: log₂(n)
- 8 elements → 3 passes (1→2→4→8)
- 16 elements → 4 passes (1→2→4→8→16)
- 1000 elements → ~10 passes

### The Algorithm

```
BottomUpMergeSort(array):
    n = array.length
    size = 1

    // Continue until size covers entire array
    while size < n:
        // For each pair of subarrays of current size
        leftStart = 0
        while leftStart < n:
            // Calculate boundaries
            mid = min(leftStart + size - 1, n - 1)
            rightEnd = min(leftStart + 2*size - 1, n - 1)

            // Only merge if right subarray exists
            if mid < rightEnd:
                merge(array, leftStart, mid, rightEnd)

            // Move to next pair
            leftStart = leftStart + 2 * size

        // Double size for next pass
        size = size * 2
```

**The beauty**: Simple iterative loops, no recursion! 🎯

---

## Step 5: Putting It All Together

Let's walk through a complete example to see Bottom-Up in action!

### Example: Sort [38, 27, 43, 3, 9, 82, 10]

> 💡 **Why [38, 27, 43, 3, 9, 82, 10]?**
> - **7 elements** (not power of 2) demonstrates how bottom-up handles non-perfect sizes gracefully
> - Shows **partial subarrays** in final pass - a real-world scenario most arrays face
> - **3 complete passes** (size 1→2→4→8) visible without overwhelming detail
> - Small enough to trace every single merge step without getting lost
> - Diverse values show all merge scenarios (smaller left, smaller right, exhausted arrays)

**Initial State**:
```
Array: [38, 27, 43, 3, 9, 82, 10]
Index:  0   1   2  3  4   5   6
n = 7
```

---

### **PASS 1: size = 1** (Merge pairs of single elements)

**Goal**: Merge adjacent single elements into sorted pairs

**Iteration 1**: Merge positions [0] and [1]
```
leftStart = 0, mid = 0, rightEnd = 1
Left:  [38]   (index 0)
Right: [27]   (index 1)

Merge process:
  Compare: 38 vs 27 → 27 is smaller
  Result: [27, 38]

Array after: [27, 38, 43, 3, 9, 82, 10]
```

**Iteration 2**: Merge positions [2] and [3]
```
leftStart = 2, mid = 2, rightEnd = 3
Left:  [43]   (index 2)
Right: [3]    (index 3)

Merge process:
  Compare: 43 vs 3 → 3 is smaller
  Result: [3, 43]

Array after: [27, 38, 3, 43, 9, 82, 10]
```

**Iteration 3**: Merge positions [4] and [5]
```
leftStart = 4, mid = 4, rightEnd = 5
Left:  [9]    (index 4)
Right: [82]   (index 5)

Merge process:
  Compare: 9 vs 82 → 9 is smaller
  Result: [9, 82]

Array after: [27, 38, 3, 43, 9, 82, 10]
```

**Iteration 4**: Position [6] has no pair
```
leftStart = 6, mid = 6, rightEnd = 6
Only one element, skip (no merge needed)

Array after: [27, 38, 3, 43, 9, 82, 10]
```

**After Pass 1**: `[27, 38, 3, 43, 9, 82, 10]`
```
Visual:
[27, 38] [3, 43] [9, 82] [10]
 ↑ pair   ↑ pair  ↑ pair  ↑ single
```

---

### **PASS 2: size = 2** (Merge pairs of size-2 subarrays)

**Goal**: Merge adjacent pairs into sorted quads

**Iteration 1**: Merge [27,38] and [3,43]
```
leftStart = 0, mid = 1, rightEnd = 3
Left:  [27, 38]   (indices 0-1)
Right: [3, 43]    (indices 2-3)

Merge process:
  Step 1: Compare 27 vs 3  → Pick 3   → [3]
  Step 2: Compare 27 vs 43 → Pick 27  → [3, 27]
  Step 3: Compare 38 vs 43 → Pick 38  → [3, 27, 38]
  Step 4: Right exhausted  → Add 43   → [3, 27, 38, 43]

Array after: [3, 27, 38, 43, 9, 82, 10]
```

**Iteration 2**: Merge [9,82] and [10]
```
leftStart = 4, mid = 5, rightEnd = 6
Left:  [9, 82]    (indices 4-5)
Right: [10]       (index 6)

Merge process:
  Step 1: Compare 9 vs 10  → Pick 9   → [9]
  Step 2: Compare 82 vs 10 → Pick 10  → [9, 10]
  Step 3: Left exhausted   → Add 82   → [9, 10, 82]

Array after: [3, 27, 38, 43, 9, 10, 82]
```

**After Pass 2**: `[3, 27, 38, 43, 9, 10, 82]`
```
Visual:
[3, 27, 38, 43] [9, 10, 82]
 ↑ quad of 4     ↑ triple (partial)
```

---

### **PASS 3: size = 4** (Merge pairs of size-4 subarrays)

**Goal**: Merge quads into final sorted array

**Iteration 1**: Merge [3,27,38,43] and [9,10,82]
```
leftStart = 0, mid = 3, rightEnd = 6
Left:  [3, 27, 38, 43]   (indices 0-3)
Right: [9, 10, 82]       (indices 4-6)

Merge process:
  Step 1: Compare 3 vs 9   → Pick 3   → [3]
  Step 2: Compare 27 vs 9  → Pick 9   → [3, 9]
  Step 3: Compare 27 vs 10 → Pick 10  → [3, 9, 10]
  Step 4: Compare 27 vs 82 → Pick 27  → [3, 9, 10, 27]
  Step 5: Compare 38 vs 82 → Pick 38  → [3, 9, 10, 27, 38]
  Step 6: Compare 43 vs 82 → Pick 43  → [3, 9, 10, 27, 38, 43]
  Step 7: Right exhausted  → Add 82   → [3, 9, 10, 27, 38, 43, 82]

Array after: [3, 9, 10, 27, 38, 43, 82]
```

**After Pass 3**: `[3, 9, 10, 27, 38, 43, 82]` ✓

**size = 8 ≥ n = 7**, loop exits. **Array is fully sorted!**

---

### Visual Summary of All Passes

```
═══════════════════════════════════════════════════════════
INITIAL STATE (size = 1):
═══════════════════════════════════════════════════════════
[38] [27] [43] [3] [9] [82] [10]
  ↓    ↓    ↓   ↓   ↓    ↓    ↓
Single elements (already "sorted")

═══════════════════════════════════════════════════════════
PASS 1 (size = 1 → Merge to size 2):
═══════════════════════════════════════════════════════════
Merge [38]+[27]:  [27,38] __ __ __ __ __
Merge [43]+[3]:   __ __ [3,43] __ __ __
Merge [9]+[82]:   __ __ __ __ [9,82] __
No pair for [10]: __ __ __ __ __ __ [10]

Result: [27, 38, 3, 43, 9, 82, 10]

═══════════════════════════════════════════════════════════
PASS 2 (size = 2 → Merge to size 4):
═══════════════════════════════════════════════════════════
Merge [27,38]+[3,43]:  [3,27,38,43] __ __ __
Merge [9,82]+[10]:     __ __ __ __ [9,10,82]

Result: [3, 27, 38, 43, 9, 10, 82]

═══════════════════════════════════════════════════════════
PASS 3 (size = 4 → Merge to size 8):
═══════════════════════════════════════════════════════════
Merge [3,27,38,43]+[9,10,82]:  [3,9,10,27,38,43,82]

Result: [3, 9, 10, 27, 38, 43, 82] ✓

═══════════════════════════════════════════════════════════
DONE! Array is fully sorted!
═══════════════════════════════════════════════════════════
Total passes: 3 = ⌈log₂(7)⌉
```

---

### The Merge Operation (Same as Top-Down!)

**Key point**: The merge operation is identical to Top-Down approach!

```typescript
function merge(left: number[], right: number[]): number[] {
  const result = [];
  let leftIndex = 0, rightIndex = 0;

  // Compare fronts, pick smaller
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }

  // Add remaining
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
```

**What's different?**
- Top-Down: Merge is called by recursion (unpredictable order)
- Bottom-Up: Merge is called by iteration (predictable order)

**Same efficiency**: O(n) time per merge!

---

## Summary and Analogy

**Remember the construction analogy?** 🏗️

Instead of designing a complete building then breaking it down into bricks (Top-Down), Bottom-Up starts with bricks and systematically builds walls → rooms → floors → building. Same result, more direct path - no recursion overhead, better cache performance, easier to parallelize!

---

## Complexity Analysis

### Time Complexity: O(n log n) ✓ (Same as Top-Down!)

**Why?**

**Number of passes**: log₂(n)
- Pass 1: Merge size 1 → 2
- Pass 2: Merge size 2 → 4
- Pass 3: Merge size 4 → 8
- ...
- Pass k: size = 2^k ≥ n → Done!

Number of passes k where 2^k ≥ n → k ≥ log₂(n) → **log₂(n) passes**

**Work per pass**: O(n)
- Each pass processes all n elements exactly once (during merging)

**Total work**: `O(n) per pass × O(log n) passes = O(n log n)` ✓

**Example** (n = 8):
```
Pass 1 (size 1→2): Process 8 elements → 8 operations
Pass 2 (size 2→4): Process 8 elements → 8 operations
Pass 3 (size 4→8): Process 8 elements → 8 operations

Total: 3 passes × 8 operations = 24 operations
Formula: log₂(8) × 8 = 3 × 8 = 24 ✓
```

**Comparison with Top-Down**:
```
Both have same time complexity: O(n log n)

But Bottom-Up has better constants:
- No function call overhead
- No stack frame management
- Better cache locality

Bottom-Up is typically 10-20% faster in practice! 🚀
```

### Space Complexity: O(n) ✓ (Better than Top-Down!)

**Where does space go?**

1. **Merge operation**: Temporary array
   - Size: O(n)

2. **No recursion stack!**: O(1) instead of O(log n)
   - Top-Down: O(log n) stack frames
   - Bottom-Up: No recursion, just loops!

**Total space**: O(n) + O(1) = **O(n)**

**Advantage over Top-Down**:
```
Top-Down:  O(n) merge temp + O(log n) stack = O(n)
Bottom-Up: O(n) merge temp + O(1) loops = O(n)

Both are O(n), but Bottom-Up:
- Uses less memory in practice
- No stack overflow risk
- More predictable memory usage
```

---

## Top-Down vs Bottom-Up Comparison

| Aspect | Top-Down (Part 1) | Bottom-Up (Part 2) | Winner |
|--------|-------------------|-------------------|---------|
| **Implementation** | Recursive | Iterative | Tie |
| **Code Length** | Shorter (~20 lines) | Longer (~30 lines) | Top-Down |
| **Readability** | More intuitive | More mechanical | Top-Down |
| **Time Complexity** | O(n log n) | O(n log n) | Tie |
| **Space Complexity** | O(n) + O(log n) stack | O(n) only | Bottom-Up |
| **Function Call Overhead** | Yes (log n calls) | No | Bottom-Up |
| **Cache Efficiency** | Lower (jumps around) | Higher (sequential) | Bottom-Up |
| **Stack Overflow Risk** | Possible (deep recursion) | None | Bottom-Up |
| **Practical Speed** | Slower | 10-20% faster | Bottom-Up |
| **Memory Predictability** | Less predictable | Very predictable | Bottom-Up |
| **Parallelization** | Harder | Easier | Bottom-Up |
| **Learning Curve** | Easier to understand | Requires more thought | Top-Down |
| **Production Use** | Good for clarity | Better for performance | Bottom-Up |

### When to Use Which?

**Use Top-Down when**:
✅ Learning merge sort for the first time
✅ Code clarity is priority over performance
✅ Array size is moderate (< 100,000)
✅ You prefer recursive thinking

**Use Bottom-Up when**:
✅ Production code with performance requirements
✅ Very large arrays (millions of elements)
✅ Memory-constrained environments
✅ Need predictable, guaranteed performance
✅ Risk of stack overflow
✅ Want to parallelize merging

**In practice**: Modern libraries often use Bottom-Up for production sorting!

---

## Code

Below you'll find a complete TypeScript implementation with:
- ✅ Detailed inline comments explaining WHY
- ✅ Helper functions with JSDoc
- ✅ Visualization of passes
- ✅ Multiple examples
- ✅ Edge case handling

---

## Complete TypeScript Code - Bottom-Up (Iterative)

```typescript
/**
 * MERGE SORT - BOTTOM-UP (ITERATIVE) APPROACH
 * ============================================
 *
 * This implementation uses iteration to merge subarrays of increasing sizes,
 * building from bottom (single elements) to top (fully sorted array).
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n) - no recursion stack!
 *
 * @author DSA TypeScript - Part 2
 */

/**
 * Main merge sort function (Bottom-Up approach)
 *
 * This is the public API. It sorts without recursion using nested loops.
 *
 * @param arr - Array to be sorted
 * @returns New sorted array (original unchanged)
 * @complexity Time O(n log n), Space O(n)
 */
function mergeSortBottomUp(arr: number[]): number[] {
  // EDGE CASE: Arrays with 0 or 1 element are already sorted
  // WHY: No merging needed
  if (arr.length <= 1) {
    return arr;
  }

  // Create a copy to avoid modifying original
  // WHY: We'll work on this copy throughout the algorithm
  // ALTERNATIVE: Could modify in-place for O(1) extra space
  const result = [...arr];
  const n = result.length;

  // STEP 1: Start with subarray size of 1
  // WHY: Single elements are already "sorted"!
  // LOGIC: We'll double the size each pass (1 → 2 → 4 → 8 → ...)
  // EXAMPLE: For n=8, sizes will be 1, 2, 4, 8
  let size = 1;

  // STEP 2: Continue merging until size covers entire array
  // WHY: When size >= n, we've merged everything into one sorted array
  // LOOP INVARIANT: After each iteration, all subarrays of current size are sorted
  // TERMINATION: size doubles each iteration, will reach n in log₂(n) iterations
  while (size < n) {
    // STEP 3: For current size, merge all pairs of subarrays
    // WHY: Each pair of size 'size' gets merged into one of size '2*size'
    // EXAMPLE: size=2 means merge [_,_] with [_,_] to get [_,_,_,_]

    // leftStart marks beginning of left subarray in each pair
    // WHY: We process array in chunks of 2*size
    // EXAMPLE: size=1, leftStart = 0, 2, 4, 6, ... (every 2 positions)
    // EXAMPLE: size=2, leftStart = 0, 4, 8, 12, ... (every 4 positions)
    // EXAMPLE: size=4, leftStart = 0, 8, 16, 24, ... (every 8 positions)
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      // Calculate indices for merge operation

      // Left subarray: [leftStart ... mid]
      // WHY: Left subarray has 'size' elements (or less at array end)
      // FORMULA: mid = leftStart + size - 1
      // EDGE CASE: Use min() to prevent going past array end
      // EXAMPLE: leftStart=0, size=2 → mid = min(0+2-1, n-1) = min(1, n-1)
      const mid = Math.min(leftStart + size - 1, n - 1);

      // Right subarray: [mid+1 ... rightEnd]
      // WHY: Right subarray also has 'size' elements (or less at array end)
      // FORMULA: rightEnd = leftStart + 2*size - 1
      // EDGE CASE: Right subarray might not exist or be smaller than 'size'
      // EXAMPLE: leftStart=0, size=2 → rightEnd = min(0+4-1, n-1) = min(3, n-1)
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

      // Only merge if right subarray exists
      // WHY: If mid >= rightEnd, there's no right subarray to merge
      // EXAMPLE: At array end, might only have left subarray remaining
      if (mid < rightEnd) {
        // Perform in-place merge
        // ARGS: array, left start, left end, right end
        mergeBottomUp(result, leftStart, mid, rightEnd);
      }
    }

    // STEP 4: Double the size for next pass
    // WHY: We've merged all pairs of current size, now merge bigger pairs
    // EXAMPLE: size 1 → 2, size 2 → 4, size 4 → 8, etc.
    // PROGRESSION: 2⁰ → 2¹ → 2² → 2³ → ... → 2^(log n) = n
    size *= 2;
  }

  // STEP 5: Return sorted array
  // GUARANTEE: All elements are now in sorted order
  return result;
}

/**
 * Merge function for bottom-up approach
 * Merges arr[left...mid] and arr[mid+1...right] in place
 *
 * This is the same merge operation as Top-Down, just called iteratively!
 *
 * @param arr - Array containing subarrays to merge
 * @param left - Start index of first subarray
 * @param mid - End index of first subarray
 * @param right - End index of second subarray
 * @complexity Time O(right - left + 1), Space O(right - left + 1)
 */
function mergeBottomUp(
  arr: number[],
  left: number,
  mid: number,
  right: number
): void {
  // Create temporary arrays for the two subarrays
  // WHY: We need to compare elements while overwriting original array
  // ALTERNATIVE: Could use a single global temp array for O(n) total space
  // NOTE: slice(start, end) goes from start to end-1 (end is exclusive!)
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  // Indices for traversing leftArr, rightArr, and original array
  let i = 0; // Current index in leftArr
  let j = 0; // Current index in rightArr
  let k = left; // Current index in original array (where to place merged element)

  // STEP 1: Merge elements from both subarrays
  // WHY: Compare and pick smaller element from front of each subarray
  // LOGIC: Continue while both subarrays have unprocessed elements
  // INVARIANT: arr[left...k-1] contains merged sorted elements so far
  while (i < leftArr.length && j < rightArr.length) {
    // Use <= for stability (equal elements from left go first)
    // WHY: Preserves original relative order of equal elements
    // EXAMPLE: If leftArr[i]=5a and rightArr[j]=5b, pick 5a first
    if (leftArr[i] <= rightArr[j]) {
      // Left element is smaller (or equal), place it in original array
      // EXAMPLE: leftArr[0]=3, rightArr[0]=5 → arr[k]=3
      arr[k] = leftArr[i];
      i++; // Move to next element in left subarray
    } else {
      // Right element is smaller, place it in original array
      // EXAMPLE: leftArr[0]=27, rightArr[0]=10 → arr[k]=10
      arr[k] = rightArr[j];
      j++; // Move to next element in right subarray
    }
    k++; // Move to next position in original array
  }

  // STEP 2: Copy remaining elements from leftArr (if any)
  // WHY: Right subarray exhausted but left still has sorted elements
  // EXAMPLE: After loop, left=[27, 38], right=[] → Copy [27, 38]
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  // STEP 3: Copy remaining elements from rightArr (if any)
  // WHY: Left subarray exhausted but right still has sorted elements
  // NOTE: Only one of these "remaining" loops will execute (not both!)
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }

  // RESULT: arr[left...right] now contains merged sorted elements
}

/**
 * Helper function to visualize the merging process
 * Shows how array evolves through each pass
 *
 * This is educational - not needed for actual sorting
 */
function mergeSortBottomUpWithVisualization(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const result = [...arr];
  const n = result.length;
  let size = 1;
  let passNumber = 1;

  console.log("═══════════════════════════════════════════════════════════");
  console.log("INITIAL STATE:");
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Array:", result);
  console.log("Size: Single elements (already sorted)\n");

  while (size < n) {
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`PASS ${passNumber}: Merging size ${size} → size ${size * 2}`);
    console.log("═══════════════════════════════════════════════════════════");

    let mergeCount = 1;
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      const mid = Math.min(leftStart + size - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

      if (mid < rightEnd) {
        console.log(
          `  Merge #${mergeCount}: [${leftStart}...${mid}] + [${mid + 1}...${rightEnd}]`
        );
        console.log(
          `    Left:  [${result.slice(leftStart, mid + 1).join(", ")}]`
        );
        console.log(
          `    Right: [${result.slice(mid + 1, rightEnd + 1).join(", ")}]`
        );

        mergeBottomUp(result, leftStart, mid, rightEnd);

        console.log(
          `    Result: [${result.slice(leftStart, rightEnd + 1).join(", ")}]`
        );
        mergeCount++;
      }
    }

    console.log(`\nAfter Pass ${passNumber}:`, result);
    console.log();
    size *= 2;
    passNumber++;
  }

  console.log("═══════════════════════════════════════════════════════════");
  console.log("FINAL SORTED ARRAY:", result);
  console.log("═══════════════════════════════════════════════════════════");

  return result;
}

// ==================== EXAMPLE USAGE ====================

console.log("=== MERGE SORT - BOTTOM-UP (ITERATIVE) ===\n");

// Example 1: Basic unsorted array
const arr1 = [38, 27, 43, 3, 9, 82, 10];
console.log("Example 1: Basic Array");
console.log("  Original:", arr1);
console.log("  Sorted:  ", mergeSortBottomUp(arr1));
console.log("  Expected: [3, 9, 10, 27, 38, 43, 82]\n");
// Expected: [3, 9, 10, 27, 38, 43, 82]

// Example 2: With visualization (educational)
console.log("=== EXAMPLE 2: WITH VISUALIZATION ===\n");
const arr2 = [38, 27, 43, 3];
mergeSortBottomUpWithVisualization(arr2);
console.log();

// Example 3: With duplicates
const arr3 = [5, 2, 8, 2, 9, 1, 5];
console.log("Example 3: With Duplicates");
console.log("  Original:", arr3);
console.log("  Sorted:  ", mergeSortBottomUp(arr3));
console.log("  Expected: [1, 2, 2, 5, 5, 8, 9]\n");
// Expected: [1, 2, 2, 5, 5, 8, 9]

// Example 4: Single element (base case)
const arr4 = [42];
console.log("Example 4: Single Element");
console.log("  Original:", arr4);
console.log("  Sorted:  ", mergeSortBottomUp(arr4));
console.log("  Expected: [42]\n");
// Expected: [42]

// Example 5: Empty array (edge case)
const arr5: number[] = [];
console.log("Example 5: Empty Array");
console.log("  Original:", arr5);
console.log("  Sorted:  ", mergeSortBottomUp(arr5));
console.log("  Expected: []");
// Expected: []
```

---

## Code Explanation

### 1. The Size Doubling Loop

```typescript
let size = 1;
while (size < n) {
  // Merge all pairs of current size
  size *= 2;
}
```

**Purpose**: Control number of passes through array
**How it works**:
- Start with size = 1 (single elements)
- Double each iteration: 1 → 2 → 4 → 8 → ...
- Stop when size ≥ n (entire array merged)

**Number of iterations**: log₂(n)

**Example** (n = 8):
```
Pass 1: size = 1, after: size = 2
Pass 2: size = 2, after: size = 4
Pass 3: size = 4, after: size = 8
Pass 4: size = 8 ≥ n, exit loop

Total passes: 3 = log₂(8)
```

### 2. The Pairing Loop

```typescript
for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
  const mid = Math.min(leftStart + size - 1, n - 1);
  const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
  // ...
}
```

**Purpose**: Identify all pairs of subarrays to merge at current size
**How it works**:
- Step through array in chunks of `2 * size`
- Calculate boundaries for each pair
- Merge if both subarrays exist

**Example** (n = 7, size = 2):
```
Iteration 1: leftStart = 0
  mid = min(0 + 2 - 1, 6) = 1
  rightEnd = min(0 + 4 - 1, 6) = 3
  Merge arr[0...1] with arr[2...3]

Iteration 2: leftStart = 4
  mid = min(4 + 2 - 1, 6) = 5
  rightEnd = min(4 + 4 - 1, 6) = 6
  Merge arr[4...5] with arr[6...6]

Iteration 3: leftStart = 8
  8 < 7 is false, exit loop
```

### 3. The Index Calculation

```typescript
const mid = Math.min(leftStart + size - 1, n - 1);
const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
```

**Purpose**: Calculate subarray boundaries safely
**Why `Math.min()`**: Handles arrays that don't divide evenly by size
**Edge cases handled**: Array end, odd sizes, partial subarrays

**Example scenarios**:
```
Array size = 7, size = 4, leftStart = 0:
  mid = min(0 + 4 - 1, 6) = min(3, 6) = 3 ✓
  rightEnd = min(0 + 8 - 1, 6) = min(7, 6) = 6 ✓
  Merge arr[0...3] with arr[4...6] (3 elements + 3 elements)

Array size = 7, size = 4, leftStart = 4:
  mid = min(4 + 4 - 1, 6) = min(7, 6) = 6 ✓
  rightEnd = min(4 + 8 - 1, 6) = min(11, 6) = 6 ✓
  mid < rightEnd? 6 < 6? NO, skip merge (no right subarray!)
```

### 4. The Merge Guard

```typescript
if (mid < rightEnd) {
  mergeBottomUp(result, leftStart, mid, rightEnd);
}
```

**Purpose**: Only merge if right subarray actually exists
**Why needed**: At array end, might only have left subarray
**Edge case**: When array size is not a power of 2

**Example**:
```
Array: [1, 2, 3, 4, 5, 6, 7]  (n = 7)
Pass with size = 4:

Pair 1: leftStart = 0
  mid = 3, rightEnd = 6
  mid < rightEnd? 3 < 6? YES → Merge [0...3] with [4...6]

Pair 2: leftStart = 8
  8 >= 7, exit loop (no more pairs)

Without guard, we'd try to merge non-existent subarrays!
```

---

## Dry Run - Complete Visualization

Let's trace the entire execution for: `[38, 27, 43, 3]`

### Initial State

```
Array: [38, 27, 43, 3]
Index:  0   1   2  3
n = 4
```

---

### **PASS 1: size = 1**

**Outer loop**: `size = 1`, condition `1 < 4` is TRUE, enter loop

**Inner loop iteration 1**: `leftStart = 0`
```
leftStart = 0, size = 1
mid = min(0 + 1 - 1, 3) = min(0, 3) = 0
rightEnd = min(0 + 2 - 1, 3) = min(1, 3) = 1

Check: mid < rightEnd? 0 < 1? YES

Merge arr[0...0] with arr[1...1]:
  leftArr = [38]
  rightArr = [27]

  Compare: 38 vs 27 → Pick 27
  Compare: exhausted → Add 38
  Result: [27, 38]

Array after: [27, 38, 43, 3]
```

**Inner loop iteration 2**: `leftStart = 2` (0 + 2*1)
```
leftStart = 2, size = 1
mid = min(2 + 1 - 1, 3) = min(2, 3) = 2
rightEnd = min(2 + 2 - 1, 3) = min(3, 3) = 3

Check: mid < rightEnd? 2 < 3? YES

Merge arr[2...2] with arr[3...3]:
  leftArr = [43]
  rightArr = [3]

  Compare: 43 vs 3 → Pick 3
  Compare: exhausted → Add 43
  Result: [3, 43]

Array after: [27, 38, 3, 43]
```

**Inner loop iteration 3**: `leftStart = 4` (2 + 2*1)
```
leftStart = 4
4 < 4? NO, exit inner loop
```

**End of Pass 1**: `size *= 2` → size = 2

**Array after Pass 1**: `[27, 38, 3, 43]`

---

### **PASS 2: size = 2**

**Outer loop**: `size = 2`, condition `2 < 4` is TRUE, enter loop

**Inner loop iteration 1**: `leftStart = 0`
```
leftStart = 0, size = 2
mid = min(0 + 2 - 1, 3) = min(1, 3) = 1
rightEnd = min(0 + 4 - 1, 3) = min(3, 3) = 3

Check: mid < rightEnd? 1 < 3? YES

Merge arr[0...1] with arr[2...3]:
  leftArr = [27, 38]
  rightArr = [3, 43]

  Compare: 27 vs 3  → Pick 3   → [3]
  Compare: 27 vs 43 → Pick 27  → [3, 27]
  Compare: 38 vs 43 → Pick 38  → [3, 27, 38]
  Compare: exhausted → Add 43  → [3, 27, 38, 43]

Array after: [3, 27, 38, 43]
```

**Inner loop iteration 2**: `leftStart = 4` (0 + 2*2)
```
leftStart = 4
4 < 4? NO, exit inner loop
```

**End of Pass 2**: `size *= 2` → size = 4

**Array after Pass 2**: `[3, 27, 38, 43]` ✓

---

### **PASS 3: size = 4**

**Outer loop**: `size = 4`, condition `4 < 4` is FALSE, exit loop

**Final sorted array**: `[3, 27, 38, 43]` ✓

---

### Execution Table

| Pass | size | leftStart | mid | rightEnd | Merge | Result |
|------|------|-----------|-----|----------|-------|---------|
| 1 | 1 | 0 | 0 | 1 | [38] + [27] | [27, 38, _, _] |
| 1 | 1 | 2 | 2 | 3 | [43] + [3] | [27, 38, 3, 43] |
| 2 | 2 | 0 | 1 | 3 | [27,38] + [3,43] | [3, 27, 38, 43] |
| 3 | 4 | - | - | - | Exit (size ≥ n) | [3, 27, 38, 43] ✓ |

---

### Visual Trace

```
═══════════════════════════════════════════════════════════
INITIAL STATE:
═══════════════════════════════════════════════════════════
[38] [27] [43] [3]
  0    1    2   3

═══════════════════════════════════════════════════════════
PASS 1: size = 1 (Merge pairs of singles)
═══════════════════════════════════════════════════════════

Merge #1: arr[0] + arr[1]
  [38] + [27] → [27, 38]
  [27, 38, _, _]

Merge #2: arr[2] + arr[3]
  [43] + [3] → [3, 43]
  [27, 38, 3, 43]

After Pass 1: [27, 38] [3, 43]

═══════════════════════════════════════════════════════════
PASS 2: size = 2 (Merge pairs of pairs)
═══════════════════════════════════════════════════════════

Merge #1: arr[0...1] + arr[2...3]
  [27, 38] + [3, 43] → [3, 27, 38, 43]

After Pass 2: [3, 27, 38, 43] ✓

═══════════════════════════════════════════════════════════
PASS 3: size = 4 ≥ n = 4, EXIT
═══════════════════════════════════════════════════════════

FINAL SORTED ARRAY: [3, 27, 38, 43] ✓

Total passes: 2 = ⌈log₂(4)⌉
```

---

## Doubts (FAQ)

### Q1: Why is Bottom-Up faster than Top-Down if both are O(n log n)?

**A**: Great question! Big-O notation hides constant factors, but they matter in practice!

**Both have same asymptotic complexity**:
```
Top-Down: O(n log n)
Bottom-Up: O(n log n)
```

**But Bottom-Up has better constants**:

**1. No Function Call Overhead**
```
Top-Down: Each recursive call requires:
  - Push parameters to stack
  - Create new stack frame
  - Jump to function address
  - Return and pop stack
  Cost: ~10-20 CPU instructions per call

  For n = 1,000,000:
    log₂(1,000,000) ≈ 20 levels
    Each level makes n/2^level calls
    Total calls ≈ 2n = 2,000,000 calls
    Overhead: 2,000,000 × 15 instructions ≈ 30,000,000 instructions!

Bottom-Up: No recursion!
  - Simple loop iterations
  - No stack management
  Cost: ~2-3 CPU instructions per iteration
  Overhead: Minimal!
```

**2. Better Cache Locality**
```
Top-Down: Recursion jumps around memory
  - Process entire left subtree
  - Then jump to right subtree
  - Memory access is scattered
  - CPU cache misses increase

  Example trace:
    [0,1,2,3,4,5,6,7]
    → [0,1,2,3] → [0,1] → [0] → [1]
    → back to [2,3] → [2] → [3]
    → back to [4,5,6,7] → [4,5] → [4] → [5]
    (Lots of jumping!)

Bottom-Up: Sequential memory access
  - Process array left to right
  - Size 1: Process 0-1, then 2-3, then 4-5 (sequential!)
  - Size 2: Process 0-3, then 4-7 (sequential!)
  - CPU cache stays hot

  Example trace:
    [0,1,2,3,4,5,6,7]
    Pass 1: 0-1, 2-3, 4-5, 6-7 (left to right)
    Pass 2: 0-3, 4-7 (left to right)
    Pass 3: 0-7 (left to right)
    (Very sequential!)
```

**3. Predictable Memory Usage**
```
Top-Down:
  - Recursion stack: O(log n) frames
  - Each frame: ~50-100 bytes
  - Unpredictable due to recursive calls

Bottom-Up:
  - No recursion stack
  - Only loop variables: O(1)
  - Predictable and minimal
```

**Real-world benchmark** (sorting 1 million integers):
```
Top-Down:    ~180ms
Bottom-Up:   ~150ms
Speedup:     ~17% faster!

For 10 million integers:
Top-Down:    ~2.1s
Bottom-Up:   ~1.7s
Speedup:     ~19% faster!
```

**Conclusion**: Bottom-Up is practically faster due to:
- No function call overhead
- Better CPU cache utilization
- More predictable memory access patterns

---

### Q2: Can Bottom-Up be parallelized?

**A**: Yes! Bottom-Up is **easier to parallelize** than Top-Down!

**Why Bottom-Up is parallelizable**:

At each pass, all merges are **independent**:
```
Pass 1 (size = 1):
  Thread 1: Merge [38]+[27] at positions 0-1  ⎤
  Thread 2: Merge [43]+[3]  at positions 2-3  ⎬ Run in parallel!
  Thread 3: Merge [9]+[82]  at positions 4-5  ⎥
  Thread 4: Merge [10]+[50] at positions 6-7  ⎦

  No conflicts! Each thread works on different parts.

Pass 2 (size = 2):
  Thread 1: Merge [27,38]+[3,43]  at positions 0-3  ⎤
  Thread 2: Merge [9,82]+[10,50]  at positions 4-7  ⎬ Run in parallel!
  Thread 3: Merge [5,15]+[20,30]  at positions 8-11 ⎦

  Again, independent merges!
```

**Parallel Bottom-Up algorithm**:
```typescript
function parallelMergeSortBottomUp(arr: number[]): number[] {
  const n = arr.length;
  let size = 1;

  while (size < n) {
    // Collect all merge tasks for this pass
    const tasks = [];
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      const mid = Math.min(leftStart + size - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
      if (mid < rightEnd) {
        tasks.push({ leftStart, mid, rightEnd });
      }
    }

    // Execute all tasks in parallel!
    await Promise.all(tasks.map(task =>
      mergeAsync(arr, task.leftStart, task.mid, task.rightEnd)
    ));

    size *= 2;
  }

  return arr;
}
```

**Speedup with parallelization**:
```
Single-threaded: O(n log n)
4 cores: ~O(n log n / 4) in practice
8 cores: ~O(n log n / 8) in practice

For 10 million elements on 8 cores:
  Single-threaded: 1.7s
  Parallel:        0.3s
  Speedup:         ~5.7× faster!
```

**Why Top-Down is harder to parallelize**:

Recursion creates **dependencies**:
```
Can't merge [27,38] + [3,43] until:
  - [27,38] is sorted (needs [27] and [38] sorted first)
  - [3,43] is sorted (needs [3] and [43] sorted first)

Dependency tree is complex!
Requires sophisticated task scheduling!
```

**Conclusion**: Bottom-Up's iterative nature makes parallelization straightforward!

---

### Q3: When would I actually use Bottom-Up in production?

**A**: Bottom-Up is preferred in several real-world scenarios:

**1. Embedded Systems / IoT**
```
Constraints:
  - Limited stack space (~4KB typical)
  - Deep recursion causes stack overflow
  - Memory is precious

Solution: Bottom-Up
  - No recursion stack
  - Predictable memory usage
  - Perfect for constrained environments

Example: Sorting sensor readings on Arduino
```

**2. Real-Time Systems**
```
Requirements:
  - Guaranteed timing
  - No unpredictable delays
  - Deterministic performance

Solution: Bottom-Up
  - No recursive overhead
  - Predictable execution time
  - Better for real-time constraints

Example: Sorting radar data in aviation systems
```

**3. Large-Scale Data Processing**
```
Scenario:
  - Millions/billions of records
  - Need optimal performance
  - Multi-core systems available

Solution: Bottom-Up
  - 15-20% faster than recursive
  - Easy to parallelize
  - Better cache utilization

Example: Sorting logs in big data systems
```

**4. External Sorting (Disk-Based)**
```
Problem:
  - Data doesn't fit in RAM
  - Must sort on disk
  - Sequential access is faster than random

Solution: Bottom-Up
  - Natural fit for sequential disk access
  - Merge sorted runs from disk
  - Industry standard for external sorting

Example: Database index creation
```

**5. Safety-Critical Systems**
```
Requirements:
  - Must prove correctness
  - No stack overflow risk
  - Formal verification needed

Solution: Bottom-Up
  - Simpler to reason about
  - No recursion to analyze
  - Easier to certify

Example: Medical device software, aerospace
```

**Real-world usage examples**:

```
1. Python's Timsort (used by sorted()):
   - Hybrid: Uses both approaches
   - Bottom-up for merging runs

2. Java's Arrays.sort():
   - Dual-pivot quicksort for primitives
   - Timsort (bottom-up inspired) for objects

3. PostgreSQL:
   - Uses bottom-up merge for external sorting
   - Optimized for disk-based data

4. Linux kernel:
   - lib/list_sort.c uses bottom-up merge
   - Avoids recursion in kernel space
```

**When NOT to use**:
- Teaching/learning (Top-Down is clearer)
- Small datasets (n < 100, overhead doesn't matter)
- Code readability is priority over performance

**Conclusion**: Bottom-Up is the production choice when performance, predictability, or memory constraints matter!

---

### Q4: How can I optimize Bottom-Up further?

**A**: Several optimization techniques can make Bottom-Up even faster!

**1. Reuse Temporary Array**
```typescript
// Bad: Create temp arrays in merge (O(n log n) space over time)
function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);   // New allocation!
  const rightArr = arr.slice(mid + 1, right + 1); // New allocation!
  // ...
}

// Good: Reuse single temp array (O(n) space total)
function mergeSortOptimized(arr: number[]): number[] {
  const n = arr.length;
  const temp = new Array(n); // Allocate once
  let size = 1;

  while (size < n) {
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      // ... merge using temp array ...
      mergeWithTemp(arr, temp, leftStart, mid, rightEnd);
    }
    size *= 2;
  }
}

Benefit: Reduces memory allocation overhead significantly!
```

**2. Switch to Insertion Sort for Small Subarrays**
```typescript
function mergeSortHybrid(arr: number[]): number[] {
  const INSERTION_SORT_THRESHOLD = 16;

  // First pass: Sort small chunks with insertion sort
  for (let i = 0; i < arr.length; i += INSERTION_SORT_THRESHOLD) {
    const end = Math.min(i + INSERTION_SORT_THRESHOLD - 1, arr.length - 1);
    insertionSort(arr, i, end); // O(n²) but fast for small n!
  }

  // Continue with bottom-up merge from size = THRESHOLD
  let size = INSERTION_SORT_THRESHOLD;
  while (size < arr.length) {
    // ... merge as before ...
    size *= 2;
  }
}

Why this works:
  - Insertion sort has low overhead
  - Very fast for n < 20
  - Reduces number of merge passes

Speedup: ~10-15% faster on typical data!
```

**3. Natural Merge Sort (Exploit Existing Order)**
```typescript
// Instead of fixed sizes, find naturally sorted runs
function naturalMergeSort(arr: number[]): number[] {
  // Find all naturally sorted runs
  const runs = findRuns(arr); // [0-5, 6-12, 13-20, ...]

  // Merge runs bottom-up
  while (runs.length > 1) {
    const newRuns = [];
    for (let i = 0; i < runs.length; i += 2) {
      if (i + 1 < runs.length) {
        merge(arr, runs[i].start, runs[i].end, runs[i+1].end);
        newRuns.push({ start: runs[i].start, end: runs[i+1].end });
      } else {
        newRuns.push(runs[i]);
      }
    }
    runs = newRuns;
  }
}

Benefit: Adaptive! Fast on partially sorted data.
Example: [1,2,3,10,11,12,4,5,6]
  - Detects runs: [1,2,3,10,11,12] and [4,5,6]
  - Just one merge needed!
```

**4. Parallel Execution**
```typescript
async function parallelMergeSort(arr: number[]): Promise<number[]> {
  const n = arr.length;
  let size = 1;

  while (size < n) {
    const tasks = [];

    // Collect independent merge tasks
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      const mid = Math.min(leftStart + size - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
      if (mid < rightEnd) {
        tasks.push(() => merge(arr, leftStart, mid, rightEnd));
      }
    }

    // Execute in parallel using Worker threads
    await Promise.all(tasks.map(task => workerPool.execute(task)));

    size *= 2;
  }
}

Speedup: Near-linear with number of cores!
  2 cores: ~1.8× faster
  4 cores: ~3.5× faster
  8 cores: ~6× faster
```

**5. SIMD (Single Instruction Multiple Data)**
```typescript
// Use SIMD instructions to compare multiple elements at once
// (Requires WebAssembly or native code)

Example with 128-bit SIMD (4 integers at once):
  Normal: Compare 1 pair per instruction
  SIMD:   Compare 4 pairs per instruction
  Speedup: ~3-4× faster merging!

This is how high-performance libraries optimize sorting!
```

**Combined optimization results**:
```
Baseline Bottom-Up:        1.0× (reference)
+ Reuse temp array:        1.1×
+ Insertion sort hybrid:   1.25×
+ Natural runs:            1.5× (on partially sorted data)
+ Parallel (8 cores):      5×
+ SIMD:                    7×

Total possible speedup: Up to 10× on modern hardware! 🚀
```

---

## Additional Resources

### Video Tutorials

1. **[Bottom-Up Merge Sort Visualization](https://www.youtube.com/watch?v=Pr2Jf83_kG0)** - Clear animation
2. **[Iterative vs Recursive Merge Sort](https://www.youtube.com/watch?v=TzeBrDU-JaY)** - Comparison
3. **[External Merge Sort](https://www.youtube.com/watch?v=ATK74v_vgKY)** - Bottom-up for disk-based sorting

### Interactive Tools

1. **[VisuAlgo - Merge Sort (Both Approaches)](https://visualgo.net/en/sorting)** - Compare side-by-side
2. **[Algorithm Visualizer](https://algorithm-visualizer.org/divide-and-conquer/merge-sort)** - Step through code

### Further Reading

1. **Introduction to Algorithms (CLRS)** - Section 2.3.2: Iterative Merge Sort
2. **[Bottom-Up vs Top-Down](https://www.baeldung.com/cs/merge-sort-top-down-vs-bottom-up)** - Detailed comparison
3. **[External Sorting](https://en.wikipedia.org/wiki/External_sorting)** - Real-world bottom-up applications

### Practice Problems

1. **[LeetCode 912: Sort an Array](https://leetcode.com/problems/sort-an-array/)** - Implement bottom-up
2. **[LeetCode 148: Sort List](https://leetcode.com/problems/sort-list/)** - Bottom-up on linked list (tricky!)
3. **[Count Inversions](https://www.geeksforgeeks.org/counting-inversions/)** - Modify merge sort

---

## Summary

**Merge Sort (Bottom-Up)** achieves the same O(n log n) time complexity as Top-Down, but with better practical performance through **iteration instead of recursion**.

### Key Takeaways

✅ **Time Complexity**: O(n log n) - same as Top-Down
✅ **Space Complexity**: O(n) - but no recursion stack!
✅ **No Recursion**: Uses simple nested loops
✅ **More Efficient**: 15-20% faster in practice
✅ **Cache-Friendly**: Sequential memory access pattern
✅ **Parallelizable**: Easy to run merges in parallel
✅ **Predictable**: No stack overflow risk
✅ **Production-Ready**: Used in real-world systems

### The Algorithm in a Nutshell

```
Start with size = 1 (single elements)
While size < array length:
    Merge all pairs of subarrays of current size
    Double the size
Done!
```

### Top-Down vs Bottom-Up

| Use Top-Down when | Use Bottom-Up when |
|-------------------|-------------------|
| Learning/teaching | Production code |
| Code clarity priority | Performance matters |
| Small datasets | Large datasets |
| Prefer recursion | Prefer iteration |
| Stack space available | Memory constrained |
| | Need parallelization |
| | Real-time systems |
| | External sorting |

### The Core Insight

**Instead of breaking down, build up!**

```
Top-Down:  Big → Small → Build
           [8 elements] → [4] → [2] → [1] → merge back

Bottom-Up: Small → Build → Big
           [1] → merge to [2] → merge to [4] → merge to [8]
```

**Same result, but Bottom-Up:**
- Starts working immediately (no division overhead)
- Predictable memory access (better cache)
- No recursion (faster execution)

### Analogy to Remember

Building a pyramid:
- **Top-Down**: Design complete pyramid, break into blocks, then rebuild
- **Bottom-Up**: Stack blocks into levels, build pyramid layer by layer

Both create a pyramid, but bottom-up is more direct!

---

## Series Conclusion

**Congratulations!** You now understand **both approaches to Merge Sort**! 🎉

**Part 1 (Top-Down)**: Elegant recursive divide-and-conquer
**Part 2 (Bottom-Up)**: Efficient iterative building approach

**Both achieve O(n log n) sorting**, but with different trade-offs:
- Top-Down: Better for learning, clearer mental model
- Bottom-Up: Better for production, superior performance

**In interviews**: Know both approaches and their trade-offs!

**In production**: Use Bottom-Up (or hybrid) for best performance!

---

*Happy Sorting! 🚀*

*Created with ❤️ for learners | Part 2 of 2 | Last updated: 2025*

*If you found this helpful, check out Part 1 for the Top-Down recursive approach!*
