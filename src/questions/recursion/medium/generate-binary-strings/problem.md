# Generate Binary Strings

## Problem Samjho

Ek integer `n` diya hai.

Hume length `n` ki saari binary strings generate karni hain.

Binary string ka matlab:

```txt
String me sirf '0' aur '1' characters allowed hain.
```

Example:

```txt
n = 2

possible strings:
00
01
10
11
```

Output ascending / lexicographic order me chahiye:

```txt
["00", "01", "10", "11"]
```

---

## Examples

### Example 1

```txt
Input: n = 2
Output: ["00", "01", "10", "11"]
```

Why:

| position 0 | position 1 | string |
|---|---|---|
| 0 | 0 | `00` |
| 0 | 1 | `01` |
| 1 | 0 | `10` |
| 1 | 1 | `11` |

### Example 2

```txt
Input: n = 3
Output: ["000", "001", "010", "011", "100", "101", "110", "111"]
```

Why total `8` strings?

```txt
position 0 has 2 choices
position 1 has 2 choices
position 2 has 2 choices

total = 2 * 2 * 2 = 2^3 = 8
```

### Example 3

```txt
Input: n = 1
Output: ["0", "1"]
```

---

## Constraints

```txt
1 <= n <= 20
```

Note:

```txt
Total strings = 2^n
n = 20 means 1,048,576 strings.
```

Output itself bada ho sakta hai, so output cost avoid nahi kar sakte.

---

## Prerequisites

| Concept | Why needed |
|---|---|
| recursion | same choice process repeat hota hai |
| base case | jab current string length n ho jaye |
| decision tree | har position par 0/1 choice dikhti hai |
| backtracking idea | choose -> recurse -> return to try next choice |
| string concatenation | `current + "0"` and `current + "1"` |

Backtracking ko yahan heavy theory ki tarah nahi lena.

Simple meaning:

```txt
Ek choice lo, recursion me jao, wapas aao, next choice try karo.
```

---

## Approach 1: Brute Force By Numbers

### Intuition

Binary strings ko numbers ki tarah imagine kar sakte hain.

For `n = 3`, numbers `0` to `7` tak jao:

```txt
0 -> 000
1 -> 001
2 -> 010
3 -> 011
4 -> 100
5 -> 101
6 -> 110
7 -> 111
```

This works, but it depends on binary conversion / padding.

### Complexity

```txt
Time: O(n * 2^n)
Space: O(n * 2^n) for output
```

---

## Approach 2: Recursive Decision Tree

### Intuition

String ko left to right build karo.

Har position par exactly 2 choices hain:

```txt
choose '0'
choose '1'
```

For `n = 2`:

```txt
                         ""
                    /          \
                 "0"            "1"
              /      \        /      \
           "00"     "01"   "10"     "11"
            add      add    add      add
```

Base case:

```txt
current.length === n
```

Meaning:

```txt
Current string complete ho gayi.
Result me add karo.
```

Recursive case:

```txt
current.length < n
```

Meaning:

```txt
Abhi string incomplete hai.
Ek aur character choose karna hai.
```

---

## Why Order Ascending Aata Hai?

Hum hamesha pehle `0` branch explore karte hain, phir `1` branch.

```txt
generate(current + "0")
generate(current + "1")
```

This creates lexicographic order naturally.

For `n = 3`:

```txt
000
001
010
011
100
101
110
111
```

If `1` pehle try karte:

```txt
111
110
101
100
011
010
001
000
```

Order different ho jaata.

---

## Approach Comparison

| Approach | Idea | Time | Extra space | Notes |
|---|---|---|---|---|
| number conversion | `0` to `2^n - 1`, convert to binary | O(n * 2^n) | O(1) extra excluding output | conversion/padding needed |
| recursive decision tree | choose 0/1 at each position | O(n * 2^n) | O(n) recursion excluding output | clearer recursion learning |

Output space:

```txt
O(n * 2^n)
```

Why?

```txt
2^n strings
each string length n
```

---

## Selected Approach

Use recursive decision tree.

Reason:

```txt
This problem is mainly about choices.
Recursion directly represents the choice tree.
```

Implementation file:

```txt
solution.ts
```
