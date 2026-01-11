# Merge Sort: Complete Guide (Top-Down & Bottom-Up)

We'll break down **Merge Sort** step-by-step, using simple language and analogies. By the end, you'll understand not just how it works, but *why* it's one of the most elegant and efficient sorting algorithms ever created!

---

## Let's Start with the Big Picture

Imagine you have a deck of shuffled playing cards that you need to sort. **What would you do?**

One approach: Sort them one by one, comparing and inserting each card in the right position. This works, but it's slow for large decks.

**Merge Sort's brilliant idea**: Instead of tackling the whole deck at once, **divide it into smaller piles**, sort each pile, and then **merge them back together**!

Think of it like organizing a messy library:
- Instead of sorting 10,000 books at once (overwhelming!)
- Split into 10 rooms with 1,000 books each (manageable!)
- Sort each room independently
- Merge the sorted rooms back into one organized library

This "divide and conquer" strategy is what makes Merge Sort so powerful! 🚀

---

## Problem Statement

**Given:** An unsorted array of numbers
**Goal:** Sort the array in ascending order
**Challenge:** Do it efficiently, even for very large arrays

**Example:**
```
Input:  [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]
```

**Why is this interesting?**
- Simple sorting (like Bubble Sort) takes O(n²) time
- Can we do better? Yes! Merge Sort achieves O(n log n)
- Works well for large datasets
- Stable sort (preserves relative order of equal elements)

---

## Step 1: The "Naive" Approach

Before learning Merge Sort, let's think about simpler sorting methods:

### Selection Sort (The Naive Way)

**How it works:**
1. Find the smallest element in the array
2. Swap it with the first position
3. Find the second smallest element
4. Swap it with the second position
5. Repeat until sorted

**Example:**
```
[38, 27, 43, 3, 9, 82, 10]

Pass 1: Find minimum (3), swap with first
→ [3, 27, 43, 38, 9, 82, 10]

Pass 2: Find minimum in rest (9), swap with second
→ [3, 9, 43, 38, 27, 82, 10]

Pass 3: Find minimum in rest (10), swap with third
→ [3, 9, 10, 38, 27, 82, 43]

... continue until sorted
```

### The Problem with Selection Sort:

❌ **Redundant comparisons**: We compare elements multiple times
❌ **Time Complexity: O(n²)**: For n elements, we do n² operations
- 100 elements → 10,000 operations
- 1,000 elements → 1,000,000 operations
- 10,000 elements → 100,000,000 operations! 😱

❌ **Doesn't utilize previous work**: Each pass starts from scratch

For small arrays (n < 50), this is fine. But for large arrays? **We need something better!**

---

## Step 2: The Challenge

**The core challenge of sorting:**

If we have a large array to sort, doing it in one go is inefficient. But we face several complications:

1. **Comparison overhead**: Each comparison costs time
2. **Element movement**: Shifting elements is expensive
3. **Cannot parallelize**: Simple algorithms must process sequentially

**Key Questions:**
- Can we break the problem into smaller, easier pieces?
- Can we reuse work done on smaller pieces?
- How do we combine sorted pieces back together?

This is where Merge Sort's clever insight comes in!

---

## Step 3: The "Aha!" Moment

**The core idea: Divide, Conquer, and Merge!** 💡

### The Brilliant Observation:

**It's much easier to merge two sorted arrays than to sort one unsorted array!**

Compare:
- **Sorting [38, 27, 43, 3, 9, 82, 10]**: Hard! Requires many comparisons
- **Merging [27, 38, 43] and [3, 9, 10, 82]**: Easy! Just compare fronts

**Example of Easy Merging:**
```
List 1: [3, 9, 27]
List 2: [10, 38, 43]

Merge Process:
- Compare 3 vs 10 → Pick 3
- Compare 9 vs 10 → Pick 9
- Compare 27 vs 10 → Pick 10
- Compare 27 vs 38 → Pick 27
- Compare 38 vs 38 → Pick 38
- Remaining: 43

Result: [3, 9, 10, 27, 38, 43] ✓
```

**The Strategy:**

1. **Divide**: Split array into two halves
2. **Conquer**: Recursively sort each half
3. **Merge**: Combine two sorted halves

This transforms a hard problem (sorting n elements) into:
- Two easier problems (sorting n/2 elements each)
- One simple operation (merging sorted arrays)

---

## Step 4: The Magic Tool - Two Approaches

Merge Sort can be implemented in **two ways**:

### Approach 1: Top-Down (Recursive) 📉

**Analogy**: Like organizing files in nested folders

Start from the top (full array) and work down:
```
[38, 27, 43, 3, 9, 82, 10]
       ↓ (split)
[38, 27, 43] | [3, 9, 82, 10]
     ↓ (split) |      ↓ (split)
[38] [27, 43]  | [3, 9] [82, 10]
  ↓   ↓   ↓    |   ↓  ↓   ↓   ↓
[38][27][43]   | [3][9][82][10]
     ↓ (merge) |      ↓ (merge)
  [27, 38, 43] | [3, 9, 10, 82]
        ↓ (merge)
[3, 9, 10, 27, 38, 43, 82]
```

**Key Variables:**
- **`left`**: Start index of subarray
- **`right`**: End index of subarray
- **`mid`**: Middle point = `(left + right) / 2`
- **Base case**: When `left >= right`, array has 0-1 elements (already sorted)

**The Divide Formula:**
```
Sort(array, left, right):
  if left < right:
    mid = (left + right) / 2
    Sort(array, left, mid)      // Sort left half
    Sort(array, mid+1, right)   // Sort right half
    Merge(array, left, mid, right)  // Combine
```

