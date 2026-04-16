# Doubts - Longest Palindromic Substring

## Doubt 1: `end = start + length - 1` formula ka meaning

Question:

```txt
Code me ye line kyun hai?

const end = start + length - 1;

Ye formula kaise aaya?
```

Answer:

Pehle string ko indexes ke saath dekho:

```txt
s = "babad"

index:  0 1 2 3 4
char:   b a b a d
```

String indexing `0` se start hoti hai.
So first character ka index `0`, second ka index `1`, and so on.

Ab maan lo:

```txt
start = 1
length = 3
```

Meaning:

```txt
absolute index 1 se start karo
total 3 characters lo
```

Step-by-step count:

```txt
absolute index:  1 2 3
char:            a b a
local count:     1 2 3
```

Yahan `local count` substring ke andar character number hai.
Ye string index nahi hai.

Zero-based local offset se dekho toh:

```txt
local offset:    0 1 2
absolute index:  1 2 3
char:            a b a
```

Important observation:

```txt
3 characters lene ke liye start se 2 steps aage jana padta hai
```

Because:

```txt
1st character -> start + 0
2nd character -> start + 1
3rd character -> start + 2
```

General rule:

```txt
length characters lene ke liye start se length - 1 steps aage jana padta hai
```

So inclusive ending index:

```txt
end = start + (length - 1)
```

Same thing written as:

```txt
end = start + length - 1
```

Example:

```txt
start = 1
length = 3

end = start + length - 1
end = 1 + 3 - 1
end = 3
```

Selected range:

```txt
[start..end] = [1..3]
```

Characters:

```txt
s[1], s[2], s[3]
= "a", "b", "a"
= "aba"
```

Why not `start + length`?

```txt
start + length = 1 + 3 = 4
```

Index `4` would include one extra character:

```txt
s[1..4] = "abad"
```

That is 4 characters, not 3.

So:

```txt
start + length
```

is not inclusive `end`.
It is the exclusive boundary.

That is why JavaScript `slice` uses:

```ts
s.slice(start, start + length)
```

because `slice` ka second argument exclusive hota hai.

But our palindrome helper uses inclusive indexes:

```ts
isPalindrome(s, start, end)
```

So hume inclusive `end` chahiye:

```txt
end = start + length - 1
```

Condition:

```ts
start + length <= s.length
```

Meaning:

```txt
exclusive boundary string ke andar ya string ke exactly end par honi chahiye
```

Example:

```txt
s = "babad"
s.length = 5

start = 1
length = 3

start + length = 4
4 <= 5 true
```

This means substring fits:

```txt
exclusive boundary = 4
selected indexes   = 1, 2, 3
```

Another example:

```txt
start = 1
length = 5

start + length = 6
6 <= 5 false
```

This does not fit, because 5 characters from index `1` would require:

```txt
indexes 1, 2, 3, 4, 5
```

But index `5` does not exist.

Short memory:

```txt
exclusive boundary = start + length
inclusive end      = start + length - 1
```

---

## Doubt 2: Do loops all substrings kaise cover karte hain?

Question:

```ts
for (let length = s.length; length >= 1; length--) {
  for (let start = 0; start + length <= s.length; start++) {
    const end = start + length - 1;
  }
}
```

Ye dono loops string ke andar ki saari possible substrings kaise cover karte hain?

Answer:

In loops ko simple language me aise padho:

```txt
outer loop  -> substring ki size/length choose karo
inner loop  -> us length ki substring kahan se start hogi choose karo
end formula -> selected substring kahan tak jayegi nikaalo
```

Take:

```txt
s = "babad"
n = 5
```

Indexes:

```txt
index:  0 1 2 3 4
char:   b a b a d
```

Outer loop:

```ts
for (let length = s.length; length >= 1; length--)
```

This tries every possible substring length:

```txt
length = 5
length = 4
length = 3
length = 2
length = 1
```

So outer loop answers:

```txt
kitni badi substring check karni hai?
```

Inner loop:

```ts
for (let start = 0; start + length <= s.length; start++)
```

For a fixed `length`, this tries every valid starting index.

Condition:

```txt
start + length <= s.length
```

means:

```txt
is start se itni length ki substring string ke andar fit hoti hai ya nahi?
```

Now all windows:

### length = 5

| start | end | substring |
|---:|---:|---|
| 0 | 4 | `"babad"` |

Only one window possible hai.
Because 5-length substring sirf index `0` se fit hoti hai.

### length = 4

| start | end | substring |
|---:|---:|---|
| 0 | 3 | `"baba"` |
| 1 | 4 | `"abad"` |

### length = 3

| start | end | substring |
|---:|---:|---|
| 0 | 2 | `"bab"` |
| 1 | 3 | `"aba"` |
| 2 | 4 | `"bad"` |

### length = 2

| start | end | substring |
|---:|---:|---|
| 0 | 1 | `"ba"` |
| 1 | 2 | `"ab"` |
| 2 | 3 | `"ba"` |
| 3 | 4 | `"ad"` |

### length = 1

| start | end | substring |
|---:|---:|---|
| 0 | 0 | `"b"` |
| 1 | 1 | `"a"` |
| 2 | 2 | `"b"` |
| 3 | 3 | `"a"` |
| 4 | 4 | `"d"` |

Together:

```txt
length 5: babad
length 4: baba, abad
length 3: bab, aba, bad
length 2: ba, ab, ba, ad
length 1: b, a, b, a, d
```

That is every continuous substring.

Why every substring gets covered:

Any substring can be uniquely described by:

```txt
1. start index
2. length
```

Example:

```txt
"aba" in "babad"
```

Description:

```txt
start = 1
length = 3
end = 3
```

Another example:

```txt
"ad" in "babad"
```

Description:

```txt
start = 3
length = 2
end = 4
```

The outer loop tries every possible `length`.
The inner loop tries every possible `start` for that length.

So every valid substring is checked exactly once.

Important:

```txt
This covers all substrings, not all subsequences.
```

Substring continuous hota hai:

```txt
"bab" -> valid substring
```

Subsequence continuous hona zaruri nahi:

```txt
"bbd" -> subsequence ho sakta hai,
but substring nahi, because indexes continuous nahi hain
```

Short memory:

```txt
outer loop = which size substring?
inner loop = where does that size substring start?
end formula = where does that substring stop?
```

And because length longest se shortest ja rahi hai:

```ts
for (let length = s.length; length >= 1; length--)
```

first palindrome milte hi answer return kar sakte hain.
Kyunki usse badi lengths already check ho chuki hoti hain.
