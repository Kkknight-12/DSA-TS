# Recursion for Beginners (JavaScript)

We'll break down **Recursion** step-by-step, using simple language and analogies. By the end, you'll understand not just how it works, but *why* it's one of the most elegant problem-solving techniques in programming!

---

## Let's Start with the Big Picture

Imagine you're packing Russian nesting dolls (matryoshka dolls). Each doll contains a smaller version of itself until you reach the tiniest doll that contains nothing.

**Opening them**:
1. Open the outermost doll → Find another doll inside
2. Open that doll → Find another doll inside
3. Keep opening → Until you find the smallest doll (it contains nothing!)
4. Now you're done!

**This is recursion!**
- Each "open the doll" action is the SAME task, just on a smaller doll
- You keep repeating until you hit the smallest doll (base case)
- Then you stop

Recursion feels mysterious until you realize: **every call is just future-you finishing the job you started with a smaller version of the same puzzle.**

> 🌟 **Mindset shift:** Recursion is teamwork with future-you. You handle one step, trust future-you to handle the rest with a smaller problem.

---

## 1. The Two Essential Parts

Every recursive function has exactly two parts. Miss either one, and your function won't work (or worse, it'll run forever!).

### Part 1: Base Case 🛑

**The emergency brake.** The condition that stops the recursion.

Think of it as: "When is the problem so simple that I know the answer immediately?"

```javascript
// Example: Counting down
function countdown(n) {
  if (n === 0) {           // ← BASE CASE
    console.log("Blast off!");
    return;
  }
  // ... recursive magic here ...
}
```

**Without a base case**: Your function calls itself forever → Stack overflow! 💥

### Part 2: Recursive Case 🔁

**The progress step.** The part where the function calls itself with a SMALLER problem.

```javascript
function countdown(n) {
  if (n === 0) {
    console.log("Blast off!");
    return;
  }

  console.log(n);
  countdown(n - 1);        // ← RECURSIVE CASE (smaller problem!)
}
```

**Key insight**: Each call must make progress toward the base case.
- `countdown(3)` → calls `countdown(2)` (smaller!)
- `countdown(2)` → calls `countdown(1)` (smaller!)
- `countdown(1)` → calls `countdown(0)` (base case! ✓)

> ✅ **Self-check:** Can you identify the base case and recursive case in any recursive function you see?

**Example usage**:
```javascript
countdown(3);
// Output:
// 3
// 2
// 1
// Blast off!
```

**Complexity**: Time O(n), Space O(n) — n function calls on the stack.

**Edge case**: `countdown(0)` returns immediately via base case.

---

## 2. Your First Real Recursive Function: Factorial

Now let's learn recursion properly with ONE example we'll explore deeply: **factorial**.

> 💡 **Why factorial?** It's the "Hello World" of recursion. One clear base case, one simple operation, easy to trace. We'll use this same example to teach MULTIPLE concepts!

### What is Factorial?

**Mathematical definition**:
- `5! = 5 × 4 × 3 × 2 × 1 = 120`
- `4! = 4 × 3 × 2 × 1 = 24`
- `1! = 1`
- `0! = 1` (by definition)

**The recursive insight**:
```
5! = 5 × 4!
4! = 4 × 3!
3! = 3 × 2!
2! = 2 × 1!
1! = 1 (base case)
```

Notice the pattern? **factorial(n) = n × factorial(n-1)**

### The Code

```javascript
function factorial(n) {
  // BASE CASE: The simplest version we know immediately
  if (n <= 1) {
    return 1;
  }

  // RECURSIVE CASE: Break into smaller problem
  return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // Expected output: 120
console.log(factorial(0)); // Expected output: 1
console.log(factorial(1)); // Expected output: 1
```

**Complexity**: Time O(n), Space O(n) — n recursive calls on the stack.

**Edge case**: `factorial(0)` and `factorial(1)` both return 1 immediately via base case.

### Breaking It Down Line-by-Line

Let's trace `factorial(3)` in excruciating detail:

```javascript
factorial(3)
  → Is 3 <= 1? NO
  → Return 3 * factorial(2)

    factorial(2)
      → Is 2 <= 1? NO
      → Return 2 * factorial(1)

        factorial(1)
          → Is 1 <= 1? YES! BASE CASE ✓
          → Return 1

      → factorial(1) returned 1
      → Return 2 * 1 = 2

  → factorial(2) returned 2
  → Return 3 * 2 = 6

Final result: 6
```

