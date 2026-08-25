# Intersection of Two Linked Lists

## Problem

Do singly linked lists `headA` aur `headB` diye gaye hain.
Hume wo node return karna hai jahan dono lists intersect karti hain.

Important point:

```txt
intersection value se decide nahi hota
intersection same node reference se decide hota hai
```

Matlab agar dono lists me `8` value aa rahi hai,
tab bhi answer tabhi hoga jab dono ka pointer memory me same node ko point kare.

## Example 1

```txt
ListA: 4 -> 1 -> 8 -> 4 -> 5
ListB: 5 -> 6 -> 1 -> 8 -> 4 -> 5

Answer: node with value 8
```

Why:

```txt
8 se aage wali tail dono lists me shared hai
```

## Example 2

```txt
ListA: 1 -> 9 -> 1 -> 2 -> 4
ListB: 3 -> 2 -> 4

Answer: node with value 2
```

## Example 3

```txt
ListA: 2 -> 6 -> 4
ListB: 1 -> 5

Answer: null
```

## Constraints

```txt
number of nodes can be large
list structure modify nahi karni
cycle assume nahi hai
```

## Main Challenge

Problem ka tricky part ye hai:

```txt
same value ka node intersection nahi hota
same object reference wala node intersection hota hai
```

So actual comparison:

```txt
nodeA === nodeB
```

## Approaches

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| Brute Force | listA ke har node ko listB ke har node se compare karo | O(m * n) | O(1) |
| Better | listA ke saare node references `Set` me store karo | O(m + n) | O(m) |
| Optimal | lengths nikaal kar longer list ko align karo | O(m + n) | O(1) |
| Optimal Switch | end par pahunchne par pointers ko doosri list par switch karo | O(m + n) | O(1) |

## Important Insight

Intersection ke baad wali tail shared hoti hai.
Isliye agar dono pointers ko kisi point par:

```txt
same remaining distance
```

mil jaye,
toh dono saath move karke intersection tak pahunch sakte hain.
