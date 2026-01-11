# Beginner's Guide to Linked Lists in JavaScript

Welcome! This guide will teach you **two things at once**:
1. How to use **classes** in JavaScript/TypeScript
2. How to build a **linked list** data structure

We'll go step-by-step, using simple language and analogies. By the end, you'll understand every line of code in our linked list implementation.

Let's begin!

---

## Part 1: What are Classes in JavaScript?

Before we dive into linked lists, let's understand **classes**—the building blocks we'll use.

### What is a Class?

Think of a **class** as a **blueprint** or **recipe** for creating objects.

**Real-world analogy:**
- **Blueprint for a House**: A blueprint shows how to build a house. It specifies where the rooms go, how many windows there are, etc. But the blueprint itself is not a house—it's just instructions.
- **Building a House**: When you follow the blueprint, you create an actual house. You can use the same blueprint to build many houses.

In JavaScript:
- A **class** is the blueprint.
- An **object** (or "instance") is the actual thing you create from that blueprint.

### Simple Example: A Dog Class

```javascript
// This is a CLASS - a blueprint for creating dogs
class Dog {
  // Properties: what data does every dog have?
  name;
  age;

  // Constructor: runs when you create a new dog
  constructor(name, age) {
    this.name = name;  // "this" refers to the specific dog being created
    this.age = age;
  }

  // Methods: what can a dog do?
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

// Now let's CREATE dogs (instances) from our blueprint:
const myDog = new Dog('Buddy', 3);
const yourDog = new Dog('Max', 5);

myDog.bark();  // Output: "Buddy says Woof!"
yourDog.bark(); // Output: "Max says Woof!"

console.log(myDog.age);   // Output: 3
console.log(yourDog.age); // Output: 5
```

### Key Class Concepts:

1. **Properties**: Variables that hold data (like `name` and `age`)
2. **Constructor**: Special method that runs when you create a new object with `new`
3. **Methods**: Functions that belong to the class (like `bark()`)
4. **`this` keyword**: Refers to the specific object you're working with
5. **`new` keyword**: Creates a new instance from the class

### TypeScript Additions:

TypeScript adds **types** to make code safer:

```typescript
class Dog {
  name: string;    // This property must be a string
  age: number;     // This property must be a number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// This would give an error:
// const badDog = new Dog(123, "five"); // Types are wrong!
```

**Why use types?** They catch mistakes before your code runs. If you try to pass a number where a string is expected, TypeScript will warn you.

---

## Part 2: What is a Linked List?

Now that we understand classes, let's learn about linked lists.

### The Train Analogy

Imagine a **train**:
- The train isn't one solid object—it's made of **individual train cars** connected together.
- Each car holds **cargo** (like passengers or goods).
- Each car has a **coupling** at its end that connects to the **next car**.
- The **engine** is at the front—it's your entry point to the whole train.
- The last car's coupling connects to **nothing** (the end of the train).

**A linked list works exactly like this:**
- Each "train car" is called a **node**.
- Each node holds **data** (the cargo).
- Each node has a **pointer** (the coupling) to the **next node**.
- The **head** is the first node (the engine).
- The **tail** is the last node (the caboose).
- The last node's pointer is `null` (nothing comes after it).

### Visual Representation:

```
HEAD                                              TAIL
  ↓                                                 ↓
[10 | →] → [20 | →] → [30 | →] → [40 | null]
  data     next   data   next    data   next
```

Each box represents a **node**:
- Left part: The **data** (like 10, 20, 30)
- Right part: The **pointer** to the next node (the arrow `→`)

### Why Not Just Use Arrays?

Great question! Arrays are simpler, so why bother with linked lists?

| Feature | Array | Linked List |
|---------|-------|-------------|
| **Adding to the beginning** | Slow! Must shift all elements right | **Fast!** Just update the head pointer |
| **Adding to the end** | Fast (usually) | **Fast** (if you have a tail pointer) |
| **Adding in the middle** | Slow! Must shift elements | **Fast!** Just change two pointers |
| **Accessing element #50** | **Super fast!** Just use `array[50]` | Slow. Must walk through 50 nodes |
| **Memory** | Must be in one continuous block | Can be scattered anywhere in memory |
| **Size** | Fixed (or expensive to resize) | **Dynamic!** Grows/shrinks easily |