**Key observations**:
1. **Going DOWN** (expanding): We make calls with smaller numbers (3 → 2 → 1)
2. **Base case STOPS** the expansion (1 returns immediately)
3. **Coming BACK UP** (unwinding): Each call multiplies and returns (1 → 2 → 6)

> 🧠 **Mental model:** Like stacking plates. You stack them going down (calls), then pick them up coming back up (returns), doing work as you pick them up.

---

## 3. Visualizing the Call Stack

When you call a function, JavaScript puts it on the **call stack**. With recursion, the stack grows as calls accumulate, then shrinks as they return.

Let's visualize the stack for `factorial(4)`:

### Stack Growth (Expanding Phase ⬇️)

```
Step 1: Call factorial(4)
┌─────────────────┐
│ factorial(4)    │ ← Waiting for factorial(3)
└─────────────────┘

Step 2: factorial(4) calls factorial(3)
┌─────────────────┐
│ factorial(3)    │ ← Waiting for factorial(2)
├─────────────────┤
│ factorial(4)    │ ← Waiting for factorial(3)
└─────────────────┘

Step 3: factorial(3) calls factorial(2)
┌─────────────────┐
│ factorial(2)    │ ← Waiting for factorial(1)
├─────────────────┤
│ factorial(3)    │ ← Waiting for factorial(2)
├─────────────────┤
│ factorial(4)    │ ← Waiting for factorial(3)
└─────────────────┘

Step 4: factorial(2) calls factorial(1)
┌─────────────────┐
│ factorial(1)    │ ← BASE CASE! Returns 1
├─────────────────┤
│ factorial(2)    │ ← Waiting...
├─────────────────┤
│ factorial(3)    │ ← Waiting...
├─────────────────┤
│ factorial(4)    │ ← Waiting...
└─────────────────┘
```

### Stack Shrinking (Unwinding Phase ⬆️)

```
Step 5: factorial(1) returns 1
┌─────────────────┐
│ factorial(2)    │ ← Computes 2 * 1 = 2, returns 2
├─────────────────┤
│ factorial(3)    │ ← Waiting...
├─────────────────┤
│ factorial(4)    │ ← Waiting...
└─────────────────┘

Step 6: factorial(2) returns 2
┌─────────────────┐
│ factorial(3)    │ ← Computes 3 * 2 = 6, returns 6
├─────────────────┤
│ factorial(4)    │ ← Waiting...
└─────────────────┘

Step 7: factorial(3) returns 6
┌─────────────────┐
│ factorial(4)    │ ← Computes 4 * 6 = 24, returns 24
└─────────────────┘

Step 8: factorial(4) returns 24
Stack is empty! ✓
```

### Complete Trace Table

| Moment | Stack Contents (top → bottom) | Action | Value Returning |
|--------|------------------------------|--------|-----------------|
| Push 1 | `factorial(4)` | Call factorial(3) | pending |
| Push 2 | `factorial(3)`, `factorial(4)` | Call factorial(2) | pending |
| Push 3 | `factorial(2)`, `factorial(3)`, `factorial(4)` | Call factorial(1) | pending |
| Push 4 | `factorial(1)`, `factorial(2)`, `factorial(3)`, `factorial(4)` | BASE CASE | 1 |
| Pop 1 | `factorial(2)`, `factorial(3)`, `factorial(4)` | 2 * 1 | 2 |
| Pop 2 | `factorial(3)`, `factorial(4)` | 3 * 2 | 6 |
| Pop 3 | `factorial(4)` | 4 * 6 | 24 |
| Pop 4 | (empty) | Done! | 24 |

**Two phases clearly visible**:
1. **Expanding** (Push 1-4): Stack GROWS, moving toward base case
2. **Unwinding** (Pop 1-4): Stack SHRINKS, combining results

> 🧠 **Key insight:** The stack holds all the "pending work" — multiplications waiting to happen. This is why recursive functions use O(n) space!

---

## 4. A Contrasting Example: Building vs Combining

We've seen how `factorial` works by **combining** results as it unwinds. But there's another style: building the answer as you go **down** the stack.

Let's see the SAME problem (summing numbers) solved BOTH ways.

> 💡 **Why show both?** To understand that recursion has two distinct "flavors" — and you can choose which feels more natural for your problem!

### Style 1: Combiner (Work Happens on the Way UP ⬆️)

