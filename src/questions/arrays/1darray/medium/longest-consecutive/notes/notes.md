# Longest Consecutive Sequence — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek unsorted integer array `nums` diya hai.
Humein longest consecutive sequence ki **length** return karni hai.

Consecutive ka matlab:

```txt
x, x+1, x+2, x+3 ...
```

Important:
- input array sorted hona zaroori nahi
- output me actual sequence nahi, sirf uski length chahiye
- duplicates aa sakte hain

Example:

```txt
nums = [100, 4, 200, 1, 3, 2]
```

Yahan consecutive values hain:

```txt
1, 2, 3, 4
```

Length:

```txt
4
```

---

## STEP 2: Brute Force

Seedha approach:
- har number ko start maan lo
- phir dekhte jao `num+1`, `num+2`, `num+3` ... mil rahe hain ya nahi

Problem:
- array unsorted hai
- toh har next number ke liye linear search karna padega
- same streak baar-baar recount hogi

Example:

```txt
[1, 2, 3, 4]
```

Brute force kya karega?

- 1 se start -> 2, 3, 4 check
- 2 se start -> 3, 4 check
- 3 se start -> 4 check
- 4 se start -> bas 4

Yani same streak repeated work ban gayi.

Isliye brute force unnecessary heavy hai.

---

## STEP 3: Key Insight

Yahan actual breakthrough yeh hai:

```txt
Har number se sequence start nahi hoti.
```

Sequence ka **real start** kaise pehchaanoge?

```txt
num start hai agar num - 1 present nahi hai
```

Example:

```txt
[1, 2, 3, 4]
```

Check:

| Number | `num - 1` present? | Start hai? |
|---:|---|---|
| 1 | 0 present nahi | yes |
| 2 | 1 present hai | no |
| 3 | 2 present hai | no |
| 4 | 3 present hai | no |

Yani:
- `1` hi actual start hai
- `2`, `3`, `4` beech ke elements hain

Aur agar sirf true starts se count karoge,
toh har streak exactly ek baar count hogi.

---

## STEP 4: Why This Technique Works

HashSet se membership check fast ho jaata hai:

```txt
numSet.has(x)
```

Ab core soch:

### Case 1: `num - 1` present hai

Example:

```txt
num = 3
Set me 2 present hai
```

Matlab:
- 3 koi nayi streak start nahi kar raha
- 3 already kisi existing streak ka part hai

Toh 3 se counting start karna repeated work hoga.

### Case 2: `num - 1` present nahi hai

Example:

```txt
num = 1
Set me 0 present nahi hai
```

Matlab:
- 1 sequence ka actual head hai
- yahin se streak count start karni chahiye

Phir:

```txt
1, 2, 3, 4 ...
```

jab tak `current + 1` milta rahe,
streak extend karte jao.

Is technique ki real power:

```txt
start pehchaan lo -> phir sirf ek baar poori streak count karo
```

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `numSet` | saare unique numbers ka fast lookup structure |
| `num` | current value jo Set se iterate ho rahi hai |
| `currentNum` | current streak me abhi kis value tak pahunch gaye |
| `currentLength` | current streak ki length |
| `maxLength` | ab tak ki longest streak |

Dhyan do:
- `num` zaroori nahi streak ka head ho
- `currentNum` tab meaningful banta hai jab `num` actual start ho

---

## STEP 6: Mental Model

Is problem ko "start detection" problem ki tarah dekho.

Na ki:

```txt
Har number se streak build karo
```

Balki:

```txt
Sirf un numbers ko allow karo jo streak ke head hain
```

Visual:

```txt
Set = {100, 4, 200, 1, 3, 2}

100 -> start, kyunki 99 nahi hai
4   -> start nahi, kyunki 3 hai
200 -> start, kyunki 199 nahi hai
1   -> start, kyunki 0 nahi hai
3   -> start nahi, kyunki 2 hai
2   -> start nahi, kyunki 1 hai
```

Yani actual heads:

```txt
100, 200, 1
```

Aur longest streak sirf `1` wale head se milti hai:

```txt
1 -> 2 -> 3 -> 4
```

Short memory line:

```txt
Longest streak tab count karo jab tum actual start pe ho.
```

---

## STEP 7: Boundary Cases

### Case 1: Empty array

```txt
[]
```

Koi sequence hi nahi.
Answer `0`.

### Case 2: Single element

```txt
[7]
```

Longest streak sirf `[7]`.
Answer `1`.

### Case 3: Duplicates

```txt
[1, 2, 2, 3]
```

Yahan actual streak:

```txt
1, 2, 3
```

Duplicate `2` extra length nahi deta.
Set deduplicate kar deta hai.

### Case 4: Negative numbers

```txt
[-3, -2, -1]
```

Consecutive logic negative numbers pe bhi same kaam karta hai.
Answer `3`.

### Case 5: No consecutive neighbors

```txt
[10, 30, 50]
```

Har number apni 1-length streak hai.
Answer `1`.

---

## STEP 8: Conditions

### Condition 1: empty input

```ts
if (nums.length === 0) return 0;
```

Meaning:
- streak count karne layak koi number hi nahi

### Condition 2: `numSet.has(num - 1)`

```ts
if (numSet.has(num - 1)) continue;
```

Meaning:
- predecessor present hai
- current number streak ka start nahi hai
- yahan se count karoge toh same streak dobara count hogi