### Approach 2: Bottom-Up (Iterative) 📈

**Analogy**: Like building a pyramid from the bottom

Start from the bottom (single elements) and work up:
```
[38][27][43][3][9][82][10]  ← Start: size = 1
     ↓ (merge pairs)
[27,38][3,43][9,82][10]     ← After: size = 2
       ↓ (merge pairs)
[3,27,38,43][9,10,82]       ← After: size = 4
          ↓ (merge)
[3,9,10,27,38,43,82]        ← Final: size = n
```

**Key Variables:**
- **`size`**: Current subarray size being merged (1, 2, 4, 8, ...)
- **`left`**: Start of first subarray
- **`mid`**: End of first subarray = `left + size - 1`
- **`right`**: End of second subarray = `min(left + 2*size - 1, n-1)`

**The Iteration Formula:**
```
size = 1
while size < n:
  for each pair of subarrays of current size:
    Merge them
  size = size * 2
```

**Why does size double?**
- Pass 1: Merge arrays of size 1 → results of size 2
- Pass 2: Merge arrays of size 2 → results of size 4
- Pass 3: Merge arrays of size 4 → results of size 8
- ...continues until size ≥ n

---

## Step 5: Putting It All Together

Let's walk through **both approaches** with the same example to see how they work!

### Example: Sort [38, 27, 43, 3]

---

### Top-Down (Recursive) Approach

**Transform**: Build recursion tree

```
                [38, 27, 43, 3]
                  mid = 1
                /              \
        [38, 27]                [43, 3]
        mid = 0                 mid = 2
       /       \               /       \
     [38]      [27]          [43]      [3]
      ↓         ↓             ↓         ↓
   sorted    sorted        sorted    sorted
```

**Execute**: Process from bottom-up

**Level 3 (Base cases)**:
- `[38]` → Already sorted
- `[27]` → Already sorted
- `[43]` → Already sorted
- `[3]` → Already sorted

**Level 2 (Merge pairs)**:

Merge `[38]` and `[27]`:
```
Compare: 38 vs 27 → Pick 27
Remaining: 38
Result: [27, 38]
```

Merge `[43]` and `[3]`:
```
Compare: 43 vs 3 → Pick 3
Remaining: 43
Result: [3, 43]
```

**Level 1 (Final merge)**:

Merge `[27, 38]` and `[3, 43]`:
```
Compare: 27 vs 3 → Pick 3    → [3]
Compare: 27 vs 43 → Pick 27   → [3, 27]
Compare: 38 vs 43 → Pick 38   → [3, 27, 38]
Remaining: 43                 → [3, 27, 38, 43]
```

**Final Result**: `[3, 27, 38, 43]` ✓

---

### Bottom-Up (Iterative) Approach

**Initialize**: Start with single elements
```
[38] [27] [43] [3]  (size = 1)
```

**Pass 1**: Merge pairs of size 1

Merge `[38]` and `[27]`:
```
left = 0, mid = 0, right = 1
Compare: 38 vs 27 → Pick 27
Result: [27, 38] __ __
```

Merge `[43]` and `[3]`:
```
left = 2, mid = 2, right = 3
Compare: 43 vs 3 → Pick 3
Result: __ __ [3, 43]
```

After Pass 1: `[27, 38] [3, 43]` (size = 2)

**Pass 2**: Merge pairs of size 2

Merge `[27, 38]` and `[3, 43]`:
```
left = 0, mid = 1, right = 3
Compare: 27 vs 3 → Pick 3
Compare: 27 vs 43 → Pick 27
Compare: 38 vs 43 → Pick 38
Remaining: 43
Result: [3, 27, 38, 43]
```

After Pass 2: `[3, 27, 38, 43]` (size = 4 ≥ n, done!)

**Final Result**: `[3, 27, 38, 43]` ✓

---

## Summary and Analogy

### The Library Analogy 📚

**Naive Approach (Selection Sort)**:
You're a librarian with 10,000 unsorted books. You:
1. Find the first book alphabetically
2. Place it on shelf position 1
3. Find the second book alphabetically
4. Place it on shelf position 2
5. ...repeat 10,000 times

This takes forever because you search through all remaining books each time!

**Top-Down Merge Sort**:
You hire 10 assistants. You:
1. Divide books into 10 stacks
2. Each assistant sorts their stack independently
3. You merge the sorted stacks two at a time
4. Final result: Organized library!

This is much faster because:
- Sorting small stacks is easy
- Merging sorted stacks is straightforward
- Work is parallelizable

**Bottom-Up Merge Sort**:
You start by organizing books two at a time:
1. Compare pairs of books, sort each pair
2. Merge sorted pairs into groups of 4
3. Merge groups of 4 into groups of 8
4. Continue until all books are sorted

This is systematic and predictable!

### Key Differences

| Aspect | Top-Down | Bottom-Up |
|--------|----------|-----------|
| **Style** | Recursive | Iterative |
| **Approach** | Split from top | Build from bottom |
| **Call Stack** | Uses recursion stack | No recursion |
| **Space** | O(n log n) with recursion | O(n) with iteration |
| **Cache** | Less cache-friendly | More cache-friendly |
| **Understanding** | More intuitive | More mechanical |
| **Code** | Shorter, elegant | Longer, explicit |

**Both achieve the same result**: Sorted array in O(n log n) time!

---

## Complexity Analysis

### Time Complexity: O(n log n)

**Why?**

Let's break it down:

**For an array of size n**:

