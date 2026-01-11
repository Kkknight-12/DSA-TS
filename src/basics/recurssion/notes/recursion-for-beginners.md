# Recursion for Beginners (JavaScript)

## 1. Mindset Reset: Recursion is Teamwork with Future-You

Recursion feels mysterious until you realize every call is just future-you finishing the job you started.
This guide keeps the upbeat energy of your first “aha!” moments while grounding every idea with clear steps.
We will move from mindset to mechanics, handling small examples before venturing into real-world scenarios like cleaning strings, exploring nested objects, solving mazes, and walking the DOM.
Along the way, you will see how each recursive call is a polite promise: “I will finish after you hand me a smaller version of the same puzzle.”

> 🌟 **Reflection prompt:** Think of a non-code task where you break a large job into repeated smaller jobs (e.g., packing boxes).
How does that analogy calm your nerves about recursion?

## 2. Quick JavaScript Refresher

Before we dive in, confirm the core JavaScript tools that make recursive thinking smoother.

### Arrow functions

Use arrow functions for compact recursive definitions, especially when passing helpers.

```javascript
const describe = (name) => `Hello, ${name}!`;
```

Arrow functions inherit `this` from their surrounding scope, so prefer standard function declarations when you rely on dynamic `this`.

### Arrays in a nutshell

Arrays stay ordered, making them perfect for storing the trail of recursive calls or collecting results to return later.
Methods such as `.slice()` help create smaller problems without mutating the original input.

### Object essentials

Objects package related data.
The combination of `Object.keys()`, `Object.values()`, and `Object.entries()` is your toolbox for exploring nested structures recursively.

> ✅ **Self-check:** Can you explain what arrow functions, arrays, and objects contribute to a recursive strategy in two sentences?

## 3. Anatomy of a Recursive Function

A well-designed recursive function always has two clearly labeled parts.
Keep the following checklist within arm’s reach whenever you write a recursive function.

> 🧭 **Base case callout:** The emergency brake that stops the function from calling itself forever.
> 🔁 **Recursive step callout:** The part that shrinks the problem and calls the same function again.

### Recursion design checklist

- [ ] Identify the tiniest version of the problem that has an immediate answer (base case).
- [ ] Decide how to reduce the problem so every call moves closer to that base.
- [ ] Combine the current step’s work with the recursive result when the call returns.
- [ ] Pass new arguments that reflect the smaller problem.
- [ ] Confirm that arguments always change in a way that guarantees the base case will trigger.

### Example: counting down enthusiastically

Here is a small function that prints numbers with excitement, highlighting both parts of recursion explicitly.

```javascript
function hypeCountdown(start) {
  if (start <= 0) {
    console.log("Go!");
    return;
  }
  console.log(`${start}! ✨`);
  hypeCountdown(start - 1);
}
```

| Call depth | Argument `start` | Action taken | What’s waiting to finish? |
|------------|--------------------|--------------|----------------------------|
| 1          | 3                  | logs `3! ✨` | Waits for depth 2          |
| 2          | 2                  | logs `2! ✨` | Waits for depth 3          |
| 3          | 1                  | logs `1! ✨` | Waits for depth 4          |
| 4          | 0                  | logs `Go!`  | Nothing (base case hit)    |

> 🎯 **Practice prompt:** Write your own recursive cheerleader that spells a word one character at a time and shouts “Team!” at the base case.

## 4. Two Recursion Styles — Combiner vs Accumulator

Before diving deeper, let's understand a fundamental choice you make every time you write a recursive function: **when does the work happen?**

There are two distinct styles, and recognizing them will help you understand recursion at a deeper level.

### The Two Phases of Recursion

Every recursive function goes through two phases:

1. **Expanding Phase** ⬇️ (Going DOWN the call stack)
   - Making recursive calls
   - Moving toward the base case
   - Stack is growing

2. **Unwinding Phase** ⬆️ (Coming BACK UP the call stack)
   - Returning from recursive calls
   - Moving away from base case
   - Stack is shrinking

**The key question**: In which phase does your function do its work?

