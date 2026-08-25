# Second Smallest and Second Largest Element

## Problem

Ek integer array diya gaya hai.
Hume array ka:

```txt
second smallest distinct element
second largest distinct element
```

find karna hai.

Distinct ka matlab:

```txt
duplicate value ko second position ke liye dobara count nahi karna
```

If second distinct element exist nahi karta,
us answer ke liye `-1` return karo.

## Example 1

```txt
Input:
[1, 2, 4, 7, 7, 5]

Output:
Second Smallest: 2
Second Largest : 5
```

Explanation:

```txt
Sorted values:
[1, 2, 4, 5, 7, 7]

Distinct order:
[1, 2, 4, 5, 7]

second smallest = 2
second largest  = 5
```

Duplicate `7` second largest nahi banega,
kyunki hume distinct element chahiye.

## Example 2

```txt
Input:
[1]

Output:
Second Smallest: -1
Second Largest : -1
```

Explanation:

```txt
sirf ek distinct value hai
isliye second position exist nahi karti
```

## Example 3

```txt
Input:
[7, 7, 7]

Output:
Second Smallest: -1
Second Largest : -1
```

Same value repeat hone se new distinct candidate nahi banta.

## Assumption

Is repo version me array values positive integers hain.
Isliye `-1` ko safely "not found" sentinel ke roop me use kar sakte hain.

## Main Challenge

Sirf smallest aur largest find karna enough nahi hai.
Hume simultaneously ye bhi ensure karna hai:

```txt
second smallest > smallest
second largest  < largest
```

Strict comparison duplicates ko ignore karne ke liye important hai.

## Approaches

| Approach | Idea | Prerequisite | Time | Space |
|---|---|---|---:|---:|
| Brute Force | sorted copy banao, dono ends se first distinct value dhoondo | Sorting | O(n log n) | O(n) |
| Better | first pass me smallest/largest, second pass me second candidates | Array traversal | O(n) | O(1) |
| Optimal | ek pass me four states maintain karo | State tracking | O(n) | O(1) |

## Expected Result Shape

TypeScript solutions object return karengi:

```txt
{
  secondSmallest: number,
  secondLargest: number
}
```

