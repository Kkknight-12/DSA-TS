# Doubts - Sort Characters By Frequency

## Doubt 1: `Array.from({ length: s.length + 1 }, () => [])` kyun use karte hain?

Question:

```ts
const buckets: string[][] = Array.from({ length: s.length + 1 }, () => []);
```

Is line ka meaning kya hai?
Callback `() => []` ka use kya hai?

Answer:

Is problem me hum bucket sort use kar rahe hain.

Bucket ka index frequency represent karta hai:

```txt
buckets[1] = frequency 1 wale characters
buckets[2] = frequency 2 wale characters
buckets[3] = frequency 3 wale characters
...
```

Example:

```txt
s = "tree"
```

Frequencies:

```txt
t -> 1
r -> 1
e -> 2
```

So buckets should look like:

```txt
buckets[0] = []
buckets[1] = ["t", "r"]
buckets[2] = ["e"]
buckets[3] = []
buckets[4] = []
```

Why length is `s.length + 1`?

For:

```txt
s.length = 4
```

Maximum possible frequency is `4`.

Example:

```txt
s = "eeee"
```

`e` appears `4` times.
So we need `buckets[4]`.

Array indexes start from `0`, so array length must be `5`:

```txt
length 5 -> indexes 0, 1, 2, 3, 4
```

That is why:

```ts
s.length + 1
```

Now index `0`:

```txt
buckets[0]
```

will not be used.

Why?

Because agar koi character string me present hai,
toh uski frequency at least `1` hogi.

```txt
frequency 0 means character string me hai hi nahi
```

Hum sirf un characters ko buckets me daalte hain jo frequency map me present hain.
So useful buckets start from index `1`.

Now JavaScript perspective:

```ts
Array.from({ length: s.length + 1 }, () => [])
```

`Array.from` ka second argument ek mapping callback hota hai.

That callback har array slot ke liye run hota hai.

```txt
slot 0 -> callback runs -> returns new []
slot 1 -> callback runs -> returns new []
slot 2 -> callback runs -> returns new []
...
```

So `() => []` ka kaam hai:

```txt
har bucket ke liye ek fresh empty array create karna
```

Result:

```ts
[
  [], // buckets[0]
  [], // buckets[1]
  [], // buckets[2]
  [], // buckets[3]
  [], // buckets[4]
]
```

Important:

Har `[]` alag array hai.

That means:

```ts
buckets[1].push('t');
```

sirf `buckets[1]` ko affect karega.

Why not use `.fill([])`?

```ts
const buckets = new Array(s.length + 1).fill([]);
```

Ye dangerous hai.

Reason:

```txt
fill([]) same array reference har slot me daal deta hai
```

So:

```ts
const buckets = new Array(5).fill([]);
buckets[1].push('t');
```

Unexpected result:

```txt
buckets[0] = ["t"]
buckets[1] = ["t"]
buckets[2] = ["t"]
buckets[3] = ["t"]
buckets[4] = ["t"]
```

Why?

Because all slots point to the same inner array.

Correct version:

```ts
const buckets = Array.from({ length: s.length + 1 }, () => []);
```

Here callback creates a new inner array for every slot.

Short memory:

```txt
{ length: s.length + 1 } = main array me kitne buckets chahiye
() => [] = har bucket ke liye fresh inner array banao
buckets[0] = unused because no present character has frequency 0
```