### Condition 3: `!numSet.has(num - 1)`

Implicit meaning:
- predecessor present nahi hai
- current number actual start hai
- ab yahan se streak extend kar sakte ho

### Condition 4: `while (numSet.has(currentNum + 1))`

```ts
while (numSet.has(currentNum + 1)) {
  currentNum++;
  currentLength++;
}
```

Meaning:
- streak next number tak abhi bhi continue ho rahi hai
- jab tak next consecutive number milta rahe, streak badhao

---

## STEP 9: Adjustment Logic

Yeh section actual design ko obvious banata hai.

### 1. Start detection kyun zaroori hai

Example:

```txt
[1, 2, 3, 4]
```

Agar har number se streak count karoge:

- 1 se count -> 4 steps
- 2 se count -> 3 steps
- 3 se count -> 2 steps
- 4 se count -> 1 step

Wahi kaam baar-baar repeat ho raha hai.

Isliye pehle pucho:

```txt
Kya mere pehle wala number present hai?
```

Agar haan, toh current number beech ka member hai.

### 2. `continue` kyun use karte hain

```ts
if (numSet.has(num - 1)) continue;
```

Kyunki:
- current number useful hai, but as a streak member
- streak start ke role me useful nahi
- isliye is number ko head banake process mat karo

### 3. `while` kyun sahi hai

Start milte hi humein exactly ek kaam karna hai:

```txt
current + 1
current + 2
current + 3
...
```

Jab tak milta rahe,
length badhti rahegi.

`while` yahan natural hai because:
- number of next consecutive elements fixed nahi hai
- 0 bhi ho sakte hain
- 10 bhi ho sakte hain

### 4. Maximum update kab karna hai

Poora current streak count hone ke baad.

```ts
maxLength = Math.max(maxLength, currentLength);
```

Kyun?
- tabhi actual streak length pata chal chuki hoti hai

---

## STEP 10: Answer Formula

Is problem me closed-form formula nahi hai.
Yahan answer build karne ka repeatable pattern hai.

### Algorithm

1. Empty array ho toh `0` return karo
2. Saare numbers Set me daalo
3. Har unique number pe iterate karo
4. Agar `num - 1` present hai, skip karo
5. Warna current number ek real start hai
6. `currentNum = num`, `currentLength = 1`
7. Jab tak `currentNum + 1` present ho:
   - `currentNum++`
   - `currentLength++`
8. `maxLength` update karo
9. End me `maxLength` return karo

### Why complexity `O(n)` average hai

Ye sabse important part hai.

Pehle dekhne me lag sakta hai:
- outer loop bhi hai
- inner while bhi hai
- toh shayad `O(n^2)` hoga

Lekin actual reason:

- har number outer loop me ek baar aata hai
- inner while sirf streak starts se chalta hai
- beech ke numbers se while start hota hi nahi
- isliye same streak baar-baar traverse nahi hoti

Example:

```txt
[1, 2, 3, 4]
```

Process:
- 1 -> while runs through 2,3,4
- 2 -> skip
- 3 -> skip
- 4 -> skip

Yani poori streak total milake ek hi baar count hui.

So average total work linear hota hai.

### Space complexity

Set me saare unique numbers store karne padte hain:

```txt
O(n)
```

### Approach comparison

| Approach | Idea | Time | Extra Space |
|---|---|---:|---:|
| Brute Force | repeated linear membership checks | worst case `O(n^3)` | `O(1)` |
| Better | sort and scan | `O(n log n)` | depends on sorting |
| Optimal | HashSet + count only from starts | `O(n)` average | `O(n)` |

---

## STEP 11: Full Dry Run

### Example

```txt
nums = [100, 4, 200, 1, 3, 2]
Set  = {100, 4, 200, 1, 3, 2}
```

| `num` | `num - 1` present? | Start? | Sequence built | Length | `maxLength` |
|---:|---|---|---|---:|---:|
| 100 | 99 nahi hai | yes | `100` | 1 | 1 |
| 4 | 3 hai | no, skip | - | - | 1 |
| 200 | 199 nahi hai | yes | `200` | 1 | 1 |
| 1 | 0 nahi hai | yes | `1 -> 2 -> 3 -> 4` | 4 | 4 |
| 3 | 2 hai | no, skip | - | - | 4 |
| 2 | 1 hai | no, skip | - | - | 4 |

Final answer:

```txt
4
```

### Example 2

```txt
nums = [1, 2, 0, 1]
Set  = {1, 2, 0}
```

| `num` | `num - 1` present? | Start? | Sequence built | Length | `maxLength` |
|---:|---|---|---|---:|---:|
| 1 | 0 hai | no | - | - | 0 |
| 2 | 1 hai | no | - | - | 0 |
| 0 | -1 nahi hai | yes | `0 -> 1 -> 2` | 3 | 3 |

Final answer:

```txt
3
```

---

## STEP 12: Quick Reference

```txt
CORE IDEA
Har number se streak start mat karo.
Sirf actual starts se count karo.

ACTUAL START
num start hai agar num-1 present nahi hai

MENTAL MODEL
start detect karo
phir streak ko aage extend karo

WHY FAST
same streak baar-baar count nahi hoti

COMPLEXITY
Brute  -> worst case O(n^3)
Better -> O(n log n)
Optimal -> O(n) average, O(n) space

ONE-LINE MEMORY
Longest consecutive = count only from numbers that have no predecessor
```