1. **Number of levels**: log₂(n)
   - Level 0: 1 array of size n
   - Level 1: 2 arrays of size n/2
   - Level 2: 4 arrays of size n/4
   - Level 3: 8 arrays of size n/8
   - ...
   - Level k: 2^k arrays of size n/2^k
   - We reach single elements when n/2^k = 1, so k = log₂(n)

2. **Work per level**: O(n)
   - At each level, we merge all elements exactly once
   - Merging two sorted arrays of total size n takes O(n) comparisons

3. **Total work**: O(n) × O(log n) = **O(n log n)**

**Example with n = 8**:
```
Level 0: [_,_,_,_,_,_,_,_]           → 8 elements to merge
Level 1: [_,_,_,_] [_,_,_,_]         → 8 elements to merge (4+4)
Level 2: [_,_] [_,_] [_,_] [_,_]     → 8 elements to merge (2+2+2+2)
Level 3: [_][_][_][_][_][_][_][_]   → 8 elements (already sorted)

Levels = log₂(8) = 3
Work per level = 8
Total = 3 × 8 = 24 operations = O(8 log 8)
```

**Comparison**:
```
n = 100
- Selection Sort: ~10,000 operations (n²)
- Merge Sort: ~664 operations (n log n)
- 15x faster! 🚀

n = 1,000
- Selection Sort: ~1,000,000 operations
- Merge Sort: ~9,966 operations
- 100x faster! 🚀🚀

n = 1,000,000
- Selection Sort: ~1,000,000,000,000 operations (1 trillion!)
- Merge Sort: ~19,931,569 operations (20 million)
- 50,000x faster! 🚀🚀🚀
```

### Space Complexity

**Top-Down (Recursive)**:
- **Merge space**: O(n) for temporary array
- **Recursion stack**: O(log n) depth
- **Total**: O(n) + O(log n) = **O(n)**

  (In practice, the temporary array dominates)

**Bottom-Up (Iterative)**:
- **Merge space**: O(n) for temporary array
- **No recursion stack**: O(1)
- **Total**: **O(n)**

**Why O(n) for merge?**
When merging two halves, we need temporary space to store the result before copying back. This temporary array can be at most size n.

**Optimization note**: We can optimize to reuse the same temporary array across all merges, keeping space at O(n) rather than O(n log n).

---

## Code

Below you'll find complete TypeScript implementations of both approaches with:
- Detailed inline comments
- Helper functions
- Complete examples
- Dry run visualizations

---

## Complete TypeScript Code - Top-Down (Recursive)

```typescript
/**
 * MERGE SORT - TOP-DOWN (RECURSIVE) APPROACH
 * ===========================================
 *
 * This implementation uses recursion to divide the array from top to bottom,
 * then merges the sorted halves from bottom to top.
 */

/**
 * Main merge sort function (Top-Down approach)
 *
 * @param arr - Array to be sorted
 * @returns Sorted array
 */
function mergeSortTopDown(arr: number[]): number[] {
  // Base case: arrays with 0 or 1 element are already sorted
  // WHY: No need to divide or merge
  if (arr.length <= 1) {
    return arr;
  }

  // STEP 1: Divide - Find the middle point
  // WHY: We split array into two roughly equal halves
  const mid = Math.floor(arr.length / 2);

  // STEP 2: Create left and right subarrays
  // WHY: slice() creates new arrays without modifying original
  // EXAMPLE: [38, 27, 43, 3] → left = [38, 27], right = [43, 3]
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // STEP 3: Conquer - Recursively sort both halves
  // WHY: Keep dividing until we reach base case (single elements)
  // LOGIC: Each recursive call further divides and sorts
  const sortedLeft = mergeSortTopDown(left);
  const sortedRight = mergeSortTopDown(right);

  // STEP 4: Merge - Combine the sorted halves
  // WHY: Now we have two sorted arrays, merge them into one
  return merge(sortedLeft, sortedRight);
}

/**
 * Merge two sorted arrays into one sorted array
 *
 * This is the key operation that makes merge sort work!
 *
 * @param left - First sorted array
 * @param right - Second sorted array
 * @returns Merged sorted array
 */
function merge(left: number[], right: number[]): number[] {
  // Result array to store merged elements
  const result: number[] = [];

  // Pointers to track current position in each array
  // WHY: We compare elements at these positions
  let leftIndex = 0;
  let rightIndex = 0;

  // STEP 1: Compare elements from both arrays and pick smaller
  // WHY: This maintains sorted order in result
  // LOGIC: Continue while both arrays have elements
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      // Left element is smaller (or equal), add it to result
      // WHY: We want ascending order
      // EXAMPLE: left[0]=3, right[0]=5 → Pick 3
      result.push(left[leftIndex]);
      leftIndex++; // Move to next element in left array
    } else {
      // Right element is smaller, add it to result
      result.push(right[rightIndex]);
      rightIndex++; // Move to next element in right array
    }
  }

  // STEP 2: Add remaining elements from left array (if any)
  // WHY: If right array is exhausted, left array still has sorted elements
  // EXAMPLE: left=[5,7], right=[3] → After loop, left has [5,7] remaining
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // STEP 3: Add remaining elements from right array (if any)
  // WHY: If left array is exhausted, right array still has sorted elements
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  // STEP 4: Return merged sorted array
  return result;
}

/**
 * Alternative: In-place merge sort (modifies original array)
 * More space-efficient but slightly more complex
 */
function mergeSortInPlace(arr: number[], left: number = 0, right: number = arr.length - 1): void {
  // Base case: subarray with 0 or 1 element
  if (left >= right) {
    return;
  }

  // Find middle point
  const mid = Math.floor((left + right) / 2);

  // Recursively sort left and right halves
  mergeSortInPlace(arr, left, mid);
  mergeSortInPlace(arr, mid + 1, right);

  // Merge the sorted halves
  mergeInPlace(arr, left, mid, right);
}

/**
 * In-place merge function
 * Merges arr[left...mid] and arr[mid+1...right]
 */
function mergeInPlace(arr: number[], left: number, mid: number, right: number): void {
  // Create temporary arrays for left and right subarrays
  // WHY: We need to store values while rearranging
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0; // Index for leftArr
  let j = 0; // Index for rightArr
  let k = left; // Index for original array

  // Merge elements back into original array
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements from leftArr
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  // Copy remaining elements from rightArr
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

// ==================== EXAMPLE USAGE ====================

console.log("=== MERGE SORT - TOP-DOWN (RECURSIVE) ===\n");

// Example 1: Basic array
const arr1 = [38, 27, 43, 3, 9, 82, 10];
console.log("Original:", arr1);
console.log("Sorted:", mergeSortTopDown(arr1));
// Expected: [3, 9, 10, 27, 38, 43, 82]

// Example 2: Already sorted
const arr2 = [1, 2, 3, 4, 5];
console.log("\nOriginal:", arr2);
console.log("Sorted:", mergeSortTopDown(arr2));
// Expected: [1, 2, 3, 4, 5]

// Example 3: Reverse sorted
const arr3 = [5, 4, 3, 2, 1];
console.log("\nOriginal:", arr3);
console.log("Sorted:", mergeSortTopDown(arr3));
// Expected: [1, 2, 3, 4, 5]

// Example 4: Duplicates
const arr4 = [5, 2, 8, 2, 9, 1, 5];
console.log("\nOriginal:", arr4);
console.log("Sorted:", mergeSortTopDown(arr4));
// Expected: [1, 2, 2, 5, 5, 8, 9]

// Example 5: Single element
const arr5 = [42];
console.log("\nOriginal:", arr5);
console.log("Sorted:", mergeSortTopDown(arr5));
// Expected: [42]

// Example 6: Empty array
const arr6: number[] = [];
console.log("\nOriginal:", arr6);
console.log("Sorted:", mergeSortTopDown(arr6));
// Expected: []

// Example 7: In-place version
const arr7 = [38, 27, 43, 3, 9, 82, 10];
console.log("\n=== IN-PLACE VERSION ===");
console.log("Before:", arr7);
mergeSortInPlace(arr7);
console.log("After:", arr7);
// Expected: [3, 9, 10, 27, 38, 43, 82]
```

