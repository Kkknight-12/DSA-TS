# Minimum in Rotated Sorted Array — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array hai — lekin kisi point pe rotate kiya gaya hai.
Minimum element dhundo. No duplicates.

```
Original:  [0, 1, 2, 4, 5, 6, 7]   (sorted)
Rotated:   [4, 5, 6, 7, 0, 1, 2]   (rotated at index 4)

Answer: 0
```

**Rotate karna kya hota hai?**
```
[0, 1, 2, 4, 5, 6, 7]
          ↓  rotate at index 4
[4, 5, 6, 7, 0, 1, 2]
```
Array ko kisi jagah se "kaat ke" aage chipka diya.
Minimum wahan hoga jahan yeh cut hua — yani DROP point pe.

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: har element check karo, minimum track karo.

```
[4, 5, 6, 7, 0, 1, 2]
 min=4 → 4 → 4 → 4 → 0 → 0 → 0
```

O(n) — kaam karta hai lekin binary search se O(log n) ho sakta hai.

---

## STEP 3: Key Insight — Drop Point Dhundo

Array mein ek jagah "drop" hota hai — wahan values ek dum gir jaati hain:

```
[4, 5, 6, 7, | 0, 1, 2]
              ↑
           DROP (7 → 0)
```

Array do hisson mein banta hai:
- **High side** (before drop): bade values, badh rahe hain
- **Low side** (after drop): chhote values, badh rahe hain

Minimum hamesha LOW SIDE ka pehla element hota hai.

Binary search se yeh puchhte hain: "mid HIGH side pe hai ya LOW side pe?"

---

## STEP 4: Variables Samjho

```
left  → current search window ka start
right → current search window ka end
mid   → beech ka index
```

Dhyan do — `left`, `right`, `mid` values nahi, **pointers** hain.

```
nums  = [4, 5, 6, 7]
idx     0  1  2  3

right = 3  →  nums[right] = 7
mid   = 1  →  nums[mid]   = 5
```

Agar `right = mid` karein:

```
right = 1
```

Ab right pointer index `1` pe point karega.
Right ki value `mid` ki value se replace nahi hui — sirf pointer move hua.

---

## STEP 5: Mental Model — Pehle Simulation Dekho

Yahin se actual rule niklega.
Formula ya condition yaad karne se pehle 2 windows simulate karte hain.

### Window 1

```
nums = [4, 5, 6, 7, 0, 1, 2]
                 m        r

[mid..right] = [7, 0, 1, 2]
```

Is window ko isolate karke dekho:

```
[7, 0, 1, 2]
 first = 7
 last  = 2
```

Yeh sorted nahi ho sakta — sorted segment mein first value last se badi nahi hoti.

Toh is window ke andar hi drop hai.
Aur agar drop is window ke andar hai, toh minimum bhi isi window mein hoga.
Aur kyunki `mid` khud `7` hai, minimum `mid` pe nahi ho sakta.

Simulation se yeh baat nikli:

```
agar nums[mid] > nums[right]
toh minimum mid ke right mein hai
→ left = mid + 1
```

### Window 2

Ab maan lo hum right side mein aa chuke:

```
nums = [4, 5, 6, 7, 0, 1, 2]
                       l  m  r

[mid..right] = [1, 2]
```

Is window ko dekho:

```
[1, 2]
 first = 1
 last  = 2
```

Yeh sorted hai.
Sorted segment ka smallest element uska pehla element hota hai.
Yahan pehla element `nums[mid]` hai.

Iska matlab:
- `(mid, right]` mein koi smaller value nahi hai
- minimum ya toh `mid` hai, ya phir `mid` ke left mein

Simulation se doosri baat nikli:

```
agar nums[mid] <= nums[right]
toh minimum mid pe ya mid ke left mein hai
→ right = mid
```

Yahi poora mental model hai.
Binary search bas isi observation ko repeat karta hai.

---

## STEP 6: Boundary Cases Pehle Se Dekh Lo

Boundary cases pehle dekhne se conditions aur clear ho jaati hain.

### Case 1: Single element
```
[5]
left == right start se hi → loop nahi chalta → return nums[0] = 5 ✓
```

### Case 2: Two elements, sorted
```
[1, 2]
```
Yahan right side sorted dikhegi, aur search shrink hote hote index `0` pe aa jayegi.

```
mid=0, nums[0]=1 <= nums[1]=2 → right side sorted → right = 0
left=right=0 → return nums[0] = 1 ✓
```

### Case 3: Two elements, rotated
```
[2, 1]
```
Yahan clearly `nums[mid] > nums[right]` milega, to search right ki taraf jump karegi.

```
mid=0, nums[0]=2 > nums[1]=1 → broken suffix → left = 1
left=right=1 → return nums[1] = 1 ✓
```

### Case 4: No rotation
```
[1, 2, 3, 4, 5]
```
Har iteration: right side sorted dikhegi → right = mid.

Isliye `right` left ki taraf aata rahega aur answer index `0` pe settle hoga.

Converges to index 0 → return nums[0] = 1 ✓.

### Case 5: Minimum at last position
```
[2, 3, 4, 5, 1]
```
left iteratively pushes right → converges to index 4 → return nums[4] = 1 ✓

---

## STEP 7: Conditions Ka Meaning

Ab simulation se nikli hui condition ko seedhe words me likhte hain.

### Condition 1

