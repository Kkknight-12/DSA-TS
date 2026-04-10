# Rearrange Array Elements by Sign

Given an integer array `nums`, rearrange it so that:

- the answer starts with a positive number
- positive and negative numbers alternate
- positive numbers keep their original relative order
- negative numbers also keep their original relative order

Original problem guarantee:
- positives count == negatives count
- numbers are non-zero

Example:

```txt
nums = [3, 1, -2, -5, 2, -4]

positives in order = [3, 1, 2]
negatives in order = [-2, -5, -4]

answer = [3, -2, 1, -5, 2, -4]
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Sabse simple idea:
- positives ko ek array me collect karo
- negatives ko dusre array me collect karo
- dono ko alternate karke final answer banao

Ye approach easy isliye hai kyunki:
- order preserve naturally ho jata hai
- final alternating pattern build karna simple ho jata hai

**How it works:**

1. `positiveNumbers` aur `negativeNumbers` arrays banao
2. Input ko ek baar traverse karke sign ke basis par split karo
3. Result array banao
4. Ek positive, phir ek negative daalte jao

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)` extra

**Why not optimal:**

Time toh linear hi hai,
but 2 helper arrays ban rahi hain.

---

## Approach 2: Optimal

**Prerequisites (Agar Koi Chahiye):**
- **Index pattern observation**
- **Why needed:** final answer me even positions positive aur odd positions negative hongi

**Intuition (Soch):**

Final answer ka structure pehle se fixed hai:

```txt
index:   0  1  2  3  4  5
answer:  +  -  +  -  +  -
```

Toh hume positives aur negatives alag store karne ki zarurat nahi.

Jab positive mile:
- next even index par daal do

Jab negative mile:
- next odd index par daal do

**How it works:**

1. `result` array same size ki banao
2. `positiveIndex = 0` rakho
3. `negativeIndex = 1` rakho
4. Har number ko dekho:
   - positive hai -> `result[positiveIndex]`
   - negative hai -> `result[negativeIndex]`
5. Respective index ko `+2` se advance karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)` for result
**Auxiliary Space (excluding output):** `O(1)`

**Why optimal:**

Brute me helper arrays thi.
Yahan direct final slots fill ho rahe hain.

---

## Comparison Table

| Approach | Time | Space | Main Idea | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n)` | `O(n)` extra | positives + negatives alag collect karo | simple and very readable |
| Optimal | `O(n)` | `O(n)` output, `O(1)` auxiliary | direct even/odd slots fill karo | same time, less helper storage |

---

## Which one to implement?

Current folder me:

- `brute-force.ts`
- `optimal.ts`

Learning order:
- pehle brute force samjho: order preserve kaise ho raha hai
- phir optimal samjho: even index positive, odd index negative

Important takeaway:

```txt
is problem me optimal ka real improvement time nahi, storage strategy hai
```
