# Merge Intervals — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Hume intervals diye gaye hain:

```txt
[start, end]
```

Format me.

Hume saare overlapping intervals ko merge karna hai.

Important:
- overlap ka matlab ranges ek dusre ko touch ya cross kar rahi hain
- touching boundary bhi overlap count hota hai

Example:

```txt
[1,4] and [4,5]
```

Ye merge honge:

```txt
[1,5]
```

Kyunki `4` shared/touching point hai.

---

## STEP 2: Brute Force

Sabse seedhi soch:
- pehle sort karo
- phir har interval se dekho woh kitna aage tak merge ho sakta hai

Example:

```txt
intervals = [[1,3],[2,6],[8,10],[15,18]]
```

Sorted order me:

```txt
[1,3], [2,6], [8,10], [15,18]
```

Ab `[1,3]` ko lo:
- `[2,6]` overlap karta hai
- so new merged interval `[1,6]`

`[8,10]` overlap nahi karta,
so `[1,6]` final ho gaya.

Brute force me ye future scanning har base interval ke liye ho sakti hai.

---

## STEP 3: Key Insight

Sabse important shift sorting ke baad aata hai.

Sorted intervals me:

```txt
agar current interval overlap karega,
toh woh last merged interval se hi karega
```

Iska matlab:
- poore result ko scan karne ki zarurat nahi
- bas last merged interval dekho

Yehi brute aur optimal ka main difference hai.

---

## STEP 4: Why This Technique Works

Maan lo intervals sort ho chuke hain by start.

Aur current merged interval hai:

```txt
[a, b]
```

Current next interval hai:

```txt
[c, d]
```

Since sorted by start:

```txt
c >= a
```

Ab overlap condition kya banti hai?

```txt
c <= b
```

Why?

Kyunki:
- current interval ka start `c` agar previous merged interval ke end `b` ke andar aa raha hai,
  toh ranges touch/cross kar rahi hain
- agar `c > b`, toh beech me gap aa gaya, so overlap nahi

So sorted order me overlap check simple ho jaata hai:

```txt
currentStart <= lastMergedEnd
```

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `sortedIntervals` | start ke basis par sorted intervals |
| `merged` | final merged intervals list |
| `lastMerged` | merged list ka last interval |
| `current` | currently process ho raha interval |

Brute me additional:

| Variable | Meaning |
|---|---|
| `start` | current base merged interval ka left boundary |
| `end` | current base merged interval ka growing right boundary |

---

## STEP 6: Mental Model

Is problem ko aise socho:

```txt
Hum sorted line par paint stroke ko extend kar rahe hain.
```

Current merged interval ek active paint stroke hai.

Har new interval pe do hi possibilities hain:

1. stroke ko extend karo
2. naya stroke start karo

Visual:

```txt
[1------3]
    [2------6]
=> [1-----------6]

[1------6]
             [8---10]
=> no touch, so new block
```

Short memory line:

```txt
touch/cross -> merge
gap -> new interval
```

---

## STEP 7: Boundary Cases

1. Empty input
   `[] -> []`

2. Single interval
   same interval return

3. Already non-overlapping
   same list return after sort

4. Fully nested intervals
   `[1,10],[2,3],[4,8] -> [1,10]`

5. Touching boundaries
   `[1,4],[4,5] -> [1,5]`

---

## STEP 8: Conditions

### Condition 1: `current[0] <= lastMerged[1]`

This means:

```txt
current interval ka start
last merged interval ke andar ya boundary pe aa raha hai
```

So overlap hai.

### Condition 2: `lastMerged[1] = Math.max(lastMerged[1], current[1])`

Overlap ke baad right boundary ko bada karna padta hai.

Why `max`?

Kyunki kaunsa interval zyada right tak ja raha hai,
wahi merged interval ka final end banega.

### Condition 3: `else merged.push(current)`

Agar overlap nahi hai,
toh current interval ek naya independent block hai.

---

## STEP 9: Adjustment Logic

Optimal approach me har iteration ka flow:

1. `current` interval lo
2. `lastMerged` interval dekho
3. overlap hai?
4. yes -> right boundary extend karo
5. no -> new interval push karo

Brute force me flow slightly different hai:

1. current base interval lo
2. aage jitne overlaps milte jayein absorb karo
3. first non-overlap pe stop karo
4. merged interval push karo

---

## STEP 10: Answer Formula

Yahan koi math formula nahi hai.

Final answer simple hai:

```txt
merged
```

Kyunki `merged` list hi har processed interval ke baad
current final merged structure represent kar rahi hoti hai.

---

## STEP 11: Full Dry Run

Example:

```txt
intervals = [[1,3],[2,6],[8,10],[15,18]]
```

Sorted:

```txt
[[1,3],[2,6],[8,10],[15,18]]
```

Initial state:

```txt
merged = [[1,3]]
```

| Step | current | lastMerged Before | Overlap? | Action | merged After |
|---:|---|---|---|---|---|
| 1 | `[2,6]` | `[1,3]` | `2 <= 3` -> Yes | extend end to `max(3,6)=6` | `[[1,6]]` |
| 2 | `[8,10]` | `[1,6]` | `8 <= 6` -> No | push new interval | `[[1,6],[8,10]]` |
| 3 | `[15,18]` | `[8,10]` | `15 <= 10` -> No | push new interval | `[[1,6],[8,10],[15,18]]` |

Final answer:

```txt
[[1,6],[8,10],[15,18]]
```

---

## STEP 12: Quick Reference

```txt
Goal:
Merge all overlapping intervals

Important overlap rule:
touching boundaries also merge

Brute force:
Har interval ko base lo
future overlaps absorb karo

Optimal:
Sort karo
bas last merged interval se compare karo

Overlap condition:
currentStart <= lastMergedEnd

If overlap:
extend end with max(...)

If no overlap:
push new interval
```
