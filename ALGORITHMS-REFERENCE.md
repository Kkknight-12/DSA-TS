# Complete DSA Algorithms Reference

A comprehensive list of all important algorithms and techniques. Use this as a roadmap for learning and problem-solving.

---

## Table of Contents

1. [Searching Algorithms](#searching-algorithms)
2. [Sorting Algorithms](#sorting-algorithms)
3. [Array & String Algorithms](#array--string-algorithms)
4. [Linked List Algorithms](#linked-list-algorithms)
5. [Stack & Queue Algorithms](#stack--queue-algorithms)
6. [Tree Algorithms](#tree-algorithms)
7. [Graph Algorithms](#graph-algorithms)
8. [Dynamic Programming Patterns](#dynamic-programming-patterns)
9. [Greedy Algorithms](#greedy-algorithms)
10. [Backtracking Patterns](#backtracking-patterns)
11. [Divide and Conquer](#divide-and-conquer)
12. [Two Pointer Techniques](#two-pointer-techniques)
13. [Sliding Window](#sliding-window)
14. [Bit Manipulation](#bit-manipulation)
15. [Mathematical Algorithms](#mathematical-algorithms)
16. [Cache & Memory Algorithms](#cache--memory-algorithms)
17. [Advanced String Algorithms](#advanced-string-algorithms)

---

## Searching Algorithms

### 1. Linear Search
- **Approach**: Sequential search through each element
- **Time**: O(n) | **Space**: O(1)
- **Best For**: Unsorted arrays, small datasets

### 2. Binary Search
- **Approach**: Divide sorted array in half repeatedly
- **Time**: O(log n) | **Space**: O(1) iterative, O(log n) recursive
- **Best For**: Sorted arrays
- **Variants**: Lower bound, Upper bound, First/Last occurrence

### 3. Jump Search
- **Approach**: Jump by √n blocks, then linear search
- **Time**: O(√n) | **Space**: O(1)
- **Best For**: Sorted arrays of medium size

### 4. Interpolation Search
- **Approach**: Estimate position based on value distribution
- **Time**: O(log log n) average, O(n) worst | **Space**: O(1)
- **Best For**: Uniformly distributed sorted arrays

### 5. Exponential Search
- **Approach**: Find range (1, 2, 4, 8...), then binary search
- **Time**: O(log n) | **Space**: O(1)
- **Best For**: Unbounded/infinite arrays

### 6. Fibonacci Search
- **Approach**: Divide search space using Fibonacci numbers
- **Time**: O(log n) | **Space**: O(1)
- **Best For**: When division/multiplication is expensive

### 7. Ternary Search
- **Approach**: Divide array into 3 parts
- **Time**: O(log₃ n) | **Space**: O(1)
- **Best For**: Unimodal functions, finding min/max

### 8. Meta Binary Search (One-sided Binary Search)
- **Approach**: Binary search using bit operations
- **Time**: O(log n) | **Space**: O(1)
- **Best For**: Optimized bit-level operations

### 9. Sublist Search
- **Approach**: Find subarray/sublist within larger array
- **Time**: O(m×n) | **Space**: O(1)
- **Best For**: Pattern matching in arrays

---

## Sorting Algorithms

### Comparison-Based Sorts

#### 1. Bubble Sort
- **Approach**: Repeatedly swap adjacent elements if wrong order
- **Time**: O(n²) | **Space**: O(1)
- **Stable**: Yes | **Best For**: Educational purposes, nearly sorted data

#### 2. Selection Sort
- **Approach**: Find minimum, place at beginning, repeat
- **Time**: O(n²) | **Space**: O(1)
- **Stable**: No | **Best For**: Small arrays, memory writes are costly

#### 3. Insertion Sort
- **Approach**: Build sorted array one element at a time
- **Time**: O(n²) average, O(n) best | **Space**: O(1)
- **Stable**: Yes | **Best For**: Small or nearly sorted arrays

#### 4. Shell Sort
- **Approach**: Generalized insertion sort with gap sequence
- **Time**: O(n log² n) to O(n²) depends on gap | **Space**: O(1)
- **Stable**: No | **Best For**: Medium-sized arrays

#### 5. Merge Sort
- **Approach**: Divide into halves, sort recursively, merge
- **Time**: O(n log n) | **Space**: O(n)
- **Stable**: Yes | **Best For**: Linked lists, external sorting, guaranteed O(n log n)

#### 6. Quick Sort
- **Approach**: Pick pivot, partition, recursively sort
- **Time**: O(n log n) average, O(n²) worst | **Space**: O(log n)
- **Stable**: No | **Best For**: General purpose, in-place sorting
- **Variants**: Randomized, 3-way partition (Dutch National Flag)

#### 7. Heap Sort
- **Approach**: Build max heap, repeatedly extract max
- **Time**: O(n log n) | **Space**: O(1)
- **Stable**: No | **Best For**: Guaranteed O(n log n), in-place

#### 8. Tree Sort
- **Approach**: Insert into BST, inorder traversal
- **Time**: O(n log n) average, O(n²) worst | **Space**: O(n)
- **Stable**: Yes | **Best For**: When BST is needed anyway

### Non-Comparison Sorts

#### 9. Counting Sort
- **Approach**: Count occurrences, reconstruct array
- **Time**: O(n+k) where k is range | **Space**: O(k)
- **Stable**: Yes | **Best For**: Small range integers

#### 10. Radix Sort
- **Approach**: Sort digit by digit (LSD or MSD)
- **Time**: O(d×(n+k)) where d is digits | **Space**: O(n+k)
- **Stable**: Yes | **Best For**: Fixed-length integers/strings

#### 11. Bucket Sort
- **Approach**: Distribute into buckets, sort buckets
- **Time**: O(n+k) average, O(n²) worst | **Space**: O(n+k)
- **Stable**: Yes | **Best For**: Uniformly distributed data

### Hybrid Sorts

#### 12. Tim Sort (Python's default)
- **Approach**: Merge sort + Insertion sort
- **Time**: O(n log n) | **Space**: O(n)
- **Stable**: Yes | **Best For**: Real-world data with runs

#### 13. Intro Sort (C++'s std::sort)
- **Approach**: Quick sort + Heap sort + Insertion sort
- **Time**: O(n log n) | **Space**: O(log n)
- **Stable**: No | **Best For**: General purpose with worst-case guarantee

---

## Array & String Algorithms

### 1. Kadane's Algorithm
- **Problem**: Maximum subarray sum
- **Time**: O(n) | **Space**: O(1)
- **Use**: Stock prices, maximum sum problems

### 2. Boyer-Moore Majority Voting Algorithm
- **Problem**: Find majority element (appears > n/2 times)
- **Time**: O(n) | **Space**: O(1)
- **Use**: Finding dominant element

### 3. Dutch National Flag Algorithm (3-Way Partitioning)
- **Problem**: Sort array of 0s, 1s, and 2s
- **Time**: O(n) | **Space**: O(1)
- **Use**: Quick sort optimization, sorting limited values

### 4. Moore's Voting Algorithm (Extended)
- **Problem**: Find elements appearing > n/k times
- **Time**: O(n) | **Space**: O(k)
- **Use**: Finding multiple majority elements

### 5. Prefix Sum / Cumulative Sum
- **Problem**: Range sum queries
- **Time**: O(n) preprocess, O(1) query | **Space**: O(n)
- **Use**: Subarray sum problems

### 6. Difference Array
- **Problem**: Range update queries
- **Time**: O(1) update, O(n) final | **Space**: O(n)
- **Use**: Multiple range updates

### 7. Next Greater/Smaller Element
- **Approach**: Monotonic stack
- **Time**: O(n) | **Space**: O(n)
- **Use**: Stock span, histogram problems

### 8. Trapping Rain Water
- **Approach**: Two pointers or prefix/suffix max
- **Time**: O(n) | **Space**: O(1) or O(n)
- **Use**: Water/elevation problems

### 9. Container With Most Water
- **Approach**: Two pointers from ends
- **Time**: O(n) | **Space**: O(1)
- **Use**: Area/volume optimization

### 10. Product of Array Except Self
- **Approach**: Prefix product × suffix product
- **Time**: O(n) | **Space**: O(1)
- **Use**: Array multiplication problems

---

## Linked List Algorithms

### 1. Floyd's Cycle Detection (Tortoise & Hare)
- **Problem**: Detect cycle in linked list
- **Time**: O(n) | **Space**: O(1)
- **Use**: Cycle detection, finding cycle start

### 2. Reverse Linked List
- **Approach**: Iterative or recursive pointer reversal
- **Time**: O(n) | **Space**: O(1) iterative, O(n) recursive
- **Use**: Reversal, palindrome check

### 3. Find Middle Element
- **Approach**: Fast & slow pointers
- **Time**: O(n) | **Space**: O(1)
- **Use**: Splitting list, finding middle

### 4. Merge Two Sorted Lists
- **Approach**: Two pointers comparison
- **Time**: O(n+m) | **Space**: O(1)
- **Use**: Merge sort on linked lists

### 5. Detect Intersection Point
- **Approach**: Length difference or two pointers
- **Time**: O(n+m) | **Space**: O(1)
- **Use**: Finding where two lists meet

### 6. Remove Nth Node from End
- **Approach**: Two pointers with gap
- **Time**: O(n) | **Space**: O(1)
- **Use**: List manipulation

### 7. Palindrome Check
- **Approach**: Reverse second half, compare
- **Time**: O(n) | **Space**: O(1)
- **Use**: Palindrome detection

### 8. Flatten Multilevel Linked List
- **Approach**: DFS or iterative with stack
- **Time**: O(n) | **Space**: O(1) or O(n)
- **Use**: Nested list flattening

---

## Stack & Queue Algorithms

### 1. Monotonic Stack
- **Use**: Next greater/smaller element
- **Time**: O(n) | **Space**: O(n)

### 2. Min Stack / Max Stack
- **Use**: Get min/max in O(1)
- **Time**: O(1) all ops | **Space**: O(n)

### 3. Implement Queue using Stacks
- **Time**: O(1) amortized | **Space**: O(n)

### 4. Implement Stack using Queues
- **Time**: O(n) push, O(1) pop | **Space**: O(n)

### 5. Valid Parentheses
- **Approach**: Stack matching
- **Time**: O(n) | **Space**: O(n)

### 6. Largest Rectangle in Histogram
- **Approach**: Monotonic stack
- **Time**: O(n) | **Space**: O(n)

### 7. Sliding Window Maximum
- **Approach**: Deque (monotonic queue)
- **Time**: O(n) | **Space**: O(k)

---

## Tree Algorithms

### Traversals

#### 1. DFS (Depth-First Search)
- **Inorder**: Left → Root → Right (sorted for BST)
- **Preorder**: Root → Left → Right (copy tree)
- **Postorder**: Left → Right → Root (delete tree)
- **Time**: O(n) | **Space**: O(h) where h is height

#### 2. BFS (Breadth-First Search) / Level Order
- **Approach**: Queue-based level-by-level
- **Time**: O(n) | **Space**: O(w) where w is max width

#### 3. Morris Traversal
- **Approach**: Threading (no stack/recursion)
- **Time**: O(n) | **Space**: O(1)

### Binary Search Tree

#### 4. BST Search
- **Time**: O(h) | **Space**: O(1)

#### 5. BST Insert
- **Time**: O(h) | **Space**: O(1)

#### 6. BST Delete
- **Time**: O(h) | **Space**: O(1)
- **Cases**: Leaf, one child, two children (inorder successor)

#### 7. Lowest Common Ancestor (LCA)
- **Time**: O(h) | **Space**: O(1) for BST, O(h) for binary tree

#### 8. Validate BST
- **Approach**: Inorder should be sorted OR range checking
- **Time**: O(n) | **Space**: O(h)

### Binary Tree Problems

#### 9. Diameter of Tree
- **Approach**: Height at each node
- **Time**: O(n) | **Space**: O(h)

#### 10. Maximum Path Sum
- **Approach**: DFS with global max
- **Time**: O(n) | **Space**: O(h)

#### 11. Serialize and Deserialize
- **Approach**: Level order or preorder
- **Time**: O(n) | **Space**: O(n)

#### 12. Vertical Order Traversal
- **Approach**: Hash map + BFS
- **Time**: O(n log n) | **Space**: O(n)

#### 13. Boundary Traversal
- **Approach**: Left boundary + leaves + right boundary
- **Time**: O(n) | **Space**: O(h)

### Balanced Trees

#### 14. AVL Tree Operations
- **Time**: O(log n) all operations
- **Rotations**: LL, RR, LR, RL

#### 15. Red-Black Tree Operations
- **Time**: O(log n) all operations

---

## Graph Algorithms

### Traversal

#### 1. BFS (Breadth-First Search)
- **Use**: Shortest path (unweighted), level-wise traversal
- **Time**: O(V+E) | **Space**: O(V)

#### 2. DFS (Depth-First Search)
- **Use**: Path finding, cycle detection, topological sort
- **Time**: O(V+E) | **Space**: O(V)

### Shortest Path

#### 3. Dijkstra's Algorithm
- **Use**: Shortest path from source (non-negative weights)
- **Time**: O((V+E) log V) with min-heap | **Space**: O(V)

#### 4. Bellman-Ford Algorithm
- **Use**: Shortest path with negative weights, detect negative cycles
- **Time**: O(V×E) | **Space**: O(V)

#### 5. Floyd-Warshall Algorithm
- **Use**: All-pairs shortest path
- **Time**: O(V³) | **Space**: O(V²)

#### 6. A* Search Algorithm
- **Use**: Shortest path with heuristic
- **Time**: O(E) best case | **Space**: O(V)

### Minimum Spanning Tree

#### 7. Kruskal's Algorithm
- **Approach**: Sort edges, use Union-Find
- **Time**: O(E log E) | **Space**: O(V)

#### 8. Prim's Algorithm
- **Approach**: Greedy with min-heap
- **Time**: O((V+E) log V) | **Space**: O(V)

### Topological Sort

#### 9. Kahn's Algorithm (BFS-based)
- **Use**: Topological ordering, detect cycles
- **Time**: O(V+E) | **Space**: O(V)

#### 10. DFS-based Topological Sort
- **Time**: O(V+E) | **Space**: O(V)

### Cycle Detection

#### 11. Union-Find (Disjoint Set Union)
- **Use**: Detect cycle in undirected graph
- **Time**: O(α(V)) amortized with path compression
- **Operations**: Find, Union, Connected

#### 12. Cycle Detection in Directed Graph
- **Approach**: DFS with recursion stack
- **Time**: O(V+E) | **Space**: O(V)

### Other Graph Algorithms

#### 13. Tarjan's Algorithm (Strongly Connected Components)
- **Time**: O(V+E) | **Space**: O(V)

#### 14. Kosaraju's Algorithm (SCC)
- **Time**: O(V+E) | **Space**: O(V)

#### 15. Articulation Points and Bridges
- **Time**: O(V+E) | **Space**: O(V)

#### 16. Eulerian Path/Circuit
- **Approach**: Check degrees, Hierholzer's algorithm
- **Time**: O(E) | **Space**: O(V+E)

#### 17. Hamiltonian Path/Cycle
- **Approach**: Backtracking or DP
- **Time**: O(n!) backtracking, O(n²×2ⁿ) DP

#### 18. Max Flow (Ford-Fulkerson)
- **Time**: O(E×max_flow) | **Space**: O(V)

#### 19. Bipartite Check
- **Approach**: BFS/DFS with 2-coloring
- **Time**: O(V+E) | **Space**: O(V)

---

## Dynamic Programming Patterns

### Linear DP

#### 1. Fibonacci Numbers
- **Time**: O(n) | **Space**: O(1) optimized

#### 2. Climbing Stairs
- **Time**: O(n) | **Space**: O(1) optimized

#### 3. House Robber
- **Time**: O(n) | **Space**: O(1) optimized

#### 4. Maximum Subarray (Kadane's)
- **Time**: O(n) | **Space**: O(1)

#### 5. Longest Increasing Subsequence (LIS)
- **Time**: O(n log n) binary search | **Space**: O(n)

#### 6. Longest Decreasing Subsequence
- **Time**: O(n log n) | **Space**: O(n)

### String DP

#### 7. Longest Common Subsequence (LCS)
- **Time**: O(m×n) | **Space**: O(m×n), optimized to O(min(m,n))

#### 8. Longest Common Substring
- **Time**: O(m×n) | **Space**: O(m×n)

#### 9. Edit Distance (Levenshtein Distance)
- **Time**: O(m×n) | **Space**: O(m×n)

#### 10. Longest Palindromic Subsequence
- **Time**: O(n²) | **Space**: O(n²)

#### 11. Longest Palindromic Substring
- **Time**: O(n²) DP, O(n) Manacher's | **Space**: O(n²) or O(n)

#### 12. Palindrome Partitioning
- **Time**: O(n²) | **Space**: O(n²)

#### 13. Word Break
- **Time**: O(n²) | **Space**: O(n)

#### 14. String Interleaving
- **Time**: O(m×n) | **Space**: O(m×n)

### Knapsack Patterns

#### 15. 0/1 Knapsack
- **Time**: O(n×W) | **Space**: O(n×W), optimized to O(W)

#### 16. Unbounded Knapsack
- **Time**: O(n×W) | **Space**: O(W)

#### 17. Subset Sum
- **Time**: O(n×sum) | **Space**: O(sum)

#### 18. Partition Equal Subset Sum
- **Time**: O(n×sum) | **Space**: O(sum)

#### 19. Target Sum
- **Time**: O(n×sum) | **Space**: O(sum)

#### 20. Coin Change
- **Time**: O(n×amount) | **Space**: O(amount)

#### 21. Coin Change II (Combinations)
- **Time**: O(n×amount) | **Space**: O(amount)

### Matrix DP

#### 22. Unique Paths
- **Time**: O(m×n) | **Space**: O(n) optimized

#### 23. Minimum Path Sum
- **Time**: O(m×n) | **Space**: O(n) optimized

#### 24. Maximal Square
- **Time**: O(m×n) | **Space**: O(n) optimized

#### 25. Maximal Rectangle
- **Time**: O(m×n) | **Space**: O(n)

#### 26. Dungeon Game
- **Time**: O(m×n) | **Space**: O(n) optimized

### Tree DP

#### 27. House Robber III (Tree)
- **Time**: O(n) | **Space**: O(h)

#### 28. Binary Tree Maximum Path Sum
- **Time**: O(n) | **Space**: O(h)

### Interval DP

#### 29. Matrix Chain Multiplication
- **Time**: O(n³) | **Space**: O(n²)

#### 30. Burst Balloons
- **Time**: O(n³) | **Space**: O(n²)

#### 31. Minimum Cost Tree From Leaf Values
- **Time**: O(n³) DP or O(n) stack | **Space**: O(n²) or O(n)

### Bitmask DP

#### 32. Traveling Salesman Problem
- **Time**: O(n²×2ⁿ) | **Space**: O(n×2ⁿ)

#### 33. Hamiltonian Path (DP)
- **Time**: O(n²×2ⁿ) | **Space**: O(n×2ⁿ)

### State Machine DP

#### 34. Best Time to Buy/Sell Stock (with cooldown, fees, etc.)
- **Time**: O(n) | **Space**: O(1) optimized

---

## Greedy Algorithms

### 1. Activity Selection Problem
- **Approach**: Sort by end time, select non-overlapping
- **Time**: O(n log n) | **Space**: O(1)

### 2. Fractional Knapsack
- **Approach**: Sort by value/weight ratio
- **Time**: O(n log n) | **Space**: O(1)

### 3. Huffman Coding
- **Approach**: Build optimal prefix-free code tree
- **Time**: O(n log n) | **Space**: O(n)

### 4. Job Sequencing Problem
- **Approach**: Sort by profit, fit in deadline slots
- **Time**: O(n²) or O(n log n) with DSU | **Space**: O(n)

### 5. Minimum Platforms
- **Approach**: Sort arrival/departure separately
- **Time**: O(n log n) | **Space**: O(1)

### 6. Jump Game / Jump Game II
- **Approach**: Track reachable range
- **Time**: O(n) | **Space**: O(1)

### 7. Gas Station (Circular Array)
- **Approach**: Track surplus/deficit
- **Time**: O(n) | **Space**: O(1)

### 8. N meetings in one room
- **Approach**: Sort by end time
- **Time**: O(n log n) | **Space**: O(n)

---

## Backtracking Patterns

### 1. N-Queens Problem
- **Time**: O(n!) | **Space**: O(n²)

### 2. Sudoku Solver
- **Time**: O(9^(n×n)) worst case | **Space**: O(n×n)

### 3. Permutations
- **Time**: O(n!) | **Space**: O(n)

### 4. Combinations
- **Time**: O(2ⁿ) | **Space**: O(n)

### 5. Subsets / Power Set
- **Time**: O(2ⁿ) | **Space**: O(n)

### 6. Combination Sum (with/without duplicates)
- **Time**: O(2ⁿ) | **Space**: O(n)

### 7. Palindrome Partitioning
- **Time**: O(n×2ⁿ) | **Space**: O(n)

### 8. Word Search
- **Time**: O(m×n×4³ˡ) where l is word length | **Space**: O(l)

### 9. Generate Parentheses
- **Time**: O(4ⁿ/√n) Catalan | **Space**: O(n)

### 10. Rat in a Maze
- **Time**: O(4^(n×n)) worst case | **Space**: O(n×n)

### 11. M-Coloring Problem
- **Time**: O(m^V) | **Space**: O(V)

---

## Divide and Conquer

### 1. Merge Sort
- **Time**: O(n log n) | **Space**: O(n)

### 2. Quick Sort
- **Time**: O(n log n) average | **Space**: O(log n)

### 3. Binary Search
- **Time**: O(log n) | **Space**: O(1)

### 4. Closest Pair of Points
- **Time**: O(n log n) | **Space**: O(n)

### 5. Strassen's Matrix Multiplication
- **Time**: O(n^2.81) | **Space**: O(n²)

### 6. Karatsuba Multiplication
- **Time**: O(n^1.58) | **Space**: O(n)

### 7. Maximum Subarray (Divide & Conquer)
- **Time**: O(n log n) | **Space**: O(log n)

### 8. Count Inversions
- **Time**: O(n log n) | **Space**: O(n)

---

## Two Pointer Techniques

### 1. Two Sum (Sorted Array)
- **Time**: O(n) | **Space**: O(1)

### 2. Three Sum
- **Time**: O(n²) | **Space**: O(1)

### 3. Four Sum
- **Time**: O(n³) | **Space**: O(1)

### 4. Container With Most Water
- **Time**: O(n) | **Space**: O(1)

### 5. Trapping Rain Water
- **Time**: O(n) | **Space**: O(1)

### 6. Remove Duplicates from Sorted Array
- **Time**: O(n) | **Space**: O(1)

### 7. Move Zeros
- **Time**: O(n) | **Space**: O(1)

### 8. Partition Array (Dutch Flag)
- **Time**: O(n) | **Space**: O(1)

### 9. Fast & Slow Pointers (Floyd's)
- **Use**: Cycle detection, middle element
- **Time**: O(n) | **Space**: O(1)

---

## Sliding Window

### Fixed Window

#### 1. Maximum Sum Subarray of Size K
- **Time**: O(n) | **Space**: O(1)

#### 2. First Negative in Every Window
- **Time**: O(n) | **Space**: O(k)

### Variable Window

#### 3. Longest Substring Without Repeating Characters
- **Time**: O(n) | **Space**: O(min(m,n)) where m is charset size

#### 4. Longest Substring with K Distinct Characters
- **Time**: O(n) | **Space**: O(k)

#### 5. Minimum Window Substring
- **Time**: O(n) | **Space**: O(m) where m is pattern length

#### 6. Longest Repeating Character Replacement
- **Time**: O(n) | **Space**: O(26) = O(1)

#### 7. Maximum Consecutive Ones III
- **Time**: O(n) | **Space**: O(1)

#### 8. Fruit Into Baskets (2 distinct)
- **Time**: O(n) | **Space**: O(1)

#### 9. Subarrays with K Different Integers
- **Time**: O(n) | **Space**: O(k)

---

## Bit Manipulation

### Basic Operations

#### 1. Check if Bit is Set
- **Operation**: `n & (1 << i)`

#### 2. Set a Bit
- **Operation**: `n | (1 << i)`

#### 3. Clear a Bit
- **Operation**: `n & ~(1 << i)`

#### 4. Toggle a Bit
- **Operation**: `n ^ (1 << i)`

### Common Algorithms

#### 5. Count Set Bits (Hamming Weight)
- **Approach**: Brian Kernighan's algorithm
- **Time**: O(number of set bits)

#### 6. Check if Power of 2
- **Operation**: `n > 0 && (n & (n-1)) == 0`

#### 7. Find Single Number (XOR trick)
- **Use**: Array where all appear twice except one
- **Time**: O(n) | **Space**: O(1)

#### 8. Find Two Non-Repeating Numbers
- **Approach**: XOR + partitioning
- **Time**: O(n) | **Space**: O(1)

#### 9. Reverse Bits
- **Time**: O(log n)

#### 10. Bitwise AND of Range
- **Approach**: Find common prefix
- **Time**: O(log n)

#### 11. Gray Code
- **Formula**: `gray = n ^ (n >> 1)`

#### 12. Subsets using Bitmask
- **Time**: O(2ⁿ×n) | **Space**: O(1)

---

## Mathematical Algorithms

### Number Theory

#### 1. GCD (Greatest Common Divisor)
- **Euclidean Algorithm**: `gcd(a,b) = gcd(b, a%b)`
- **Time**: O(log min(a,b))

#### 2. LCM (Least Common Multiple)
- **Formula**: `lcm(a,b) = (a×b) / gcd(a,b)`

#### 3. Prime Check (Primality Test)
- **Naive**: O(√n)
- **Miller-Rabin**: O(k log³ n) probabilistic

#### 4. Sieve of Eratosthenes
- **Use**: Find all primes up to n
- **Time**: O(n log log n) | **Space**: O(n)

#### 5. Segmented Sieve
- **Use**: Primes in range [L, R]
- **Time**: O((R-L+1) log log R + √R log log √R)

#### 6. Prime Factorization
- **Time**: O(√n)

#### 7. Euler's Totient Function φ(n)
- **Use**: Count numbers ≤ n coprime to n
- **Time**: O(√n)

#### 8. Modular Exponentiation
- **Formula**: `(a^b) % m`
- **Time**: O(log b)

#### 9. Modular Multiplicative Inverse
- **Extended Euclidean**: O(log m)
- **Fermat's**: O(log m) when m is prime

#### 10. Chinese Remainder Theorem
- **Use**: Solve system of congruences

### Combinatorics

#### 11. nCr (Binomial Coefficient)
- **DP**: O(n×r) | **Space**: O(r)
- **Pascal's Triangle**: O(n²)

#### 12. Catalan Numbers
- **Formula**: `C(n) = (2n)! / ((n+1)! × n!)`
- **Use**: Balanced parentheses, BSTs, paths

#### 13. Factorial with Modulo
- **Precompute**: O(n) preprocess, O(1) query

### Geometry

#### 14. Distance Between Points
- **Euclidean**: `√((x2-x1)² + (y2-y1)²)`

#### 15. Check if Point Inside Triangle
- **Approach**: Area comparison or cross product

#### 16. Convex Hull
- **Graham Scan**: O(n log n)
- **Jarvis March**: O(nh) where h is hull size

#### 17. Line Intersection
- **Time**: O(1)

---

## Cache & Memory Algorithms

### 1. LRU Cache (Least Recently Used)
- **Structure**: Hash Map + Doubly Linked List
- **Time**: O(1) get, O(1) put | **Space**: O(capacity)
- **Use**: Caching, memory management

### 2. LFU Cache (Least Frequently Used)
- **Structure**: Hash Maps + Doubly Linked Lists
- **Time**: O(1) get, O(1) put | **Space**: O(capacity)
- **Use**: Caching with frequency tracking

### 3. MRU Cache (Most Recently Used)
- **Similar to LRU**: Evict most recent instead

### 4. FIFO Cache (First In First Out)
- **Structure**: Queue
- **Time**: O(1) | **Space**: O(capacity)

### 5. Clock Algorithm (Second Chance)
- **Use**: Page replacement
- **Time**: O(n) worst case | **Space**: O(n)

---

## Advanced String Algorithms

### Pattern Matching

#### 1. KMP (Knuth-Morris-Pratt)
- **Use**: Pattern matching with LPS array
- **Time**: O(n+m) | **Space**: O(m)

#### 2. Rabin-Karp
- **Use**: Pattern matching using rolling hash
- **Time**: O(n+m) average, O(nm) worst | **Space**: O(1)

#### 3. Boyer-Moore
- **Use**: Pattern matching (bad character + good suffix)
- **Time**: O(n/m) best, O(nm) worst | **Space**: O(m)

#### 4. Z Algorithm
- **Use**: Pattern matching with Z array
- **Time**: O(n+m) | **Space**: O(n+m)

#### 5. Aho-Corasick
- **Use**: Multiple pattern matching
- **Time**: O(n+m+z) where z is matches | **Space**: O(m×k) k is alphabet

### Suffix Structures

#### 6. Suffix Array
- **Time**: O(n log² n) naive, O(n log n) optimized | **Space**: O(n)

#### 7. Suffix Tree (Ukkonen's)
- **Time**: O(n) | **Space**: O(n)
- **Use**: Substring queries, longest repeated substring

#### 8. Suffix Automaton
- **Time**: O(n) | **Space**: O(n)

### Palindromes

#### 9. Manacher's Algorithm
- **Use**: Find all palindromic substrings
- **Time**: O(n) | **Space**: O(n)

#### 10. Palindrome Tree (Eertree)
- **Time**: O(n) | **Space**: O(n)

### Other

#### 11. Trie (Prefix Tree)
- **Time**: O(m) insert/search where m is word length | **Space**: O(alphabet_size × n × m)
- **Use**: Autocomplete, spell check, IP routing

#### 12. Edit Distance (Levenshtein)
- **Time**: O(m×n) | **Space**: O(min(m,n)) optimized

#### 13. Longest Common Prefix
- **Approaches**: Sorting, Trie, Binary search
- **Time**: O(n×m) | **Space**: varies

---

## Summary Table: When to Use Which Algorithm

| Problem Type | Algorithm | Time Complexity |
|--------------|-----------|-----------------|
| **Search in sorted array** | Binary Search | O(log n) |
| **Search in unsorted** | Linear Search | O(n) |
| **Sort small array** | Insertion Sort | O(n²) |
| **Sort general purpose** | Quick Sort, Merge Sort | O(n log n) |
| **Sort integers (small range)** | Counting Sort | O(n+k) |
| **Maximum subarray** | Kadane's | O(n) |
| **Majority element** | Boyer-Moore Voting | O(n) |
| **Linked list cycle** | Floyd's | O(n) |
| **Next greater element** | Monotonic Stack | O(n) |
| **Shortest path (unweighted)** | BFS | O(V+E) |
| **Shortest path (weighted)** | Dijkstra's | O((V+E) log V) |
| **All-pairs shortest path** | Floyd-Warshall | O(V³) |
| **Min spanning tree** | Kruskal's, Prim's | O(E log E) |
| **Topological sort** | Kahn's (BFS) | O(V+E) |
| **Detect cycle (undirected)** | Union-Find | O(E×α(V)) |
| **LCS problem** | DP | O(m×n) |
| **0/1 Knapsack** | DP | O(n×W) |
| **Longest palindrome** | Manacher's | O(n) |
| **Pattern matching** | KMP | O(n+m) |
| **Multiple patterns** | Aho-Corasick | O(n+m+z) |
| **LRU Cache** | HashMap + DLL | O(1) |

---

## Notes

- ✅ **Implemented**: Algorithm has notes/code
- 🔄 **In Progress**: Currently working on
- 📝 **Planned**: On the learning roadmap
- 🎯 **Practice**: Solve related LeetCode problems

**When you implement an algorithm, mark it here with a link to your notes!**

---

**Last Updated**: 2025-10-28