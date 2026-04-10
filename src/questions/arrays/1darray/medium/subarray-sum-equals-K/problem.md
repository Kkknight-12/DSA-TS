# Subarray Sum Equals K

Given an integer array `nums` and an integer `k`, return the total number of contiguous subarrays whose sum is exactly `k`.

Important:
- subarray contiguous honi chahiye
- answer count hai, length nahi
- array me negative numbers bhi ho sakte hain

Example:

```txt
nums = [1, 1, 1]
k = 2

Valid subarrays:
[1, 1]  -> indices 0..1
[1, 1]  -> indices 1..2

Answer = 2
```

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Har possible start index choose karo.
Us start se har possible end index tak window extend karo.
Running sum maintain karo.

Jab bhi current window sum `k` ho:
- ek valid subarray mil gayi
- `count++`

**How it works:**

1. `start` ko `0` se `n-1` tak chalao
2. Har `start` ke liye `currentSum = 0` rakho
3. `end` ko `start` se `n-1` tak extend karo
4. `currentSum += nums[end]`
5. Agar `currentSum === k`, count badha do

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why not O(n^3):**

Window sum har baar scratch se nahi nikaal rahe.
Running sum carry kar rahe hain.

---

## Approach 2: Optimal (Prefix Sum + HashMap)

**Prerequisites (Agar Koi Chahiye):**
- **Prefix sum**
- **HashMap frequency counting**
- **Why needed:** hume count nikalna hai, sirf existence ya longest length nahi

**Intuition (Soch):**

Current index pe agar:

```txt
currentSum - oldPrefixSum = k
```

toh:

```txt
oldPrefixSum = currentSum - k
```

Yani agar prefix sum `(currentSum - k)` pehle kabhi mila tha,
toh uske next index se current index tak ek valid subarray banti hai.

Aur agar woh prefix sum multiple times mila tha,
toh multiple valid subarrays banti hain.

Isliye map me:

```txt
prefix sum -> frequency
```

store karte hain.

**How it works:**

1. `currentSum` maintain karo
2. Har element pe `currentSum += nums[i]`
3. `neededPrefixSum = currentSum - k`
4. Agar map me `neededPrefixSum` f times mila hai, `count += f`
5. Current prefix sum ki frequency map me update karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why optimal:**

Har index ek hi baar process hota hai,
aur map ki help se previous valid prefix sums instantly mil jaate hain.

---

## Comparison Table

| Approach | Time | Space | Main Idea | Notes |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | har start-end window try karo | simple but quadratic |
| Optimal | `O(n)` | `O(n)` | prefix sum frequency map | negatives aur zeros dono handle karta hai |

---

## Which one to implement?

Current folder me:

- `brute-force.ts`
- `optimal.ts`

Learning order:
- pehle brute force se search space samjho
- phir prefix sum difference ka idea pakdo
- phir samjho ki yahan first index nahi, frequency store karni padti hai

Most important memory line:

```txt
currentSum - oldPrefixSum = k
=> oldPrefixSum = currentSum - k
```
