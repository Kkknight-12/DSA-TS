# Longest Consecutive Sequence

Given an unsorted integer array `nums`, return the **length of the longest consecutive elements sequence**.

Consecutive ka matlab:

```txt
x, x+1, x+2, x+3 ...
```

Order input array me matter nahi karta.
Bas values consecutive honi chahiye.

Example:

```txt
nums = [100, 4, 200, 1, 3, 2]

Longest consecutive sequence:
1, 2, 3, 4

Answer = 4
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har number ko sequence start maan lo.
Phir check karo `num + 1`, `num + 2`, `num + 3` ... present hain ya nahi.

Problem yeh hai ki presence check agar array me linear search se karoge,
toh same kaam bahut baar repeat hoga.

**How it works:**

1. Har number ko potential start maan lo
2. `current = num` se start karo
3. Array me linear search se check karo `current + 1` hai ya nahi
4. Jab tak milta rahe, length badhao
5. Maximum length track karo

**Time Complexity:** worst case `O(n^3)`
**Space Complexity:** `O(1)`

**Why slow:**

Same streak baar-baar recount hoti hai,
aur har membership check costly hai.

---

## Approach 2: Better (Sorting)

**Prerequisites (Agar Koi Chahiye):**
- **Sorting**
- **Why needed:** values ko adjacent laake streak scan karni hai

**Intuition (Soch):**

Agar array sort ho jaye, toh consecutive numbers side-by-side aa jayenge.

Example:

```txt
[100, 4, 200, 1, 3, 2]
sort -> [1, 2, 3, 4, 100, 200]
```

Ab simple scan se streak length nikaal sakte hain.

**How it works:**

1. Array sort karo
2. Left se right scan karo
3. Agar current value previous + 1 hai, current streak badhao
4. Agar same value hai, ignore karo
5. Warna streak reset karo
6. Maximum track karo

**Time Complexity:** `O(n log n)`
**Space Complexity:** depends on sorting implementation

**Why better:**

Repeated searching band ho jaata hai.

---

## Approach 3: Optimal (HashSet)

**Prerequisites (Agar Koi Chahiye):**
- **HashSet / Set basics**
- **Why needed:** fast lookup se sirf actual sequence starts se count karna hai

**Intuition (Soch):**

Har number se streak start karna zaroori nahi.

Actual start wahi hai jiske pehle wala number present na ho:

```txt
num is a start if (num - 1) does not exist
```

Example:

```txt
[1, 2, 3, 4]

1 -> start
2 -> start nahi, kyunki 1 already hai
3 -> start nahi, kyunki 2 hai
4 -> start nahi, kyunki 3 hai
```

Yani sirf true starts se hi streak count karo.

**How it works:**

1. Saare numbers Set me daalo
2. Har unique number pe iterate karo
3. Agar `num - 1` present hai, skip karo
4. Warna yeh streak ka real start hai
5. `num + 1`, `num + 2` ... check karke streak length count karo
6. Maximum streak track karo

**Time Complexity:** `O(n)` average
**Space Complexity:** `O(n)`

**Why optimal:**

Har streak sirf ek baar count hoti hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Notes |
|---|---:|---:|---|---|
| Brute Force | worst case `O(n^3)` | `O(1)` | None | Repeated linear searches |
| Better | `O(n log n)` | depends on sorting | Sorting | Sorted scan simple hota hai |
| Optimal | `O(n)` average | `O(n)` | HashSet basics | Sirf true starts se count |

---

## Which one to implement?

Current folder me abhi:

- `optimal.ts`

Learning order ke liye best flow:
- pehle brute-force pain samjho
- phir sorting approach
- phir HashSet ka real insight dekho: "sirf starts se count karo"