```ts
nums[mid] > nums[right]
```

Meaning:

- `[mid..right]` broken hai
- drop isi side me hai
- minimum `mid` ke right me hai

### Condition 2

```ts
nums[mid] <= nums[right]
```

- `[mid..right]` sorted hai
- iska smallest `nums[mid]` hai
- minimum `mid` pe ya left side mein hai

Dhyan do:

Yeh algorithm `right` ko reference bana raha hai.
Isliye comparison `nums[right]` se ho raha hai.


### `nums[left]` wali confusion

Sirf yeh dekhna:

```ts
nums[mid] > nums[left]
```

itna enough nahi hota.
Kyunki yeh bas yeh batata hai ki `[left..mid]` sorted hai.
Yeh prove nahi karta ki minimum right me hi hai.

Example:

```txt
[1, 2, 3, 4, 5]
 l     m       r

nums[mid] = 3
nums[left] = 1
```

Yahan `3 > 1` true hai.
Lekin minimum to already `left` pe hai.

So exact baat yeh hai:

- `nums[left]` use karna impossible nahi hai
- but is exact invariant me `nums[mid] > nums[left]` alone enough nahi hai
---

## STEP 8: Adjustment Logic

Ab condition ke basis pe pointers move karte hain.

### Jab `nums[mid] > nums[right]`

Humne simulation se dekha:

- minimum right me hai
- `mid` answer nahi ho sakta

Isliye:

```ts
left = mid + 1
```

`mid` ko safely exclude kar diya.

### Jab `nums[mid] <= nums[right]`

Humne simulation se dekha:

- right side sorted hai
- `mid` khud minimum ho sakta hai

Isliye:

```ts
right = mid
```

Dhyan do:

- `right = mid - 1` nahi
- kyunki aisa karoge to `mid` ko galti se hata doge

### Alternative bhi hota hai:

`left` ko reference bana kar bhi solution likh sakte ho.
Lekin usme usually ek extra sorted-window check chahiye:

```ts
if (nums[left] < nums[right]) return nums[left];
```

Yeh samjho:
- `right` compare wala approach cleaner preference hai
- `left` compare wala bhi possible hai
- yeh constraint nahi, design choice hai

---

## STEP 9: Algorithm

Ab simulation, conditions, aur adjustment — sab clear hai. Code naturally banta hai:

```ts
left = 0
right = n - 1

while (left < right) {
  mid = Math.floor((left + right) / 2);
  
  if( nums[mid] > nums[right] ) { // (broken suffix — minimum right mein)
    left = mid + 1;   
  } else { // nums[mid] <= nums[right] (sorted suffix — minimum mid pe ya left mein) 
    right = mid      
  }
}

return nums[left];
```

**Kyun `return nums[left]`?**

Loop tab rukta hai jab `left == right`.

Us point pe poora search window ek hi index ka reh gaya hota hai.

Wahi minimum ka index hai.

---

## FULL DRY RUN

### nums = [4, 5, 6, 7, 0, 1, 2]

```
idx:   0   1   2   3   4   5   6
val:   4   5   6   7   0   1   2
                       ↑
                    minimum
```

| Iter | left | right | mid | nums[mid] | nums[right] | mid > right? | Action |
|------|------|-------|-----|-----------|-------------|--------------|--------|
| 1 | 0 | 6 | 3 | 7 | 2 | YES | left = 4 |
| 2 | 4 | 6 | 5 | 1 | 2 | NO  | right = 5 |
| 3 | 4 | 5 | 4 | 0 | 1 | NO  | right = 4 |

left=4 === right=4 → **return nums[4] = 0 ✅**

---

### nums = [3, 4, 5, 1, 2]

```
idx:   0   1   2   3   4
val:   3   4   5   1   2
                   ↑
                minimum
```

| Iter | left | right | mid | nums[mid] | nums[right] | mid > right? | Action |
|------|------|-------|-----|-----------|-------------|--------------|--------|
| 1 | 0 | 4 | 2 | 5 | 2 | YES | left = 3 |
| 2 | 3 | 4 | 3 | 1 | 2 | NO  | right = 3 |

left=3 === right=3 → **return nums[3] = 1 ✅**

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
CORE IDEA:
  Minimum dhoondhne se zyada important hai
  yeh dhoondhna ki drop kis side mein hai.

MENTAL MODEL:
  [mid..right] window ko dekho.
  Agar broken hai  →  minimum right mein   →  left = mid + 1
  Agar sorted hai  →  minimum mid ya left  →  right = mid

CONDITIONS:
  nums[mid] > nums[right]  →  left = mid + 1
  nums[mid] <= nums[right] →  right = mid

WHY right = mid (not mid - 1)?
  Kyunki mid khud minimum ho sakta hai.

WHY NOT nums[left] as reference?
  nums[mid] > nums[left] sirf prefix sorted prove karta hai.
  Global minimum left pe hi ho sakta hai — "go right" galat hoga.
  nums[left] se bhi kaam hota hai, but extra check chahiye:
    if (nums[left] < nums[right]) return nums[left]
  Yeh design choice hai, constraint nahi.

POINTER NOTE:
  right = mid ka matlab right pointer mid index pe aa gaya.
  Value assign nahi hui.

PATTERN: Pattern 2 (while left < right) → return nums[left]

COMPLEXITY:
  Time:  O(log n)
  Space: O(1)
```