---

## Complete TypeScript Code - Bottom-Up (Iterative)

```typescript
/**
 * MERGE SORT - BOTTOM-UP (ITERATIVE) APPROACH
 * ============================================
 *
 * This implementation uses iteration to merge subarrays of increasing sizes,
 * building from bottom (single elements) to top (full sorted array).
 */

/**
 * Main merge sort function (Bottom-Up approach)
 *
 * @param arr - Array to be sorted
 * @returns Sorted array
 */
function mergeSortBottomUp(arr: number[]): number[] {
  // Edge case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Create a copy to avoid modifying original
  // WHY: We'll work on this copy throughout the algorithm
  const result = [...arr];
  const n = result.length;

  // STEP 1: Start with subarray size of 1
  // WHY: Single elements are already "sorted"
  // LOGIC: We'll double the size each pass (1 → 2 → 4 → 8 → ...)
  let size = 1;

  // STEP 2: Continue merging until size covers entire array
  // WHY: When size >= n, we've merged everything
  // EXAMPLE: For n=8, sizes are 1, 2, 4, 8
  while (size < n) {
    // STEP 3: For current size, merge all pairs of subarrays
    // WHY: Each pair of size 'size' gets merged into one of size '2*size'

    // leftStart marks beginning of left subarray in each pair
    // WHY: We process array in chunks of 2*size
    // EXAMPLE: size=1, leftStart = 0, 2, 4, 6, ... (every 2 positions)
    // EXAMPLE: size=2, leftStart = 0, 4, 8, 12, ... (every 4 positions)
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      // Calculate indices for merge operation

      // Left subarray: [leftStart ... mid]
      const mid = Math.min(leftStart + size - 1, n - 1);

      // Right subarray: [mid+1 ... rightEnd]
      // WHY: Right subarray might be smaller than 'size' at array end
      // EXAMPLE: If array ends before full size, rightEnd = n-1
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

      // Only merge if right subarray exists
      // WHY: If mid >= rightEnd, no right subarray to merge
      if (mid < rightEnd) {
        mergeBottomUp(result, leftStart, mid, rightEnd);
      }
    }

    // STEP 4: Double the size for next pass
    // WHY: We've merged all pairs of current size, now merge bigger pairs
    // EXAMPLE: size 1 → 2, size 2 → 4, size 4 → 8
    size *= 2;
  }

  return result;
}

/**
 * Merge function for bottom-up approach
 * Merges arr[left...mid] and arr[mid+1...right] in place
 *
 * @param arr - Array containing subarrays to merge
 * @param left - Start index of first subarray
 * @param mid - End index of first subarray
 * @param right - End index of second subarray
 */
function mergeBottomUp(arr: number[], left: number, mid: number, right: number): void {
  // Create temporary arrays for the two subarrays
  // WHY: We need to compare elements while overwriting original array
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  // Indices for traversing leftArr, rightArr, and original array
  let i = 0; // Current index in leftArr
  let j = 0; // Current index in rightArr
  let k = left; // Current index in original array (where to place merged element)

  // STEP 1: Merge elements from both subarrays
  // WHY: Compare and pick smaller element from front of each subarray
  // LOGIC: Continue while both subarrays have elements
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      // Left element is smaller, place it in original array
      // EXAMPLE: leftArr[0]=3, rightArr[0]=5 → arr[k]=3
      arr[k] = leftArr[i];
      i++; // Move to next element in left subarray
    } else {
      // Right element is smaller, place it in original array
      arr[k] = rightArr[j];
      j++; // Move to next element in right subarray
    }
    k++; // Move to next position in original array
  }

  // STEP 2: Copy remaining elements from leftArr (if any)
  // WHY: Right subarray exhausted but left still has sorted elements
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  // STEP 3: Copy remaining elements from rightArr (if any)
  // WHY: Left subarray exhausted but right still has sorted elements
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

/**
 * Helper function to visualize the merging process
 * Shows how array evolves through each pass
 */
function mergeSortBottomUpWithVisualization(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const result = [...arr];
  const n = result.length;
  let size = 1;
  let passNumber = 1;

  console.log("Initial array:", result);

  while (size < n) {
    console.log(`\n--- Pass ${passNumber} (merging size ${size}) ---`);

    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      const mid = Math.min(leftStart + size - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

      if (mid < rightEnd) {
        console.log(`Merging: [${leftStart}...${mid}] with [${mid+1}...${rightEnd}]`);
        mergeBottomUp(result, leftStart, mid, rightEnd);
      }
    }

    console.log(`After pass ${passNumber}:`, result);
    size *= 2;
    passNumber++;
  }

  return result;
}

// ==================== EXAMPLE USAGE ====================

console.log("=== MERGE SORT - BOTTOM-UP (ITERATIVE) ===\n");

// Example 1: Basic array
const arr1 = [38, 27, 43, 3, 9, 82, 10];
console.log("Original:", arr1);
console.log("Sorted:", mergeSortBottomUp(arr1));
console.log(); // Expected: [3, 9, 10, 27, 38, 43, 82]

// Example 2: With visualization
console.log("=== WITH VISUALIZATION ===");
const arr2 = [38, 27, 43, 3, 9, 82, 10];
mergeSortBottomUpWithVisualization(arr2);
console.log();

// Example 3: Already sorted
const arr3 = [1, 2, 3, 4, 5];
console.log("Already sorted:", arr3);
console.log("Result:", mergeSortBottomUp(arr3));
console.log(); // Expected: [1, 2, 3, 4, 5]

// Example 4: Reverse sorted
const arr4 = [5, 4, 3, 2, 1];
console.log("Reverse sorted:", arr4);
console.log("Result:", mergeSortBottomUp(arr4));
console.log(); // Expected: [1, 2, 3, 4, 5]

// Example 5: Duplicates
const arr5 = [5, 2, 8, 2, 9, 1, 5];
console.log("With duplicates:", arr5);
console.log("Result:", mergeSortBottomUp(arr5));
console.log(); // Expected: [1, 2, 2, 5, 5, 8, 9]

// Example 6: Power of 2 length (clean merging)
const arr6 = [64, 34, 25, 12, 22, 11, 90, 88];
console.log("Power of 2 length:", arr6);
console.log("Result:", mergeSortBottomUp(arr6));
// Expected: [11, 12, 22, 25, 34, 64, 88, 90]
```

