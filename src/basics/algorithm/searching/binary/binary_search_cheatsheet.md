# Binary Search Cheat Sheet - Quick Reference

## 🎯 Core Template
```typescript
let left = 0, right = arr.length - 1;
while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (condition) left = mid + 1;
    else right = mid - 1;
}
```

## 📊 Pattern Recognition Map

| **Problem Type** | **Key Phrase** | **Pattern to Use** |
|-----------------|---------------|-------------------|
| Find exact element | "search for X" | Classic Binary Search |
| Find boundary | "first/last occurrence" | Modified BS with continuation |
| Rotated array | "rotated", "shifted" | Check sorted half |
| Optimization | "minimize/maximize" | BS on answer space |
| Local extrema | "peak", "valley" | Compare with neighbors |
| Math calculation | "sqrt", "nth root" | BS with calculation |
| Two arrays | "median of two" | Partition search |
| Missing/Extra | "kth missing" | Index-value relationship |

## 🔍 Quick Decision Tree

```
Is array sorted?
├── YES → Classic Binary Search variants
│   ├── Find exact? → Classic BS
│   ├── Find range? → First/Last occurrence
│   └── Find insert position? → Lower/Upper bound
│
├── PARTIALLY (Rotated) → Modified BS
│   ├── Find element? → Check sorted half
│   └── Find min/max? → Compare with boundaries
│
└── NO → Can we binary search on answer?
    ├── YES → Binary Search on Answer Space
    │   ├── Minimize? → right = mid when valid
    │   └── Maximize? → left = mid + 1 when valid
    └── NO → Not a BS problem
```

## 🎭 Loop Conditions Quick Guide

| **Use Case** | **Condition** | **Final State** |
|-------------|--------------|----------------|
| Find exact element | `while (left <= right)` | Not found if exits loop |
| Convergence to answer | `while (left < right)` | `left == right` at answer |
| Find boundary | `while (left <= right)` | `left` = first invalid, `right` = last valid |

## 🚀 Common Patterns at a Glance

### 1️⃣ **Classic Search**
```typescript
if (arr[mid] === target) return mid;
else if (arr[mid] < target) left = mid + 1;
else right = mid - 1;
```

### 2️⃣ **First Occurrence**
```typescript
if (arr[mid] === target) {
    result = mid;
    right = mid - 1; // Keep searching left
}
```

### 3️⃣ **Last Occurrence**
```typescript
if (arr[mid] === target) {
    result = mid;
    left = mid + 1; // Keep searching right
}
```

### 4️⃣ **Rotated Array**
```typescript
if (nums[left] <= nums[mid]) { // Left sorted
    if (nums[left] <= target && target < nums[mid])
        right = mid - 1;
    else
        left = mid + 1;
}
```

### 5️⃣ **Answer Space (Minimize)**
```typescript
while (left < right) {
    mid = Math.floor((left + right) / 2);
    if (isValid(mid)) right = mid;
    else left = mid + 1;
}
```

### 6️⃣ **Answer Space (Maximize)**
```typescript
while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (isValid(mid)) {
        result = mid;
        left = mid + 1;
    } else right = mid - 1;
}
```

### 7️⃣ **Peak Element**
```typescript
if (nums[mid] < nums[mid + 1])
    left = mid + 1; // Peak on right
else
    right = mid; // Peak at mid or left
```

### 8️⃣ **Missing Kth Number**
```typescript
missingCount = arr[mid] - (mid + 1);
if (missingCount < k) left = mid + 1;
else right = mid - 1;
// Answer: k + right + 1
```

## ⚡ Speed Tips

### When to Include/Exclude Mid
| **Update** | **When to Use** |
|-----------|----------------|
| `left = mid + 1` | Mid definitely not answer |
| `left = mid` | Mid could be answer |
| `right = mid - 1` | Mid definitely not answer |
| `right = mid` | Mid could be answer |

### Common Helper Functions
```typescript
// For Answer Space problems
function isPossible(value: number): boolean {
    // Check if 'value' satisfies condition
    // Usually O(n) validation
}

// For overflow prevention
function multiply(a: number, b: number, limit: number): number {
    const result = a * b;
    return result > limit ? 1 : result === limit ? 0 : -1;
}
```

## 🐛 Debug Checklist

- [ ] **Infinite loop?** Check boundary updates
- [ ] **Wrong answer?** Check inclusive vs exclusive boundaries
- [ ] **Off by one?** Check final return (left, right, or result?)
- [ ] **Overflow?** Use `left + (right - left) / 2`
- [ ] **Edge cases?** Test with 0, 1, 2 elements

## 📝 Problem Solving Steps

1. **Identify if BS applicable**
   - Sorted/Monotonic property?
   - Can eliminate half each time?

2. **Choose pattern**
   - Exact search vs optimization
   - Single array vs multiple arrays

3. **Define boundaries**
   - What's minimum possible?
   - What's maximum possible?

4. **Write validation function** (if needed)
   - Can achieve with value X?
   - Is X valid?

5. **Determine loop condition**
   - Need exact position? Use `<=`
   - Need convergence? Use `<`

6. **Handle edge cases**
   - Empty array
   - Single element
   - All same elements

## 🎨 Visual Memory Aids

### Binary Search on Answer
```
[-------|-------]
   ❌      ✅
   left    right

Find boundary where ❌ becomes ✅
```

### Rotated Array
```
Original: [1,2,3,4,5,6,7]
Rotated:  [4,5,6,7,1,2,3]
          [  sorted ][sorted]
```

### Peak Element
```
    /\      Peak
   /  \
  /    \    If mid < mid+1: go right
 /      \   If mid > mid+1: go left/stay
```

## 💡 Key Formulas

| **Concept** | **Formula** |
|------------|------------|
| Missing numbers till index i | `arr[i] - (i + 1)` |
| Kth missing number | `k + right + 1` (after BS) |
| Median position (odd total) | `(total + 1) / 2` |
| Hours to eat at speed s | `Math.ceil(pile / speed)` |
| Mid without overflow | `left + (right - left) / 2` |

## 🏃 Quick Start Code

```typescript
// Most common template
function binarySearchTemplate(arr: number[], condition: Function): number {
    let left = 0, right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (condition(mid)) {
            result = mid;
            // Adjust based on minimization/maximization
            // left = mid + 1; OR right = mid - 1;
        } else {
            // Opposite adjustment
        }
    }

    return result;
}
```

## 🎯 Interview Tips

1. **Always clarify**: Sorted? Duplicates allowed? Return index or value?
2. **Start simple**: Write basic BS first, then optimize
3. **Test mentally**: Walk through with small example
4. **Common mistakes**:
   - Infinite loops (check boundary updates)
   - Wrong return value (left vs right vs result)
   - Integer overflow in mid calculation
5. **Time complexity**: Always O(log n) for search, O(n log n) if validation is O(n)