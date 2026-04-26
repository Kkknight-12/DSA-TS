# String To Integer (atoi) - Recursive

## Problem Samjho

Hume ek string di gayi hai.
Us string ko 32-bit signed integer me convert karna hai.

Rules same hain jo normal `atoi` parsing me hote hain:

```txt
1. Leading spaces ignore karo
2. Optional '+' ya '-' sign read karo
3. Uske baad continuous digits read karo
4. Pehle non-digit par parsing stop karo
5. Result ko 32-bit signed range me clamp karo
```

32-bit signed range:

```txt
INT_MIN = -2147483648
INT_MAX =  2147483647
```

Important:

```txt
Digits start hone ke baad beech me jo bhi non-digit milega,
wahi stop point hoga.
```

---

## Examples

### Example 1

```txt
Input:  "42"
Output: 42
```

### Example 2

```txt
Input:  "   -042"
Output: -42
```

### Example 3

```txt
Input:  "1337c0d3"
Output: 1337
```

### Example 4

```txt
Input:  "words and 987"
Output: 0
```

### Example 5

```txt
Input:  "-91283472332"
Output: -2147483648
```

---

## Key Insight

Normal `atoi` usually iterative hota hai.

Recursion version me hum same parsing rules ko chhote recursive steps me tod dete hain:

```txt
1. Leading spaces recursively skip karo
2. Optional sign ko one-time handle karo
3. Digits ko recursively left-to-right read karo
4. Har digit add karne se pehle overflow check karo
```

Yahan interesting part branching nahi hai.
Yeh mostly ek linear recursive chain hai:

```txt
current character process karo
phir next index par recurse karo
```

---

## Approach

### Phase 1: Skip Leading Spaces

Recursive helper leading spaces ko skip karega.

Example:

```txt
"   -042"
  ^
```

Spaces cross karne ke baad first meaningful index `'-'` par pahunch jaayega.

### Phase 2: Read Optional Sign

First meaningful character agar `'+'` ya `'-'` hai,
toh sign store karenge aur digit start index ek step aage move hoga.

### Phase 3: Read Digits Recursively

Ab digits ko recursively parse karenge.

Har frame:

```txt
digit read karo
currentNumber = currentNumber * 10 + digit
next index par recurse karo
```

Lekin multiplication se pehle overflow check zaroori hai.

---

## Why This Works

Number build karne ka rule same hota hai:

```txt
previousNumber * 10 + currentDigit
```

Example:

```txt
"42"

start: 0
read '4' -> 0 * 10 + 4 = 4
read '2' -> 4 * 10 + 2 = 42
```

Recursion har step par bas next character handle karti hai.

So har frame ka kaam:

```txt
current index ka meaning samjho
agar digit hai to number update karo
phir next index ko recursion me de do
```

Isliye full parsing naturally call chain me convert ho jaati hai.

---

## Overflow Handling

Digit add karne se pehle check karna padta hai:

```txt
currentNumber * 10 + digit
```

32-bit signed range ke bahar toh nahi ja raha.

Useful cutoff:

```txt
214748364
```

Why?

```txt
INT_MAX = 2147483647
```

So:

```txt
agar currentNumber > 214748364
toh next digit add karte hi overflow pakka hai
```

Special last-digit case:

```txt
positive sign ke liye last allowed digit 7 hai
negative sign ke liye last allowed digit 8 hai
```

Because:

```txt
INT_MAX = 2147483647
INT_MIN = -2147483648
```

---

## Complexity

### Time Complexity: `O(n)`

Reason:

```txt
Har character at most ek baar process hota hai
```

### Space Complexity: `O(n)`

Reason:

```txt
Recursion call stack string length ke proportional grow kar sakti hai
```

Iterative solution me space `O(1)` hoti,
but recursion practice ke liye yahan `O(n)` acceptable hai.