---

## Code Explanation

### Top-Down Approach Key Concepts

#### 1. The Recursive Split
```typescript
const mid = Math.floor(arr.length / 2);
const left = arr.slice(0, mid);
const right = arr.slice(mid);
```
**Purpose**: Divide array into two halves
**How it works**: `slice()` creates new subarrays without modifying original
**Optimization**: We could use indices instead of creating new arrays (in-place version)

#### 2. The Base Case
```typescript
if (arr.length <= 1) {
  return arr;
}
```
**Purpose**: Stop recursion when array is trivially sorted
**Why necessary**: Without this, we'd have infinite recursion
**Edge cases handled**: Empty arrays and single-element arrays

#### 3. The Merge Operation
```typescript
while (leftIndex < left.length && rightIndex < right.length) {
  if (left[leftIndex] <= right[rightIndex]) {
    result.push(left[leftIndex]);
    leftIndex++;
  } else {
    result.push(right[rightIndex]);
    rightIndex++;
  }
}
```
**Purpose**: Combine two sorted arrays into one
**How it works**: Compare front elements, pick smaller, advance that pointer
**Key insight**: Since both arrays are sorted, we only need to look at current front elements

### Bottom-Up Approach Key Concepts

#### 1. The Size Doubling
```typescript
let size = 1;
while (size < n) {
  // ... merge pairs of size 'size'
  size *= 2;
}
```
**Purpose**: Process array in increasing subarray sizes
**How it works**: Start with size 1 (single elements), double each pass
**Number of passes**: log₂(n) passes total

#### 2. The Pairing Loop
```typescript
for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
  const mid = Math.min(leftStart + size - 1, n - 1);
  const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
  // ...
}
```
**Purpose**: Identify pairs of subarrays to merge
**How it works**: Step through array in chunks of `2 * size`
**Edge handling**: `Math.min()` prevents going past array end

#### 3. The Index Calculation
```typescript
const mid = Math.min(leftStart + size - 1, n - 1);
const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
```
**Purpose**: Calculate subarray boundaries
**Why `Math.min()`**: Handles case where array doesn't divide evenly
**Example**:
```
Array size = 7, size = 4, leftStart = 4
mid = min(4 + 4 - 1, 6) = min(7, 6) = 6
rightEnd = min(4 + 8 - 1, 6) = min(11, 6) = 6
```