**Bottom line:**
- **Arrays**: Great when you need to jump to any element instantly.
- **Linked Lists**: Great when you're frequently adding/removing from the ends or middle.

---

## Part 3: Building Block #1 - The `ListNode` Class

Let's look at our first class—the blueprint for a single train car (node).

```typescript
class ListNode<T> {
  public data: T;
  public next: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
    // next is null by default (isolated node)
  }
}
```

### Breaking It Down:

**1. The `<T>` - Generics**

```typescript
class ListNode<T>
```

The `<T>` is called a **generic type**. Think of it as a **placeholder** for any type.

- If you create `new ListNode<number>(10)`, then `T` becomes `number`.
- If you create `new ListNode<string>("hello")`, then `T` becomes `string`.

**Why?** So our linked list can hold **any type** of data (numbers, strings, objects, etc.), and TypeScript will keep us safe.

**2. Properties**

```typescript
public data: T;
public next: ListNode<T> | null = null;
```

- **`data: T`**: This holds the actual value (the cargo). Type `T` means "whatever type we decided when creating the node."

- **`next: ListNode<T> | null`**: This is the **pointer** to the next node (the coupling). It's either:
  - Another `ListNode` of the same type, OR
  - `null` (meaning this is the last node)

- **`public`**: Means we can access this property from outside the class.

- **`= null`**: Default value. When we create a new node, it doesn't point to anything yet.

**3. Constructor**

```typescript
constructor(data: T) {
  this.data = data;
  // next stays null (we'll link it later if needed)
}
```

This runs when you create a new node with `new ListNode(value)`. It sets up the data and leaves `next` as `null`.

### Example Usage:

```typescript
// Create an isolated node holding the number 42
const node1 = new ListNode<number>(42);
console.log(node1.data); // Output: 42
console.log(node1.next); // Output: null

// Create another node
const node2 = new ListNode<number>(99);

// Now connect them manually:
node1.next = node2;

// Now we have: node1 → node2 → null
console.log(node1.data);       // 42
console.log(node1.next.data);  // 99
console.log(node1.next.next);  // null
```

---

## Part 4: Building Block #2 - The `SinglyLinkedList` Class

Now let's look at the **manager** class—the one that handles all the nodes and provides useful methods.

```typescript
class SinglyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size: number = 0;

  // ... methods will go here ...
}
```

### Breaking It Down:

**1. Properties**

```typescript
private head: ListNode<T> | null = null;
private tail: ListNode<T> | null = null;
private _size: number = 0;
```

- **`head`**: A pointer to the **first node** in the list. If the list is empty, it's `null`.