### Style 1: Combiner Recursion (Work on the Way UP)

**Concept**: Do work AFTER the recursive call returns. Wait for smaller problems to solve themselves, then **combine** their results.

**When work happens**: During the **unwinding phase** ⬆️

**Pattern**:
```javascript
function combinerStyle(problem) {
  if (baseCase) {
    return baseAnswer;
  }

  // Make recursive call FIRST (expand down)
  const subResult = combinerStyle(smallerProblem);

  // Do work AFTER call returns (unwind up)
  return combineWith(currentStep, subResult);
}
```

**Example from Section 5 — factorial:**

```javascript
function factorial(n) {
  if (n <= 1) {
    return 1; // Base case
  }

  // 1. First, recurse (expand down) ⬇️
  const smallerResult = factorial(n - 1);

  // 2. Then, combine (unwind up) ⬆️
  return n * smallerResult;
}
```

**Visual trace for factorial(3):**

```
EXPANDING PHASE ⬇️ (Making calls, going down):
factorial(3) → waits for factorial(2)
  factorial(2) → waits for factorial(1)
    factorial(1) → base case! returns 1

UNWINDING PHASE ⬆️ (Doing work, coming back up):
    factorial(1) returns 1
  factorial(2) computes: 2 * 1 = 2, returns 2
factorial(3) computes: 3 * 2 = 6, returns 6 ✓

Notice: All the WORK (multiplication) happens AFTER calls return!
```

### Style 2: Accumulator Recursion (Work on the Way DOWN)

**Concept**: Do work BEFORE the recursive call. Carry the result forward in a parameter (accumulator), building the answer as you go down.

**When work happens**: During the **expanding phase** ⬇️

**Pattern**:
```javascript
function accumulatorStyle(problem, result = initialValue) {
  if (baseCase) {
    return result; // Return accumulated result
  }

  // Do work FIRST (expand down)
  const updatedResult = result + currentWork;

  // Then recurse with updated accumulator
  return accumulatorStyle(smallerProblem, updatedResult);
}
```

**Example from Section 6 — cleanSentence:**

```javascript
function cleanSentence(text, index = 0, builder = "") {
  if (index >= text.length) {
    return builder; // Base case: return accumulated result
  }

  // 1. First, do work (build result) ⬇️
  const current = text[index];
  const nextBuilder = /[a-zA-Z0-9\s]/.test(current)
    ? builder + current
    : builder + " ";

  // 2. Then, recurse with updated accumulator
  return cleanSentence(text, index + 1, nextBuilder);
}
```

**Visual trace for cleanSentence("Hi!", 0, ""):**

```
EXPANDING PHASE ⬇️ (Doing work, going down):
cleanSentence("Hi!", 0, "")      → process 'H', builder = "H"
  cleanSentence("Hi!", 1, "H")   → process 'i', builder = "Hi"
    cleanSentence("Hi!", 2, "Hi") → process '!', builder = "Hi "
      cleanSentence("Hi!", 3, "Hi ") → base case!

UNWINDING PHASE ⬆️ (Just returning, no work):
      returns "Hi "
    returns "Hi "
  returns "Hi "
returns "Hi " ✓

Notice: All the WORK (building string) happens BEFORE recursive calls!
The unwinding phase just passes the result back up unchanged.
```

### Key Differences

| Aspect | Combiner (Work UP ⬆️) | Accumulator (Work DOWN ⬇️) |
|--------|----------------------|---------------------------|
| **When work happens** | After recursive call returns (unwinding) | Before recursive call (expanding) |
| **Needs combine step?** | Yes — must combine current with returned result | No — just return accumulated result |
| **Extra parameter?** | No — uses return value | Yes — carries result in parameter |
| **Stack frames hold** | Pending work (waiting to combine) | No pending work (result is in parameter) |
| **Typical use** | Mathematical operations (sum, product), tree traversal | String building, counting, accumulation |
| **Can be tail-call optimized?** | No — work happens after return | Yes — last action is recursive call |

### Another Example: Sum (Both Styles)

