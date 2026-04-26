# Word Break

## Problem Samjho

Hume ek string `s` aur ek dictionary `wordDict` di gayi hai.

Check karna hai:

```txt
kya string ko dictionary ke words me completely tod sakte hain?
```

Important rules:

```txt
1. Puri string cover honi chahiye
2. Sirf dictionary ke words use kar sakte hain
3. Same word multiple times use kar sakte hain
4. Answer sirf true/false hai
```

Example:

```txt
s = "leetcode"
wordDict = ["leet", "code"]
```

Because:

```txt
"leetcode" = "leet" + "code"
```

So answer:

```txt
true
```

Another example:

```txt
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

Yahan:

```txt
"cat" + "sand" + "og"  -> invalid
"cats" + "and" + "og"  -> invalid
```

So answer:

```txt
false
```

---

## Key Insight

Problem ko index-based recursion ki tarah dekhte hain.

Question becomes:

```txt
Agar main string ke index `start` par khada hoon,
toh kya suffix `s[start...]` dictionary words se break ho sakta hai?
```

Har `start` par:

```txt
dictionary ke saare words try karo
jo word current position par match kare,
uske baad remaining suffix ko recursively solve karo
```

---

## Why Memoization Needed

Brute-force recursion me same `start` index baar-baar aata hai.

Example:

```txt
s = "catsandog"
```

Alag paths same suffix par aa sakte hain:

```txt
canBreakFrom(7)
```

Agar ek baar pata chal gaya ki index `7` se string break nahi ho sakti,
toh next time usi index ko dobara solve karna waste hai.

Isliye:

```txt
memo[start] = kya s[start...] break ho sakta hai?
```

---

## Approach

### Recursive Question

```txt
canBreakFrom(start)
```

Meaning:

```txt
suffix `s[start...]` break ho sakta hai ya nahi?
```

### Recurrence

Har word ke liye:

```txt
agar s current `start` se is word se start hoti hai,
toh next start = start + word.length
```

Then:

```txt
agar canBreakFrom(nextStart) true hai,
toh current start bhi true hoga
```

### Base Case

```txt
start === s.length
```

Meaning:

```txt
puri string successfully consume ho gayi
```

So:

```txt
true
```

---

## Complexity

Let:

```txt
n = string length
d = dictionary size
L = average word length
```

### Time Complexity: `O(n * d * L)`

Reason:

```txt
Har start index ek baar solve hota hai because of memoization
Aur har start par hum dictionary ke saare words try karte hain
Aur `startsWith` comparison word length tak ja sakta hai
```

### Space Complexity: `O(n)`

Reason:

```txt
memo array + recursion stack
```
