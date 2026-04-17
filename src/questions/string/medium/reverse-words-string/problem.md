# Reverse Words in a String

## Problem

String `s` diya hai.
Words ka order reverse karke return karo.

Rules:

```txt
1. Leading spaces remove hone chahiye
2. Trailing spaces remove hone chahiye
3. Multiple spaces between words single space banne chahiye
4. Words ke characters reverse nahi hone chahiye
5. Sirf words ka order reverse hona chahiye
```

Examples:

```txt
s = "the sky is blue"
answer = "blue is sky the"

s = "  hello world  "
answer = "world hello"

s = "a good   example"
answer = "example good a"
```

## Important Difference

Word order reverse karna hai:

```txt
"hello world" -> "world hello"
```

Characters reverse nahi karne:

```txt
"hello world" -> "dlrow olleh"  // wrong final answer
```

## Approach 1: Brute Force - Built-in Split/Filter/Reverse/Join

Use JavaScript built-ins:

```txt
split by spaces
remove empty parts
reverse word array
join with single spaces
```

Prerequisite:

```txt
split, filter, reverse, join
```

This is the cleanest practical JavaScript solution.

## Approach 2: Better - Manual Right-To-Left Parsing

Traverse string from right to left.

Why?

```txt
answer me last word first aata hai
```

So right side se word extract karte jao and result array me push karte jao.

This avoids directly relying on `split/filter/reverse` and shows real pointer logic.

Prerequisite:

```txt
string indexing
substring/slice boundaries
pointer movement
```

## Approach 3: Optimal Concept - Reverse Whole String, Then Reverse Each Word

Mutable-string languages me common optimal idea:

```txt
1. spaces normalize karo
2. whole string reverse karo
3. each word reverse karo
```

Example:

```txt
"hello world"
reverse whole -> "dlrow olleh"
reverse words -> "world hello"
```

Important JavaScript/TypeScript note:

```txt
JS strings immutable hoti hain.
So true O(1) in-place string mutation possible nahi.
We use char array, which costs O(n) extra space.
```

Prerequisite:

```txt
two pointers
mutable char array idea
reverse range
```

## Complexity Comparison

| Approach | Idea | Time | Space | Notes |
|---|---|---:|---:|---|
| Brute Force | Built-ins split/filter/reverse/join | O(n) | O(n) | Clean JS solution |
| Better | Manual right-to-left word extraction | O(n) | O(n) | Good pointer practice |
| Optimal Concept | Reverse whole, reverse each word | O(n) | O(1) mutable languages, O(n) in JS | Best for in-place concept |

## Core Insight

Words ko reverse order me chahiye, characters ko nahi.

Short memory:

```txt
reverse word order
normalize spaces
keep each word intact
```
