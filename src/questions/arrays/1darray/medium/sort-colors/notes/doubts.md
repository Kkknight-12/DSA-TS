# Sort Colors — Doubts

## optimal.ts Doubts

## Doubt 1: Why can we do `mid++` in the `0` case?

### Question

```txt
Why 0 case me mid++ kar sakte hain?

What if the swap value that comes to mid is 2?
Then we would do mid++ and skip that 2, right?
```

### Explanation

This doubt tab aata hai jab hum sirf swap dekhte hain,
but pointer regions ko actively track nahi karte.

Real answer ye hai:

```txt
0-case me swap ke baad mid par 2 aa hi nahi sakta.
```

Why?

Because Dutch National Flag algorithm har iteration se pehle ek invariant maintain karti hai:

```txt
[0 ... low-1]    -> all 0s
[low ... mid-1]  -> all 1s
[mid ... high]   -> unknown
[high+1 ... n-1] -> all 2s
```

Ab current case dekho:

```txt
nums[mid] == 0
```

Code:

```ts
[nums[low], nums[mid]] = [nums[mid], nums[low]];
low++;
mid++;
```

User ka doubt:

```txt
swap ke baad nums[low] ka old value mid par aayega
what if that old value 2 hua?
```

### Step 1: `low` actually kis region me hota hai?

`low` is region ke start par hota hai:

```txt
[low ... mid-1] -> all 1s
```

So if `low < mid`, then:

```txt
nums[low] must be 1
```

It cannot be 2.

Why not 2?

Because 2s ke liye separate right region already defined hai:

```txt
[high+1 ... n-1] -> all 2s
```

Aur unknown 2s agar bache bhi hain,
woh is region me honge:

```txt
[mid ... high]
```

But `low` in dono regions me nahi hai.

So:

```txt
nums[low] can never be 2 in the 0-case swap
```

### Step 2: Do actual possibilities kya hain?

Swap ke waqt only 2 valid possibilities hain.

#### Case A: `low == mid`

Example:

```txt
low = 2
mid = 2
nums[mid] = 0
```

Swap:

```txt
swap(nums[2], nums[2])
```

Yani self-swap.

Kuch dangerous incoming value aaya hi nahi.

Then:

```txt
low++
mid++
```

safe hai.

#### Case B: `low < mid`

Then `nums[low]` belongs to:

```txt
[low ... mid-1]
```

and that whole region is already:

```txt
all 1s
```

So swap ke baad:

```txt
0 goes to left side
1 comes to mid
```

Aur `1` middle region ki correct value hai.

That is why `mid++` safe hai.

### Step 3: Small concrete example

Suppose:

```txt
nums = [0, 0, 1, 1, 0, 2, 2]
low = 2
mid = 4
high = 4
```

Current region meaning:

```txt
[0, 0]       -> 0-region
[1, 1]       -> 1-region
[0]          -> unknown (mid)
[2, 2]       -> 2-region
```

Important values:

```txt
nums[low] = 1
nums[mid] = 0
```

Swap:

```txt
before: [0, 0, 1, 1, 0, 2, 2]
after:  [0, 0, 0, 1, 1, 2, 2]
```

What came to `mid`?

```txt
1
```

Not 2.

So now:

```txt
low++
mid++
```

is correct.

### Step 4: Why `2` case is different

Now compare with this case:

```txt
nums[mid] == 2
```

Code:

```ts
[nums[mid], nums[high]] = [nums[high], nums[mid]];
high--;
```

Yahan swap `high` ke saath hota hai.

`high` kis side par hota hai?

At the border of:

```txt
[mid ... high] -> unknown
```

So `nums[high]` se jo value `mid` par aayegi,
woh ho sakti hai:

- `0`
- `1`
- `2`

Anything.

That is why `2` case me:

```txt
mid ko aage nahi badha sakte
```

Because new `nums[mid]` still unknown hai.

### Step 5: Final mental rule

`0` case:

```txt
incoming value comes from low
and low can only give:
  - same 0 (if low == mid)
  - or a 1
```

So `mid++` safe.

`2` case:

```txt
incoming value comes from high
and high gives an unknown value
```

So `mid` must stay.

### Short version

```txt
0-case me mid++ safe hai because nums[low] can never be 2.
It is either:
- the same 0 (if low == mid), or
- a 1 from the [low ... mid-1] region.
```
