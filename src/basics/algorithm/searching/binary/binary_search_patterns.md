# Binary Search Patterns - Complete Guide

## Table of Contents
1. [Core Concepts](#core-concepts)
2. [Pattern 1: Classic Binary Search](#pattern-1-classic-binary-search)
3. [Pattern 2: Find First/Last Occurrence](#pattern-2-find-firstlast-occurrence)
4. [Pattern 3: Search in Rotated Array](#pattern-3-search-in-rotated-array)
5. [Pattern 4: Binary Search on Answer Space](#pattern-4-binary-search-on-answer-space)
6. [Pattern 5: Peak/Valley Finding](#pattern-5-peakvalley-finding)
7. [Pattern 6: Mathematical Binary Search](#pattern-6-mathematical-binary-search)
8. [Pattern 7: Two Pointers with Binary Search](#pattern-7-two-pointers-with-binary-search)
9. [Pattern 8: Missing Elements](#pattern-8-missing-elements)
10. [Key Insights and Tips](#key-insights-and-tips)

---

## Core Concepts

### When to Use Binary Search
1. **Sorted Data**: Array is sorted or has some ordered property
2. **Search Space Reduction**: Can eliminate half of search space at each step
3. **Monotonic Property**: If condition is true for value X, it's true for all values >= X (or <= X)
4. **Answer Space**: When you can define a range of possible answers

### Basic Template
```typescript
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}
```

### Important Points
- **Mid Calculation**: Use `Math.floor(left + (right - left) / 2)` to avoid overflow
- **Loop Condition**: `left <= right` for inclusive search, `left < right` for convergence
- **Boundary Updates**: Be careful with `mid + 1` vs `mid` and `mid - 1` vs `mid`

---

## Pattern 1: Classic Binary Search

### Use Cases
- Finding exact element in sorted array
- Floor/Ceiling values
- Insertion position

### Key Implementation
```typescript
// Floor value (largest element <= target)
if (nums[mid] <= target) {
    result = mid;  // Store potential answer
    left = mid + 1;  // Look for larger value
}

// Ceiling value (smallest element >= target)
if (nums[mid] >= target) {
    result = mid;  // Store potential answer
    right = mid - 1;  // Look for smaller value
}
```

### Examples from Questions
- **Find Square Root**: Find floor value of square root
- **Nth Root**: Check if exact nth root exists

---

## Pattern 2: Find First/Last Occurrence

### Use Cases
- First occurrence of element in sorted array with duplicates
- Last occurrence of element
- Count of elements

### Key Implementation
```typescript
// Finding First Occurrence
while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
        right = mid - 1;  // Continue searching left even after finding
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
// After loop: 'left' points to first occurrence

// Finding Last Occurrence
while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
        left = mid + 1;  // Continue searching right even after finding
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
// After loop: 'right' points to last occurrence
```

### Examples from Questions
- **First and Last Position**: Find range of target element

---

## Pattern 3: Search in Rotated Array

### Use Cases
- Finding element in rotated sorted array
- Finding minimum in rotated sorted array
- Finding rotation point

### Key Implementation
```typescript
// Search in Rotated Array
while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) return mid;

    // Check which half is sorted
    if (nums[left] <= nums[mid]) {  // Left half is sorted
        if (nums[left] <= target && target < nums[mid]) {
            right = mid - 1;  // Target in left half
        } else {
            left = mid + 1;  // Target in right half
        }
    } else {  // Right half is sorted
        if (nums[mid] < target && target <= nums[right]) {
            left = mid + 1;  // Target in right half
        } else {
            right = mid - 1;  // Target in left half
        }
    }
}

// Find Minimum in Rotated Array
while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
        left = mid + 1;  // Min in right half
    } else {
        right = mid;  // Min in left half (include mid)
    }
}
```

### Examples from Questions
- **Search in Rotated Sorted Array**: Find target in rotated array
- **Find Minimum in Rotated Array**: Find minimum element

---

## Pattern 4: Binary Search on Answer Space

### Use Cases
- Optimization problems (minimize/maximize)
- When answer lies in a range and you need to find optimal value
- Problems with monotonic property

### Key Implementation Template
```typescript
function binarySearchOnAnswer(): number {
    let left = minPossibleAnswer;
    let right = maxPossibleAnswer;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (isPossible(mid)) {
            result = mid;  // Store valid answer
            // For minimization: right = mid - 1
            // For maximization: left = mid + 1
        } else {
            // Opposite direction
        }
    }

    return result;
}

function isPossible(value: number): boolean {
    // Check if this value satisfies the condition
    // This function varies based on problem
}
```

### Common Patterns in isPossible Function

#### 1. **Allocation/Distribution Problems**
```typescript
function canAllocate(maxValue: number): boolean {
    let count = 1;
    let current = 0;

    for (const item of items) {
        if (current + item > maxValue) {
            count++;
            current = item;
            if (count > limit) return false;
        } else {
            current += item;
        }
    }
    return true;
}
```

#### 2. **Speed/Rate Problems**
```typescript
function canCompleteInTime(speed: number): boolean {
    let totalTime = 0;

    for (const task of tasks) {
        totalTime += Math.ceil(task / speed);
        if (totalTime > timeLimit) return false;
    }
    return true;
}
```

#### 3. **Distance/Spacing Problems**
```typescript
function canPlaceWithDistance(minDistance: number): boolean {
    let placed = 1;
    let lastPosition = positions[0];

    for (let i = 1; i < positions.length; i++) {
        if (positions[i] - lastPosition >= minDistance) {
            placed++;
            lastPosition = positions[i];
            if (placed === required) return true;
        }
    }
    return false;
}
```

### Examples from Questions

#### Minimization Problems
- **Book Allocation**: Minimize maximum pages allocated
- **Painter's Partition**: Minimize maximum time taken
- **Ship Capacity**: Minimize ship capacity to deliver in D days
- **Smallest Divisor**: Minimize divisor for sum threshold
- **Minimum Eating Speed**: Minimize eating speed for Koko

#### Maximization Problems
- **Aggressive Cows**: Maximize minimum distance between cows
- **Minimum Days for Bouquets**: Find minimum days to make bouquets
- **Gas Station Distance**: Minimize maximum distance between stations

---

## Pattern 5: Peak/Valley Finding

### Use Cases
- Finding local maximum/minimum
- Mountain arrays
- Bitonic sequences

### Key Implementation
```typescript
function findPeakElement(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;  // Peak on right (ascending)
        } else {
            right = mid;  // Peak at mid or left (descending)
        }
    }

    return left;  // left == right at peak
}
```

### Key Insight
- If going uphill (nums[mid] < nums[mid + 1]), peak must be on right
- If going downhill, peak must be at mid or left

---

## Pattern 6: Mathematical Binary Search

### Use Cases
- Square root, nth root calculations
- Mathematical equations
- Precision-based problems

### Key Implementation
```typescript
// Integer Square Root
function sqrt(n: number): number {
    let left = 1, right = n;
    let result = 0;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (mid * mid === n) return mid;
        if (mid * mid < n) {
            left = mid + 1;
            result = mid;  // Store floor value
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// Nth Root with Overflow Prevention
function calculatePower(base: number, exp: number, limit: number): number {
    let result = 1;
    for (let i = 0; i < exp; i++) {
        result *= base;
        if (result > limit) return 1;  // Greater than limit
    }
    if (result === limit) return 0;  // Equal to limit
    return -1;  // Less than limit
}
```

---

## Pattern 7: Two Pointers with Binary Search

### Use Cases
- Median of two sorted arrays
- K-th smallest in sorted matrix
- Problems requiring partition of arrays

### Key Implementation (Median of Two Arrays)
```typescript
function findMedianSortedArrays(arr1: number[], arr2: number[]): number {
    // Ensure arr1 is smaller for optimization
    if (arr1.length > arr2.length) {
        return findMedianSortedArrays(arr2, arr1);
    }

    const total = arr1.length + arr2.length;
    const halfLength = Math.floor((total + 1) / 2);

    let low = 0, high = arr1.length;

    while (low <= high) {
        const partition1 = Math.floor((low + high) / 2);
        const partition2 = halfLength - partition1;

        // Get boundary elements
        const maxLeft1 = partition1 === 0 ? -Infinity : arr1[partition1 - 1];
        const minRight1 = partition1 === arr1.length ? Infinity : arr1[partition1];
        const maxLeft2 = partition2 === 0 ? -Infinity : arr2[partition2 - 1];
        const minRight2 = partition2 === arr2.length ? Infinity : arr2[partition2];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found valid partition
            if (total % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) +
                        Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            high = partition1 - 1;
        } else {
            low = partition1 + 1;
        }
    }
}
```

---

## Pattern 8: Missing Elements

### Use Cases
- Finding k-th missing positive number
- Single element in sorted pairs

### Key Implementation
```typescript
// K-th Missing Positive Number
function findKthPositive(arr: number[], k: number): number {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const missingCount = arr[mid] - (mid + 1);

        if (missingCount < k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return k + right + 1;
}

// Single Element in Sorted Pairs
function singleNonDuplicate(nums: number[]): number {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // Ensure mid is even for pattern checking
        if (mid % 2 === 1) mid--;

        if (nums[mid] === nums[mid + 1]) {
            left = mid + 2;  // Pattern intact, single on right
        } else {
            right = mid;  // Pattern broken, single on left or at mid
        }
    }

    return nums[left];
}
```

---

## Key Insights and Tips

### 1. Choosing Loop Condition
- **`while (left <= right)`**: When you need exact position or element
- **`while (left < right)`**: When you want convergence to single element

### 2. Boundary Updates
- **Include mid**: `right = mid` or `left = mid` when answer could be at mid
- **Exclude mid**: `right = mid - 1` or `left = mid + 1` when mid is definitely not answer

### 3. Common Mistakes to Avoid
1. **Integer Overflow**: Use `left + (right - left) / 2` instead of `(left + right) / 2`
2. **Infinite Loop**: Ensure boundaries are updating correctly
3. **Off-by-one Errors**: Be careful with array bounds and final answer

### 4. Problem Recognition Patterns

#### When to think Binary Search on Answer:
- "Find minimum/maximum X such that..."
- "Find smallest/largest value that satisfies..."
- Problems with phrases like "at least", "at most", "minimum days", "maximum capacity"

#### Key Questions to Ask:
1. Is there a monotonic property? (If X works, does X+1 also work?)
2. Can I check if a value is valid in O(n) or O(n log n)?
3. Can I define clear bounds for the answer?

### 5. Optimization Tips
1. **Binary Search on Smaller Array**: In problems with multiple arrays
2. **Early Termination**: In validation functions, return false as soon as condition fails
3. **Precomputation**: Calculate bounds (min/max) before binary search

### 6. Testing Strategy
Always test with:
- Empty array
- Single element
- Two elements
- All same elements
- Minimum and maximum possible values

### 7. Time Complexity
- Classic Binary Search: O(log n)
- Binary Search on Answer: O(log(range) * validation_time)
- Usually validation is O(n), making total: O(n * log(range))

### 8. Common Formulas

#### Missing Elements
```
Missing till index i = arr[i] - (i + 1)
K-th missing = k + right + 1 (after binary search)
```

#### Rotated Array
```
if (nums[left] <= nums[mid]) -> Left sorted
if (nums[mid] > nums[right]) -> Min in right half
```

#### Pairs Pattern
```
Even index should equal next element in normal pattern
If pattern breaks, single element is on left
```

---

## Practice Approach

1. **Start with Classic Binary Search**: Master basic implementation
2. **Move to Variations**: First/Last occurrence, rotated arrays
3. **Practice Answer Space Problems**: These are most common in interviews
4. **Identify Patterns**: Look for monotonic properties
5. **Write Helper Functions**: isPossible(), canAchieve(), isValid()
6. **Debug Systematically**: Print left, right, mid values to understand flow

## Memory Aids

### Binary Search Checklist
- [ ] Sorted or monotonic property?
- [ ] Clear search space boundaries?
- [ ] Correct loop condition (< vs <=)?
- [ ] Proper boundary updates?
- [ ] Handle edge cases?
- [ ] Return correct value (left, right, or result)?

### Problem Type Identification
- **Exact Search** → Classic Binary Search
- **Range Query** → First/Last Occurrence
- **Rotated/Shifted** → Modified Binary Search
- **Optimization** → Binary Search on Answer
- **Local Extrema** → Peak/Valley Pattern
- **Mathematical** → Precision-based Search
- **Multiple Arrays** → Partition Pattern
- **Missing/Extra** → Index-Value Relationship