```javascript
// Sum 1+2+3+...+n by COMBINING results as we return
function sum(n) {
  if (n === 0) return 0;                // BASE CASE
  return n + sum(n - 1);                // COMBINE after return
}

// Trace sum(3):
// sum(3) → 3 + sum(2)
//              sum(2) → 2 + sum(1)
//                           sum(1) → 1 + sum(0)
//                                        sum(0) → returns 0
//                                   returns 1 + 0 = 1
//                      returns 2 + 1 = 3
//         returns 3 + 3 = 6

console.log(sum(3)); // Expected output: 6
```

**When work happens**: AFTER recursive call returns (unwinding phase ⬆️)

**Stack frames hold**: Pending addition operations

### Style 2: Accumulator (Work Happens on the Way DOWN ⬇️)

```javascript
// Sum 1+2+3+...+n by BUILDING result as we go down
function sumAccumulator(n, acc = 0) {
  if (n === 0) return acc;              // BASE CASE (return accumulated result)
  return sumAccumulator(n - 1, acc + n); // BUILD result going down
}

// Trace sumAccumulator(3, 0):
// sumAccumulator(3, 0)      → acc = 0 + 3 = 3, call sumAccumulator(2, 3)
//   sumAccumulator(2, 3)    → acc = 3 + 2 = 5, call sumAccumulator(1, 5)
//     sumAccumulator(1, 5)  → acc = 5 + 1 = 6, call sumAccumulator(0, 6)
//       sumAccumulator(0, 6) → BASE CASE! return 6
//       returns 6
//     returns 6
//   returns 6
// returns 6

console.log(sumAccumulator(3)); // Expected output: 6
```

**When work happens**: BEFORE recursive call (expanding phase ⬇️)

**Stack frames hold**: No pending work! Result is in the `acc` parameter.

### Side-by-Side Comparison

| Aspect | Combiner (sum) | Accumulator (sumAccumulator) |
|--------|---------------|------------------------------|
| **Extra parameter?** | No | Yes (acc) |
| **When is work done?** | After return (⬆️) | Before call (⬇️) |
| **Stack frames hold** | Pending operations | No pending work |
| **Base case returns** | Simple value (0) | Accumulated result (acc) |
| **Typical use** | Math operations, tree traversal | String building, iteration with state |
| **Tail-call optimizable?** | No | Yes (advanced topic) |

> 🌟 **Reflection:** The combiner style matches mathematical definitions (factorial, fibonacci). The accumulator style matches iterative loops (building a result step-by-step). Both are valid!

**Complexity (both)**: Time O(n), Space O(n) — same time, same space!

---

## 5. A Third Example: String Processing

Let's see accumulator style in action with strings. We'll clean a sentence by removing punctuation.

> 💡 **Why this example?** Strings naturally build character-by-character, making accumulator style very intuitive. Shows how recursion isn't just for math!

```javascript
function cleanString(text, index = 0, result = "") {
  // BASE CASE: Processed all characters
  if (index >= text.length) {
    return result.trim();
  }

  // WORK FIRST: Process current character (⬇️)
  const char = text[index];
  const isValid = /[a-zA-Z0-9\s]/.test(char);
  const newResult = isValid ? result + char : result;

  // THEN RECURSE: Move to next character
  return cleanString(text, index + 1, newResult);
}

// Example usage:
console.log(cleanString("Hello, World!"));  // Expected: "Hello World"
console.log(cleanString(""));                // Expected: ""
```

**Complexity**: Time O(n), Space O(n) — processes each character once, n calls on stack.

**Edge case**: Empty string `""` returns immediately when `index >= text.length`.

**Trace for `"Hi!":`**

```
EXPANDING PHASE (doing work ⬇️):
cleanString("Hi!", 0, "")       → char='H', valid, result="H"
  cleanString("Hi!", 1, "H")    → char='i', valid, result="Hi"
    cleanString("Hi!", 2, "Hi") → char='!', invalid, result="Hi"
      cleanString("Hi!", 3, "Hi") → BASE CASE!

UNWINDING PHASE (just returning ⬆️):
      returns "Hi"
    returns "Hi"
  returns "Hi"
returns "Hi"
```

Notice: Work happens BEFORE the recursive call (accumulator style).

---

## 6. When to Use Recursion vs Iteration

Now that you understand recursion, when should you actually use it?

