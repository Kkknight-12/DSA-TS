# Next Smaller Element (NSE)

## Problem Statement
Given an integer array `arr`, return the **Next Smaller Element** for every element in `arr`.
The Next Smaller Element for an element `x` is the first element to the **right** of `x` that is **smaller** than `x`.
If no such element exists, return -1.

**Example 1:**
```
Input: arr = [4, 8, 5, 2, 25]
Output: [2, 5, 2, -1, -1]
Explanation:
- 4 -> 2 (Found at index 3)
- 8 -> 5 (Found at index 2)
- 5 -> 2 (Found at index 3)
- 2 -> -1 (No smaller element to right)
- 25 -> -1 (Last element, no right neighbor)
```

**Example 2:**
```
Input: arr = [10, 9, 8, 7]
Output: [9, 8, 7, -1]
```

---

## Approaches

### 1. Brute Force (Nested Loops)
**Concept:**
Har element `i` ke liye, uske right side (`i+1` to `end`) traverse karo.
Pehla element jo `arr[j] < arr[i]` ho, wo answer hai.

**Complexity:**
- Time: O(N^2)
- Space: O(1)

### 2. Optimal Approach (Monotonic Increasing Stack)
**Concept:**
Hum O(N) mein solve karenge using Stack.
Hum wahi "Forward Traversal + Waiting List" logic use karenge jo NGE mein kiya tha, bas condition reverse hogi.

**Logic (Hinglish):**
- **Goal:** Har element ke liye *first smaller* value dhundni hai.
- **Stack:** Indices store karega un elements ke jo abhi tak apna "Next Smaller" dhund rahe hain.
- **Condition:**
  - Jab hum naye element `arr[i]` par aate hain, check karo:
  - "Kya `arr[i]` stack ke top wale element se **chota** hai?" (`arr[i] < arr[top]`)
  - **Haan (Chota hai):** Iska matlab `arr[i]` hi wo chota number hai jiska intezaar stack top kar raha tha. Pop karo aur answer update karo.
  - **Stack Order:** Ye process ensure karta hai ki stack hamesha **Increasing Order** (values wise) maintain karega.

**Example Logic:** `[4, 8, 5]`
1. Push `4`. Stack: `[4]`
2. `8` is NOT smaller than `4`. Push `8`. Stack: `[4, 8]` (Increasing)
3. `5` is smaller than `8`. Pop `8` (Ans for 8 is 5). Stack: `[4]`.
4. `5` is NOT smaller than `4`. Push `5`. Stack: `[4, 5]` (Increasing).

**Complexity:**
- Time: O(N)
- Space: O(N)

---

## Select Approach
1. **Brute Force**
2. **Optimal** (Monotonic Increasing Stack - Forward Iteration)
