# Stack Notes

Stack ko samajhne ka sabse simple mental model hai:

```txt
Plates ka stack

Top
 |
 v
+-----+
| 30  |  <- sabse last me rakha gaya, sabse pehle niklega
+-----+
| 20  |
+-----+
| 10  |  <- sabse pehle rakha gaya, sabse last me niklega
+-----+
```

Rule:

```txt
Last In, First Out
LIFO
```

Jo value last me aayi, wahi pehle bahar jaayegi.

---

## 1. Stack Kya Hai?

Stack ek linear data structure hai jisme add aur remove dono ek hi side se hote hain.

Us side ko `top` bolte hain.

```txt
push(10)
push(20)
push(30)

Stack:

Top
 |
 v
[10, 20, 30]
          ^
         top
```

Ab `pop()` karenge:

```txt
Before: [10, 20, 30]
                  ^
                 top

pop() removes 30

After:  [10, 20]
             ^
            top
```

Important:

```txt
Stack beech se random element remove karne ke liye nahi bana.
Stack ka rule hai: top se add karo, top se remove karo.
```

---

## 2. Core Operations

| Operation | Meaning | Example |
|---|---|---|
| `push(x)` | top par new value add karo | `[10, 20] -> [10, 20, 30]` |
| `pop()` | top value remove karke return karo | `[10, 20, 30] -> returns 30` |
| `peek()` / `top()` | top value dekho, remove mat karo | `[10, 20, 30] -> returns 30` |
| `isEmpty()` | stack empty hai ya nahi | `[] -> true` |
| `size()` | stack me kitne elements hain | `[10, 20] -> 2` |

---

## 3. How Array Acts Like Stack

JavaScript / TypeScript me stack ke liye usually array use karte hain.

Reason:

```txt
Array ka end stack ke top ki tarah behave kar sakta hai.
```

```txt
Array:

index:  0   1   2
value: 10  20  30
                 ^
                top
```

`push(40)` array ke end me add karta hai:

```txt
Before: [10, 20, 30]
After:  [10, 20, 30, 40]
                      ^
                     top
```

`pop()` array ke end se remove karta hai:

```txt
Before: [10, 20, 30, 40]
After:  [10, 20, 30]
                  ^
                 top
```

Why end is preferred:

| Choice | Meaning | Why |
|---|---|---|
| array end as top | `push()` / `pop()` | usually O(1), no shifting |
| array start as top | `unshift()` / `shift()` | elements may shift, usually costlier |

So:

```txt
Array is not automatically a stack.
We use array in a stack-like way by treating its end as the top.
```

---

## 4. Why Stack Works

Stack useful tab hota hai jab latest pending thing ko pehle handle karna ho.

Examples:

| Situation | Stack ka role |
|---|---|
| Browser back button | latest page pehle wapas aata hai |
| Undo operation | latest action pehle undo hota hai |
| Function calls | latest function call pehle finish hoti hai |
| Parentheses matching | latest opening bracket pehle close hona chahiye |
| Expression conversion | latest waiting operator ko priority ke hisaab se handle karte hain |
| Monotonic stack | latest unresolved candidate ko current value se compare karte hain |

Core idea:

```txt
Stack old history ko safe rakhta hai,
aur latest pending item ko top par rakhta hai.
```

---

## 5. Stack As Pending Work

Stack ko sirf "values ka container" mat socho.

DSA me stack ka strong mental model hai:

```txt
Stack = pending work ki list
```

Example:

```txt
Kuch elements ka answer abhi nahi mila.
Unhe stack me wait karwa do.

Jab future me koi useful value mile,
stack ke top se pending elements resolve karo.
```

Pop ka meaning:

```txt
Ye pending item solve ho gaya.
Ab ise wait karne ki zarurat nahi.
```

Push ka meaning:

```txt
Current item ka answer abhi nahi mila.
Isko future ke liye wait karwa do.
```

This mental model Stack, Monotonic Stack, Next Greater, Next Smaller, Histogram, Stock Span, sab me kaam aata hai.

---

## 6. Normal Stack vs Monotonic Stack

Normal stack:

```txt
Sirf LIFO rule follow karta hai.
```

Monotonic stack:

```txt
LIFO ke saath stack ke andar values ek useful order me maintain hoti hain.
```

Common orders:

| Type | Stack values ka order | Useful for |
|---|---|---|
| Monotonic Increasing | choti values neeche, badi values upar | next smaller, previous smaller, remove larger digits |
| Monotonic Decreasing | badi values neeche, choti values upar | next greater, previous greater, stock span style checks |

Important nuance:

```txt
Monotonic order goal nahi hota.
Goal hota hai unnecessary candidates ko remove karna.
Order automatically maintain hota hai because useless candidates pop ho jaate hain.
```

---

## 7. Generic Monotonic Stack Pattern

Monotonic stack ka generic question hota hai:

```txt
Current value stack ke top wale pending item ko solve kar sakti hai kya?
```

Generic shape:

```txt
for each current item:
  while stack is not empty AND current item can solve stack top:
    pop stack top
    update answer for popped item

  push current item if it still needs future help
```

The condition changes by problem:

| Problem type | Condition ka meaning |
|---|---|
| next greater | current value pending value se badi hai |
| next smaller | current value pending value se choti hai |
| previous greater | current ke left me useful greater candidate chahiye |
| previous smaller | current ke left me useful smaller candidate chahiye |
| remove k digits | current digit choti hai, so previous bigger digit hatao |
| histogram | current height boundary ban gayi, previous bars ka area calculate karo |

Real reusable idea:

```txt
Keep only useful candidates.
Remove candidates that current value has made useless or solved.
```

---

## 8. Store Values Or Indices?

Stack me value bhi store kar sakte hain, index bhi.

But DSA problems me indices zyada useful hote hain.

Why?

```txt
Index se value bhi milti hai: nums[index]
Index se answer bhi update hota hai: answer[index]
```

Example:

```txt
nums = [8, 4, 6]
stack = [1]

stack top index = 1
value at top = nums[1] = 4
answer[1] can be updated directly
```

When values are duplicate, indices are safer:

```txt
nums = [2, 2, 3]

value 2 do jagah hai.
Index tells exactly which 2 is waiting.
```

---

## 9. Why While Inside For Is Still O(n)

Monotonic stack code often looks like:

```txt
for each item:
  while stack top can be resolved:
    pop
  push current item
```

At first glance, `for + while` scary lag sakta hai.

But total work linear hota hai.

Why?

```txt
Har index stack me at most ek baar push hota hai.
Har index stack se at most ek baar pop hota hai.
```

So:

```txt
Total pushes <= n
Total pops <= n
Total work = O(n)
```

The `while` loop ek single iteration me multiple pops kar sakta hai, but those popped items future me dobara pop nahi honge.

---

## 10. Circular Array Kya Hota Hai?

Normal array:

```txt
index:  0   1   2
value: 10  20  30

After index 2, array ends.
```

Circular array:

```txt
After last index, we imagine going back to index 0.

10 -> 20 -> 30 -> 10 -> 20 -> 30 -> ...
```

Important:

```txt
JavaScript array circular nahi ban jaata.
Hum circular access simulate karte hain.
```

So array same rehta hai:

```txt
nums = [10, 20, 30]
```

But our index movement circular ho jaati hai:

```txt
0 -> 1 -> 2 -> 0 -> 1 -> 2
```

---

## 11. How Do We Make Array Circular?

Technically:

```txt
Hum array ko circular nahi banate.
Hum index ko circular banate hain.
```

Formula:

```txt
circularIndex = i % n
```

If `n = 3`:

| virtual i | i % n | actual index |
|---:|---:|---:|
| 0 | 0 | 0 |
| 1 | 1 | 1 |
| 2 | 2 | 2 |
| 3 | 0 | 0 |
| 4 | 1 | 1 |
| 5 | 2 | 2 |

This means:

```txt
i keeps moving forward.
i % n maps it back inside valid array range.
```

For next index:

```txt
nextIndex = (currentIndex + 1) % n
```

Example:

```txt
n = 3

currentIndex = 0 -> next = 1
currentIndex = 1 -> next = 2
currentIndex = 2 -> next = 0
```

For previous index:

```txt
previousIndex = (currentIndex - 1 + n) % n
```

The `+ n` avoids negative index.

---

## 12. Why Do We Traverse 2 Times?

Circular problems me kisi element ka answer uske normal right side me nahi, array ke start me ho sakta hai.

Example:

```txt
nums = [5, 1, 3]
```

For index `2`, value `3`:

```txt
Normal right side:
  nothing

Circular right side:
  after 3, we wrap to 5

So 5 can be considered after 3 in circular sense.
```

One traversal:

```txt
0 -> 1 -> 2
```

This only gives normal left-to-right view.

Two traversals:

```txt
0 -> 1 -> 2 -> 0 -> 1 -> 2
```

This gives each element one wrap-around chance.

Why not infinite traversal?

```txt
Circular array repeats forever conceptually,
but after checking one full extra cycle, every other element has already been seen.

For an array of length n, each index can have at most n - 1 other elements after it circularly.
So 2n steps are enough for stack-style circular problems.
```

---

## 13. First Pass And Second Pass Meaning

In many circular monotonic stack problems:

```txt
First pass:
  original indices ko process karo
  unresolved indices stack me wait karte hain

Second pass:
  start ke elements ko tail wale unresolved elements ke "right side after wrap" ki tarah use karo
```

Important:

```txt
Second pass me usually new indices push nahi karte.
```

Why?

```txt
Har original index ko waiting list me ek baar daalna enough hai.
Second pass ka kaam new work create karna nahi,
sirf old unresolved work ko circular chance dena hai.
```

Mental model:

```txt
First pass = create/process original waiting list
Second pass = give wrap-around candidates to unresolved items
```

Note:

