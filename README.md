# 🚀 DSA TypeScript - Learning Data Structures & Algorithms

> **Comprehensive DSA solutions with detailed explanations in Hinglish**
>
> Following [Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course-sheet-2/) · Powered by Claude AI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Problems Solved](https://img.shields.io/badge/Problems-111-green.svg)](#problems-by-topic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 About This Repository

This repository contains my journey of learning Data Structures and Algorithms using:
- **[Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course-sheet-2/)** for structured problem selection
- **Claude AI** as my learning companion for detailed explanations

### 🎯 What Makes This Different?

Unlike typical DSA repositories with just code, this focuses on **deep understanding**:

```typescript
// ❌ Typical Repository
function solve(nums) {
  return nums.reduce((a, b) => a + b);
}

// ✅ This Repository
/**
 * INTUITION (Soch):
 * ─────────────────
 * Hume array ka sum chahiye. Reduce use karke har element ko
 * add karte jao, final result automatically mil jayega.
 *
 * WHY REDUCE?
 * - Single pass: O(n)
 * - No extra space: O(1)
 * - Clean & readable
 *
 * DRY RUN:
 * nums = [1, 2, 3]
 * Step 1: acc=1, curr=2 → 1+2=3
 * Step 2: acc=3, curr=3 → 3+3=6 ✅
 */
```

---

## ✨ Unique Features

### 1. **Hinglish Explanations** 🇮🇳
Natural mix of Hindi and English - the way we actually think!
```typescript
// Pehle array ko sort karo, phir two pointers use karke...
// WHY? Kyunki sorted array mein duplicates skip karna easy hai
```

### 2. **Multiple Approaches** 📊
Every problem shows the evolution: Brute Force → Better → Optimal
```
problem-name/
├── problem.md          ← All approaches explained
├── brute-force.ts      ← O(n²) - Simple to understand
├── better.ts           ← O(n log n) - Improved
└── optimal.ts          ← O(n) - Best solution
```

### 3. **Visual Dry Runs** 🎨
ASCII art and step-by-step visualizations
```
Before:  [3, 1, 4, 1, 5]
         ↓  ↓  ↓  ↓  ↓
After:   [1, 1, 3, 4, 5] ✅
```

### 4. **Pattern Recognition** 🔍
Common techniques highlighted across problems
- Sliding Window variations
- Two Pointer techniques
- Frequency Counter patterns
- Recursion with backtracking

### 5. **Interview Ready** 💼
- ✅ What to say to interviewer
- ✅ Common follow-up questions
- ✅ Edge cases to mention
- ✅ Time/Space complexity analysis

---

## 📁 Project Structure

```
DSA_Ts/
├── src/
│   └── questions/
│       ├── arrays/              # Array problems (1D & 2D)
│       ├── string/              # String problems
│       ├── linked-list/         # Linked List problems
│       ├── recursion/           # Recursion & Backtracking
│       ├── stack/               # Stack problems
│       ├── queue/               # Queue problems
│       ├── sliding-window/      # Sliding Window patterns
│       └── design/              # Design problems (LRU, LFU)
│
├── .claude/                     # Claude AI configuration
│   └── CLAUDE.md               # Learning patterns & style guide
│
└── README.md                    # You are here!
```

### Problem Structure Template
```
problem-name/
├── problem.md                   # Complete explanation
│   ├── Problem Statement
│   ├── Examples with visuals
│   ├── All Approaches (Brute → Optimal)
│   ├── Complexity Comparison
│   ├── Dry Run
│   ├── Key Insights
│   └── Interview Tips
│
├── brute-force.ts              # Simple approach
├── better.ts                   # Improved approach (if applicable)
├── optimal.ts                  # Best approach
└── ...other-variations.ts      # Alternative solutions
```

---

## 📊 Problems by Topic

### Arrays (30 problems)

#### 1D Array - Easy (10 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Two Sum](src/questions/arrays/1darray/easy/2-sum) | Easy | HashMap |
| 2 | [Binary Search](src/questions/arrays/1darray/easy/binary-search) | Easy | Binary Search |
| 3 | [Buy Sell Stock](src/questions/arrays/1darray/easy/buy-sell-stock) | Easy | Single Pass |
| 4 | [Find Kth Rotation](src/questions/arrays/1darray/easy/find-Kth-rotation) | Easy | Modified Binary Search |
| 5 | [Find Leaders](src/questions/arrays/1darray/easy/find-leaders) | Easy | Reverse Scan |
| 6 | [Lower Bound](src/questions/arrays/1darray/easy/lower-bound) | Easy | Binary Search |
| 7 | [Majority Element](src/questions/arrays/1darray/easy/majority-element) | Easy | Boyer-Moore |
| 8 | [Number of Occurrence](src/questions/arrays/1darray/easy/number-of-occurence) | Easy | Binary Search |
| 9 | [Search Insert](src/questions/arrays/1darray/easy/search-insert) | Easy | Binary Search |
| 10 | [Upper Bound](src/questions/arrays/1darray/easy/upper-bound) | Easy | Binary Search |

#### 1D Array - Medium (16 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [3 Sum](src/questions/arrays/1darray/medium/3-sum) | Medium | Two Pointer |
| 2 | [4 Sum](src/questions/arrays/1darray/medium/4-sum) | Medium | Two Pointer |
| 3 | [Binary Search](src/questions/arrays/1darray/medium/binary-search) | Medium | Binary Search |
| 4 | [Longest Consecutive](src/questions/arrays/1darray/medium/longest-consecutive) | Medium | HashSet |
| 5 | [Longest Equal Subarray](src/questions/arrays/1darray/medium/longest-equal-subarray) | Medium | Sliding Window |
| 6 | [Longest Subarray Sum Zero](src/questions/arrays/1darray/medium/longest-subarray-sum-zero) | Medium | Prefix Sum + HashMap |
| 7 | [Majority Element II](src/questions/arrays/1darray/medium/majority-element-ii) | Medium | Boyer-Moore Extended |
| 8 | [Maximum Subarray](src/questions/arrays/1darray/medium/maximum-subarray) | Medium | Kadane's Algorithm |
| 9 | [Merge Intervals](src/questions/arrays/1darray/medium/merge-intervals) | Medium | Sorting + Merge |
| 10 | [Next Permutation](src/questions/arrays/1darray/medium/next-permutation) | Medium | In-place Swap |
| 11 | [Rearrange Array](src/questions/arrays/1darray/medium/rearrange-array) | Medium | Two Pointer |
| 12 | [Sort Colors](src/questions/arrays/1darray/medium/sort-colors) | Medium | Dutch National Flag |
| 13 | [Subarray Sum Equals K](src/questions/arrays/1darray/medium/subarray-sum-equals-K) | Medium | Prefix Sum + HashMap |

#### 1D Array - Hard (3 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Binary](src/questions/arrays/1darray/hard/binary) | Hard | Binary Manipulation |
| 2 | [Reverse Pairs](src/questions/arrays/1darray/hard/reverse-pairs) | Hard | Merge Sort |
| 3 | [Trapping Rain Water](src/questions/arrays/1darray/hard/trapping-rain-water) | Hard | Two Pointer |

#### 2D Array - Medium (4 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Pascal Triangle](src/questions/arrays/2darray/medium/pascal-triangle) | Medium | Combinatorics |
| 2 | [Rotate Image](src/questions/arrays/2darray/medium/rotate-image) | Medium | Matrix Transpose |
| 3 | [Set Matrix Zero](src/questions/arrays/2darray/medium/set-matrix-zero) | Medium | In-place Marking |
| 4 | [Spiral](src/questions/arrays/2darray/medium/spiral) | Medium | Boundary Simulation |

### String (11 problems)

#### Easy (7 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Largest Odd Number in String](src/questions/string/easy/largest-odd-number-in-string) | Easy | Greedy |
| 2 | [Longest Common Prefix](src/questions/string/easy/longest-common-prefix) | Easy | Vertical Scanning |
| 3 | [Nesting Depth of Parentheses](src/questions/string/easy/nesting-depth-of-parentheses) | Easy | Counter |
| 4 | [Remove Outermost Parenthesis](src/questions/string/easy/remove-outermost-paranthesis) | Easy | Balance Counter |
| 5 | [Roman to Integer](src/questions/string/easy/roman-to-integer) | Easy | HashMap |
| 6 | [Rotate String](src/questions/string/easy/rotate-string) | Easy | String Matching / KMP |
| 7 | [Valid Anagram](src/questions/string/easy/valid-anagram) | Easy | Frequency Counter |

#### Medium (4 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Longest Palindromic Substring](src/questions/string/medium/%20longest-palindromic-substring) | Medium | Expand Around Center |
| 2 | [Reverse Words String](src/questions/string/medium/reverse-words-string) | Medium | Two Pointer |
| 3 | [Sort Characters by Frequency](src/questions/string/medium/sort-characters-by-frequency) | Medium | Bucket Sort |
| 4 | [String to Integer (atoi)](src/questions/string/medium/string-to-integer-(atoi)) | Medium | State Machine |

### Linked List (15 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Middle of Linked List](src/questions/linked-list/easy/middle-of-linked-list) | Easy | Slow-Fast Pointer |
| 2 | [Reverse Linked List](src/questions/linked-list/easy/reverse-linked-list) | Easy | Iterative/Recursive |
| 3 | [Palindrome Linked List](src/questions/linked-list/easy/palindrome-linked-list) | Easy | Two Pointer, Reverse |
| 4 | [Linked List Cycle II](src/questions/linked-list/medium/linked-list-cycle-II) | Medium | Floyd's Cycle Detection |
| 5 | [Odd Even Linked List](src/questions/linked-list/medium/odd-even-linked-list) | Medium | In-place rearrangement |
| 6 | [Remove Nth Node From End](src/questions/linked-list/medium/remove-nth-node-from-end) | Medium | Two Pointer |
| 7 | [Delete Middle Node](src/questions/linked-list/medium/delete-middle-node) | Medium | Slow-Fast Pointer |
| 8 | [Sort List](src/questions/linked-list/medium/sort-list) | Medium | Merge Sort |
| 9 | [Sort 0-1-2 in LL](src/questions/linked-list/medium/sort-012) | Medium | Three Pointer |
| 10 | [Intersection of Two Linked Lists](src/questions/linked-list/medium/intersection-of-two-linked-lists) | Medium | Two Pointer |
| 11 | [Add Two Numbers](src/questions/linked-list/medium/add-two-numbers) | Medium | Simulation |
| 12 | [Rotate List](src/questions/linked-list/medium/rotate-list) | Medium | Two Pass |
| 13 | [Copy List with Random Pointer](src/questions/linked-list/medium/copy-list-with-random-pointer) | Medium | Interweaving |
| 14 | [Flatten Linked List](src/questions/linked-list/medium/flatten-linked-list) | Medium | Merge K Lists |
| 15 | [Reverse Nodes in K Group](src/questions/linked-list/hard/reverse-nodes-in-k-group) | Hard | Recursion + Iteration |

### Recursion & Backtracking (21 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [String to Integer (atoi)](src/questions/recursion/medium/string-to-integer-atoi) | Medium | Recursion |
| 2 | [Pow(x, n)](src/questions/recursion/medium/pow-x-n) | Medium | Binary Exponentiation |
| 3 | [Count Good Numbers](src/questions/recursion/medium/count-good-numbers) | Medium | Fast Exponentiation |
| 4 | [Sort Stack](src/questions/recursion/medium/sort-stack) | Medium | Recursion |
| 5 | [Reverse Stack](src/questions/recursion/medium/reverse-stack) | Medium | Recursion |
| 6 | [Generate Binary Strings](src/questions/recursion/medium/generate-binary-strings) | Medium | Backtracking |
| 7 | [Generate Parentheses](src/questions/recursion/medium/generate-parentheses) | Medium | Backtracking |
| 8 | [Subsets](src/questions/recursion/medium/subsequences/subsets) | Medium | Backtracking |
| 9 | [Count Subsequences Sum K](src/questions/recursion/medium/subsequences/count-subsequences-sum-k) | Medium | Recursion |
| 10 | [Check Subsequence Sum K](src/questions/recursion/medium/subsequences/check-subsequence-sum-k) | Medium | Recursion |
| 11 | [Combination Sum](src/questions/recursion/medium/combination-sum) | Medium | Backtracking |
| 12 | [Combination Sum II](src/questions/recursion/medium/combination-sum-ii) | Medium | Backtracking |
| 13 | [Subsets II](src/questions/recursion/medium/subsets-ii) | Medium | Backtracking |
| 14 | [Letter Combinations](src/questions/recursion/medium/letter-combinations-phone-number) | Medium | Backtracking |
| 15 | [Combination Sum III](src/questions/recursion/medium/combination-sum-iii) | Medium | Backtracking |
| 16 | [Word Search](src/questions/recursion/medium/word-search) | Medium | Backtracking + DFS |
| 17 | [Word Break](src/questions/recursion/medium/word-break) | Medium | Recursion + Memoization |
| 18 | [Palindrome Partitioning](src/questions/recursion/medium/palindrome-partitioning) | Medium | Backtracking |
| 19 | [N-Queens](src/questions/recursion/hard/n-queens) | Hard | Backtracking |
| 20 | [Expression Add Operators](src/questions/recursion/hard/expression-add-operators) | Hard | Backtracking |
| 21 | [Sudoku Solver](src/questions/recursion/hard/sudoku-solver) | Hard | Backtracking |

### Stack & Queue (20 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Implement Stack Using Array](src/questions/stack/easy/implement-stack-using-array) | Easy | Array Implementation |
| 2 | [Implement Queue Using Array](src/questions/queue/easy/implement-queue-using-array) | Easy | Array Implementation |
| 3 | [Implement Stack Using Queues](src/questions/stack/easy/implement-stack-using-queues) | Easy | Queue Implementation |
| 4 | [Min Stack](src/questions/stack/medium/min-stack) | Medium | Stack + Min Tracking |
| 5 | [Infix to Postfix](src/questions/stack/medium/infix-to-postfix) | Medium | Expression Conversion |
| 6 | [Prefix to Infix](src/questions/stack/medium/prefix-to-infix) | Medium | Expression Conversion |
| 7 | [Prefix to Postfix](src/questions/stack/medium/prefix-to-postfix) | Medium | Expression Conversion |
| 8 | [Postfix to Prefix](src/questions/stack/medium/postfix-to-prefix) | Medium | Expression Conversion |
| 9 | [Next Greater Element](src/questions/stack/medium/next-greater-element) | Medium | Monotonic Stack |
| 10 | [Next Greater Element II](src/questions/stack/medium/next-greater-element-ii) | Medium | Circular Array |
| 11 | [Next Smaller Element](src/questions/stack/medium/next-smaller-element) | Medium | Monotonic Stack |
| 12 | [Asteroid Collision](src/questions/stack/medium/asteroid-collision) | Medium | Stack Simulation |
| 13 | [Sum of Subarray Minimums](src/questions/stack/medium/sum-of-subarray-minimums) | Medium | Monotonic Stack |
| 14 | [Sum of Subarray Ranges](src/questions/stack/medium/sum-of-subarray-ranges) | Medium | Monotonic Stack |
| 15 | [Remove K Digits](src/questions/stack/medium/remove-k-digits) | Medium | Greedy + Stack |
| 16 | [Stock Span Problem](src/questions/stack/medium/stock-span-problem) | Medium | Monotonic Stack |
| 17 | [Celebrity Problem](src/questions/stack/medium/celebrity-problem) | Medium | Stack/Two Pointer |
| 18 | [Largest Rectangle in Histogram](src/questions/stack/hard/largest-rectangle-in-histogram) | Hard | Monotonic Stack |
| 19 | [Maximal Rectangle](src/questions/stack/hard/maximal-rectangle) | Hard | Histogram Technique |
| 20 | [Sliding Window Maximum](src/questions/stack/hard/sliding-window-maximum) | Hard | Deque/Monotonic Queue |

### Sliding Window (12 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [Longest Substring Without Repeating](src/questions/sliding-window/medium/longest-substring-without-repeating) | Medium | Variable Size Window |
| 2 | [Max Consecutive Ones III](src/questions/sliding-window/medium/max-consecutive-ones-iii) | Medium | At Most K Zeros |
| 3 | [Fruit Into Baskets](src/questions/sliding-window/medium/fruit-into-baskets) | Medium | At Most 2 Distinct |
| 4 | [Longest Repeating Character Replacement](src/questions/sliding-window/medium/longest-repeating-character-replacement) | Medium | At Most K Replacements |
| 5 | [Binary Subarrays With Sum](src/questions/sliding-window/medium/binary-subarrays-with-sum) | Medium | AtMost(K) - AtMost(K-1) |
| 6 | [Count Nice Subarrays](src/questions/sliding-window/medium/count-nice-subarrays) | Medium | AtMost(K) - AtMost(K-1) |
| 7 | [Number of Substrings Containing All Three](src/questions/sliding-window/medium/number-of-substrings-containing-all-three) | Medium | Count Valid Windows |
| 8 | [Maximum Points from Cards](src/questions/sliding-window/medium/maximum-points-from-cards) | Medium | Reverse Thinking |
| 9 | [Longest Substring with At Most K Distinct](src/questions/sliding-window/medium/longest-substring-with-at-most-k-distinct) | Medium | Variable Size Window |
| 10 | [Subarrays with K Different Integers](src/questions/sliding-window/hard/subarrays-with-k-different-integers) | Hard | AtMost(K) - AtMost(K-1) |
| 11 | [Minimum Window Substring](src/questions/sliding-window/hard/minimum-window-substring) | Hard | Expand-Shrink Pattern |
| 12 | [Minimum Window Subsequence](src/questions/sliding-window/hard/minimum-window-subsequence) | Hard | Forward-Backward |

### Design (2 problems)
| # | Problem | Difficulty | Key Pattern |
|---|---------|-----------|-------------|
| 1 | [LRU Cache](src/questions/design/medium/lru-cache) | Medium | HashMap + Doubly LL |
| 2 | [LFU Cache](src/questions/design/hard/lfu-cache) | Hard | HashMap + Min Heap |

---

## 🔑 Key Patterns Covered

### 1. Sliding Window
```
┌────────────────────────────────────────────────────────────┐
│  Two Types:                                                │
│  • Fixed Size: Window size = k                             │
│  • Variable Size: Expand/Shrink based on condition        │
│                                                            │
│  Classic Trick:                                            │
│  exactly(K) = atMost(K) - atMost(K-1)                     │
│                                                            │
│  Example: "Subarrays with exactly K distinct integers"    │
└────────────────────────────────────────────────────────────┘
```

### 2. Two Pointers
```
┌────────────────────────────────────────────────────────────┐
│  Variations:                                               │
│  • Same Direction (slow/fast)                              │
│  • Opposite Direction (left/right)                         │
│  • Forward-Backward (minimize window)                      │
│                                                            │
│  Floyd's Cycle Detection:                                  │
│  slow moves 1 step, fast moves 2 steps                    │
└────────────────────────────────────────────────────────────┘
```

### 3. Frequency Counter / HashMap
```
┌────────────────────────────────────────────────────────────┐
│  Use Cases:                                                │
│  • Count distinct elements                                 │
│  • Track character frequencies                             │
│  • "Formed" counter for O(1) validity check               │
│                                                            │
│  CRITICAL: Delete when count = 0 if using map.size!       │
└────────────────────────────────────────────────────────────┘
```

### 4. Monotonic Stack/Queue
```
┌────────────────────────────────────────────────────────────┐
│  Maintains elements in increasing/decreasing order         │
│                                                            │
│  Applications:                                             │
│  • Next Greater/Smaller Element                            │
│  • Largest Rectangle in Histogram                          │
│  • Sliding Window Maximum                                  │
└────────────────────────────────────────────────────────────┘
```

### 5. Backtracking
```
┌────────────────────────────────────────────────────────────┐
│  Decision Tree Exploration:                                │
│  1. Choose                                                 │
│  2. Explore                                                │
│  3. Unchoose (backtrack)                                   │
│                                                            │
│  Examples: N-Queens, Sudoku Solver, Subsets               │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation
```bash
# Clone the repository
git clone https://github.com/Kkknight-12/DSA-TS.git
cd DSA-TS

# Install dependencies
npm install
```

### Running Solutions
```bash
# Run a specific solution
npx ts-node src/questions/sliding-window/hard/minimum-window-substring/optimal.ts

# Build the project
npm run build

# Watch TypeScript files and compile
npm run ts
```

---

## 💡 How to Use This Repository

### For Learning
1. **Read problem.md first** - Understand all approaches
2. **Try brute force yourself** - Don't jump to optimal
3. **Study the dry run** - Visualize step-by-step
4. **Read the code** - Detailed comments explain WHY
5. **Run tests** - Verify your understanding

### For Interview Prep
1. **Focus on patterns** - Same techniques across problems
2. **Practice the "what to say"** - Interview tips included
3. **Understand time/space tradeoffs** - Not just complexity
4. **Remember edge cases** - Listed in each solution
5. **Practice multiple approaches** - Interviewers may ask for optimizations

### Code Style
Every solution follows this pattern:
```typescript
namespace ProblemNameApproach {
  /**
   * Main function with detailed JSDoc
   */
  function solve(params): ReturnType {
    // Edge Case: [what]
    // WHY: [why]

    // Step 1: [what this does]
    // WHY: [why needed]
    // EXAMPLE: [concrete example]

    // ...detailed implementation
  }

  /**
   * DRY RUN - COMPLETE VISUALIZATION
   * [Step-by-step walkthrough]
   */

  // Test cases
  export function runTests(): void {
    // 7-10 comprehensive test cases
  }
}
```

---

## 🎓 Learning Path (Recommended Order)

### Phase 1: Foundations
1. **Arrays** - Basic operations
2. **Sliding Window** - Start with easy problems
3. **Two Pointers** - Build intuition

### Phase 2: Core Data Structures
4. **Linked List** - Pointer manipulation
5. **Stack & Queue** - LIFO/FIFO patterns
6. **Recursion** - Build recursive thinking

### Phase 3: Advanced Topics
7. **Backtracking** - Decision trees
8. **Design** - System design patterns
9. **Hard Problems** - Combine multiple patterns

---

## 📚 Resources

### Primary Resources
- **[Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course-sheet-2/)** - Problem selection & roadmap
- **[Claude AI](https://claude.ai)** - Learning companion for detailed explanations

### Supplementary
- [TakeUForward YouTube Channel](https://www.youtube.com/@takeUforward)
- [LeetCode](https://leetcode.com)
- [NeetCode Roadmap](https://neetcode.io/roadmap)

---

## 🤝 Contributing

While this is primarily a personal learning repository, suggestions are welcome!

**To suggest improvements:**
1. Open an issue describing the suggestion
2. For new problems, ensure they follow the established pattern:
   - problem.md with all approaches
   - Multiple TypeScript implementations
   - Detailed dry runs in comments
   - Hinglish explanations
   - Comprehensive test cases

---

## 📊 Progress Stats

```
Total Problems Solved: 111
├── Easy:    23
├── Medium:  75
└── Hard:    13

By Topic:
├── Arrays:              30 problems
├── Recursion:           21 problems
├── Stack & Queue:       20 problems
├── Linked List:         15 problems
├── Sliding Window:      12 problems
├── String:              11 problems
└── Design:               2 problems
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Raj Vikramaditya (Striver)](https://takeuforward.org/)** for the excellent A2Z DSA sheet
- **[Claude AI by Anthropic](https://claude.ai)** for being an amazing learning companion
- The **open-source community** for inspiration and resources

---

## 📧 Contact

**Knight** - [@Kkknight-12](https://github.com/Kkknight-12)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using TypeScript, Striver's A2Z Sheet, and Claude AI

</div>