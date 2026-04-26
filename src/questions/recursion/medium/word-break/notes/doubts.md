# Word Break - Doubts

## 1. `memo` array kyu chahiye?

Question:

```txt
Why do we maintain `memo[start]`?
```

Answer:

`canBreakFrom(start)` ka meaning hai:

```txt
kya suffix `s[start...]` dictionary words se completely break ho sakta hai?
```

Same `start` index multiple recursive paths se baar-baar aa sakta hai.

Example:

```txt
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

Do alag paths same suffix par pahunch sakte hain:

```txt
"cat"  -> "sand" -> start = 7
"cats" -> "and"  -> start = 7
```

Ab `start = 7` ka meaning:

```txt
kya "og" break ho sakta hai?
```

Agar ek baar pata chal gaya ki:

```txt
canBreakFrom(7) = false
```

toh next time dobara `"og"` solve karna waste hai.

Isliye:

```txt
memo[7] = false
```

and next time:

```txt
seedha cached result return
```

So `memo` repeated suffix problems ko dobara solve hone se bachata hai.

---

## 2. `remainingCanBreak` true aane par upar ke calls bhi true kyu ho jaate hain?

Question:

```txt
const remainingCanBreak = canBreakFrom(nextStart);

if (remainingCanBreak) {
  memo[start] = true;
  return true;
}
```

Kya deep nested call true aane par sab recursive calls automatically true ho jaate hain?
```

Answer:

Sab calls automatically true nahi ho jaate.

Sirf woh parent calls true hote hain jinhone:

```txt
1. current position par valid word choose kiya
2. aur us chosen word ke baad remaining suffix bhi valid nikli
```

Parent frame ka logic hota hai:

```txt
Agar maine current word choose kiya,
aur uske baad ki remaining string break ho gayi,
toh mera current suffix bhi break ho sakta hai.
```

Example:

```txt
s = "leetcode"
wordDict = ["leet", "code"]
```

Flow:

```txt
canBreakFrom(0)
  choose "leet"
  nextStart = 4
  ask canBreakFrom(4)

canBreakFrom(4)
  choose "code"
  nextStart = 8
  ask canBreakFrom(8)

canBreakFrom(8)
  start === s.length
  return true
```

Ab unwind:

```txt
canBreakFrom(4):
  "code" match hua
  remaining suffix true mili
  => current suffix "code" bhi solvable
  => return true

canBreakFrom(0):
  "leet" match hua
  remaining suffix true mili
  => current suffix "leetcode" bhi solvable
  => return true
```

So `true` sirf successful path par propagate hota hai.

---

## 3. Fir `memo[start] = false` aur `return false` kyu likha?

Question:

```txt
Why do we need:

memo[start] = false;
return false;
```

Answer:

Ye line tab chalti hai jab:

```txt
current `start` index par dictionary ke saare words try kar liye
but koi bhi full successful segmentation nahi bana saka
```

Meaning:

```txt
is suffix ka answer definitively false hai
```

Example:

```txt
s = "catsandog"
start = 7
suffix = "og"
```

Try all words:

```txt
"cats"  -> match nahi
"dog"   -> match nahi
"sand"  -> match nahi
"and"   -> match nahi
"cat"   -> match nahi
```

Koi bhi word `"og"` ko current start se solve nahi karta.

So:

```txt
memo[7] = false
return false
```

Iska matlab:

```txt
future me agar koi aur path bhi start = 7 par aaye,
toh direct false return ho jayega
```

### Full Tree: where `memo[7] = false` gets created and reused

Example:

```txt
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

Important suffixes:

```txt
start = 0 -> "catsandog"
start = 3 -> "sandog"
start = 4 -> "andog"
start = 7 -> "og"
```

Tree of major choices:

```txt
canBreakFrom(0) for "catsandog"
│
├── try "cats" at start 0 -> match
│   └── canBreakFrom(4) for "andog"
│       │
│       ├── try "cats" at start 4 -> no match
│       ├── try "dog"  at start 4 -> no match
│       ├── try "sand" at start 4 -> no match
│       ├── try "and"  at start 4 -> match
│       │   └── canBreakFrom(7) for "og"
│       │       │
│       │       ├── try "cats" at start 7 -> no match
│       │       ├── try "dog"  at start 7 -> no match
│       │       ├── try "sand" at start 7 -> no match
│       │       ├── try "and"  at start 7 -> no match
│       │       ├── try "cat"  at start 7 -> no match
│       │       └── no word works
│       │           memo[7] = false
│       │           return false
│       │
│       ├── try "cat" at start 4 -> no match
│       └── no word works from start 4
│           memo[4] = false
│           return false
│
├── try "dog" at start 0 -> no match
├── try "sand" at start 0 -> no match
├── try "and" at start 0 -> no match
│
└── try "cat" at start 0 -> match
    └── canBreakFrom(3) for "sandog"
        │
        ├── try "cats" at start 3 -> no match
        ├── try "dog"  at start 3 -> no match
        ├── try "sand" at start 3 -> match
        │   └── canBreakFrom(7) for "og"
        │       │
        │       └── memo[7] already false
        │           return false immediately
        │
        ├── try "and" at start 3 -> no match
        ├── try "cat" at start 3 -> no match
        └── no word works from start 3
            memo[3] = false
            return false

Final:
memo[0] = false
return false
```

What happened here:

```txt
1. start = 7 pe pehli baar actual computation hui
2. koi word "og" ko solve nahi kar saka
3. so memo[7] = false store hua
4. later second branch again start = 7 par aayi
5. ab poora subtree dobara run nahi hua
6. direct cached false return hua
```

This is exactly why these two lines both important hain:

```txt
memo[start] = false;
return false;
```

Without them:

```txt
same unsolvable suffix baar-baar recompute hoti
```

---

## 4. Cached answer check ka exact kaam kya hai?

Question:

```txt
const cachedAnswer = memo[start];
if (cachedAnswer !== undefined) {
  return cachedAnswer;
}
```

Answer:

Ye line bol rahi hai:

```txt
Kya main is suffix ka answer pehle hi nikal chuka hoon?
```

If yes:

```txt
poori subtree dubara explore mat karo
seedha cached true/false return karo
```

So cached answer:

| cached value | meaning |
|---|---|
| `true` | `s[start...]` break ho sakta hai |
| `false` | `s[start...]` break nahi ho sakta |
| `undefined` | abhi tak solve hi nahi kiya |

---

## 5. Problem exactly true kab deti hai aur false kab?

### `true` kab?

Do cases me:

#### Case 1: Base case

```txt
start === s.length
```

Meaning:

```txt
puri string exactly consume ho gayi
```

So:

```txt
true
```

#### Case 2: Recursive success

```txt
current word match karta hai
and canBreakFrom(nextStart) = true
```

Meaning:

```txt
current prefix + remaining suffix
dono milkar full valid segmentation bana rahe hain
```

So:

```txt
true
```

### `false` kab?

```txt
jab current start se koi bhi dictionary word full successful segmentation nahi bana pata
```

Meaning:

```txt
current suffix unsolvable hai
```

So:

```txt
false
```

---

## 6. Kya `wordDict` ke saare words use karne padte hain?

Question:

```txt
Does every word in `wordDict` need to be matched?
Must all dictionary words appear in the string?
```

Answer:

```txt
Nahi.
Dictionary ke saare words use karna zaroori nahi hai.
```

Actual requirement:

```txt
Hume full string ko dictionary ke kisi bhi valid words ke combination se break karna hai.
```

That means:

```txt
all words in dictionary use karna necessary nahi
dictionary ke bahar ka word use karna allowed nahi
```

Example:

```txt
s = "leetcode"
wordDict = ["leet", "code", "apple", "pen"]
```

Yahan:

```txt
"leet" + "code" kaafi hai
```

`"apple"` aur `"pen"` unused reh sakte hain.

Phir bhi answer:

```txt
true
```

Another example:

```txt
s = "applepenapple"
wordDict = ["apple", "pen", "cat", "dog"]
```

Yahan:

```txt
"apple" + "pen" + "apple"
```

enough hai.

`"cat"` aur `"dog"` unused reh sakte hain.

So:

```txt
matching all words inside dictionary is NOT necessary
full string ko break karna necessary hai
```

---

## 7. One-line summary

```txt
Word Break me hum dictionary ke saare words ko match nahi karte.
Hum bas check karte hain ki full string ko dictionary ke kuch valid words se completely segment kar sakte hain ya nahi.
Memo same suffix problem ka cached true/false answer store karta hai.
```