| Aspect | Recursion | Iteration (Loops) |
|--------|-----------|------------------|
| **Best for** | Trees, graphs, nested structures, divide-and-conquer | Linear data (arrays), known iteration count, performance-critical |
| **Code clarity** | Often cleaner for nested problems | More explicit control |
| **Performance** | Function call overhead | Faster (no call stack) |
| **Memory** | O(depth) stack space | O(1) stack space |
| **Stack overflow risk** | Yes (deep recursion) | No |
| **Debugging** | Call stack shows history | Need explicit state tracking |
| **Examples** | DOM traversal, JSON parsing, maze solving | Array sum, counting, searching |

### Rule of Thumb

**Use recursion when**:
- ✅ Problem is naturally recursive (trees, nested objects)
- ✅ Code clarity matters more than performance
- ✅ Depth is limited (< 1000 levels typically safe)
- ✅ Divide-and-conquer approach fits

**Use iteration when**:
- ✅ Simple linear processing
- ✅ Performance is critical
- ✅ Deep recursion is possible
- ✅ Problem is naturally iterative

> 💡 **Pro tip:** Most recursive functions CAN be rewritten iteratively (using a manual stack), but should you? Only if performance or stack depth is a real concern.

---

## 7. Common Pitfalls & How to Avoid Them

### Pitfall 1: Missing Base Case

```javascript
// ❌ WRONG: No base case!
function countdown(n) {
  console.log(n);
  countdown(n - 1);  // Never stops!
}
```

**Fix**: Always write the base case FIRST!

```javascript
// ✅ CORRECT
function countdown(n) {
  if (n === 0) return;  // BASE CASE first!
  console.log(n);
  countdown(n - 1);
}
```

### Pitfall 2: Not Making Progress Toward Base Case

```javascript
// ❌ WRONG: Always calls with same value!
function broken(n) {
  if (n === 0) return 0;
  return 1 + broken(n);  // n never changes!
}
```

**Fix**: Each call must move closer to the base case!

```javascript
// ✅ CORRECT
function works(n) {
  if (n === 0) return 0;
  return 1 + works(n - 1);  // n decreases!
}
```

### Pitfall 3: Forgetting to Return

```javascript
// ❌ WRONG: Doesn't return the recursive result!
function factorial(n) {
  if (n <= 1) return 1;
  n * factorial(n - 1);  // Missing 'return'!
}
```

**Fix**: Always return the recursive call's result!

```javascript
// ✅ CORRECT
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // Return it!
}
```

### Safety Checklist

Before running recursive code:

- [ ] Does it have a base case?
- [ ] Does every recursive call move toward the base case?
- [ ] Am I returning the recursive result?
- [ ] Could this recurse more than ~1000 times? (stack overflow risk)
- [ ] Is there pending work after the return? (not tail-recursive)

---

## 8. Advanced Applications (Optional)

These examples show recursion in real-world scenarios. **Don't worry if these feel complex** — focus on recognizing the pattern: base case + recursive case + making progress.

### Application 1: Nested Object Traversal

Useful for exploring deeply nested JSON, configuration files, or organizational charts.

```javascript
const company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 }
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 }
    ],
    internals: [{ name: "Jack", salary: 1300 }]
  }
};

function collectNames(department) {
  // BASE CASE: Array of people
  if (Array.isArray(department)) {
    return department
      .filter(p => p && typeof p === 'object' && 'name' in p)
      .map(p => p.name);
  }

  // RECURSIVE CASE: Object with sub-departments
  return Object.values(department)
    .map(sub => collectNames(sub))  // Recurse on each sub-department
    .flat();
}

console.log(collectNames(company));
// Expected: ["John", "Alice", "Peter", "Alex", "Jack"]
```

**Complexity**: Time O(n), Space O(d) — n = total nodes, d = max depth.

**Edge case**: Handles `null` or missing `name` properties gracefully via filter.

### Application 2: Maze Solving (Backtracking)

Finding a path through a maze using backtracking — exploring options recursively.

```javascript
const maze = [
  [1, 1, 0, 0],  // 1 = open, 0 = wall
  [0, 1, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 1]   // Goal: reach (3, 3)
];

function findPath(row, col, path = []) {
  // BASE CASE 1: Out of bounds or hit wall
  const inBounds = row >= 0 && col >= 0 &&
                   row < maze.length && col < maze[0].length;
  if (!inBounds || maze[row][col] === 0) {
    return null;
  }

  // BASE CASE 2: Reached goal!
  path.push([row, col]);
  if (row === maze.length - 1 && col === maze[0].length - 1) {
    return path.slice();
  }

  // Mark visited (⚠️ mutates maze in-place!)
  maze[row][col] = 0;

  // RECURSIVE CASE: Try all 4 directions
  const moves = [
    findPath(row + 1, col, path),  // down
    findPath(row, col + 1, path),  // right
    findPath(row - 1, col, path),  // up
    findPath(row, col - 1, path)   // left
  ];

  // Backtrack: Unmark and remove from path
  maze[row][col] = 1;
  path.pop();

  return moves.find(result => result);
}

console.log(findPath(0, 0));
// Expected: [[0,0], [0,1], [1,1], [1,2], [2,2], [2,3], [3,3]]
```