**Combiner style** (from Section 4):
```javascript
// Work happens AFTER return (unwinding phase)
function sumTo(n) {
  if (n === 0) return 0;
  return n + sumTo(n - 1); // Combine AFTER recursive call
}

// sumTo(3):
// 3 + sumTo(2)
//     2 + sumTo(1)
//         1 + sumTo(0)
//             returns 0
//         returns 1 + 0 = 1
//     returns 2 + 1 = 3
// returns 3 + 3 = 6
```

**Accumulator style** (alternative):
```javascript
// Work happens BEFORE recursive call (expanding phase)
function sumToAccumulator(n, acc = 0) {
  if (n === 0) return acc;
  return sumToAccumulator(n - 1, acc + n); // Build result going down
}

// sumToAccumulator(3, 0):
// sumToAccumulator(3, 0)      → acc = 0 + 3 = 3
//   sumToAccumulator(2, 3)    → acc = 3 + 2 = 5
//     sumToAccumulator(1, 5)  → acc = 5 + 1 = 6
//       sumToAccumulator(0, 6) → base case, return 6
//       returns 6
//     returns 6
//   returns 6
// returns 6
```

### Which Style Should You Use?

**Use Combiner (work UP ⬆️) when:**
- The operation naturally combines results (multiply, sum, merge)
- You're traversing trees or nested structures
- Each level adds to the result of its children
- Examples: factorial, tree depth, DOM element counting

**Use Accumulator (work DOWN ⬇️) when:**
- You're building something step-by-step (string, array, count)
- Each step adds to an ongoing result
- Tail-call optimization is important (advanced)
- Examples: string processing, iterating with state, parsers

**Pro tip**: Most problems can be solved with either style! The choice often comes down to what feels more natural or readable. Combiner style is more common for beginners because it matches the mathematical definition of recursion.

> 🌟 **Reflection prompt**: Look back at the `factorial` example. Could you rewrite it in accumulator style? What would the accumulator parameter represent? (Hint: It would carry the product-so-far as you count down.)

> 🧠 **Mental model**: Combiner recursion is like a stack of plates — you place work on the stack going down, then pick it up coming back up. Accumulator recursion is like a snowball — you build the result as you roll down the hill, and it's complete when you reach the bottom.

---

## 5. Visualizing the Call Stack

Every recursive call lives on the call stack until it completes.
Let's visualize how the stack grows and then unwinds using a simple sum example.

```javascript
function sumTo(n) {
  if (n === 0) {
    return 0;
  }
  return n + sumTo(n - 1);
}
```

### Stack growth diagram

```
ASCII Call Stack Visualization:

                sumTo(3)
                   ↓ calls
                sumTo(2)
                   ↓ calls
                sumTo(1)
                   ↓ calls
                sumTo(0)
                   ↓ base case
                returns 0
                   ↑ returns to
                sumTo(1) computes 1 + 0 = 1
                   ↑ returns to
                sumTo(2) computes 2 + 1 = 3
                   ↑ returns to
                sumTo(3) computes 3 + 3 = 6
                   ↑
                Final result: 6
```

| Moment | Stack contents (top → bottom) | Value returning |
|--------|-------------------------------|-----------------|
| Push   | `sumTo(3)`                   | pending         |
| Push   | `sumTo(2)`, `sumTo(3)`     | pending         |
| Push   | `sumTo(1)`, `sumTo(2)`, `sumTo(3)` | pending |
| Push   | `sumTo(0)`, `sumTo(1)`, `sumTo(2)`, `sumTo(3)` | 0 |
| Pop    | `sumTo(1)`, `sumTo(2)`, `sumTo(3)` | 1 |
| Pop    | `sumTo(2)`, `sumTo(3)` | 3 |
| Pop    | `sumTo(3)` | 6 |

> 🧠 **Reflection prompt:** Describe in your own words what changes on the stack at the exact moment the base case returns.

## 5. Number Patterns Warm-up

Number-based recursion is a gentle on-ramp because the "smaller problem" is easy to picture.
We will look at factorials and a triangular number example, focusing on what the call stack holds.