---

## Dry Run - Top-Down Approach

Let's trace the complete execution for array: `[38, 27, 43, 3]`

### Recursion Tree

```
Level 0:          [38, 27, 43, 3]
                        |
Level 1:     [38, 27]   |   [43, 3]
                |       |      |
Level 2:    [38] [27]   |   [43] [3]
```

### Complete Execution Table

| Call# | Function Call | left | right | Action | Result |
|-------|--------------|------|-------|--------|---------|
| 1 | `mergeSort([38,27,43,3])` | 0 | 3 | Split at mid=1 | Recurse on `[38,27]` and `[43,3]` |
| 2 | `mergeSort([38,27])` | 0 | 1 | Split at mid=0 | Recurse on `[38]` and `[27]` |
| 3 | `mergeSort([38])` | 0 | 0 | Base case | Return `[38]` |
| 4 | `mergeSort([27])` | 0 | 0 | Base case | Return `[27]` |
| 5 | `merge([38], [27])` | - | - | Compare 38 vs 27 | Return `[27, 38]` |
| 6 | `mergeSort([43,3])` | 2 | 3 | Split at mid=2 | Recurse on `[43]` and `[3]` |
| 7 | `mergeSort([43])` | 2 | 2 | Base case | Return `[43]` |
| 8 | `mergeSort([3])` | 3 | 3 | Base case | Return `[3]` |
| 9 | `merge([43], [3])` | - | - | Compare 43 vs 3 | Return `[3, 43]` |
| 10 | `merge([27,38], [3,43])` | - | - | Merge process below | Return `[3, 27, 38, 43]` |

### Detailed Merge at Call #10

Merging `[27, 38]` and `[3, 43]`:

| Step | leftIndex | rightIndex | left[i] | right[j] | Comparison | Action | Result Array |
|------|-----------|------------|---------|----------|------------|--------|--------------|
| 0 | 0 | 0 | 27 | 3 | 27 > 3 | Pick 3 | `[3]` |
| 1 | 0 | 1 | 27 | 43 | 27 < 43 | Pick 27 | `[3, 27]` |
| 2 | 1 | 1 | 38 | 43 | 38 < 43 | Pick 38 | `[3, 27, 38]` |
| 3 | 2 | 1 | - | 43 | Left exhausted | Pick 43 | `[3, 27, 38, 43]` |

**Final Result**: `[3, 27, 38, 43]` ✓

### Call Stack Visualization

```
Call Stack (grows downward):

[38, 27, 43, 3]                  ← Initial call
    ↓ split
[38, 27] | [43, 3]               ← Two recursive calls
    ↓        ↓
[38]|[27] [43]|[3]               ← Four base case calls
    ↓        ↓
 [27,38]   [3,43]                ← Two merges
       ↓
   [3,27,38,43]                  ← Final merge
```

---

## Dry Run - Bottom-Up Approach

Let's trace the complete execution for array: `[38, 27, 43, 3, 9, 82, 10]`

### Initial State
```
Array: [38, 27, 43, 3, 9, 82, 10]
Indices: 0   1   2  3  4   5   6
n = 7
```

### Complete Pass-by-Pass Table

#### Pass 1: size = 1 (merge pairs of single elements)

| Merge# | leftStart | mid | rightEnd | Left Subarray | Right Subarray | Merge Steps | Result Array |
|--------|-----------|-----|----------|---------------|----------------|-------------|--------------|
| 1 | 0 | 0 | 1 | `[38]` | `[27]` | Compare 38 vs 27 → Pick 27, 38 | `[27, 38, 43, 3, 9, 82, 10]` |
| 2 | 2 | 2 | 3 | `[43]` | `[3]` | Compare 43 vs 3 → Pick 3, 43 | `[27, 38, 3, 43, 9, 82, 10]` |
| 3 | 4 | 4 | 5 | `[9]` | `[82]` | Compare 9 vs 82 → Pick 9, 82 | `[27, 38, 3, 43, 9, 82, 10]` |
| 4 | 6 | 6 | 6 | `[10]` | none | No right subarray, skip | `[27, 38, 3, 43, 9, 82, 10]` |

**After Pass 1**: `[27, 38, 3, 43, 9, 82, 10]` (paired elements sorted)

#### Pass 2: size = 2 (merge pairs of size 2)

| Merge# | leftStart | mid | rightEnd | Left Subarray | Right Subarray | Merge Steps | Result Array |
|--------|-----------|-----|----------|---------------|----------------|-------------|--------------|
| 1 | 0 | 1 | 3 | `[27, 38]` | `[3, 43]` | 3 < 27 → [3]<br>27 < 43 → [3,27]<br>38 < 43 → [3,27,38]<br>43 remaining → [3,27,38,43] | `[3, 27, 38, 43, 9, 82, 10]` |
| 2 | 4 | 5 | 6 | `[9, 82]` | `[10]` | 9 < 10 → [9]<br>82 > 10 → [9,10]<br>82 remaining → [9,10,82] | `[3, 27, 38, 43, 9, 10, 82]` |

**After Pass 2**: `[3, 27, 38, 43, 9, 10, 82]` (groups of 4 sorted)

#### Pass 3: size = 4 (merge pairs of size 4)

| Merge# | leftStart | mid | rightEnd | Left Subarray | Right Subarray | Merge Steps | Result Array |
|--------|-----------|-----|----------|---------------|----------------|-------------|--------------|
| 1 | 0 | 3 | 6 | `[3,27,38,43]` | `[9,10,82]` | 3 < 9 → [3]<br>27 > 9 → [3,9]<br>27 > 10 → [3,9,10]<br>27 < 82 → [3,9,10,27]<br>38 < 82 → [3,9,10,27,38]<br>43 < 82 → [3,9,10,27,38,43]<br>82 remaining → [3,9,10,27,38,43,82] | `[3, 9, 10, 27, 38, 43, 82]` |

