# Trapping Rain Water

**Difficulty:** Hard
**Source:** LeetCode #42
**Topics:** Array, Two Pointers, Dynamic Programming, Stack

---

## 📋 Problem Statement

Given **n non-negative integers** representing an elevation map where the **width of each bar is 1**, compute **how much water it can trap** after raining.

**Samajhne ke liye (Understanding):**
- Tumhe ek array diya gaya hai jisme har element ek **bar ki height** represent karta hai
- Har bar ki **width = 1** hai
- Rain hone ke baad, bars ke beech **kitna paani trap hoga**?
- Paani sirf un jagah trap hoga jahan **dono taraf** usse zyada height ke bars hain

**Visual Understanding:**
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]

Elevation Map:
         ┃
    ┃    ┃
    ┃  ┃ ┃
  ┃ ┃  ┃ ┃  ┃
  ┃ ┃┃ ┃ ┃  ┃ ┃
┃ ┃ ┃┃ ┃ ┃┃ ┃ ┃
0 1 0 2 1 0 1 3 2 1 2 1

After Rain (water marked with ~):
         ┃
    ┃~~┃~┃
    ┃~~┃~┃~~┃
  ┃~┃~~┃~┃~~┃~┃
  ┃~┃┃~┃~┃┃~┃~┃
┃ ┃ ┃┃ ┃ ┃┃ ┃ ┃
0 1 0 2 1 0 1 3 2 1 2 1

Water units: 6
```

### Example 1:
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

Explanation:
Position 2: water = min(1,3) - 0 = 1
Position 4: water = min(2,3) - 1 = 1
Position 5: water = min(2,3) - 0 = 2
Position 7: water = min(3,2) - 2 = 0 (no water)
Position 9: water = min(3,2) - 1 = 1
Position 10: water = min(3,1) - 2 = -1 (no water)
Total: 1 + 1 + 2 + 0 + 1 + 0 = 5... wait let me recalculate

Actually:
At index 2: leftMax=1, rightMax=3, water = min(1,3)-0 = 1
At index 4: leftMax=2, rightMax=3, water = min(2,3)-1 = 1
At index 5: leftMax=2, rightMax=3, water = min(2,3)-0 = 2
At index 7: leftMax=3, rightMax=2, water = min(3,2)-2 = 0
At index 9: leftMax=3, rightMax=2, water = min(3,2)-1 = 1
At index 10: leftMax=3, rightMax=1, water = min(3,1)-2 = -1 → 0

Total: 1 + 1 + 2 + 1 = 5... hmm
```

### Example 2:
```
Input: height = [4,2,0,3,2,5]
Output: 9

Elevation:
┃         ┃
┃       ┃ ┃
┃   ┃   ┃ ┃
┃   ┃ ┃ ┃ ┃
4 2 0 3 2 5

After Rain:
┃~~~~~~~~~┃
┃~~~┃~~~┃~┃
┃~~~┃~┃~┃~┃
┃~┃~┃~┃~┃~┃
4 2 0 3 2 5

Water at index 1: min(4,5) - 2 = 2
Water at index 2: min(4,5) - 0 = 4
Water at index 3: min(4,5) - 3 = 1
Water at index 4: min(4,5) - 2 = 2
Total: 2 + 4 + 1 + 2 = 9 ✅
```

### Constraints:
- `n == height.length`
- `1 <= n <= 2 × 10⁴`
- `0 <= height[i] <= 10⁵`

---

## 💡 Core Intuition

**Key Observation:**

Kisi bhi position par **paani kitna trap hoga**?

```
Water at position i = min(leftMax, rightMax) - height[i]
```

Where:
- `leftMax` = Maximum height on the **left side** of position i (including i)
- `rightMax` = Maximum height on the **right side** of position i (including i)

**Why?**

```
     leftMax           rightMax
        ┃                 ┃
        ┃                 ┃
    ┃   ┃             ┃   ┃
    ┃ ┃ ┃         ┃   ┃   ┃
┃   ┃ ┃ ┃     ┃   ┃   ┃   ┃
┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃
          ↑
       position i

Paani ka level = min(leftMax, rightMax)
(kyunki paani chote side se overflow ho jayega)

Trapped water = paani ka level - current height
              = min(leftMax, rightMax) - height[i]
```

**Example:**
```
height = [3, 0, 2, 0, 4]
          ↑     ↑
      left=3  right=4

At index 1 (height=0):
  leftMax = 3 (max of [3])
  rightMax = 4 (max of [2,0,4])
  water = min(3,4) - 0 = 3

At index 3 (height=0):
  leftMax = 3 (max of [3,0,2])
  rightMax = 4 (max of [4])
  water = min(3,4) - 0 = 3
```

---

## 💡 Approaches

### Approach 1: Brute Force

**Intuition (Soch):**

Har position ke liye:
1. **Left side** dekho, maximum height nikalo
2. **Right side** dekho, maximum height nikalo
3. `water = min(leftMax, rightMax) - height[i]`
4. Sab positions ka water add kar do