**Complexity**: Time O(4^(m×n)) worst case, Space O(m×n) for stack depth.

**Edge case**: Starting at a wall returns `null` immediately.

> 🚀 **Advanced note:** This uses **backtracking** — trying options, and undoing (backtracking) when they fail. This is a powerful pattern for puzzles and constraint problems!

---

## 9. Practice Challenges

Test your understanding with these tiered challenges:

### Beginner

1. **Countdown with Message**
   Write `countdown(n, message)` that prints n down to 1, followed by the message.
   ```javascript
   countdown(3, "Go!")
   // Output: 3, 2, 1, Go!
   ```

2. **Sum of Array**
   Write `sumArray([1, 2, 3, 4])` that returns the sum recursively.
   ```javascript
   sumArray([1, 2, 3, 4]) // Expected: 10
   ```

### Intermediate

3. **Reverse String**
   Write `reverse("hello")` that returns `"olleh"` recursively.
   ```javascript
   reverse("hello") // Expected: "olleh"
   ```

4. **Fibonacci**
   Write `fib(n)` that returns the nth Fibonacci number.
   ```javascript
   fib(6) // Expected: 8 (1,1,2,3,5,8)
   ```

### Advanced

5. **Flatten Nested Array**
   Write `flatten([1, [2, [3, 4]], 5])` that returns `[1, 2, 3, 4, 5]`.
   ```javascript
   flatten([1, [2, [3, 4]], 5]) // Expected: [1,2,3,4,5]
   ```

6. **Count Nodes in DOM Tree**
   Write `countElements(root)` that counts all element nodes recursively.

> 🎯 **Hint:** For each problem, identify: (1) Base case, (2) How to make problem smaller, (3) How to combine results.

---

## 10. Cheat Sheet

### The Recursion Formula

```javascript
function recursiveFunction(problem) {
  // 1. BASE CASE: Stop condition
  if (problemIsTrivial) {
    return trivialAnswer;
  }

  // 2. RECURSIVE CASE: Break down + recurse
  const smallerProblem = makeSmaller(problem);
  const smallerAnswer = recursiveFunction(smallerProblem);

  // 3. COMBINE (if needed)
  return combine(currentStep, smallerAnswer);
}
```

### Quick Checks

**Before writing recursion:**
- What's my base case? (When do I stop?)
- How do I make the problem smaller?
- Do I combine results, or build as I go?

**While debugging:**
- Add `console.log` at function start: `console.log('Called with:', problem)`
- Check if arguments change each call
- Verify base case is reachable

**Common patterns:**
- **Combiner**: `return current + recurse(smaller)`
- **Accumulator**: `return recurse(smaller, acc + current)`
- **Both styles work**: Choose what feels natural!

### Complexity Quick Guide

| Pattern | Time | Space | Example |
|---------|------|-------|---------|
| Single recursive call | O(n) | O(n) | factorial, sum |
| Two recursive calls | O(2ⁿ) | O(n) | fibonacci (naive) |
| Tree traversal | O(n) | O(height) | DOM, JSON parsing |
| Backtracking | O(branches^depth) | O(depth) | maze solving |

---

## Closing Thoughts

Recursion is a conversation between problem sizes. Each call says: "I'll handle one piece, you handle the rest with a smaller version."

**Remember**:
- ✅ Start with the base case (the emergency brake)
- ✅ Make progress toward the base case (don't loop forever)
- ✅ Trust the recursion (don't try to trace every call in your head)
- ✅ Use the right tool: recursion for nested problems, iteration for linear ones

> 🎓 **You've learned:** Base cases, recursive cases, call stacks, two recursion styles, and when to use recursion vs iteration. That's the foundation of ALL recursive thinking!

Keep experimenting, sketching call stacks, and celebrating every "aha!" moment — you're building a dependable intuition. 🚀

---

*Happy recursing! Remember: every master was once a beginner who didn't give up.* ✨