### Factorial with trace table

```javascript
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(4)); // Expected output: 24
console.log(factorial(0)); // Expected output: 1
```

**Complexity:** Time O(n), Space O(n) — n recursive calls on the stack.

**Edge case:** `factorial(0)` returns 1 immediately via the base case `n <= 1`.

| Call depth | n | Multiplier waiting | Return value |
|------------|---|--------------------|--------------|
| 1          | 4 | `4 * ...`          | waits        |
| 2          | 3 | `3 * ...`          | waits        |
| 3          | 2 | `2 * ...`          | waits        |
| 4          | 1 | base case           | 1            |
| 3 unwind   | 2 | applies `2 * 1`    | 2            |
| 2 unwind   | 3 | applies `3 * 2`    | 6            |
| 1 unwind   | 4 | applies `4 * 6`    | 24           |

### Triangular numbers

```javascript
const triangular = (n) => {
  if (n === 0) return 0;
  return n + triangular(n - 1);
};

// Example usage:
console.log(triangular(4)); // Expected output: 10 (4+3+2+1)
console.log(triangular(0)); // Expected output: 0
```

**Complexity:** Time O(n), Space O(n) — n recursive calls on the stack.

**Edge case:** `triangular(0)` returns 0 immediately (base case), avoiding unnecessary recursion.

> ✍️ **Practice prompt:** Modify `triangular` so it also returns an array of the partial sums, e.g., `triangular(4)` ➝ { total: 10, steps: [4, 7, 9, 10] }.

## 6. String Cleanup & Formatting Recursion

Working with strings shows recursion can do more than multiply numbers.
We will sanitize a sentence by stripping punctuation and normalizing spaces.

```javascript
function cleanSentence(text, index = 0, builder = "") {
  if (index >= text.length) {
    return builder.trim().replace(/\s+/g, " ");
  }
  const current = text[index];
  const isLetterOrSpace = /[a-zA-Z0-9\s]/.test(current);
  const nextBuilder = isLetterOrSpace ? builder + current : builder + " ";
  return cleanSentence(text, index + 1, nextBuilder);
}

// Example usage:
console.log(cleanSentence("Hello,  world!")); // Expected output: "Hello world"
console.log(cleanSentence("")); // Expected output: ""
```

**Complexity:** Time O(n), Space O(n) — n recursive calls and builder string grows to n.

**Edge case:** Empty string `""` returns `""` immediately when `index >= text.length` at the first call.

| Depth | index | current char | builder before call | builder after decision |
|-------|-------|--------------|---------------------|------------------------|
| 1     | 0     | "R"          | ""                  | "R"                     |
| 2     | 1     | "o"          | "R"                 | "Ro"                    |
| ...   | ...   | ...          | ...                 | ...                     |
| n     | 12    | "!"          | "Recursion rocks"   | "Recursion rocks "      |
| n+1   | 13    | end          | "Recursion rocks "  | "Recursion rocks"       |

This pattern highlights how an accumulator (`builder`) carries work forward while each call processes a single character.

> 💡 **Mini-challenge:** Adapt `cleanSentence` so it also title-cases the final sentence.

## 7. Traversing Nested Objects

Nested objects appear in configuration files, API responses, or company charts.
Recursion lets you visit every node without guessing how deep the nesting goes.

```javascript
const company = {
  sales: [{ name: "John", salary: 1000 }, { name: "Alice", salary: 1600 }],
  development: {
    sites: [{ name: "Peter", salary: 2000 }, { name: "Alex", salary: 1800 }],
    internals: [{ name: "Jack", salary: 1300 }]
  }
};

function collectNames(department) {
  if (Array.isArray(department)) {
    // Gracefully handle unexpected shapes: skip items without 'name' property
    return department
      .filter((person) => person && typeof person === 'object' && 'name' in person)
      .map((person) => person.name);
  }
  return Object.values(department)
    .map((sub) => collectNames(sub))
    .flat();
}

// Example usage:
console.log(collectNames(company));
// Expected output: ["John", "Alice", "Peter", "Alex", "Jack"]

console.log(collectNames([{ name: "Eve" }, null, { name: "Bob" }]));
// Expected output: ["Eve", "Bob"] (null is skipped gracefully)
```