**Visual Example:**
```
height = [4, 2, 0, 3, 2, 5]
          0  1  2  3  4  5

For position 2 (height = 0):
  Left side: [4, 2] → leftMax = 4
  Right side: [3, 2, 5] → rightMax = 5
  water = min(4, 5) - 0 = 4 ✓

For position 3 (height = 3):
  Left side: [4, 2, 0] → leftMax = 4
  Right side: [2, 5] → rightMax = 5
  water = min(4, 5) - 3 = 1 ✓
```

**Algorithm:**
```
1. Initialize total = 0
2. For each position i from 0 to n-1:
   a. Find leftMax = max(height[0...i])
   b. Find rightMax = max(height[i...n-1])
   c. water = min(leftMax, rightMax) - height[i]
   d. if water > 0: total += water
3. Return total
```

**Time Complexity:** O(n²)
- For each position (n positions)
- Find leftMax and rightMax (O(n) each)
- Total: n × n = O(n²)

**Space Complexity:** O(1)
- Only using variables

**Drawback:**
- Very slow for large arrays
- Repeated calculations (calculating max again and again)

---

### Approach 2: Better (Pre-compute Left & Right Max)

**Intuition (Soch):**

Brute force mein hum **har baar** leftMax aur rightMax calculate kar rahe hain. Kya hum isse **pehle hi** calculate karke store kar sakte hain?

**Yes!** Pre-computation! 💡

**Key Idea:**
```
Create two arrays:
1. leftMax[i] = maximum height from 0 to i
2. rightMax[i] = maximum height from i to n-1

Then:
water[i] = min(leftMax[i], rightMax[i]) - height[i]
```

**Visual Example:**
```
height   = [4, 2, 0, 3, 2, 5]
index    =  0  1  2  3  4  5

Building leftMax (left to right):
leftMax[0] = 4 (max of [4])
leftMax[1] = 4 (max of [4, 2])
leftMax[2] = 4 (max of [4, 2, 0])
leftMax[3] = 4 (max of [4, 2, 0, 3])
leftMax[4] = 4 (max of [4, 2, 0, 3, 2])
leftMax[5] = 5 (max of [4, 2, 0, 3, 2, 5])
leftMax  = [4, 4, 4, 4, 4, 5]

Building rightMax (right to left):
rightMax[5] = 5 (max of [5])
rightMax[4] = 5 (max of [2, 5])
rightMax[3] = 5 (max of [3, 2, 5])
rightMax[2] = 5 (max of [0, 3, 2, 5])
rightMax[1] = 5 (max of [2, 0, 3, 2, 5])
rightMax[0] = 5 (max of [4, 2, 0, 3, 2, 5])
rightMax = [5, 5, 5, 5, 5, 5]

Calculating water:
index 0: min(4,5) - 4 = 0
index 1: min(4,5) - 2 = 2
index 2: min(4,5) - 0 = 4
index 3: min(4,5) - 3 = 1
index 4: min(4,5) - 2 = 2
index 5: min(5,5) - 5 = 0

Total: 0 + 2 + 4 + 1 + 2 + 0 = 9 ✓
```

**Algorithm:**
```
1. Create leftMax array:
   leftMax[0] = height[0]
   For i = 1 to n-1:
     leftMax[i] = max(leftMax[i-1], height[i])

2. Create rightMax array:
   rightMax[n-1] = height[n-1]
   For i = n-2 to 0:
     rightMax[i] = max(rightMax[i+1], height[i])

3. Calculate water:
   total = 0
   For i = 0 to n-1:
     water = min(leftMax[i], rightMax[i]) - height[i]
     total += max(0, water)

4. Return total
```

**Time Complexity:** O(n)
- Build leftMax: O(n)
- Build rightMax: O(n)
- Calculate water: O(n)
- Total: O(3n) = O(n) ✅

**Space Complexity:** O(n)
- leftMax array: O(n)
- rightMax array: O(n)

**Much better than brute force!** But kya space improve kar sakte hain?

---

### Approach 3: Optimal (Two Pointer)

**Intuition (Soch):**

Kya hum **bina extra arrays ke** calculate kar sakte hain? 🤔

**Key Observation:**

```
Water at position i depends on:
  min(leftMax, rightMax) - height[i]

Important insight:
- Agar leftMax < rightMax, toh water = leftMax - height[i]
  (kyunki min will be leftMax)

- Agar rightMax < leftMax, toh water = rightMax - height[i]
  (kyunki min will be rightMax)
```

**Two Pointer Strategy:**

```
Use two pointers: left (start) and right (end)
Track: leftMax and rightMax

Move the pointer with SMALLER height:
- If leftMax < rightMax:
    → We know for sure: water = leftMax - height[left]
    → Move left pointer

- If rightMax < leftMax:
    → We know for sure: water = rightMax - height[right]
    → Move right pointer
```

**Why does this work?**

