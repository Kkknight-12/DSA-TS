# Kth Missing Positive Number — Doubts

---

## Doubt 1: Why `answer = left + k`?

### Question

```txt
When we say:

left = first index jahan missingCount >= k

that means loop end pe left us jagah hai jahan missing count finally enough ho gaya.

For:
arr = [2, 3, 4, 7, 11], k = 5

loop end pe left = 4
arr[4] = 11
missingCount till there = 6

Hume 5th missing chahiye, toh answer left + k kyun?

Aur left ko sirf index nahi,
"answer se pehle kitne array elements present hain"
aisa kyun bolte hain?
```

### Explanation

Left loop end pe us index pe hota hai jahan first time `missingCount >= k` ho jata hai.

For this example:

```txt
arr = [2, 3, 4, 7, 11]
idx    0  1  2  3   4

missingCount(i) = arr[i] - (i + 1)

idx 0 -> 2 - 1 = 1
idx 1 -> 3 - 2 = 1
idx 2 -> 4 - 3 = 1
idx 3 -> 7 - 4 = 3
idx 4 -> 11 - 5 = 6
```

We want `k = 5`.

So:

- at idx 3, missing count is 3 -> still not enough
- at idx 4, missing count is 6 -> now enough

That means:

- `right = 3` is last place where missing count `< 5`
- `left = 4` is first place where missing count `>= 5`

So the 5th missing number is between:

```txt
arr[3] = 7
arr[4] = 11
```

And indeed missing numbers there are:

```txt
8, 9, 10
```

Since till `7` we had only 3 missing numbers:

```txt
1, 5, 6
```

We need 2 more:

- 4th missing = 8
- 5th missing = 9

So answer = `9`.

### Real reason behind `left + k`

Because `left` yahan sirf index nahi hai.
End pe `left = 4` means:

```txt
answer se pehle 4 array elements present hain
```

Which 4?

```txt
2, 3, 4, 7
```

And since we want the 5th missing, answer se pehle/including answer total:

- 4 present numbers
- 5 missing numbers

So total positive numbers covered:

```txt
4 + 5 = 9
```

That is why:

```txt
answer = left + k
```

### Clean counting view

```txt
1..answer ke andar:
left numbers present hain
k numbers missing hain
```

So:

```txt
answer = present + missing = left + k
```

For this example:

```txt
1..9 = [1,2,3,4,5,6,7,8,9]

present from array = 2,3,4,7   -> 4 numbers
missing            = 1,5,6,8,9 -> 5 numbers
```

Hence:

```txt
9 = 4 + 5
```

### Why can we say `left` means "answer se pehle kitne array elements present hain"?

Because `left` is the first index where we crossed enough missing numbers, so the answer is strictly before `arr[left]`.

If `left = 4`, then elements before `arr[4]` are exactly:

```txt
arr[0], arr[1], arr[2], arr[3]
```

That is 4 elements.

And since answer lies before `11`, those 4 are exactly the array elements before the answer.

### Short version

```txt
left = first index where missingCount >= k
=> answer arr[left] se pehle hai
=> answer se pehle left elements present hain
=> kth missing = left + k
```