**Complexity:** Time O(n), Space O(d) — where n is total nodes and d is max depth (recursion stack).

**Edge case:** If an array contains `null` or objects without a `name` property, they are filtered out gracefully using the guard check.

| Step | Input type | Immediate action | Result so far |
|------|------------|------------------|----------------|
| 1    | object     | iterate keys     | []             |
| 2    | array      | extract names    | ["John", "Alice"] |
| 3    | object     | iterate subdeps  | ["John", "Alice"] |
| 4    | array      | extract names    | ["John", "Alice", "Peter", "Alex"] |
| 5    | array      | extract names    | ["John", "Alice", "Peter", "Alex", "Jack"] |

> 🔍 **Practice prompt:** Extend `collectNames` so it also returns the total salary alongside the names.

## 8. Backtracking with Mazes

Backtracking recursion explores possibilities, backing up when a choice fails.
Consider a maze represented by a grid where 0 is a wall and 1 is an open cell.

```javascript
const maze = [
  [1, 1, 0, 0],  // Start at (0,0), Goal at (3,3)
  [0, 1, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 1]
];

function findPath(row, col, path = []) {
  const withinBounds =
    row >= 0 && col >= 0 && row < maze.length && col < maze[0].length;
  if (!withinBounds || maze[row][col] === 0) {
    return null;
  }
  path.push([row, col]);
  if (row === maze.length - 1 && col === maze[0].length - 1) {
    return path.slice();
  }

  // ⚠️ IN-PLACE MUTATION: This modifies the original maze array
  // If immutability is required, clone the maze first (see below)
  maze[row][col] = 0; // mark visited

  const moves = [
    findPath(row + 1, col, path),  // down
    findPath(row, col + 1, path),  // right
    findPath(row - 1, col, path),  // up
    findPath(row, col - 1, path)   // left
  ];

  maze[row][col] = 1; // unmark for other branches (backtrack)
  path.pop();
  return moves.find((result) => result);
}

// Example usage:
const result = findPath(0, 0);
console.log(result);
// Expected output: [[0,0], [0,1], [1,1], [1,2], [2,2], [2,3], [3,3]]

// For immutable version (clone maze first):
function findPathImmutable(maze, row, col, path = []) {
  const clonedMaze = maze.map(row => [...row]); // Deep clone
  return findPathHelper(clonedMaze, row, col, path);
}
```

**Complexity:** Time O(4^(m×n)), Space O(m×n) — worst case explores all 4 directions at each cell, stack depth is at most m×n.

**Edge case:** Starting at a wall `(row, col)` where `maze[row][col] === 0` returns `null` immediately, preventing unnecessary exploration.

| Decision point | Position | Choice tried | Outcome |
|----------------|----------|--------------|---------|
| 1              | (0,0)    | down         | wall    |
| 1              | (0,0)    | right        | continue|
| 2              | (0,1)    | right        | continue|
| 3              | (0,2)    | right        | wall    |
| 3              | (0,1)    | down         | continue|
| ...            | ...      | ...          | ...     |
| final          | (3,3)    | base case    | path found |

> 🧭 **Mini-challenge:** Modify `findPath` to return all possible paths, not just the first one.

## 9. Recursion in the DOM

When working in the browser, the DOM tree is a natural fit for recursion.
Let’s count the number of element nodes beneath a given root.

```javascript
function countElements(root) {
  if (!root || root.nodeType !== Node.ELEMENT_NODE) {
    return 0;
  }
  let total = 1; // include the current element
  for (const child of root.children) {
    total += countElements(child);
  }
  return total;
}

// Example usage:
const section = document.querySelector('section');
console.log(countElements(section)); // Expected output: (depends on DOM structure)
// For <section><article><h2></h2><p></p></article><aside></aside></section>
// Expected output: 5
```