- **`tail`**: A pointer to the **last node** in the list. This makes adding to the end super fast! (We'll see why soon.)

- **`_size`**: Keeps track of how many nodes are in the list. This lets us quickly check the list size without counting every node.

- **`private`**: Means these properties can only be accessed from **inside** the class. This protects them from being changed incorrectly from outside.

**2. Getters**

```typescript
get size(): number {
  return this._size;
}

get isEmpty(): boolean {
  return this._size === 0;
}
```

**Getters** are special methods that look like properties when you use them.

```typescript
const list = new SinglyLinkedList<number>();
console.log(list.size);      // Looks like a property, but it's actually running the getter method
console.log(list.isEmpty);   // true (because size is 0)
```

**Why use getters?**
- We keep `_size` private to prevent external code from messing it up.
- But we provide a `size` getter so people can **read** it (but not change it directly).

---

## Part 5: Adding Nodes to the List

Now the fun begins! Let's add methods to insert nodes.

### Method 1: `prepend()` - Add to the Beginning

**Goal:** Add a new node at the **front** of the list.

**Steps:**
1. Create a new node.
2. Point the new node's `next` to the current head.
3. Update `head` to be the new node.
4. **Special case:** If the list was empty, `tail` should also point to this new node.

**Code:**

```typescript
prepend(data: T): void {
  const newNode = new ListNode(data);

  // Link new node to current head (may be null if list is empty)
  newNode.next = this.head;

  // Update head to new node
  this.head = newNode;

  // Edge case: If list was empty, tail should also point to new node
  if (this.tail === null) {
    this.tail = newNode;
  }

  this._size++;
}
```

**Visual Example:**

Before `prepend(5)`:
```
HEAD        TAIL
  ↓          ↓
[10 | null]
```

After `prepend(5)`:
```
HEAD                  TAIL
  ↓                    ↓
[5 | →] → [10 | null]
```

**Time Complexity:** O(1) - Super fast! Just a few pointer changes.

---

### Method 2: `append()` - Add to the End

**Goal:** Add a new node at the **back** of the list.

**Steps:**
1. Create a new node.
2. **If the list is empty:** Both `head` and `tail` point to this new node.
3. **Otherwise:** Point the current tail's `next` to the new node, then update `tail`.

**Code:**

```typescript
append(data: T): void {
  const newNode = new ListNode(data);

  if (this.tail === null) {
    // Empty list case: both head and tail point to new node
    this.head = newNode;
    this.tail = newNode;
  } else {
    // Non-empty list: attach to current tail, then update tail
    this.tail.next = newNode;
    this.tail = newNode;
  }

  this._size++;
}
```

**Visual Example:**

Before `append(20)`:
```
HEAD        TAIL
  ↓          ↓
[10 | null]
```

After `append(20)`:
```
HEAD                  TAIL
  ↓                    ↓
[10 | →] → [20 | null]
```

**Why do we have a `tail` pointer?**

Without `tail`, we'd have to walk through the **entire list** to find the last node every time we want to append. That would be O(n) time!

With `tail`, we instantly know where the last node is. Appending becomes O(1) - super fast!

---

### Method 3: `insertAt()` - Add at a Specific Position

**Goal:** Add a new node at a specific index (0-based, like arrays).

**Steps:**
1. Validate the index (must be between 0 and size).
2. **If index is 0:** Use `prepend()`.
3. **If index equals size:** Use `append()`.
4. **Otherwise:** Walk to the node at `index - 1`, then insert after it.

**Code:**

```typescript
insertAt(data: T, index: number): void {
  // Validation: index must be in range [0, size]
  if (index < 0 || index > this._size) {
    throw new RangeError(
      `Index ${index} is out of bounds for size ${this._size}`
    );
  }

  // Special case: insert at beginning
  if (index === 0) {
    this.prepend(data);
    return;
  }

  // Special case: insert at end
  if (index === this._size) {
    this.append(data);
    return;
  }

  // General case: traverse to position before insertion point
  const newNode = new ListNode(data);
  let current = this.head!; // Safe: index > 0 means list is not empty

  // Walk to node at index-1
  for (let i = 0; i < index - 1; i++) {
    current = current.next!; // Safe: index < size guarantees valid path
  }

  // Insert new node between current and current.next
  newNode.next = current.next; // New node points to current's successor
  current.next = newNode;       // Current now points to new node

  this._size++;
}
```

**Visual Example:**

Before `insertAt(15, 1)` on the list `[10] → [20] → null`:

```
Index:  0        1
      HEAD     TAIL
        ↓       ↓
      [10 | →] → [20 | null]
```

**Process:**
1. Walk to index 0 (the node with data 10).
2. Create new node with data 15.
3. Point new node's `next` to `current.next` (which is 20).
4. Point `current.next` (10's next) to the new node.

After `insertAt(15, 1)`:

```
Index:  0        1          2
      HEAD                TAIL
        ↓                   ↓
      [10 | →] → [15 | →] → [20 | null]
```

**Time Complexity:** O(n) - We might have to walk through many nodes to reach the insertion point.

---

## Part 6: Removing Nodes from the List

Now let's learn how to remove nodes.

### Method 1: `removeFirst()` - Remove from the Beginning

**Goal:** Remove and return the data from the **first node**.

**Steps:**
1. If the list is empty, return `undefined`.
2. Save the head's data (we'll return it).
3. Move `head` forward to the next node.
4. **Special case:** If the list is now empty (head is null), set `tail` to null too.
5. Break the old head's link (helps garbage collector).

**Code:**

```typescript
removeFirst(): T | undefined {
  if (this.head === null) {
    return undefined; // Empty list
  }

  const data = this.head.data;
  const oldHead = this.head;

  // Move head forward
  this.head = this.head.next;

  // Edge case: List is now empty
  if (this.head === null) {
    this.tail = null;
  }

  // Break old head's link to help garbage collector
  oldHead.next = null;

  this._size--;
  return data;
}
```

**Visual Example:**

Before `removeFirst()`:
```
HEAD                      TAIL
  ↓                        ↓
[10 | →] → [20 | →] → [30 | null]
```

After `removeFirst()` (returns 10):
```
        HEAD              TAIL
          ↓                ↓
        [20 | →] → [30 | null]
```

**Time Complexity:** O(1) - Super fast!

---

### Method 2: `removeLast()` - Remove from the End

**Goal:** Remove and return the data from the **last node**.

**This is tricky!** In a singly linked list, each node only points **forward**. So to remove the last node, we need to find the **second-to-last node** and update its `next` pointer to `null`.

**Problem:** We can't jump directly to the second-to-last node. We must walk through the entire list from the head.

**Steps:**
1. If the list is empty, return `undefined`.
2. **Special case:** If there's only one node, use `removeFirst()`.
3. Walk through the list until we find the node whose `next` is `tail`.
4. Save the tail's data.
5. Set that node's `next` to `null` and update `tail` to point to it.

**Code:**

```typescript
removeLast(): T | undefined {
  if (this.head === null) {
    return undefined; // Empty list
  }

  // Single node case
  if (this.head === this.tail) {
    return this.removeFirst();
  }

  // Multiple nodes: find penultimate node
  let current = this.head;
  while (current.next !== this.tail) {
    current = current.next!; // Safe: we know tail exists and is reachable
  }

  const data = this.tail!.data;

  // Detach tail
  current.next = null;
  this.tail = current;

  this._size--;
  return data;
}
```

**Visual Example:**

Before `removeLast()`:
```
HEAD                      TAIL
  ↓                        ↓
[10 | →] → [20 | →] → [30 | null]
```

**Process:**
1. Start at head (10).
2. Keep moving: `current.next !== tail`?
   - At 10: next is 20, which is not tail (30). Move forward.
   - At 20: next is 30, which **is** tail. Stop here!
3. Now `current` is the node with data 20.
4. Set `current.next = null` and `tail = current`.

After `removeLast()` (returns 30):
```
HEAD        TAIL
  ↓          ↓
[10 | →] → [20 | null]
```

**Time Complexity:** O(n) - We have to walk through the list. This is a downside of singly linked lists!

---

### Method 3: `removeAt()` - Remove at a Specific Index

**Goal:** Remove the node at a specific index and return its data.

**Steps:**
1. Validate the index.
2. If index is 0, use `removeFirst()`.
3. Otherwise, walk to the node **before** the target (at `index - 1`).
4. Bypass the target node by setting `previous.next = target.next`.
5. **Special case:** If we removed the tail, update the `tail` pointer.

**Code:**

```typescript
removeAt(index: number): T | undefined {
  if (index < 0 || index >= this._size) {
    return undefined; // Invalid index
  }

  if (index === 0) {
    return this.removeFirst();
  }

  // Traverse to node before target
  let current = this.head!;
  for (let i = 0; i < index - 1; i++) {
    current = current.next!;
  }

  const target = current.next!;
  const data = target.data;

  // Bypass target node
  current.next = target.next;

  // Edge case: If we removed the tail, update tail pointer
  if (target === this.tail) {
    this.tail = current;
  }

  // Help GC
  target.next = null;

  this._size--;
  return data;
}
```

**Visual Example:**

Before `removeAt(1)` on `[10] → [20] → [30] → null`:

```
Index:  0        1        2
      HEAD              TAIL
        ↓                ↓
      [10 | →] → [20 | →] → [30 | null]
```

**Process:**
1. Walk to index 0 (node with data 10) - this is `index - 1`.
2. The target is `current.next` (node with data 20).
3. Set `current.next = target.next` (10 now points to 30, bypassing 20).

After `removeAt(1)` (returns 20):

```
Index:  0        1
      HEAD     TAIL
        ↓       ↓
      [10 | →] → [30 | null]
```

**Time Complexity:** O(n) - Must walk to the target position.

---

## Part 7: Finding and Accessing Nodes

### Method 1: `find()` - Search Using a Condition

**Goal:** Find the first node that matches a given condition.

**How it works:** You provide a **predicate function** (a function that returns `true` or `false`). We'll walk through the list and return the first data that makes the predicate return `true`.

**Code:**

```typescript
find(predicate: (data: T, index: number) => boolean): T | undefined {
  let current = this.head;
  let index = 0;

  while (current !== null) {
    if (predicate(current.data, index)) {
      return current.data;
    }
    current = current.next;
    index++;
  }

  return undefined; // Not found
}
```

**Example Usage:**

```typescript
const list = new SinglyLinkedList<number>();
list.append(10);
list.append(20);
list.append(30);

// Find the first number greater than 15
const result = list.find((data) => data > 15);
console.log(result); // Output: 20
```

**Time Complexity:** O(n) - Might have to check every node.

---

### Method 2: `getNodeAt()` - Get Node at a Specific Index

**Goal:** Return the actual **node** (not just the data) at a given index. This is useful for advanced operations.

**Code:**

```typescript
getNodeAt(index: number): ListNode<T> | null {
  if (index < 0 || index >= this._size) {
    return null;
  }

  let current = this.head;
  for (let i = 0; i < index; i++) {
    current = current!.next;
  }

  return current;
}
```

**Time Complexity:** O(n) - Must walk through nodes.

---

## Part 8: Utility Methods

### Method 1: `toArray()` - Convert to Array

**Goal:** Create an array containing all the data from the linked list, in order.

**Code:**

```typescript
toArray(): T[] {
  const result: T[] = [];
  let current = this.head;

  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}
```

**Example:**

```typescript
const list = new SinglyLinkedList<number>();
list.append(10);
list.append(20);
list.append(30);

console.log(list.toArray()); // Output: [10, 20, 30]
```

---

### Method 2: `fromArray()` - Create List from Array

**Goal:** A **static method** that creates a new linked list from an array.

**What's a static method?** It belongs to the **class itself**, not to instances. You call it on the class: `SinglyLinkedList.fromArray([...])`.

**Code:**

```typescript
static fromArray<U>(arr: U[]): SinglyLinkedList<U> {
  const list = new SinglyLinkedList<U>();
  for (const item of arr) {
    list.append(item);
  }
  return list;
}
```

**Example:**

```typescript
const list = SinglyLinkedList.fromArray([10, 20, 30]);
list.print(); // Output: 10 → 20 → 30 → null
```

---

### Method 3: `print()` - Display the List

**Goal:** Print the list in a human-readable format.

**Code:**

```typescript
print(): void {
  if (this.head === null) {
    console.log('Empty list');
    return;
  }

  const values: string[] = [];
  let current = this.head;

  // Guard against cycles by limiting to size + 1
  for (let i = 0; i <= this._size && current !== null; i++) {
    values.push(String(current.data));
    current = current.next;
  }

  console.log(values.join(' → ') + ' → null');
}
```

**Example Output:**
```
10 → 20 → 30 → null
```

---

### Method 4: `clear()` - Empty the List

**Goal:** Remove all nodes and reset the list.

**Why break links?** We explicitly set each node's `next` to `null` to help the **garbage collector** reclaim memory faster.

**Code:**

```typescript
clear(): void {
  let current = this.head;

  while (current !== null) {
    const next = current.next;
    current.next = null; // Break link
    current = next;
  }

  this.head = null;
  this.tail = null;
  this._size = 0;
}
```

---

### Method 5: Iterator - Enable `for...of` Loops

**Goal:** Make our linked list work with `for...of` loops (just like arrays).

**How?** Implement the **iterator protocol** using a generator function.

**Code:**

```typescript
*[Symbol.iterator](): Iterator<T> {
  let current = this.head;
  let visited = 0;

  // Guard against cycles by limiting to size
  while (current !== null && visited < this._size) {
    yield current.data;
    current = current.next;
    visited++;
  }
}
```

**What's happening here?**
- The `*` makes this a **generator function**.
- `yield` pauses the function and returns a value, then resumes on the next iteration.
- `Symbol.iterator` is a special symbol that JavaScript recognizes for iteration.

**Example Usage:**

```typescript
const list = new SinglyLinkedList<string>();
list.append('A');
list.append('B');
list.append('C');

for (const item of list) {
  console.log(item);
}
// Output:
// A
// B
// C
```

---

## Part 9: Complete Example Walkthrough

Let's see everything in action with a real-world example: a **music playlist**.

```typescript
console.log('=== Music Playlist Demo ===\n');

// Create an empty playlist
const playlist = new SinglyLinkedList<string>();

// Add some songs to the end
console.log('1. Adding songs...');
playlist.append('Song A');
playlist.append('Song B');
playlist.append('Song C');
playlist.print();
// Output: Song A → Song B → Song C → null

// Add a new favorite to the front
console.log('\n2. Adding a favorite at the start...');
playlist.prepend('Song Z');
playlist.print();
// Output: Song Z → Song A → Song B → Song C → null

// Insert a song in the middle (at index 2)
console.log('\n3. Inserting at index 2...');
playlist.insertAt('Song M', 2);
playlist.print();
// Output: Song Z → Song A → Song M → Song B → Song C → null

// Remove the first song
console.log('\n4. Removing the first song...');
const removed = playlist.removeFirst();
console.log('Removed:', removed); // Removed: Song Z
playlist.print();
// Output: Song A → Song M → Song B → Song C → null

// Remove song at index 2
console.log('\n5. Removing at index 2...');
const removedAt = playlist.removeAt(2);
console.log('Removed:', removedAt); // Removed: Song B
playlist.print();
// Output: Song A → Song M → Song C → null

// Find a specific song
console.log('\n6. Finding "Song M"...');
const found = playlist.find((song) => song === 'Song M');
console.log('Found:', found); // Found: Song M

// Convert to array
console.log('\n7. Converting to array...');
console.log(playlist.toArray()); // ["Song A", "Song M", "Song C"]

// Iterate with for...of
console.log('\n8. Using for...of loop...');
for (const song of playlist) {
  console.log('  -', song);
}
// Output:
//   - Song A
//   - Song M
//   - Song C

// Check size
console.log('\n9. Current playlist size:', playlist.size); // 3
```

---

## Part 10: Summary

Congratulations! You now understand:

### 1. **JavaScript Classes:**
- Classes are blueprints for creating objects
- They have properties (data), constructors (initialization), and methods (functions)
- The `this` keyword refers to the current instance
- TypeScript adds types for safety

### 2. **Linked Lists:**
- A collection of nodes, each pointing to the next
- Has a `head` (first node) and `tail` (last node)
- Dynamic size - grows and shrinks easily
- Great for frequent insertions/deletions at the ends

### 3. **Singly Linked List Operations:**

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| `prepend()` | O(1) | Add to beginning - very fast |
| `append()` | O(1) | Add to end - fast because we have a tail pointer |
| `insertAt(index)` | O(n) | Must walk to the position |
| `removeFirst()` | O(1) | Remove from beginning - very fast |
| `removeLast()` | O(n) | Must find second-to-last node (singly linked list limitation) |
| `removeAt(index)` | O(n) | Must walk to the position |
| `find()` | O(n) | Must potentially check every node |
| `toArray()` | O(n) | Must visit every node |

### 4. **Key Takeaways:**
- **Head pointer**: Gives us access to the entire list
- **Tail pointer**: Makes appending O(1) instead of O(n)
- **Size tracking**: Makes length checks instant
- **Pointer manipulation**: The core skill - updating `next` references to add/remove nodes
- **Edge cases**: Always consider empty lists and single-node lists

### When to Use Linked Lists:
✅ Frequent insertions/deletions at the beginning or end
✅ Unknown or changing data size
✅ Implementing other data structures (stacks, queues)
✅ When you don't need random access by index

### When NOT to Use Linked Lists:
❌ Need fast access to elements by index (use arrays)
❌ Frequent searches for specific values (arrays or hash maps are better)
❌ Memory is tight (linked lists use extra memory for pointers)

---

## Next Steps

Now that you understand the basics:

1. **Try implementing it yourself** from scratch without looking at the code
2. **Add more methods**: `contains()`, `indexOf()`, `reverse()`, `concat()`
3. **Learn about Doubly Linked Lists**: Each node has `next` AND `previous` pointers
4. **Explore circular linked lists**: The tail points back to the head
5. **Solve LeetCode problems**: Practice linked list manipulation problems

Happy coding! 🚀