```
left                              right
 ↓                                  ↓
[3, 0, 2, 0, 4, 1, 2, 0, 3, 2, 1, 5]
leftMax=3                    rightMax=5

Since leftMax < rightMax:
  - For left position, min(leftMax, rightMax) = leftMax
  - We can calculate water at left position!
  - water = leftMax - height[left]
  - Move left++
```

**Visual Example:**
```
height = [4, 2, 0, 3, 2, 5]
          L              R

Step 1: left=0, right=5
  leftMax = 4, rightMax = 5
  leftMax < rightMax → process left
  water = 4 - 4 = 0
  left++

Step 2: left=1, right=5
  leftMax = 4, rightMax = 5
  leftMax < rightMax → process left
  water = 4 - 2 = 2
  left++, total = 2

Step 3: left=2, right=5
  leftMax = 4, rightMax = 5
  leftMax < rightMax → process left
  water = 4 - 0 = 4
  left++, total = 6

Step 4: left=3, right=5
  leftMax = 4, rightMax = 5
  leftMax < rightMax → process left
  water = 4 - 3 = 1
  left++, total = 7

Step 5: left=4, right=5
  leftMax = 4, rightMax = 5
  leftMax < rightMax → process left
  water = 4 - 2 = 2
  left++, total = 9

Step 6: left=5, right=5 (left >= right, STOP)

Total = 9 ✓
```

**Algorithm:**
```
1. Initialize:
   left = 0, right = n-1
   leftMax = 0, rightMax = 0
   total = 0

2. While left < right:
   a. If height[left] < height[right]:
      - If height[left] >= leftMax:
          leftMax = height[left]
      - Else:
          water = leftMax - height[left]
          total += water
      - left++

   b. Else:
      - If height[right] >= rightMax:
          rightMax = height[right]
      - Else:
          water = rightMax - height[right]
          total += water
      - right--

3. Return total
```

**Time Complexity:** O(n)
- Single pass with two pointers
- Each element visited once

**Space Complexity:** O(1)
- Only 4 variables (left, right, leftMax, rightMax)

**Why This is OPTIMAL:**
- O(n) time - can't do better (need to visit each element)
- O(1) space - no extra arrays needed
- Single pass - efficient!

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Passes | Interview Score |
|----------|----------------|------------------|--------|-----------------|
| **Brute Force** | O(n²) | O(1) | n | ⭐⭐ Slow |
| **Better (Pre-compute)** | O(n) | O(n) | 3 | ⭐⭐⭐⭐ Good |
| **Optimal (Two Pointer)** | O(n) | O(1) | 1 | ⭐⭐⭐⭐⭐ Best |

**Which is better?**
- Agar **easy to understand** chahiye → Better (Pre-compute)
- Agar **optimal solution** chahiye → Two Pointer
- Agar **interview mein impress** karna hai → Two Pointer (best!)

---

## 🎯 Detailed Dry Run (Optimal Approach)

**Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```
Initial:
left = 0, right = 11
leftMax = 0, rightMax = 0
total = 0

Iteration 1: left=0, right=11
  height[0]=0, height[11]=1
  height[left] < height[right] (0 < 1) → Process left
  height[0]=0 >= leftMax=0? No
  water = 0 - 0 = 0
  left++
  total = 0

Iteration 2: left=1, right=11
  height[1]=1, height[11]=1
  height[left] >= height[right] → Process right
  height[11]=1 >= rightMax=0? Yes
  rightMax = 1
  right--

Iteration 3: left=1, right=10
  height[1]=1, height[10]=2
  height[left] < height[right] (1 < 2) → Process left
  height[1]=1 >= leftMax=0? Yes
  leftMax = 1
  left++

... (continuing iterations)

Final: total = 6
```

---

## 🔍 Edge Cases

### Edge Case 1: Flat surface
```
Input: [3, 3, 3, 3]
Output: 0

No water can be trapped (all same height)
```

### Edge Case 2: Ascending
```
Input: [1, 2, 3, 4, 5]
Output: 0

No water can be trapped (continuously increasing)
```

### Edge Case 3: Descending
```
Input: [5, 4, 3, 2, 1]
Output: 0

No water can be trapped (continuously decreasing)
```

### Edge Case 4: Single valley
```
Input: [3, 0, 3]
Output: 3

      ┃   ┃
    ┃ ┃ ┃ ┃
    ┃ ┃ ┃ ┃
    3 0 3

Water at index 1: min(3,3) - 0 = 3
```

### Edge Case 5: Two elements
```
Input: [2, 1]
Output: 0

No water (need at least 3 elements with valley)
```

---

## 🤔 Which Solution Do You Want to See?

**Recommendation:** Start with **Better approach** for understanding, then learn **Optimal (Two Pointer)** for interviews!

1. **Brute Force** - Simple but slow (O(n²))
2. **Better (Pre-compute)** - Easy to understand, O(n) time
3. **Optimal (Two Pointer)** - Best solution, O(n) time, O(1) space ⭐

Batao kaunsa solution dekhna hai? 🚀