**After Pass 3**: `[3, 9, 10, 27, 38, 43, 82]` ✓ (fully sorted!)

**size = 8 ≥ n = 7**, loop exits

### Summary of Passes

```
Pass 0 (Initial):  [38, 27, 43, 3, 9, 82, 10]
                    ↓   ↓   ↓  ↓  ↓  ↓   ↓
Pass 1 (size=1):   [27, 38][3, 43][9, 82][10]
                    ↓       ↓       ↓
Pass 2 (size=2):   [3, 27, 38, 43][9, 10, 82]
                    ↓               ↓
Pass 3 (size=4):   [3, 9, 10, 27, 38, 43, 82]
                    ↓
Final Result:      [3, 9, 10, 27, 38, 43, 82] ✓
```

**Total passes**: 3 = ⌈log₂(7)⌉

---

## Doubts

### Q1: Why is Merge Sort O(n log n) and not O(n²)?

**A**: Great question! Let's break it down:

**Naive sorting (like Selection Sort)** compares every element with every other element:
```
n elements × n comparisons = n² operations
```

**Merge Sort** uses a smarter divide-and-conquer approach:

**Think of it as a tournament bracket:**
- **Bottom level**: n individual players (elements)
- **Each level up**: Players pair up and "compete" (merge)
- **Top level**: Final championship (fully sorted array)

**How many levels?**
- Level 0: n arrays of size 1
- Level 1: n/2 arrays of size 2
- Level 2: n/4 arrays of size 4
- ...
- Level k: 1 array of size n

We reach the top when n/2^k = 1, so k = log₂(n) levels.

**Work per level?**
At each level, we process all n elements exactly once during merging.

**Total work**:
```
n elements × log n levels = n log n operations ✓
```

**Visual Example with n = 8**:
```
Level 3: [_,_,_,_,_,_,_,_]           8 elements processed
Level 2: [_,_,_,_] [_,_,_,_]         8 elements processed (4+4)
Level 1: [_,_] [_,_] [_,_] [_,_]     8 elements processed (2+2+2+2)
Level 0: [_][_][_][_][_][_][_][_]   8 single elements

Levels = log₂(8) = 3
Work = 8 × 3 = 24 operations = O(n log n) ✓
```

**Comparison**:
```
n = 8:
- n² = 64 operations (Selection Sort)
- n log n = 24 operations (Merge Sort)
- Merge Sort is 2.6× faster!

n = 1000:
- n² = 1,000,000 operations
- n log n ≈ 10,000 operations
- Merge Sort is 100× faster! 🚀
```

---

### Q2: When should I use Top-Down vs Bottom-Up?

**A**: Both achieve O(n log n) time, but have different strengths:

**Use Top-Down (Recursive) when:**

✅ **Code clarity is priority**: Recursive code is shorter and more intuitive
```typescript
// Top-down: Very clean
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)),
               mergeSort(arr.slice(mid)));
}
```

✅ **You're learning the algorithm**: Recursion matches the mental model better

✅ **Array isn't huge**: Recursion stack depth is manageable

✅ **You need a stable sort**: Both are stable, but recursive is easier to verify

**Use Bottom-Up (Iterative) when:**

✅ **Memory is constrained**: No recursion stack overhead (saves O(log n) space)

✅ **You need cache-friendly code**: Sequential access pattern is better for CPU cache

✅ **Array is very large**: No risk of stack overflow

✅ **Predictable performance needed**: No recursion overhead, more consistent timing

**Performance Comparison**:

```
n = 10,000 elements

Top-Down:
- Time: ~0.15ms
- Stack depth: ~14 recursive calls
- Memory: Array + recursion stack

Bottom-Up:
- Time: ~0.13ms (slightly faster!)
- Stack depth: 1 (no recursion)
- Memory: Array only

Bottom-Up is ~13% faster due to:
1. No function call overhead
2. Better cache locality
3. No stack frame management
```

**My recommendation**: Learn Top-Down first (easier to understand), use Bottom-Up in production (more efficient).

---

### Q3: How does the merge operation maintain stability?

**A**: **Stability** means equal elements keep their original relative order.

**Example**:
```
Input: [3a, 1, 3b, 2] (where 3a and 3b are equal but from different positions)

Unstable sort might give: [1, 2, 3b, 3a] ❌ (relative order changed!)
Stable sort guarantees: [1, 2, 3a, 3b] ✓ (relative order preserved!)
```

**How Merge Sort ensures stability:**

In the merge function, we have this key line:
```typescript
if (left[leftIndex] <= right[rightIndex]) {  // Note the <=
  result.push(left[leftIndex]);
  leftIndex++;
}
```

**The `<=` is crucial!** When elements are equal, we **always pick from the left array first**.

**Why this preserves order:**

Consider merging `[3a, 5]` with `[3b, 7]`:

| Step | left[i] | right[j] | Comparison | Action | Result | Why? |
|------|---------|----------|------------|--------|--------|------|
| 1 | 3a | 3b | 3a <= 3b? **YES** | Pick 3a | `[3a]` | Left comes first when equal |
| 2 | 5 | 3b | 5 <= 3b? NO | Pick 3b | `[3a, 3b]` | 3b comes after 3a ✓ |
| 3 | 5 | 7 | 5 <= 7? YES | Pick 5 | `[3a, 3b, 5]` | - |
| 4 | - | 7 | Left exhausted | Pick 7 | `[3a, 3b, 5, 7]` | - |

