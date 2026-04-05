# 4 Sum — Doubts

---

## `better.ts` Doubts

### Doubt 1: Kya `a + b + c + d` me sab values different honi chahiye?

#### Question

```txt
Jab hum 4-sum me bolte hain:

a + b + c + d = target

toh kya a, b, c, d sab alag values honi chahiye?

Better approach me jab hum fourth nikaalte hain:

fourth = target - (nums[i] + nums[j] + nums[k])

toh hum yeh check hi nahi karte ki fourth,
nums[i] ya nums[j] se different hai ya nahi.
```

#### Explanation

Yahan sabse important distinction hai:

- **indices different hone chahiye**
- **values different hona zaroori nahi**

Matlab:

```txt
[2, 2, 2, 2]
```

valid ho sakta hai,
agar yeh 4 alag indices se aa raha ho.

Example:

```txt
nums   = [2, 2, 2, 2, 2]
target = 8

Answer = [[2, 2, 2, 2]]
```

Yeh bilkul valid hai.

Kyun?
Kyunki problem bol rahi hai:

```txt
4 alag positions choose karo
```

Problem yeh nahi bol rahi:

```txt
4 alag values choose karo
```

Isliye code me hum yeh check nahi karte:

```txt
fourth !== nums[i]
fourth !== nums[j]
fourth !== nums[k]
```

Waisa check galat hota.
Woh valid answers ko bhi reject kar deta.

#### Short version

```txt
4-sum me uniqueness values ki nahi,
indices ki hoti hai.
```

---

### Doubt 2: Phir `i` aur `j` ke duplicates skip kyun karte hain?

#### Question

```txt
if (i > 0 && nums[i] === nums[i - 1]) continue;
if (j > i + 1 && nums[j] === nums[j - 1]) continue;

Ye checks kya isliye hain taaki sab elements different ho?
```

#### Explanation

Nahi.
Ye checks **quadruplet ke andar uniqueness enforce** nahi kar rahe.

Ye checks sirf **duplicate output avoid** kar rahe hain.

Example:

```txt
nums = [-2, -2, -1, 0, 1, 2]
```

Agar pehla `-2` first element banake search kar liya,
aur phir doosra `-2` ko bhi first element bana diya,
toh same value-family ke answers dobara mil sakte hain.

So:

- duplicate `i` skip = same outer family ko dobara process mat karo
- duplicate `j` skip = same `(i, j)` sub-family ko dobara process mat karo

Yeh output cleanup hai.
Yeh "all values must be distinct" rule nahi hai.

Yeh doubt tumne `better.ts` dekhte waqt poocha tha,
lekin same logic `optimal.ts` me bhi apply hota hai.

#### Short version

```txt
duplicate i/j skip ka kaam:
same answer ko dobara generate hone se rokna
```

---

### Doubt 3: `seen` set ki zaroorat hi kyun hai?

#### Question

```txt
for (let k = j + 1; k < n; k++) {
  const fourth = target - (nums[i] + nums[j] + nums[k]);

  if (seen.has(fourth)) {
    ...
  }

  seen.add(nums[k]);
}

Yahan `seen` kyun chahiye?
```

#### Explanation

For fixed `i` and `j`, problem reduce ho jaati hai:

```txt
nums[k] + fourth = target - (nums[i] + nums[j])
```

Ab current `k` ke liye hume bas itna puchhna hai:

```txt
kya jo partner value chahiye, woh mujhe pehle mil chuki hai?
```

`seen` exactly yeh answer deta hai.

So `seen` ka role hai:

```txt
current (i, j) ke liye already seen partner values ko track karna
```

Without `seen`, har `k` ke liye hume phir se search karna padta:

```txt
i loop
  j loop
    k loop
      fourth ko dhoondho
```

Woh phir extra loop jaisa ho jaata.

`seen` ki wajah se:

- partner lookup fast ho jata hai
- current `(i, j)` ke under pair finding easy ho jaati hai

#### Example

```txt
nums   = [-2, -1, 0, 0, 1, 2]
target = 0

i = -2
j = 0
```

Ab remaining requirement:

```txt
k + fourth = 2
```

Scan:

| current `k` value | required `fourth` | `seen` before check | match? |
|---:|---:|---|---|
| 0 | 2 | `{}` | no |
| 1 | 1 | `{0}` | no |
| 2 | 0 | `{0, 1}` | yes |

Last row pe:

```txt
current k = 2
needed fourth = 0
seen me 0 already hai
```

So quadruplet mil gaya:

```txt
[-2, 0, 0, 2]
```

#### Short version

```txt
seen = current (i, j) ke liye fast pair finder
```

---

### Doubt 4: Check pehle, add baad me kyun?

#### Question

```txt
Loop me hum pehle check karte hain:

if (seen.has(fourth))

aur baad me:

seen.add(nums[k])

Aisa reverse kyun nahi?
```

#### Explanation

Kyunki current `nums[k]` ko usi iteration me apne aap ke against use nahi karna chahiye.

