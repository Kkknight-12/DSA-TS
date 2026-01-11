# Next Greater Element II (Circular Array)

[explanation](https://gemini.google.com/gem/9013c4cd97d5/aa6ae9ce46b57899)

[visualise](https://gemini.google.com/gem/9013c4cd97d5/15a038c858a98c43)

## Problem Statement
Given a circular integer array `arr`, return the next greater element for every element in `arr`.
The next greater element for an element `x` is the first element greater than `x` that we come across while traversing the array in a clockwise manner. If it doesn't exist, return -1.

**Example 1:**
```
Input: arr = [3, 10, 4, 2, 1, 2, 6, 1, 7, 2, 9]
Output: [10, -1, 6, 6, 2, 6, 7, 7, 9, 9, 10]
```

**Example 2:**
```
Input: arr = [5, 7, 1, 7, 6, 0]
Output: [7, -1, 7, -1, 7, 5]
```

---

## Approaches

### 1. Brute Force (Nested Loops with Modulo)
**Concept:**
Simple logic hai. Har element ke liye, uske aage wale elements ko check karo. Kyunki array circular hai, agar hum end tak pahunch gaye aur bada element nahi mila, toh hum wapas start se check karenge (up to current index).

**Steps:**
1. Ek result array banao, initially sab `-1`.
2. Outer loop `i` chalega `0` se `n-1` tak.
3. Inner loop `j` chalega `1` se `n-1` tak (ye represent karta hai distance from `i`).
4. Actual index check karne ke liye modulus operator use karenge: `index = (i + j) % n`.
5. Agar `arr[index] > arr[i]`, toh mil gaya Next Greater Element. Store karo aur inner loop break kardo.

**Time Complexity:** O(N^2) - Worst case mein har element ke liye pura array traverse karna padega.
**Space Complexity:** O(1) - Sirf result array use ho raha hai.

### 2. Optimal Approach (Monotonic Stack - Forward Iteration)
**Concept:**
Hum Stack ka use karke isko O(N) mein solve kar sakte hain using **Forward Iteration**.
Is approach mein hum Stack mein **indices** store karte hain, values nahi.
Iska main idea hai: "Waiting List".

**Logic (Hinglish):**
- Stack un elements ke indices ko hold karta hai jinka "Next Greater Element" abhi tak nahi mila.
- Jab hum naye element `arr[i]` par aate hain, hum check karte hain: "Kya ye naya element stack ke top wale elements se bada hai?"
- Agar bada hai, toh iska matlab `arr[i]` hi un stack wale elements ka NGE hai. Hum unhe pop karke answer update kar dete hain.
- Agar chota hai, toh iska matlab abhi `arr[i]` bhi "waiting list" (stack) mein jayega taaki future mein koi isse bada mile.

**Circular Property:**
- Array circular hai, isliye ho sakta hai last element ka NGE first element ho.
- Isliye hum loop ko `2 * n` baar chalate hain (array ko imaginary double karke).
- Lekin stack mein `push` hum sirf `i < n` (first pass) mein karte hain, kyunki humein sirf original elements ke liye answer chahiye. Second pass (`n` to `2n-1`) sirf stack mein bache hue elements ka answer resolve karne ke liye hota hai.

**Steps:**
1. Result array `ans` ko `-1` se initialize karo.
2. Ek empty Stack banao jo indices store karega.
3. Loop `i` from `0` to `2*n - 1`.
4. Current index `idx = i % n`.
5. While `stack` is not empty AND `arr[idx] > arr[stack.top()]`:
   - `prevIndex = stack.pop()`
   - `ans[prevIndex] = arr[idx]` (Current element hi pichle element ka NGE hai).
6. Agar `i < n` hai, toh `stack.push(i)`.

**Time Complexity:** O(N) - Har element max 1 baar push aur 1 baar pop hoga.
**Space Complexity:** O(N) - Stack ke liye.

---

## Select Approach
Kaunsa approach implement karna hai?
1. **Brute Force** (Simple but slow)
2. **Optimal** (Stack based, efficient)