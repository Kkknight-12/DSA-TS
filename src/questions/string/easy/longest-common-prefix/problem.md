# Longest Common Prefix

Given an array of strings `strs`, return the longest common prefix among all strings.

If there is no common prefix, return `""`.

Examples:

```txt
["flower", "flow", "flight"] -> "fl"
["dog", "racecar", "car"]    -> ""
["interview", "internet"]    -> "inter"
```

Important:

- prefix means string ke start se beginning part
- substring nahi, prefix chahiye
- answer sabhi strings me common hona chahiye
- ek bhi string mismatch kare, toh us point ke baad prefix extend nahi ho sakta

---

## Approach 1: Brute Force - First String Ke Saare Prefix Try Karo

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Longest common prefix hamesha first string ke kisi prefix jaisa hi hoga.

So brute force idea:

```txt
first string lo
uske longest se shortest tak saare prefixes try karo
jo pehla prefix sabhi strings me common ho, wahi answer
```

**How it works:**

1. First string lo
2. Uski length se `1` tak prefix lengths try karo
3. Har prefix ke liye check karo ki sab strings us prefix se start hoti hain ya nahi
4. Jo pehla valid prefix mile, return karo
5. Agar kuch na mile, `""` return karo

**Time Complexity:** `O(n * m^2)`
**Space Complexity:** `O(m)`

Where:

- `n` = number of strings
- `m` = first / shortest relevant prefix length

**Why slow:**

Har prefix length alag try ho rahi hai,
aur har baar sab strings ke against dubara check karna pad raha hai.

---

## Approach 2: Better - Horizontal Scanning

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Pehli string ko current prefix maan lo.
Phir next string ke saath compare karo.
Agar match nahi karta, prefix ko chhota karte jao.

```txt
prefix = strs[0]

prefix ko strs[1] ke hisaab se shrink karo
phir strs[2] ke hisaab se shrink karo
...
```

**How it works:**

1. `prefix = strs[0]`
2. Har next string ke liye:
3. Jab tak current string `prefix` se start nahi hoti,
   prefix ka last character hatao
4. End me jo prefix bache, wahi answer

**Time Complexity:** `O(S)`
**Space Complexity:** `O(1)`

Where:

- `S` = sabhi strings ke total characters

**Why better:**

Duplicate full re-checking kam ho jaati hai.
Prefix ek running state ke tarah shrink hota hai.

---

## Approach 3: Optimal - Vertical Scan Using Shortest String

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Common prefix kabhi bhi shortest string se bada nahi ho sakta.

So:

```txt
pehle shortest string lo
phir uske characters ko left se right check karo
har position par sab strings me same character hai ya nahi
```

Jaise hi mismatch mila,
usi point se pehle tak ka prefix answer hoga.

**How it works:**

1. Sabse shortest string dhundo
2. `i = 0` se shortest string ke end tak chalo
3. Har `i` par check karo ki sab strings me character same hai ya nahi
4. Agar mismatch mil gaya, shortest string ka `0..i-1` part return karo
5. Agar poori shortest string match ho gayi, shortest string hi answer hai

**Time Complexity:** `O(S)`
**Space Complexity:** `O(1)`

**Why this is marked optimal here:**

Horizontal scan aur vertical scan dono asymptotically `O(S)` ho sakte hain.

Yahan vertical scan ko `optimal` isliye mark kar rahe hain:

- logic direct hai
- first mismatch par seedha stop hota hai
- shortest string natural upper bound de deti hai

So this is more of a cleaner repo choice,
not a strict "only optimal" claim.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n * m^2)` | `O(m)` | none | saare candidate prefixes try karo |
| Better | `O(S)` | `O(1)` | none | running prefix ko shrink karte jao |
| Optimal | `O(S)` | `O(1)` | none | shortest string se position-by-position verify karo |

---

## Learning Order

Pehle prefix ka meaning pakdo:

```txt
prefix hamesha starting se hota hai
```

Phir brute force soch:

```txt
kaunsa prefix sabhi strings me common hai?
```

Phir better idea:

```txt
running prefix ko shrink kar sakte hain
```

Phir cleaner optimal view:

```txt
shortest string se left-to-right positions verify karo
```

Important note:

```txt
Binary search on prefix length bhi possible hai,
but asymptotically yahan horizontal/vertical scan se better nahi hota.
```

Most important memory line:

```txt
Longest common prefix wahi hai jo first mismatch se pehle tak sab strings me same chale.
```
