# Majority Element II

Given an integer array `nums`, return all elements that appear **more than** `floor(n / 3)` times.

Important:
- answer me `0`, `1`, ya `2` elements ho sakte hain
- output order matter nahi karta
- unlike majority-element (`n/2` wala), yahan answer guaranteed nahi hai

Example:

```txt
nums = [1, 2, 3, 1, 2, 1, 2]
length = 7
threshold = floor(7 / 3) = 2

1 appears 3 times
2 appears 3 times

Answer = [1, 2]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har element ko candidate maan lo.
Poore array me us candidate ki frequency count karo.
Agar woh `floor(n / 3)` se zyada baar aata hai, answer me daal do.

**How it works:**

1. `threshold = floor(n / 3)` nikaalo
2. Har index `i` ke liye `nums[i]` ko candidate maan lo
3. Poore array me uski frequency count karo
4. Agar count threshold se zyada ho, result me push karo
5. Same answer dobara push na ho, isliye duplicate push avoid karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)` output ko chhodkar

**Why slow:**

Same values ki frequency baar-baar count hoti hai.

---

## Approach 2: Better (HashMap / Frequency Map)

**Prerequisites (Agar Koi Chahiye):**
- **Map / HashMap basics**
- **Why needed:** Har value ki frequency efficiently track karni hai

**Intuition (Soch):**

Brute force ki repeated counting hata do.
Ek pass me saari frequencies map me store kar lo.
Phir map scan karke threshold cross karne wale elements nikaal lo.

**How it works:**

1. `threshold = floor(n / 3)` nikaalo
2. `Map<number, number>` banao
3. Array traverse karke har value ka count update karo
4. Map ke entries scan karo
5. Jiska count `threshold` se zyada ho, result me daal do

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why better:**

Har value ka count ek hi baar build hota hai.

---

## Approach 3: Optimal (Boyer-Moore Voting for n/3)

**Prerequisites (Agar Koi Chahiye):**
- **Boyer-Moore Voting intuition**
- **Why needed:** constant space me sirf possible majority candidates track karne hain

**Intuition (Soch):**

Sabse pehla key insight:

```txt
n / 3 se zyada aane wale elements maximum 2 hi ho sakte hain
```

Isliye hume sirf:

- `candidate1`, `count1`
- `candidate2`, `count2`

track karne hain.

Different values ek dusre ko cancel karte hue socho.
Jo values genuinely threshold cross karti hain,
wo eventually candidate list me survive kar jaati hain.

**How it works:**

1. Two candidates aur unke counts maintain karo
2. Same candidate mile toh uska count badhao
3. Empty slot mile toh current number ko candidate banao
4. Current number dono se different ho aur dono counts positive hon:
   dono counts ghatao
5. First pass ke baad actual frequencies verify karo
6. Jo candidate truly `> floor(n/3)` ho, usko answer me daalo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

HashMap ki jagah sirf 2 candidate slots enough hote hain.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | None | Exact counting but repetitive |
| Better | `O(n)` | `O(n)` | HashMap basics | Easiest frequency-based approach |
| Optimal | `O(n)` | `O(1)` | Boyer-Moore intuition | Best space complexity, but second pass verification mandatory |

---

## Which one to implement?

Current folder me teeno versions available hain:

- `brute-force.ts`
- `better.ts`
- `optimal.ts`

Learning order ke liye best flow:
- pehle brute se threshold logic pakdo
- phir better me frequency map dekh lo
- phir optimal me samjho ki 2 candidate slots hi kyun enough hain
