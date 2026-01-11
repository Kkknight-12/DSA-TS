// Understanding Insertion Position - A Beginner's Guide

/*
What is an Insertion Position?
-------------------------------
The insertion position is WHERE you would place a new element in a sorted array
to keep it sorted.

Think of it like standing in a line sorted by height:
- You need to find WHERE to stand so everyone stays in order
*/

// Example 1: Simple insertion position
const sortedArray = [1, 3, 5, 7, 9];

/*
Where would we insert 4?
- 4 is bigger than 3 but smaller than 5
- So 4 should go BETWEEN 3 and 5
- That's at index 2 (where 5 currently is)
- After insertion: [1, 3, 4, 5, 7, 9]
*/

// Example 2: Visual representation
function findInsertionPosition(arr: number[], target: number): number {
    console.log(`Array: [${arr}]`);
    console.log(`Finding where to insert: ${target}`);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= target) {
            console.log(`→ First element >= ${target} is ${arr[i]} at index ${i}`);
            console.log(`→ So insert ${target} at index ${i}`);
            return i;
        }
    }

    // If we reach here, target is larger than all elements
    console.log(`→ ${target} is larger than all elements`);
    console.log(`→ So insert at the end (index ${arr.length})`);
    return arr.length;
}

// Test different scenarios
console.log("=== Example 1: Insert in middle ===");
findInsertionPosition([1, 3, 5, 7, 9], 4);
// Insertion position: 2
// Before: [1, 3, 5, 7, 9]
// After:  [1, 3, 4, 5, 7, 9]

console.log("\n=== Example 2: Insert at beginning ===");
findInsertionPosition([2, 4, 6, 8], 1);
// Insertion position: 0
// Before: [2, 4, 6, 8]
// After:  [1, 2, 4, 6, 8]

console.log("\n=== Example 3: Insert at end ===");
findInsertionPosition([1, 2, 3, 4], 5);
// Insertion position: 4
// Before: [1, 2, 3, 4]
// After:  [1, 2, 3, 4, 5]

console.log("\n=== Example 4: Element already exists ===");
findInsertionPosition([1, 3, 5, 7, 9], 5);
// Insertion position: 2 (where 5 currently is)
// This would replace or go before the existing 5

/*
Real-World Analogy: Library Bookshelf
--------------------------------------
Imagine books arranged by page number:
[100 pages] [200 pages] [300 pages] [500 pages]

Where would you place a 250-page book?
- It goes AFTER the 200-page book
- But BEFORE the 300-page book
- So insertion position is index 2 (where 300-page book is)
*/

// Binary Search for Insertion Position
function binarySearchInsertPosition(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    console.log(`\nSearching for insertion position of ${target} in [${arr}]`);

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        console.log(`  Checking: left=${left}, right=${right}, mid=${mid}`);

        if (arr[mid] < target) {
            left = mid + 1;
            console.log(`    ${arr[mid]} < ${target}, move left to ${left}`);
        } else {
            right = mid;
            console.log(`    ${arr[mid]} >= ${target}, move right to ${mid}`);
        }
    }

    console.log(`  Final position: ${left}`);

    // Special case: if target is larger than all elements
    if (left === arr.length - 1 && arr[left] < target) {
        console.log(`  ${target} is larger than all elements, insert at end`);
        return left + 1;
    }

    return left;
}

// Test binary search
console.log("\n=== Binary Search Examples ===");
binarySearchInsertPosition([1, 3, 5, 7, 9], 4);
binarySearchInsertPosition([1, 3, 5, 7, 9], 6);
binarySearchInsertPosition([1, 3, 5, 7, 9], 0);

/*
Why is Insertion Position Important?
-------------------------------------
1. Maintaining sorted order when adding elements
2. Finding where an element WOULD be if it existed
3. Used in many algorithms (binary search variants, merge operations)
4. Helps in problems like:
   - Search Insert Position (LeetCode 35)
   - First Bad Version
   - Finding floor/ceiling of a value
*/

// Practical example: Maintaining a sorted list
class SortedList {
    private items: number[] = [];

    insert(value: number): void {
        const position = this.findInsertPosition(value);
        this.items.splice(position, 0, value);
        console.log(`Inserted ${value} at position ${position}: [${this.items}]`);
    }

    private findInsertPosition(value: number): number {
        let left = 0;
        let right = this.items.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (this.items[mid] < value) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }
}

// Demo
console.log("\n=== Building a sorted list ===");
const list = new SortedList();
list.insert(5);
list.insert(2);
list.insert(8);
list.insert(3);
list.insert(6);