**Result**: 3a appears before 3b, preserving original order! ✓

**What if we used `<` instead of `<=`?**

```typescript
if (left[leftIndex] < right[rightIndex]) {  // Using < instead
  result.push(left[leftIndex]);
} else {
  result.push(right[rightIndex]);  // Equal elements go here
}
```

This would pick from right array when equal, **breaking stability**!

**Complete Example**:

```
Original: [3a, 1, 3b, 2, 3c]

Merge Sort splits and merges:
Level 0: [3a] [1] [3b] [2] [3c]
Level 1: [1, 3a] [2, 3b] [3c]
Level 2: [1, 2, 3a, 3b] [3c]
Level 3: [1, 2, 3a, 3b, 3c]

Notice: 3a < 3b < 3c order is preserved! ✓
```

**Why stability matters**:
- Sorting records by multiple fields (e.g., sort by name, then by age)
- Maintaining time-based ordering
- Database operations
- UI sorting operations

---

### Q4: Can we do merge sort without extra O(n) space?

**A**: The O(n) space comes from the temporary array used during merging. **Theoretically yes, practically no.**

**Why we need extra space:**

During merge, we're combining two subarrays *in-place* in the original array:
```
Original: [27, 38, _, _, 3, 43, _, _]
           ↑left↑    ↑right↑

We need to merge [27, 38] and [3, 43] into positions 0-3.
But as we write results, we overwrite the original values!

Without temp array:
- Write 3 to position 0 → Overwrites 27! 😱
- We've lost 27 before comparing it with 43

With temp array:
- Copy [27, 38] and [3, 43] to temp
- Compare from temp, write to original
- All values preserved ✓
```

**In-Place Merge Sort (exists but not practical)**:

There *are* algorithms that achieve O(1) space merge sort, but they:
1. Are **extremely complex** (hundreds of lines of code)
2. Have **much worse constants** in time complexity
3. Are **slower in practice** despite same O(n log n) complexity
4. Sacrifice stability

**Example - Block Merge Sort**:
- Divides array into √n blocks
- Uses complex block swapping
- Achieves O(1) space
- But 3-5× slower than standard merge sort! ❌

**Practical Answer**:

**Just accept the O(n) space.** Here's why:

✅ **It's worth it**: O(n log n) time vs O(n²) is huge win
✅ **Space is cheap**: Modern systems have plenty of memory
✅ **Only during merging**: Space is temporarily allocated and freed
✅ **Can be optimized**: Reuse same temp array across recursive calls

**Optimization** (reduce space to O(n) instead of O(n log n)):
```typescript
// Bad: Creates new temp arrays at each recursion level
function merge(left, right) {
  const temp = []; // O(n) space per level × log n levels = O(n log n)
  // ...
}

// Good: Reuse same temp array throughout
function mergeSort(arr, temp) {  // Pass temp array
  // ... recursive calls pass same temp ...
  merge(arr, temp, left, mid, right); // Reuse temp
}
// Total space: O(n) for one temp array ✓
```

**Conclusion**: O(n) space is the practical minimum for merge sort, and it's acceptable!

---

## Additional Resources

### Video Tutorials

1. **[Merge Sort Visualization](https://www.youtube.com/watch?v=4VqmGXwpLqc)** - Great visual animation
2. **[Merge Sort Explained](https://www.youtube.com/watch?v=JSceec-wEyw)** - Abdul Bari's excellent explanation
3. **[Bottom-Up Merge Sort](https://www.youtube.com/watch?v=Pr2Jf83_kG0)** - Iterative approach walkthrough

### Interactive Tools

1. **[VisuAlgo - Merge Sort](https://visualgo.net/en/sorting)** - Step-through visualization
2. **[USF Animation](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)** - Compare sorting algorithms

### Further Reading

1. **Introduction to Algorithms (CLRS)** - Chapter 2.3: Merge Sort (The definitive textbook)
2. **[Top-Down vs Bottom-Up](https://www.baeldung.com/cs/merge-sort-top-down-vs-bottom-up)** - Detailed comparison
3. **[Stability in Sorting](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)** - Why it matters

---

## Summary

**Merge Sort** is a powerful divide-and-conquer sorting algorithm that achieves O(n log n) time complexity by:

1. **Dividing** the array into smaller subarrays
2. **Recursively sorting** each subarray
3. **Merging** sorted subarrays back together

**Key Takeaways**:

✅ **Time Complexity**: O(n log n) - optimal for comparison-based sorting
✅ **Space Complexity**: O(n) - requires extra space for merging
✅ **Stable**: Preserves relative order of equal elements
✅ **Not in-place**: Requires additional memory
✅ **Predictable**: Always O(n log n), regardless of input

**Two Implementations**:
- **Top-Down (Recursive)**: More intuitive, uses recursion
- **Bottom-Up (Iterative)**: More efficient, no recursion overhead

**When to use Merge Sort**:
- Large datasets (n > 1000)
- Stability is required
- Predictable performance needed
- External sorting (sorting data that doesn't fit in memory)

**When NOT to use Merge Sort**:
- Very small arrays (n < 50) - use Insertion Sort
- Memory is extremely constrained - use Heap Sort
- In-place sorting required - use Quick Sort

**Remember**: Merge Sort is like organizing a library by splitting books into manageable piles, sorting each pile, then merging them back - simple, efficient, and reliable! 📚

---

*Created with ❤️ for learners | Last updated: 2025 | Happy Sorting! 🚀*
