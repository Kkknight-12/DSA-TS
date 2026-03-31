# Search Insert Position — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array of distinct integers hai. Target diya hai.
- Target array mein hai → uska **index** return karo
- Target nahi hai → woh **index** return karo jahan insert hone par array sorted rahega

```
nums = [1, 3, 5, 6],  target = 5
5 array mein hai → return 2

nums = [1, 3, 5, 6],  target = 2
2 nahi hai. Sorted rakhna hai:
  [1, →2←, 3, 5, 6]
   0    1   2  3  4
→ return 1

nums = [1, 3, 5, 6],  target = 7
Sab se bada → end mein:
  [1, 3, 5, 6, →7←]
   0  1  2  3    4
→ return 4 (= n)
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: left to right, pehla element >= target dhundho ya insert position nikalo.

```
nums = [1, 3, 5, 6],  target = 2

idx=0: 1 >= 2? NO
idx=1: 3 >= 2? YES → insert here, return 1
```

**Problem:** n = 10^6 → TLE. Array sorted hai toh binary search se O(log n) mein ho sakta hai.

---

## STEP 3: Key Insight — YEH LOWER BOUND HI HAI!

Ek second ruko aur socho:

```
Lower Bound = pehla index jahan nums[i] >= target
```

Yahi toh search insert chahta hai!

```
Case 1: target = 5, nums = [1, 3, 5, 6]
  Lower bound of 5 → pehla index where nums[i] >= 5
  → nums[2] = 5 → index 2

  nums[2] == target? YES → target found at index 2 ✓

Case 2: target = 2, nums = [1, 3, 5, 6]
  Lower bound of 2 → pehla index where nums[i] >= 2
  → nums[1] = 3 → index 1

  nums[1] == target? NO → lekin 2 yahan insert hoga ✓
  [1, →2←, 3, 5, 6] → sorted! ✓

Case 3: target = 7, nums = [1, 3, 5, 6]
  Lower bound of 7 → pehla index where nums[i] >= 7
  → koi nahi → n = 4

  Insert at 4 (end) ✓
```

**Dono cases mein Lower Bound hi answer deta hai!**

---

## STEP 4: Core Variables — left, right, mid kya hain?

```
left  = 0    → search space ka left boundary
right = n    → n = insert at end case (valid return)
mid   = (left+right)/2  → current candidate index
```

**WHY return left?**
Loop khatam hone pe `left === right` us index pe hote hain jahan:
- Target milta hai → `nums[left] == target` → woh index return hota hai
- Target nahi milta → `nums[left]` pehla element > target → yahan insert karo

Dono cases mein `left` hi correct answer hai.

---

## STEP 5: Monotonic Property

```
nums = [1, 3, 5, 6],  target = 2

idx:    0    1    2    3
val:    1    3    5    6
>=2?:   ✗    ✓    ✓    ✓
             ↑
        first ✓ = index 1 = ANSWER
```

`[✗, ✗, ..., ✓, ✓]` → first ✓ dhundho = Pattern 2 Binary Search!

---

## FULL DRY RUN

### Case: Target exists — nums=[1,3,5,6], target=5

```
left=0, right=4

idx:  0   1   2   3
val:  1   3   5   6
>=5?  ✗   ✗   ✓   ✓
```

| Iter | left | right | mid | nums[mid] | >=5? | Action  |
|------|------|-------|-----|-----------|------|---------|
| 1 | 0 | 4 | 2 | 5 | ✓ | right=2 |
| 2 | 0 | 2 | 1 | 3 | ✗ | left=2  |

left=2 === right=2 → return 2 ✅ (nums[2]=5, found!)

---

### Case: Target missing — nums=[1,3,5,6], target=2

```
left=0, right=4

idx:  0   1   2   3
val:  1   3   5   6
>=2?  ✗   ✓   ✓   ✓
```

| Iter | left | right | mid | nums[mid] | >=2? | Action  |
|------|------|-------|-----|-----------|------|---------|
| 1 | 0 | 4 | 2 | 5 | ✓ | right=2 |
| 2 | 0 | 2 | 1 | 3 | ✓ | right=1 |
| 3 | 0 | 1 | 0 | 1 | ✗ | left=1  |

left=1 === right=1 → return 1 ✅
```
[1, →2←, 3, 5, 6] → index 1 pe insert → sorted! ✓
```

---

## STEP 4: Three Easy Cases

```
target < nums[0] → insert at beginning → return 0
                   LB: all elements >= target → right shrinks to 0

target > nums[n-1] → insert at end → return n
                     LB: no element >= target → left grows to n

target exists → return its index
                LB finds it directly
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
Search Insert = Lower Bound

1. left=0, right=n   ← n, NOT n-1!

2. while (left < right):
   mid = floor((left + right) / 2)
   nums[mid] >= target?
     YES → right = mid
     NO  → left = mid + 1

3. return left

CASES:
  nums[left] == target → found!
  nums[left] != target → insert here

REMEMBER: Yeh literally lower bound hai, kuch naya nahi seekhna!
```
