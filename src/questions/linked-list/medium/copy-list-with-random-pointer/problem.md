# Copy List with Random Pointer

## Problem

Ek linked list di hui hai jisme har node ke paas do pointers hain:

```txt
next   -> normal next node
random -> list ke kisi bhi node ko ya null ko point kar sakta hai
```

Hume is list ki deep copy banani hai.

Deep copy ka matlab:

```txt
har original node ke liye ek bilkul naya node banana hai
new list me values same hongi
next aur random connections bhi same pattern follow karenge
lekin koi bhi pointer original list ke node ko point nahi karega
```

## Example 1

```txt
Input:
head = [[7,null],[13,0],[11,4],[10,2],[1,0]]

Output:
[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

Explanation:

```txt
node 0 ka value 7 hai, random = null
node 1 ka value 13 hai, random = node 0
node 2 ka value 11 hai, random = node 4
node 3 ka value 10 hai, random = node 2
node 4 ka value 1 hai, random = node 0
```

## Example 2

```txt
Input:
head = [[1,1],[2,1]]

Output:
[[1,1],[2,1]]
```

Explanation:

```txt
pehle node ka random doosre node par hai
doosre node ka random khud par hai
copy list me bhi same relation rehna chahiye
```

## Constraints

```txt
0 <= number of nodes <= 1000
-10^4 <= Node.val <= 10^4
random pointer null ya list ke kisi valid node ko point karega
```

## Main Challenge

Sirf `next` pointer hota toh copy banana simple tha.
Real difficulty `random` pointer se aati hai.

Why?

```txt
jab current original node ka copy bana rahe hote hain,
tab uska random kisi aur original node ko point kar raha hota hai
aur hume us corresponding copied node tak pahunchna hota hai
```

So actual problem hai:

```txt
old node -> corresponding new node
ye relation efficiently kaise dhoondhein?
```

## Approaches

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| HashMap | old node se new node ki mapping store karo, phir `next` aur `random` connect karo | O(n) | O(n) |
| Optimal Interweaving | copied nodes ko original nodes ke beech me insert karo, mapping ko structure ke andar hi encode karo | O(n) | O(1) auxiliary |

## Important Point

Question sirf values copy karne ka nahi hai.
Hume structure copy karni hai.

That means:

```txt
same value enough nahi hai
same next relation bhi chahiye
same random relation bhi chahiye
aur saare nodes naye hone chahiye
```