**Complexity:** Time O(n), Space O(d) — where n is total elements and d is max DOM depth.

**Edge case:** Passing `null` or a text node returns 0 immediately via the guard check `!root || root.nodeType !== Node.ELEMENT_NODE`.

| Node visited | Children count | Running total |
|--------------|----------------|---------------|
| <section>    | 3              | 1             |
| <article>    | 2              | 3             |
| <h2>         | 0              | 4             |
| <p>          | 0              | 5             |
| <aside>      | 1              | 7             |

> 🧪 **Practice prompt:** Create a recursive helper that gathers text content from all <code>data-role="headline"</code> elements under a root node.

## 10. Safe Recursion Design Checklist & Debugging Safeguards

Protect yourself from infinite loops, stack overflows, and hard-to-read call stacks with these habits.

### Design checklist

- [ ] Write the base case first; comment it clearly.
- [ ] Log or trace input parameters when learning, then remove noisy logs later.
- [ ] Ensure each recursive call moves closer to the base case.
- [ ] Prefer returning data instead of mutating global state.
- [ ] Document argument invariants (e.g., “`index` always increases”).

### Debugging safeguards

| Risk | Symptom | Prevention | Recovery strategy |
|------|---------|------------|-------------------|
| Infinite recursion | Browser tab freezes | Add guards that bail out if arguments repeat | Log arguments and terminate after N calls |
| Stack overflow | "Maximum call stack size exceeded" | Reduce problem size faster; consider tail recursion or iteration | Process data in chunks or convert to loop |
| Re-computation | Function redoes the same work | Memoize results or pass cached data | Store solutions in a map keyed by arguments |

> 🛡️ **Callout:** Memoization trades memory for speed. If you notice repeated arguments, consider caching results to avoid redundant calls.

### When to use recursion vs iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| **Best for** | Tree/graph traversal, divide-and-conquer, backtracking | Simple loops, known iteration count, performance-critical |
| **Code clarity** | Often cleaner for nested structures | More explicit control flow |
| **Performance** | Function call overhead | Faster (no call stack) |
| **Memory** | O(depth) stack space | O(1) stack space |
| **Stack overflow risk** | Yes, for deep recursion | No |
| **Debugging** | Call stack shows history | Need explicit state tracking |
| **Example use cases** | DOM traversal, JSON parsing, maze solving | Array processing, counting, simple accumulation |

**Rule of thumb:** Use recursion when the problem is naturally recursive (trees, nested structures). Use iteration when performance and stack depth are concerns.

## 11. Practice Studio & Cheat Sheet Recap

### Tiered practice studio

| Level | Challenge | Hint | Expected outcome |
|-------|-----------|------|-------------------|
| Starter | Write `countDownWords(words)` that prints the first word and recurses on the rest. | Base case when the array is empty. | Console shows each word on its own line. |
| Builder | Implement `sumNested(numbers)` that sums numbers in nested arrays. | Use `Array.isArray` to branch. | Returns the correct numeric sum for any nesting depth. |
| Explorer | Create `collectLinks(node)` that returns all `href` values from nested lists. | Combine DOM recursion with accumulator arrays. | Produces an array of URL strings. |
| Trailblazer | Enhance the maze solver to allow diagonal moves with a cost. | Track cost in the path and compare totals. | Returns the cheapest path representation. |

### Cheat sheet recap

- **Base case mantra:** “Stop early, return confidently.”
- **Recursive step reminder:** “Shrink the input, trust the future call.”
- **Stack intuition:** Draw it, narrate it, or diagram it—never guess blindly.
- **Safety check:** Verify arguments change every time and that results bubble back correctly.
- **Self-check questions:**
  - What triggers the base case?
  - How does each call get closer to the base?
  - What is the call returning to its caller?
  - Could memoization or iteration serve as a backup plan?

> 🎓 **Closing encouragement:** Recursion is a conversation between problem sizes.
Keep experimenting, sketching call stacks, and celebrating every “aha!”—you are building a dependable intuition.