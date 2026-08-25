# Add Two Numbers

## Problem

Do linked lists `l1` aur `l2` diye hain.
Dono non-negative integers represent karte hain.

Important format:

```txt
digits reverse order me stored hain
har node me ek single digit hai
```

Task:

```txt
dono numbers ko add karke result bhi linked list ke form me return karna hai
```

## Example 1

```txt
Input:
l1 = [2, 4, 3]
l2 = [5, 6, 4]

Output:
[7, 0, 8]
```

Explanation:

```txt
l1 represents 342
l2 represents 465
342 + 465 = 807
result reverse order me [7, 0, 8]
```

## Example 2

```txt
Input:
l1 = [0]
l2 = [0]

Output:
[0]
```

## Example 3

```txt
Input:
l1 = [9, 9, 9, 9, 9, 9, 9]
l2 = [9, 9, 9, 9]

Output:
[8, 9, 9, 9, 0, 0, 0, 1]
```

## Constraints

```txt
1 <= number of nodes <= 100
0 <= node.val <= 9
input numbers me leading zero nahi hoga, except number 0
```

## Important Point

Yahan reverse order ek advantage hai.

```txt
list ke head se hi units place mil jata hai
```

Isliye:

```txt
hume numbers ko reverse ya convert karne ki zaroorat nahi
```

## Approach

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| Simulation with carry | School addition ki tarah digit by digit sum karo | O(max(m, n)) | O(max(m, n)) output |

Auxiliary extra space:

```txt
O(1)
```

Kyunki extra variables sirf pointers aur `carry` hain.