```txt
Templates problem ke direction ke hisaab se thode change ho sakte hain.
Kabhi right-to-left traverse hota hai, kabhi left-to-right.
But 2-pass reason same hai: circular wrap-around candidates include karna.
```

---

## 14. Modulo vs Duplicating Array

Circular traversal ko samajhne ke do ways hain.

### Way 1: Conceptually duplicate array

```txt
nums = [10, 20, 30]

conceptual view:
[10, 20, 30, 10, 20, 30]
```

This is easy to visualize.

But actual code me duplicate array banana extra space le sakta hai.

### Way 2: Use modulo

```txt
idx = i % n
```

This gives same circular view without copying.

```txt
i:   0   1   2   3   4   5
idx: 0   1   2   0   1   2
```

So modulo ka job:

```txt
Virtual long traversal ko real array indices me map karna.
```

---

## 15. Stack Circular Nahi Hota

This is an important distinction.

```txt
Input array ko circularly traverse karte hain.
Stack khud circular nahi hota.
```

Stack still normal LIFO stack hai:

```txt
push
pop
peek
```

Circular behavior sirf index calculation me aata hai:

```txt
idx = i % n
```

So when we say "circular stack problem", usually meaning hota hai:

```txt
Array circular hai.
Stack us circular traversal ko solve karne ka tool hai.
```

---

## 16. Generic Circular Stack Simulation

Question type:

```txt
For each index, find something on its circular right side.
```

Example values:

```txt
nums = [5, 1, 3]
n = 3
virtual traversal = 0, 1, 2, 0, 1, 2
```

Modulo view:

| virtual i | idx | nums[idx] | Meaning |
|---:|---:|---:|---|
| 0 | 0 | 5 | original pass starts |
| 1 | 1 | 1 | normal right side for earlier items |
| 2 | 2 | 3 | normal right side for earlier items |
| 3 | 0 | 5 | wrap-around candidate for tail items |
| 4 | 1 | 1 | more wrap-around candidate |
| 5 | 2 | 3 | full extra cycle completed |

If a stack stores unresolved indices, then:

```txt
First 0..2:
  indices can enter stack

Second 3..5:
  values can resolve old stack items
  but we normally avoid pushing duplicate indices
```

This pattern applies whenever:

```txt
1. answer may be after wrap-around
2. stack stores unresolved candidates
3. current circular value can resolve stack top
```

---

## 17. Common Stack Patterns

| Pattern | Stack stores | Pop means | Push means |
|---|---|---|---|
| parentheses matching | opening brackets | matching closing bracket found | opening bracket waiting for close |
| expression conversion | operators | operator priority is ready to output | operator waits for future operands/operators |
| monotonic next greater/smaller | unresolved indices | current value solved that index | current index needs future value |
| stock span | previous useful prices/indices | previous price no longer blocks current span | current price may block future prices |
| histogram area | increasing bar indices | current bar gives right boundary | current bar waits for right boundary |
| remove k digits | chosen digits | previous digit is worse than current digit | current digit becomes part of result |

This is the generic way to think:

```txt
Stack stores things that are not done yet.
Pop happens when current input gives a reason to finish/remove them.
```

---

## 18. Template: Normal Monotonic Stack

```txt
answer = default values
stack = empty

for i from 0 to n - 1:
  while stack not empty AND current item solves stack top:
    waitingIndex = stack.pop()
    answer[waitingIndex] = current item / computed value

  push i if current index needs future help
```

Problem decides:

```txt
current item solves stack top
```

For next greater:

```txt
current > value at stack top
```

For next smaller:

```txt
current < value at stack top
```

For histogram:

```txt
current height is smaller,
so previous taller bars now found their right boundary
```

---

## 19. Template: Circular Monotonic Stack

```txt
answer = default values
stack = empty
n = nums.length

for i from 0 to 2n - 1:
  idx = i % n

  while stack not empty AND nums[idx] solves stack top:
    waitingIndex = stack.pop()
    answer[waitingIndex] = nums[idx] / computed value

  if i < n:
    push idx
```

Why `i < n`?

```txt
Only original indices should enter the waiting list.
Second pass is for giving unresolved indices a circular chance.
```

Why `i % n`?

```txt
It converts virtual circular movement back to actual array index.
```

Why `2n`?

```txt
One original pass + one wrap-around pass.
```

---

## 20. Quick Reference

| Concept | Meaning |
|---|---|
| Stack | LIFO data structure |
| Top | side where push/pop happen |
| Array as stack | use array end as top |
| `push()` | add to top |
| `pop()` | remove from top |
| `peek()` | read top without removing |
| Monotonic stack | stack that keeps only useful ordered candidates |
| Pending item | item whose answer/work is not done yet |
| Circular array | after last index, imagine index 0 |
| Modulo | maps virtual circular index to real index |
| 2-pass traversal | gives one normal pass and one wrap-around pass |

Short memory lines:

```txt
Stack = latest pending work first.
Array as stack = use end as top with push/pop.
Circular array = do not change array, change index with modulo.
Monotonic stack = keep only useful candidates; pop when current input solves/removes stack top.
```