Hum chaahte hain ki:

```txt
fourth kisi pehle wale index se aaye
```

na ki current `k` khud hi dono roles play kare.

Check-before-add ka matlab:

- `seen` me sirf pehle ke values hain
- current `nums[k]` abhi seen ka part nahi hai
- toh agar match milta hai, woh definitely kisi earlier index se mila hai

Yani index relation safe ban jaata hai:

```txt
i < j < earlierIndex < k
```

Yehi chahiye.

#### Agar add pehle kar dete toh problem?

Current value khud hi seen me aa jaati.
Phir kuch cases me current element ko hi apna partner maan lene ka risk hota.

Better approach ka clean rule hai:

```txt
pehle poochho:
"kya mujhe partner pehle mil chuka hai?"

phir current value ko future ke liye store karo
```

#### Short version

```txt
check first -> partner must come from an earlier index
add later   -> current value future iterations ke liye available hogi
```

---

### Doubt 5: `seen` aur `uniqueSet` me farq kya hai?

#### Question

```txt
Code me do sets hain:

seen
uniqueSet

Dono kyun chahiye?
```

#### Explanation

In dono ka job alag hai.

#### `seen`

Current fixed `(i, j)` ke andar kaam karta hai.

Iska purpose:

```txt
partner value ko jaldi dhoondhna
```

#### `uniqueSet`

Poore answer level pe kaam karta hai.

Iska purpose:

```txt
same quadruplet output me dobara na aaye
```

So:

- `seen` = pair finder
- `uniqueSet` = duplicate blocker

#### Short version

```txt
seen current search ko help karta hai
uniqueSet final answer ko clean rakhta hai
```

---

## `optimal.ts` Doubts

### Doubt 1: `if (i > 0 && nums[i] === nums[i - 1]) continue;` kyun?

#### Question

```txt
Optimal solution me yeh condition hai:

if (i > 0 && nums[i] === nums[i - 1]) continue;

Ye exact condition kyun chahiye?
Same first value ko skip kyun kar rahe hain?
```

#### Explanation

`i` first number choose karta hai.

Agar sorted array me:

```txt
nums = [-2, -2, -1, 0, 1, 2]
```

toh:

- `i = 0` pe first value `-2`
- `i = 1` pe first value again `-2`

Ab problem dekho:

`i = 0` pe inner loops already saare quadruplets explore kar lenge
jinka first value `-2` hai.

Toh `i = 1` pe phir se same `-2` ko first value banaoge,
toh same answer-family dobara generate ho sakti hai.

Yeh condition ka matlab:

```txt
har distinct first value ko sirf pehli baar process karo
```

#### Why `i > 0`?

Kyunki first occurrence ko allow karna hai.

- `i = 0` pe previous element exist hi nahi karta
- `i = 1`, `i = 2` ... pe hi compare meaningful hai

So:

```txt
first -2 allow
second -2 skip
third -2 skip
```

#### Short version

```txt
same first value se same outer family dobara banegi,
isliye first occurrence ke baad duplicate i skip karte hain
```

---

### Doubt 2: `if (j > i + 1 && nums[j] === nums[j - 1]) continue;` kyun?

#### Question

```txt
Optimal solution me yeh condition hai:

if (j > i + 1 && nums[j] === nums[j - 1]) continue;

Yahan `j > i + 1` kyun hai?
`j > 0` kyun nahi?
Aur same second value ko skip kyun kar rahe hain?
```

#### Explanation

`j` second number choose karta hai,
but current fixed `i` ke under.

Example:

```txt
nums = [-2, -1, -1, 0, 1, 2]
```

Fix:

```txt
i = 0  -> nums[i] = -2
```

Ab:

- `j = 1` -> second value `-1`
- `j = 2` -> second value again `-1`

`j = 1` pe inner `left-right` search already
`[-2, -1, ... , ...]` wali sub-family explore kar chuki hogi.

Toh `j = 2` pe same `-1` ko second value banaoge,
toh same sub-family dobara ban sakti hai.

Isliye duplicate `j` skip karte hain.

#### Why `j > i + 1`?

Kyunki current `i` ke liye first valid `j` ko allow karna hi padega.

Current `i` ke under:

```txt
first valid j = i + 1
```

Usko skip nahi kar sakte,
chahe `nums[j] === nums[j - 1]` ho.

Example:

```txt
nums = [0, 0, 0, 0, 0]
target = 0
```

For `i = 0`:

- `j = 1` ko allow karna zaroori hai
- warna `[0, 0, 0, 0]` kabhi banega hi nahi

Agar hum likhte:

```txt
if (j > 0 && nums[j] === nums[j - 1]) continue;
```

toh `j = 1` bhi skip ho jata, jo galat hota.

So actual rule:

```txt
current i ke liye pehla j allow karo
uske baad same-value j skip karo
```

#### Short version

```txt
j duplicate skip ka matlab:
same i ke andar same second-value sub-family ko dobara mat chalao
```
