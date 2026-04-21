# Doubts - Check Subsequence Sum K

## Why do we skip not-pick when pick already returned true?

Code:

```ts
if (pickedCurrent) {
  return true;
}
```

This line ka meaning ye hai:

```txt
Current frame ke pick-choice subtree me kahin target mil gaya.
```

It does not mean:

```txt
Previous element ne target de diya, so blindly skip karo.
```

It means:

```txt
Maine current element ko pick karke future explore kiya.
Us future me valid subsequence mil gayi.
So final answer already true hai.
```

---

## Pick / Not Pick Logic

Har element ke paas 2 possible choices hoti hain:

```txt
1. Pick     -> current element ko subsequence me include karo
2. Not Pick -> current element ko skip karo
```

Example:

```txt
arr = [5, 1, 2]
k = 3
```

At index `0`, element `5`:

| choice | new sum |
|---|---:|
| pick `5` | `5` |
| not pick `5` | `0` |

At index `1`, element `1`:

| choice | new sum |
|---|---:|
| pick `1` | `1` |
| not pick `1` | `0` |

So recursion is asking:

```txt
Kya current element ko include karne se answer mil sakta hai?
Agar nahi, toh kya current element ko skip karne se answer mil sakta hai?
```

---

## Why Early Return Is Safe Here

Question ye nahi hai:

```txt
Kitni subsequences target banati hain?
```

Question ye hai:

```txt
Kya koi ek subsequence target banati hai?
```

So agar pick branch se answer mil gaya:

```txt
answer already true
```

Not-pick branch explore karna waste hai.

Visual:

```txt
exists(index=1, sum=0), current element = 1

                current frame
                     |
              pick 1 first
                     |
          exists(index=2, sum=1)
                     |
              pick 2 gives sum 3
                     |
                  true
```

Same frame me second option bacha tha:

```txt
not pick 1
```

But because pick branch already found:

```txt
[1, 2] -> 3
```

we can return:

```txt
true
```

---

## Cupboard Analogy

Imagine key search kar rahe ho.

Room me 2 cupboards hain:

```txt
Cupboard A
Cupboard B
```

Agar Cupboard A me key mil gayi, toh Cupboard B kholna zaroori nahi hai.

But agar question hota:

```txt
Kitni keys hain?
```

then Cupboard B bhi check karna padta.

Same logic:

| problem type | branch behavior |
|---|---|
| check exists? | first `true` enough |
| count all? | both branches required |

---

## Final Mental Model

```ts
const pickedCurrent = existsFromIndex(
  index + 1,
  currentSum + arr[index],
  arr,
  target
);

if (pickedCurrent) {
  return true;
}

return existsFromIndex(index + 1, currentSum, arr, target);
```

Meaning:

```txt
1. Pehle current element pick karke dekho.
2. Agar pick subtree me target mil gaya, true return karo.
3. Agar pick subtree fail hua, tab current element skip karke dekho.
```

Yaad rakho:

```txt
Check problem me first true enough hai.
Count problem me dono branches explore karni padti hain.
```
