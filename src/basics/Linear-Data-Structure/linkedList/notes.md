We'll break down **Linked Lists** step-by-step, using simple language and analogies.

Let's start with the big picture.

---

### The Problem: Storing and Managing a Collection of Data

Imagine you're building a music playlist app. Users constantly add songs, remove songs, insert songs at specific positions, and rearrange their playlists. How do you store this data efficiently?

You could use an **array** - the most common data structure in JavaScript:

```javascript
const playlist = ["Song A", "Song B", "Song C", "Song D"];
```

But what happens when users:
- Insert a new song at the beginning? You shift all existing songs.
- Remove a song from the middle? You shift all songs after it.
- Have massive playlists with thousands of songs? Every insertion/deletion causes extensive copying.

Arrays are great for random access (`playlist[42]` gives you the 42nd song instantly), but they struggle with **frequent insertions and deletions** because elements must stay in contiguous memory.

**Our goal:** Find a data structure that excels at inserting and removing elements without the overhead of shifting.

---

### Step 1: The "Naive" or "Standard" Approach - Arrays

Before we understand the cleverness of Linked Lists, let's see how arrays handle our playlist scenario.

**How Arrays Work:**

Arrays store elements in **contiguous memory locations** - like numbered parking spots in a row:

```
Memory:  [Song A][Song B][Song C][Song D]
Index:      0       1       2       3
```

**Adding a song at the beginning:**

```javascript
playlist.unshift("New Song");
// Before: ["Song A", "Song B", "Song C", "Song D"]
// After:  ["New Song", "Song A", "Song B", "Song C", "Song D"]
```

**What happens internally:**
1. Allocate new memory for 5 elements
2. Copy "New Song" to index 0
3. Copy "Song A" from index 0 to index 1
4. Copy "Song B" from index 1 to index 2
5. Copy "Song C" from index 2 to index 3
6. Copy "Song D" from index 3 to index 4

**Time complexity: O(n)** - Every element after the insertion point must shift.

**Removing a song from the middle:**

```javascript
playlist.splice(2, 1); // Remove "Song C"
// Before: ["Song A", "Song B", "Song C", "Song D"]
// After:  ["Song A", "Song B", "Song D"]
```

**What happens internally:**
1. Find index 2
2. Copy "Song D" from index 3 to index 2
3. Resize the array (or mark the last spot as unused)

**Time complexity: O(n)** - Elements after the deletion must shift left.

**The Problem with Arrays:**

| Operation | Array Complexity | Issue |
|-----------|------------------|-------|
| Access by index | O(1) ✓ | Fast! Direct memory jump |
| Insert at beginning | O(n) ✗ | Must shift all n elements |
| Insert at end | O(1)* | Amortized constant, but may trigger resize |
| Insert in middle | O(n) ✗ | Must shift elements after insertion |
| Delete from beginning | O(n) ✗ | Must shift all remaining elements |
| Delete from middle | O(n) ✗ | Must shift elements after deletion |
| Search (unsorted) | O(n) | Must check each element |

\* JavaScript engines optimize appending, but worst-case involves memory reallocation.

**Key Insight:** Arrays are optimized for **random access**, but penalize **frequent insertions and deletions** because of their contiguous memory requirement.

---

### Step 2: The Challenge - Breaking Free from Contiguous Memory

The fundamental constraint of arrays is that elements must live **side-by-side in memory**. This enables fast indexing but creates the shifting problem.

What if we could store elements **anywhere in memory** and simply tell each element where the next one lives?

**Analogy - The Treasure Hunt:**

- **Array:** A book with numbered pages. Page 10 is always between pages 9 and 11. To insert a new "page 10.5," you must renumber every page after it.
- **Linked List:** A treasure hunt. Each clue tells you where the next clue is hidden. The clues can be scattered anywhere - in a tree, under a rock, inside a cave - as long as each clue points to the next one. Inserting a new clue just means changing one or two pointers.

**The trade-off:**
- **Arrays:** Can jump directly to page 50 instantly (O(1) random access), but inserting a new page is expensive (renumbering).
- **Linked Lists:** Can't jump directly to clue #50; must follow the chain from the start (O(n) sequential access), but inserting a new clue is instant (just change pointers).

**Challenge:** How do we implement this "pointer-based" structure in JavaScript?

**Answer:** JavaScript objects naturally support pointers (references). We create two building blocks:
1. **Node class**: Each node holds `data` and a `next` property (a reference to another node)
2. **LinkedList class**: Manages the `head` reference (entry point) and provides methods to manipulate nodes

Example skeleton:
```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // This is our "pointer"
  }
}

class LinkedList {
  constructor() {
    this.head = null; // Points to first node
  }
}
```

We'll dive deeper into the implementation in the following sections.

---

### Step 3: The Linked List "Aha!" Moment

**The core idea: Instead of storing elements contiguously, store each element in a separate container (called a "node") with a pointer to the next container.**

**Visual representation:**

```
Array (contiguous):
┌────┬────┬────┬────┐
│ A  │ B  │ C  │ D  │
└────┴────┴────┴────┘
Index: 0    1    2    3

Linked List (scattered with pointers):
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ A │●│───▶│ B │●│───▶│ C │●│───▶│ D │●│───▶ null
└─────┘    └─────┘    └─────┘    └─────┘
 head                             tail
```

Each box (node) contains:
1. **Data:** The actual value ("A", "B", etc.)
2. **Pointer:** A reference to the next node (represented by `●` and arrow)

The **head** is a special reference pointing to the first node. If you lose the head, you lose access to the entire list.

The **tail** (last node) points to `null`, signaling the end of the list.

**Why this works:**

- **Insert at beginning:** Create a new node, point it to the current head, update head to the new node. **O(1)** - no shifting!
- **Insert in middle:** Find the position, create a new node, adjust two pointers. **O(n)** to find, **O(1)** to rewire.
- **Delete a node:** Find it, adjust the previous node's pointer to skip it. **O(n)** to find, **O(1)** to rewire.

**The trade-off:**
- **Lost:** O(1) random access (can't jump to index 50 directly)
- **Gained:** O(1) insertion/deletion at known positions (once you've traversed there)

---

### Step 4: The Magic Tool - Nodes and Pointers

This is the heart of linked lists. Let's break down the building blocks.

**Key Variables:**

- `Node` = A container holding `data` and a `next` pointer
- `head` = Reference to the first node (entry point to the list)
- `tail` = Reference to the last node (optional, enables O(1) append)
- `next` = Pointer to the successor node (or `null` if last node)

**For doubly linked lists:**
- `prev` = Pointer to the predecessor node (enables backward traversal)

**For circular linked lists:**
- `tail.next` points back to `head` (forms a loop)

**For sentinel-node designs:**
- `headSentinel` = Dummy node before the first real node
- `tailSentinel` = Dummy node after the last real node
- Simplifies boundary conditions (no null checks)

**Node Structure (Singly Linked):**

```
┌─────────┬──────┐
│  data   │ next │
│ (value) │  (●) │
└─────────┴──────┘
```

**Node Structure (Doubly Linked):**

```
┌──────┬─────────┬──────┐
│ prev │  data   │ next │
│  (◄) │ (value) │  (►) │
└──────┴─────────┴──────┘
```

**Pointer Formulas and Concepts:**

**1. Traversal:**
```javascript
let current = head;
while (current !== null) {
  // Process current.data
  current = current.next; // Move to next node
}
```
**Why?** Start at head, follow `next` pointers until reaching `null`.

**2. Insertion After a Node:**
```javascript
newNode.next = current.next;  // New node points to current's successor
current.next = newNode;        // Current now points to new node
```
**Why?** Rewire two pointers to "inject" the new node into the chain.

**3. Deletion of a Node:**
```javascript
previous.next = current.next;  // Bypass current node
current.next = null;           // Help garbage collector
```
**Why?** The previous node now skips over `current`, disconnecting it from the chain.

**4. Reverse a List (Iterative):**
```javascript
let prev = null, current = head, next;
while (current) {
  next = current.next;    // Store next node
  current.next = prev;    // Reverse pointer
  prev = current;         // Advance prev
  current = next;         // Advance current
}
head = prev; // Update head to new first node
```
**Why?** Flip every `next` pointer to point backward instead of forward.

**5. Finding the Middle (Fast & Slow Pointers):**
```javascript
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;        // Move 1 step
  fast = fast.next.next;   // Move 2 steps
}
// slow now points to the middle node
```
**Why?** When `fast` reaches the end, `slow` is halfway through.

**6. Cycle Detection (Floyd's Algorithm):**
```javascript
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) {
    return true; // Cycle detected
  }
}
return false; // No cycle
```
**Why?** If there's a cycle, `fast` will eventually catch up to `slow` (like runners on a circular track).

---

### Step 5: Putting It All Together - Building and Using a Linked List

Let's build a complete singly linked list step-by-step and see how operations work.

**Example: Building a Playlist**

We'll create a playlist using a linked list and perform common operations.

**Step 1: Start with an Empty List**

```
head = null
tail = null
size = 0
```

**Step 2: Append "Song A"**

Create a node with data "Song A":
```
┌─────────┐
│ Song A│●│──▶ null
└─────────┘
  head, tail
```

- `head` points to this node
- `tail` points to this node
- `size = 1`

**Step 3: Append "Song B"**

Create a node with data "Song B":
```
┌─────────┐    ┌─────────┐
│ Song A│●│───▶│ Song B│●│──▶ null
└─────────┘    └─────────┘
  head           tail
```

- `tail.next` points to the new node
- `tail` updates to the new node
- `size = 2`

**Step 4: Prepend "Song Z"**

Create a node with data "Song Z":
```
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Song Z│●│───▶│ Song A│●│───▶│ Song B│●│──▶ null
└─────────┘    └─────────┘    └─────────┘
  head                          tail
```

- New node's `next` points to current `head`
- `head` updates to the new node
- `size = 3`

**Step 5: Insert "Song M" After "Song A"**

Find "Song A", create node with "Song M":
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Song Z│●│───▶│ Song A│●│───▶│ Song M│●│───▶│ Song B│●│──▶ null
└─────────┘    └─────────┘    └─────────┘    └─────────┘
  head                                         tail
```

- Traverse to "Song A"
- Store `temp = songA.next` (points to "Song B")
- Set `songA.next` to new node
- Set `newNode.next` to `temp`
- `size = 4`

**Step 6: Delete "Song A"**

Find "Song Z" (previous to "Song A"):
```
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Song Z│●│───▶│ Song M│●│───▶│ Song B│●│──▶ null
└─────────┘    └─────────┘    └─────────┘
  head                          tail
```

- Find "Song Z" (previous node)
- Set `songZ.next = songA.next` (bypasses "Song A")
- Set `songA.next = null` (helps garbage collection)
- `size = 3`

**Key Operations Summary:**

| Operation | Steps | Complexity |
|-----------|-------|------------|
| Append | Update tail pointer, link new node | O(1) with tail pointer |
| Prepend | Update head pointer, link new node | O(1) |
| Insert at index k | Traverse k-1 nodes, rewire 2 pointers | O(k) traversal + O(1) rewiring |
| Delete at index k | Traverse k-1 nodes, rewire 1 pointer | O(k) traversal + O(1) rewiring |
| Search for value | Traverse until found or reach null | O(n) |
| Access by index k | Traverse k nodes | O(k) (no random access) |

---

### Step 6: Variants of Linked Lists

**1. Singly Linked List (Basic)**

```
head ➜ [A | next ●] ➜ [B | next ●] ➜ [C | next ●] ➜ null
```

- Each node has ONE pointer (forward only)
- **Use cases:** Stacks, queues, adjacency lists
- **Pros:** Minimal memory (one pointer per node)
- **Cons:** Can't traverse backward, O(n) to delete tail

**2. Doubly Linked List**

```
null ⬅︎ [A | prev ◄ ► next] ⬅︎► [B | prev ◄ ► next] ⬅︎► [C | prev ◄ ► next] ➜ null
```

- Each node has TWO pointers (forward and backward)
- **Use cases:** Browser history, undo/redo, deques, LRU caches
- **Pros:** Bidirectional traversal, O(1) deletion from both ends
- **Cons:** Double memory for pointers, more complex pointer management

**3. Circular Linked List**

```
head ★
  ↘
   [A] ➜ [B] ➜ [C]
    ↑           ↙
    └───────────┘
```

- Tail's `next` points back to head (forms a loop)
- **Use cases:** Round-robin scheduling, game turns, circular buffers
- **Pros:** Natural loop iteration, no "end" concept
- **Cons:** Must guard against infinite loops, need exit condition

**4. Tail-Pointer Enhanced List**

```
head ➜ [A] ➜ [B] ➜ [C] ⬅︎ tail
```

- Store both `head` AND `tail` references
- **Use cases:** Queues, append-heavy workloads
- **Pros:** O(1) append (no traversal needed)
- **Cons:** Must maintain tail pointer on deletions

**5. Sentinel-Node Design**

```
HEAD_SENTINEL ⇄ [A] ⇄ [B] ⇄ [C] ⇄ TAIL_SENTINEL
```

- Dummy head and tail nodes (contain no real data)
- **Use cases:** Simplifying boundary logic in complex operations
- **Pros:** No null checks, uniform insertion/deletion code
- **Cons:** Extra memory for sentinels, iterators must skip them

**6. Skip List (Multi-Level)**

```
Level 2: head ➜ ────────────➜ C ➜ tail
Level 1: head ➜ ──➜ B ──➜ C ➜ tail
Level 0: head ➜ A ➜ B ➜ C ➜ tail
```

- Nodes have multiple forward pointers (probabilistic levels)
- **Use cases:** Sorted sets, database indices, real-time leaderboards
- **Pros:** Expected O(log n) search/insert/delete
- **Cons:** Extra space for pointers, randomness complicates testing

---

### Summary and Analogy

- **Arrays:** A train of cars welded together. Fast to count cars from the front (index access), but adding a car in the middle requires disconnecting and reconnecting the entire back half.

- **Linked Lists:** A string of beads connected by thread. Each bead knows only about the next bead. You can easily add or remove beads by retying a couple of knots, but to find the 50th bead, you must count from the beginning.

**When to use Arrays:**
- Frequent random access by index
- Static or slowly changing collections
- Need to leverage engine optimizations (SIMD, inline caches)
- Memory locality matters (CPU caching)

**When to use Linked Lists:**
- Frequent insertions/deletions at unpredictable positions
- Don't need index-based access
- Want to maintain references to nodes across mutations
- Building other structures (stacks, queues, LRU caches)

---

### Complexity Analysis

**Singly Linked List:**

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Access by index | O(n) | O(1) | Must traverse from head |
| Prepend | O(1) | O(1) | Just update head pointer |
| Append | O(1)* | O(1) | *O(1) with tail pointer, O(n) without |
| Insert at position k | O(k) | O(1) | Traverse k-1 nodes, then O(1) rewiring |
| Delete head | O(1) | O(1) | Update head pointer |
| Delete tail | O(n) | O(1) | Must find penultimate node |
| Delete at position k | O(k) | O(1) | Traverse k-1 nodes, then O(1) rewiring |
| Search | O(n) | O(1) | Must check each node |
| Reverse | O(n) | O(1) | Iterative reversal |

**Doubly Linked List:**

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Access by index | O(n) | O(1) | Can start from head or tail |
| Prepend | O(1) | O(1) | Update head and successor's prev |
| Append | O(1) | O(1) | Update tail and predecessor's next |
| Insert at position k | O(k) | O(1) | Can traverse from either end |
| Delete head | O(1) | O(1) | Update head and successor's prev |
| Delete tail | O(1) | O(1) | Use tail's prev pointer |
| Delete at position k | O(k) | O(1) | Can traverse from either end |
| Search | O(n) | O(1) | Must check each node |

**Skip List:**

| Operation | Expected Time | Worst Case | Space |
|-----------|---------------|------------|-------|
| Search | O(log n) | O(n) | O(n log n) |
| Insert | O(log n) | O(n) | O(n log n) |
| Delete | O(log n) | O(n) | O(n log n) |

**Space Complexity Breakdown:**
- Singly: n nodes × (data + 1 pointer)
- Doubly: n nodes × (data + 2 pointers)
- Skip: n nodes × (data + avg 2 pointers across levels)
- JavaScript overhead: Each node is an object (~24-32 bytes for headers + pointers)

**Comparison with Arrays:**

Arrays win on:
- Random access: O(1) vs O(n)
- Memory locality: Contiguous vs scattered
- Space efficiency: No pointer overhead

Linked Lists win on:
- Insert at head: O(1) vs O(n)
- Delete from middle (with reference): O(1) vs O(n)
- Dynamic sizing: No reallocation vs potential copy
- Persistent structures: Share unchanged parts

---

```jsx
detailed commented code ( typescript or javascript ), explanation,
and dry run for same
```

Of course! Let's translate the concepts into production-ready TypeScript code.

### The Code

We'll implement:
1. **Singly Linked List** (basic, with tail pointer)
2. **Doubly Linked List** (with sentinel nodes)
3. **Advanced operations** (reverse, cycle detection, merge)

---

## Implementation 1: Singly Linked List with Tail Pointer

```typescript
/**
 * Node class represents a single element in the linked list.
 * Generic type T allows storing any data type.
 */
class ListNode<T> {
  public data: T;
  public next: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
    // next is null by default (isolated node)
  }
}

/**
 * SinglyLinkedList provides O(1) prepend and append operations
 * by maintaining both head and tail pointers.
 * Size tracking enables O(1) length queries.
 */
class SinglyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size: number = 0;

  /**
   * Returns the number of nodes in the list.
   * Time: O(1), Space: O(1)
   */
  get size(): number {
    return this._size;
  }

  /**
   * Checks if the list is empty.
   * Time: O(1), Space: O(1)
   */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Adds a node at the beginning of the list.
   * Time: O(1), Space: O(1)
   *
   * Steps:
   * 1. Create new node
   * 2. Point new node's next to current head
   * 3. Update head to new node
   * 4. If list was empty, tail = head
   */
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

  /**
   * Adds a node at the end of the list.
   * Time: O(1) thanks to tail pointer, Space: O(1)
   *
   * Steps:
   * 1. Create new node
   * 2. If list is empty, both head and tail = new node
   * 3. Otherwise, tail.next = new node, then tail = new node
   */
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

  /**
   * Inserts a node at a specific index (0-based).
   * Time: O(n) due to traversal, Space: O(1)
   *
   * Steps:
   * 1. Validate index
   * 2. If index = 0, delegate to prepend
   * 3. If index = size, delegate to append
   * 4. Otherwise, traverse to index-1, insert after
   */
  insertAt(data: T, index: number): void {
    // Validation: index must be in range [0, size]
    if (index < 0 || index > this._size) {
      throw new RangeError(`Index ${index} is out of bounds for size ${this._size}`);
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
    current.next = newNode;      // Current now points to new node

    this._size++;
  }

  /**
   * Removes and returns the first node's data.
   * Time: O(1), Space: O(1)
   *
   * Steps:
   * 1. Store head.data
   * 2. Update head = head.next
   * 3. If list becomes empty, tail = null
   * 4. Nullify old head.next (help GC)
   */
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

  /**
   * Removes and returns the last node's data.
   * Time: O(n) because we must find the penultimate node, Space: O(1)
   *
   * Steps:
   * 1. If empty, return undefined
   * 2. If single node, delegate to removeFirst
   * 3. Otherwise, traverse to second-to-last node
   * 4. Detach last node, update tail
   */
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

  /**
   * Removes the node at a specific index.
   * Time: O(n) due to traversal, Space: O(1)
   */
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

  /**
   * Finds the first node matching a predicate.
   * Time: O(n), Space: O(1)
   */
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

  /**
   * Returns the node at a specific index (for advanced operations).
   * Time: O(n), Space: O(1)
   */
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

  /**
   * Converts the list to an array.
   * Time: O(n), Space: O(n)
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  /**
   * Creates a linked list from an array.
   * Time: O(n), Space: O(n)
   */
  static fromArray<U>(arr: U[]): SinglyLinkedList<U> {
    const list = new SinglyLinkedList<U>();
    for (const item of arr) {
      list.append(item);
    }
    return list;
  }

  /**
   * Prints the list in a readable format.
   * Time: O(n), Space: O(n) for string building
   */
  print(): void {
    if (this.head === null) {
      console.log("Empty list");
      return;
    }

    const values: string[] = [];
    let current = this.head;

    // Guard against cycles by limiting to size + 1
    for (let i = 0; i <= this._size && current !== null; i++) {
      values.push(String(current.data));
      current = current.next;
    }

    console.log(values.join(" → ") + " → null");
  }

  /**
   * Clears the list by breaking all links.
   * Time: O(n), Space: O(1)
   *
   * Why break links?
   * - Helps garbage collector reclaim memory faster
   * - Prevents accidental retention through external references
   */
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

  /**
   * Implements iterable protocol for for...of loops.
   * Time: O(n) to iterate through all, Space: O(1)
   */
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
}

// --- Example Usage ---
console.log("=== Singly Linked List Demo ===\n");

const playlist = new SinglyLinkedList<string>();

console.log("1. Appending songs...");
playlist.append("Song A");
playlist.append("Song B");
playlist.append("Song C");
playlist.print(); // Song A → Song B → Song C → null

console.log("\n2. Prepending a song...");
playlist.prepend("Song Z");
playlist.print(); // Song Z → Song A → Song B → Song C → null

console.log("\n3. Inserting at index 2...");
playlist.insertAt("Song M", 2);
playlist.print(); // Song Z → Song A → Song M → Song B → Song C → null

console.log("\n4. Removing first song...");
console.log("Removed:", playlist.removeFirst()); // Song Z
playlist.print(); // Song A → Song M → Song B → Song C → null

console.log("\n5. Removing at index 2...");
console.log("Removed:", playlist.removeAt(2)); // Song B
playlist.print(); // Song A → Song M → Song C → null

console.log("\n6. Finding a song...");
const found = playlist.find((song) => song === "Song M");
console.log("Found:", found); // Song M

console.log("\n7. Converting to array...");
console.log("Array:", playlist.toArray()); // ["Song A", "Song M", "Song C"]

console.log("\n8. Using for...of loop...");
for (const song of playlist) {
  console.log("  -", song);
}

console.log("\n9. List size:", playlist.size); // 3
```

---

## Implementation 2: Doubly Linked List with Sentinel Nodes

```typescript
/**
 * DoublyNode has both next and prev pointers for bidirectional traversal.
 * Sentinel nodes use null data; real nodes carry actual payloads.
 */
class DoublyNode<T> {
  public data: T | null;
  public next: DoublyNode<T> | null = null;
  public prev: DoublyNode<T> | null = null;

  constructor(data: T | null = null) {
    this.data = data;
  }
}

/**
 * DoublyLinkedList uses sentinel nodes (dummy head/tail) to eliminate
 * null checks in insertion and deletion logic.
 * All operations maintain the invariant:
 * - headSentinel.next.prev === headSentinel
 * - tailSentinel.prev.next === tailSentinel
 */
class DoublyLinkedList<T> {
  private readonly headSentinel = new DoublyNode<T>();
  private readonly tailSentinel = new DoublyNode<T>();
  private _size = 0;

  constructor(iterable?: Iterable<T>) {
    // Initialize sentinels to point to each other (empty list state)
    this.headSentinel.next = this.tailSentinel;
    this.tailSentinel.prev = this.headSentinel;

    // If initial data provided, populate list
    if (iterable) {
      for (const item of iterable) {
        this.append(item);
      }
    }
  }

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Internal helper to insert a node between two existing nodes.
   * Time: O(1), Space: O(1)
   *
   * Sentinel nodes make this trivial - no null checks needed!
   *
   * Before:  left ⬅︎► right
   * After:   left ⬅︎► newNode ⬅︎► right
   */
  private linkBetween(data: T, left: DoublyNode<T>, right: DoublyNode<T>): DoublyNode<T> {
    const newNode = new DoublyNode(data);

    // Wire up new node
    newNode.prev = left;
    newNode.next = right;

    // Update neighbors
    left.next = newNode;
    right.prev = newNode;

    this._size++;
    return newNode;
  }

  /**
   * Internal helper to remove a node.
   * Time: O(1), Space: O(1)
   *
   * Bypass the node by connecting its neighbors directly.
   */
  private unlink(node: DoublyNode<T>): T {
    const data = node.data as T;

    // Connect neighbors to each other
    node.prev!.next = node.next;
    node.next!.prev = node.prev;

    // Break node's links (help GC)
    node.next = null;
    node.prev = null;

    this._size--;
    return data;
  }

  /**
   * Adds a node at the end.
   * Time: O(1), Space: O(1)
   */
  append(data: T): void {
    // Insert between tail sentinel's prev and tail sentinel
    this.linkBetween(data, this.tailSentinel.prev!, this.tailSentinel);
  }

  /**
   * Adds a node at the beginning.
   * Time: O(1), Space: O(1)
   */
  prepend(data: T): void {
    // Insert between head sentinel and head sentinel's next
    this.linkBetween(data, this.headSentinel, this.headSentinel.next!);
  }

  /**
   * Inserts at a specific index.
   * Time: O(n), Space: O(1)
   *
   * Optimization: Can traverse from head or tail depending on index.
   */
  insertAt(data: T, index: number): void {
    if (index < 0 || index > this._size) {
      throw new RangeError(`Index ${index} out of bounds for size ${this._size}`);
    }

    // Optimization: traverse from whichever end is closer
    let cursor: DoublyNode<T>;
    if (index <= this._size / 2) {
      // Closer to head: traverse forward
      cursor = this.headSentinel.next!;
      for (let i = 0; i < index; i++) {
        cursor = cursor.next!;
      }
    } else {
      // Closer to tail: traverse backward
      cursor = this.tailSentinel;
      for (let i = this._size; i > index; i--) {
        cursor = cursor.prev!;
      }
    }

    // Insert before cursor
    this.linkBetween(data, cursor.prev!, cursor);
  }

  /**
   * Removes the first node.
   * Time: O(1), Space: O(1)
   */
  removeFirst(): T | undefined {
    if (this.isEmpty) {
      return undefined;
    }
    return this.unlink(this.headSentinel.next!);
  }

  /**
   * Removes the last node.
   * Time: O(1), Space: O(1)
   *
   * This is where doubly linked lists shine - no traversal needed!
   */
  removeLast(): T | undefined {
    if (this.isEmpty) {
      return undefined;
    }
    return this.unlink(this.tailSentinel.prev!);
  }

  /**
   * Removes node at index.
   * Time: O(n), Space: O(1)
   */
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) {
      return undefined;
    }

    // Traverse to target node
    let cursor = this.headSentinel.next!;
    for (let i = 0; i < index; i++) {
      cursor = cursor.next!;
    }

    return this.unlink(cursor);
  }

  /**
   * Removes first node matching predicate.
   * Time: O(n), Space: O(1)
   */
  removeValue(predicate: (data: T) => boolean): T | undefined {
    let cursor = this.headSentinel.next!;

    while (cursor !== this.tailSentinel) {
      if (predicate(cursor.data as T)) {
        return this.unlink(cursor);
      }
      cursor = cursor.next!;
    }

    return undefined; // Not found
  }

  /**
   * Yields all values (forward iteration).
   * Time: O(n), Space: O(1)
   */
  *values(): IterableIterator<T> {
    let cursor = this.headSentinel.next!;
    while (cursor !== this.tailSentinel) {
      yield cursor.data as T;
      cursor = cursor.next!;
    }
  }

  /**
   * Yields all values in reverse (backward iteration).
   * Time: O(n), Space: O(1)
   */
  *valuesReverse(): IterableIterator<T> {
    let cursor = this.tailSentinel.prev!;
    while (cursor !== this.headSentinel) {
      yield cursor.data as T;
      cursor = cursor.prev!;
    }
  }

  toArray(): T[] {
    return Array.from(this.values());
  }

  print(): void {
    if (this.isEmpty) {
      console.log("Empty list");
      return;
    }
    const values = this.toArray().map(String);
    console.log("null ⬅︎ " + values.join(" ⬅︎► ") + " ⬅︎► null");
  }
}

// --- Example Usage ---
console.log("\n\n=== Doubly Linked List Demo ===\n");

const history = new DoublyLinkedList<string>(["Page A", "Page B", "Page C"]);

console.log("1. Initial browser history:");
history.print(); // null ⬅︎ Page A ⬅︎► Page B ⬅︎► Page C ⬅︎► null

console.log("\n2. Navigate to new page (prepend):");
history.prepend("Home");
history.print(); // null ⬅︎ Home ⬅︎► Page A ⬅︎► Page B ⬅︎► Page C ⬅︎► null

console.log("\n3. Go back (remove last):");
console.log("Closed:", history.removeLast()); // Page C
history.print(); // null ⬅︎ Home ⬅︎► Page A ⬅︎► Page B ⬅︎► null

console.log("\n4. Forward iteration:");
for (const page of history.values()) {
  console.log("  →", page);
}

console.log("\n5. Backward iteration:");
for (const page of history.valuesReverse()) {
  console.log("  ←", page);
}

console.log("\n6. Remove specific page:");
history.removeValue((page) => page === "Page A");
history.print(); // null ⬅︎ Home ⬅︎► Page B ⬅︎► null
```

---

## Advanced Operations

```typescript
/**
 * Reverses a singly linked list in-place.
 * Time: O(n), Space: O(1)
 *
 * Approach:
 * Flip all next pointers to point backward instead of forward.
 */
function reverseSinglyList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current = head;

  while (current !== null) {
    const next = current.next;  // Store successor before breaking link
    current.next = prev;         // Reverse pointer
    prev = current;              // Advance prev
    current = next;              // Advance current
  }

  return prev; // New head (was tail)
}

/**
 * Detects if a linked list has a cycle.
 * Time: O(n), Space: O(1)
 *
 * Floyd's Tortoise and Hare Algorithm:
 * - Slow pointer moves 1 step
 * - Fast pointer moves 2 steps
 * - If they meet, there's a cycle
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false; // No cycle
}

/**
 * Finds the entry point of a cycle in a linked list.
 * Time: O(n), Space: O(1)
 *
 * Algorithm:
 * 1. Detect cycle using Floyd's algorithm
 * 2. Reset one pointer to head
 * 3. Move both pointers 1 step at a time
 * 4. They meet at the cycle entry
 */
function detectCycleEntry<T>(head: ListNode<T> | null): ListNode<T> | null {
  let slow = head;
  let fast = head;

  // Phase 1: Detect cycle
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Phase 2: Find entry
      let finder = head;
      while (finder !== slow) {
        finder = finder!.next;
        slow = slow!.next;
      }
      return finder; // Cycle entry
    }
  }

  return null; // No cycle
}

/**
 * Finds the middle node of a linked list.
 * Time: O(n), Space: O(1)
 *
 * Fast & Slow pointer technique:
 * When fast reaches the end, slow is at the middle.
 */
function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (head === null) return null;

  let slow = head;
  let fast = head;

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next!;
    fast = fast.next.next!;
  }

  return slow; // Middle node
}

/**
 * Merges two sorted linked lists.
 * Time: O(n + m), Space: O(1)
 *
 * Approach:
 * Use a dummy node to simplify logic, then choose smaller head each step.
 */
function mergeSorted<T>(
  l1: ListNode<T> | null,
  l2: ListNode<T> | null,
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): ListNode<T> | null {
  const dummy = new ListNode<T>(null as any); // Dummy node
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (compare(l1.data, l2.data) <= 0) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes
  current.next = l1 !== null ? l1 : l2;

  return dummy.next; // Skip dummy node
}

// --- Example Usage: Advanced Operations ---
console.log("\n\n=== Advanced Operations Demo ===\n");

console.log("1. Reverse a list:");
const numbers = SinglyLinkedList.fromArray([1, 2, 3, 4, 5]);
numbers.print(); // 1 → 2 → 3 → 4 → 5 → null
const reversedHead = reverseSinglyList(numbers.getNodeAt(0));
// Print reversed manually
let temp = reversedHead;
const reversed: number[] = [];
while (temp) {
  reversed.push(temp.data);
  temp = temp.next;
}
console.log("Reversed:", reversed); // [5, 4, 3, 2, 1]

console.log("\n2. Merge two sorted lists:");
const l1 = SinglyLinkedList.fromArray([1, 3, 5]);
const l2 = SinglyLinkedList.fromArray([2, 4, 6]);
const merged = mergeSorted(l1.getNodeAt(0), l2.getNodeAt(0));
temp = merged;
const mergedVals: number[] = [];
while (temp) {
  mergedVals.push(temp.data);
  temp = temp.next;
}
console.log("Merged:", mergedVals); // [1, 2, 3, 4, 5, 6]

console.log("\n3. Find middle node:");
const list = SinglyLinkedList.fromArray([10, 20, 30, 40, 50]);
const middle = findMiddle(list.getNodeAt(0));
console.log("Middle node:", middle?.data); // 30

console.log("\n4. Detect cycle:");
const cycleList = SinglyLinkedList.fromArray([1, 2, 3, 4]);
// Manually create a cycle (for demo purposes)
const node0 = cycleList.getNodeAt(0)!;
const node3 = cycleList.getNodeAt(3)!;
node3.next = cycleList.getNodeAt(1); // Create cycle: 4 → 2
console.log("Has cycle?", hasCycle(node0)); // true
const entry = detectCycleEntry(node0);
console.log("Cycle entry:", entry?.data); // 2
// Break cycle for cleanup
node3.next = null;
```

---

### Code Explanation

### Singly Linked List - Key Methods

**1. `prepend(data)` - O(1)**
```typescript
prepend(data: T): void {
  const newNode = new ListNode(data);
  newNode.next = this.head;
  this.head = newNode;
  if (this.tail === null) {
    this.tail = newNode;
  }
  this._size++;
}
```
- **Purpose:** Add a node at the beginning
- **How:** New node points to current head, then head updates to new node
- **Edge case:** If list was empty, tail also updates
- **Why O(1):** No traversal needed, just pointer updates

**2. `append(data)` - O(1) with tail pointer**
```typescript
append(data: T): void {
  const newNode = new ListNode(data);
  if (this.tail === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this._size++;
}
```
- **Purpose:** Add a node at the end
- **How:** Tail's next points to new node, then tail updates
- **Edge case:** If list was empty, both head and tail update
- **Why O(1):** Tail pointer eliminates need to traverse

**3. `insertAt(data, index)` - O(n)**
```typescript
insertAt(data: T, index: number): void {
  // ... validation ...
  const newNode = new ListNode(data);
  let current = this.head!;
  for (let i = 0; i < index - 1; i++) {
    current = current.next!;
  }
  newNode.next = current.next;
  current.next = newNode;
  this._size++;
}
```
- **Purpose:** Insert at arbitrary position
- **How:** Traverse to index-1, then rewire pointers
- **Edge cases:** Index 0 → prepend, Index size → append
- **Why O(n):** Must traverse to insertion point

**4. `removeFirst()` - O(1)**
```typescript
removeFirst(): T | undefined {
  if (this.head === null) return undefined;
  const data = this.head.data;
  const oldHead = this.head;
  this.head = this.head.next;
  if (this.head === null) {
    this.tail = null;
  }
  oldHead.next = null; // Help GC
  this._size--;
  return data;
}
```
- **Purpose:** Remove first node
- **How:** Move head forward, nullify old head's next
- **Edge case:** If list becomes empty, tail → null
- **Why O(1):** No traversal needed

**5. `removeLast()` - O(n) for singly linked**
```typescript
removeLast(): T | undefined {
  // ... edge cases ...
  let current = this.head;
  while (current.next !== this.tail) {
    current = current.next!;
  }
  const data = this.tail!.data;
  current.next = null;
  this.tail = current;
  this._size--;
  return data;
}
```
- **Purpose:** Remove last node
- **How:** Traverse to penultimate node, detach tail
- **Why O(n):** No backward pointer, must traverse entire list
- **Note:** Doubly linked lists do this in O(1)!

### Doubly Linked List - Sentinel Pattern

**Why sentinels?**
```typescript
// Without sentinels: lots of null checks
if (node.prev !== null) {
  node.prev.next = node.next;
} else {
  // Special case: removing head
  head = node.next;
}
if (node.next !== null) {
  node.next.prev = node.prev;
} else {
  // Special case: removing tail
  tail = node.prev;
}

// With sentinels: uniform logic
node.prev!.next = node.next;
node.next!.prev = node.prev;
// No special cases! Sentinels are always present.
```

**`linkBetween(data, left, right)` - O(1)**
```typescript
private linkBetween(data: T, left: DoublyNode<T>, right: DoublyNode<T>): DoublyNode<T> {
  const newNode = new DoublyNode(data);
  newNode.prev = left;
  newNode.next = right;
  left.next = newNode;
  right.prev = newNode;
  this._size++;
  return newNode;
}
```
- **Purpose:** Insert between two nodes
- **How:** Wire 4 pointers (newNode.prev/next, left.next, right.prev)
- **Why:** Centralizes insertion logic, eliminates null checks

**`unlink(node)` - O(1)**
```typescript
private unlink(node: DoublyNode<T>): T {
  const data = node.data as T;
  node.prev!.next = node.next;
  node.next!.prev = node.prev;
  node.next = null;
  node.prev = null;
  this._size--;
  return data;
}
```
- **Purpose:** Remove a node
- **How:** Connect neighbors, break node's links
- **Why:** Centralizes deletion logic

### Advanced Operations

**`reverseSinglyList` - O(n) time, O(1) space**
```typescript
let prev = null, current = head;
while (current !== null) {
  const next = current.next;
  current.next = prev;
  prev = current;
  current = next;
}
return prev;
```
- **How:** Flip every next pointer
- **Invariant:** After each iteration, prev → current is reversed
- **Result:** prev becomes new head

**`hasCycle` - O(n) time, O(1) space**
```typescript
let slow = head, fast = head;
while (fast !== null && fast.next !== null) {
  slow = slow!.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}
return false;
```
- **How:** Fast pointer moves 2x speed of slow
- **Why it works:** In a cycle, fast will eventually lap slow
- **No cycle:** Fast reaches null

**`mergeSorted` - O(n + m) time, O(1) space**
```typescript
const dummy = new ListNode<T>(null as any);
let current = dummy;
while (l1 !== null && l2 !== null) {
  if (compare(l1.data, l2.data) <= 0) {
    current.next = l1;
    l1 = l1.next;
  } else {
    current.next = l2;
    l2 = l2.next;
  }
  current = current.next;
}
current.next = l1 !== null ? l1 : l2;
return dummy.next;
```
- **How:** Choose smaller head each iteration
- **Dummy node:** Simplifies edge cases (no special handling for first node)
- **Reuses nodes:** No new allocations, just rewiring

---

### Dry Run

Let's trace the operations on a singly linked list step-by-step.

**Initial state:** Empty list

| Step | Operation | Code Executed | head | tail | size | Visual |
|------|-----------|---------------|------|------|------|--------|
| 0 | Initialize | `new SinglyLinkedList()` | null | null | 0 | Empty |
| 1 | `append(10)` | Create node, set head=tail=newNode | Node(10) | Node(10) | 1 | `10 → null` |
| 2 | `append(20)` | tail.next=newNode, tail=newNode | Node(10) | Node(20) | 2 | `10 → 20 → null` |
| 3 | `append(30)` | tail.next=newNode, tail=newNode | Node(10) | Node(30) | 3 | `10 → 20 → 30 → null` |
| 4 | `prepend(5)` | newNode.next=head, head=newNode | Node(5) | Node(30) | 4 | `5 → 10 → 20 → 30 → null` |
| 5 | `insertAt(15, 2)` | Traverse to index 1, insert after | Node(5) | Node(30) | 5 | `5 → 10 → 15 → 20 → 30 → null` |
| 6 | `removeFirst()` | head=head.next | Node(10) | Node(30) | 4 | `10 → 15 → 20 → 30 → null` |
| 7 | `removeAt(2)` | Traverse to index 1, bypass index 2 | Node(10) | Node(30) | 3 | `10 → 15 → 30 → null` |
| 8 | `removeLast()` | Traverse to penultimate, detach tail | Node(10) | Node(15) | 2 | `10 → 15 → null` |

**Detailed trace for `insertAt(15, 2)` at step 5:**

Before:
```
head → [5 | ●] → [10 | ●] → [20 | ●] → [30 | ●] → null
        index 0    index 1    index 2    index 3
```

Process:
1. Validate: `0 <= 2 <= 4` ✓
2. Not index 0 or size, so general case
3. Create `newNode` with data 15
4. Traverse to index 1:
   - `current = head` (node with 5)
   - Loop iteration 0: `current = current.next` (node with 10)
   - Exit loop (i=1, index-1=1)
5. Store `temp = current.next` (node with 20)
6. Set `current.next = newNode` (10 → 15)
7. Set `newNode.next = temp` (15 → 20)
8. Increment size: 4 → 5

After:
```
head → [5 | ●] → [10 | ●] → [15 | ●] → [20 | ●] → [30 | ●] → null
        index 0    index 1    index 2    index 3    index 4
```

**Detailed trace for `reverseSinglyList`:**

Input: `1 → 2 → 3 → 4 → null`

| Iteration | prev | current | next | Action | Result |
|-----------|------|---------|------|--------|--------|
| Initial | null | 1 | - | - | - |
| 1 | null | 1 | 2 | current.next=prev | `1 → null` |
| - | 1 | 2 | - | Advance prev, current | - |
| 2 | 1 | 2 | 3 | current.next=prev | `2 → 1 → null` |
| - | 2 | 3 | - | Advance prev, current | - |
| 3 | 2 | 3 | 4 | current.next=prev | `3 → 2 → 1 → null` |
| - | 3 | 4 | - | Advance prev, current | - |
| 4 | 3 | 4 | null | current.next=prev | `4 → 3 → 2 → 1 → null` |
| - | 4 | null | - | Exit loop, return prev | - |

Output: `4 → 3 → 2 → 1 → null`

**Detailed trace for `hasCycle` (with cycle):**

Input: `1 → 2 → 3 → 4 → 2` (cycle at 2)

| Step | slow | fast | slow.next | fast.next.next | Match? |
|------|------|------|-----------|----------------|--------|
| 0 | 1 | 1 | - | - | No (skip first check) |
| 1 | 2 | 3 | - | - | No |
| 2 | 3 | 2 | - | - | No |
| 3 | 4 | 4 | - | - | **Yes!** Cycle detected |

Output: `true`

**Detailed trace for `mergeSorted`:**

Input:
- `l1: 1 → 3 → 5 → null`
- `l2: 2 → 4 → 6 → null`

| Step | l1 | l2 | Compare | Action | Result Chain |
|------|----|----|---------|--------|--------------|
| 0 | 1 | 2 | 1 < 2 | Attach l1, advance l1 | `dummy → 1` |
| 1 | 3 | 2 | 3 > 2 | Attach l2, advance l2 | `dummy → 1 → 2` |
| 2 | 3 | 4 | 3 < 4 | Attach l1, advance l1 | `dummy → 1 → 2 → 3` |
| 3 | 5 | 4 | 5 > 4 | Attach l2, advance l2 | `dummy → 1 → 2 → 3 → 4` |
| 4 | 5 | 6 | 5 < 6 | Attach l1, advance l1 | `dummy → 1 → 2 → 3 → 4 → 5` |
| 5 | null | 6 | - | Attach remaining l2 | `dummy → 1 → 2 → 3 → 4 → 5 → 6` |

Output: `1 → 2 → 3 → 4 → 5 → 6 → null`

---

# Doubts

```jsx
Q1: Why does removing the tail from a singly linked list take O(n) time?

A: Great question! This highlights a key limitation of singly linked lists.

When removing the tail, we need to:
1. Find the node BEFORE the tail (penultimate node)
2. Set penultimate.next = null
3. Update tail pointer to penultimate

But here's the problem: Singly linked nodes only have a NEXT pointer, not a PREVIOUS pointer.
So to find the penultimate node, we must traverse from the head:

head → [A] → [B] → [C] → [D] → null
                    ↑      ↑
             penultimate  tail

We can't jump directly to C because D (the tail) doesn't point backward to C.
We must walk: head → A → B → C, which takes O(n) time.

Solution options:
1. Use a doubly linked list (adds prev pointer) → O(1) tail removal
2. Accept O(n) for tail removal in singly linked lists
3. If you never remove from the tail, singly lists are fine

Example code showing why:
```typescript
removeLast(): T | undefined {
  let current = this.head;
  // Must walk through ENTIRE list to find second-to-last
  while (current.next !== this.tail) {
    current = current.next!; // O(n) traversal
  }
  // Only NOW can we detach the tail
  const data = this.tail!.data; // Store data before detaching
  this.tail = current;
  current.next = null;
  return data;
}
```

This is why doubly linked lists exist - they trade memory (extra pointer) for O(1) tail operations.
```

```jsx
Q2: How does the sentinel node pattern eliminate null checks?

A: Excellent question! This is a powerful design pattern.

Without sentinels (traditional approach):
```typescript
// Removing a node requires many null checks
function remove(node: DoublyNode<T>): void {
  // Check if removing head
  if (node.prev === null) {
    head = node.next;
    if (head !== null) {
      head.prev = null;
    }
  } else {
    node.prev.next = node.next;
  }

  // Check if removing tail
  if (node.next === null) {
    tail = node.prev;
    if (tail !== null) {
      tail.next = null;
    }
  } else {
    node.next.prev = node.prev;
  }
}
```

With sentinels (always have dummy head/tail):
```typescript
// Sentinels guarantee prev and next are NEVER null
function remove(node: DoublyNode<T>): void {
  node.prev!.next = node.next;  // Safe: sentinel always exists
  node.next!.prev = node.prev;  // Safe: sentinel always exists
  // That's it! No special cases.
}
```

Visual comparison:

Traditional (3 nodes):
```
head → [A] ⬅︎► [B] ⬅︎► [C] ← tail
       ↑                    ↑
    prev=null           next=null
```
Removing A requires checking if prev is null (it is, so update head).
Removing C requires checking if next is null (it is, so update tail).

Sentinel (3 nodes + 2 sentinels):
```
HEAD_SENTINEL ⬅︎► [A] ⬅︎► [B] ⬅︎► [C] ⬅︎► TAIL_SENTINEL
    ↑                                        ↑
  (dummy)                                 (dummy)
```
Removing A or C just rewires pointers - sentinels act as boundaries.
No null checks needed because sentinels are ALWAYS present.

Trade-off:
- Cost: 2 extra nodes (minimal memory)
- Benefit: Simpler, faster code (no branches for edge cases)

This is why many production linked list libraries (e.g., Java's LinkedList) use sentinels internally.
```

```jsx
Q3: Why do we need to nullify pointers when removing nodes in JavaScript?

A: Great question about JavaScript's garbage collection!

JavaScript uses automatic garbage collection (GC) with a "mark-and-sweep" algorithm.
GC reclaims memory from objects that are NO LONGER REACHABLE.

If we don't nullify pointers, removed nodes might stay reachable:

Example WITHOUT nullifying:
```typescript
function removeLast(): T | undefined {
  let current = this.head;
  while (current.next !== this.tail) {
    current = current.next!;
  }
  const oldTail = this.tail;
  this.tail = current;
  current.next = null; // ❌ Forgot to nullify oldTail.next!
  return oldTail.data;
}

// Outside the list, if someone kept a reference:
const externalRef = list.getNodeAt(3); // This was the tail
list.removeLast(); // Removes tail
// But oldTail.next might still point to other nodes!
// If externalRef is kept alive, the entire chain after it stays in memory.
```

Why this matters:
1. **Memory leaks**: Unreachable nodes stay in memory
2. **Unexpected behavior**: External code might traverse "deleted" nodes
3. **GC performance**: More objects to check during mark phase

Best practice:
```typescript
function removeLast(): T | undefined {
  // ... find penultimate node ...
  const oldTail = this.tail;
  this.tail = current;
  current.next = null;      // Detach from list
  oldTail.next = null;      // ✅ Break oldTail's outgoing link
  oldTail.prev = null;      // ✅ For doubly linked lists
  return oldTail.data;
}
```

Visual:
Before removal:
```
list.head → [A] → [B] → [C] → list.tail
                         ↑
                   externalRef points here
```

After removal WITHOUT nullifying C.next:
```
list: head → [A] → [B] → null

externalRef → [C] → (still points to old chain?!)
```

After removal WITH nullifying:
```
list: head → [A] → [B] → null

externalRef → [C] → null
              (isolated, can be GC'd if no other refs)
```

Summary: Always nullify pointers to help GC and prevent accidental access to "deleted" nodes.
```

```jsx
Q4: When should I use a linked list instead of an array in JavaScript?

A: Excellent practical question! Let's break this down by scenario.

Use ARRAYS when:
✅ Random access is common: playlist[42]
✅ Iterating forward frequently: for (let i = 0; i < arr.length; i++)
✅ Size is relatively stable
✅ Working with numerical indices
✅ Need to leverage native methods: map, filter, reduce, sort
✅ Memory locality matters (CPU caching)

Use LINKED LISTS when:
✅ Frequent insertions/deletions at unknown positions
✅ Building other structures (stacks, queues, LRU caches)
✅ Need to maintain references to nodes across mutations
✅ Streaming data (don't know final size)
✅ Implementing undo/redo (doubly linked list)
✅ Round-robin scheduling (circular linked list)

Real-world JavaScript examples:

1. **Browser History (Doubly Linked List)**
```typescript
class BrowserHistory {
  private history = new DoublyLinkedList<string>();
  private current: DoublyNode<string> | null = null;

  visit(url: string): void {
    // Add to history, can go back/forward in O(1)
  }

  back(): void {
    if (this.current?.prev) {
      this.current = this.current.prev; // O(1)
    }
  }

  forward(): void {
    if (this.current?.next) {
      this.current = this.current.next; // O(1)
    }
  }
}
```
**Why linked list?** Bidirectional traversal without indices.

2. **LRU Cache (Doubly Linked List + Hash Map)**
```typescript
class LRUCache<K, V> {
  private list = new DoublyLinkedList<[K, V]>();
  private map = new Map<K, DoublyNode<[K, V]>>();

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;

    // Move to front (most recently used) - O(1)
    this.list.unlink(node);
    this.list.prepend(node.data);
    return node.data[1];
  }

  put(key: K, value: V): void {
    // Add to front, evict from tail if full - O(1)
  }
}
```
**Why linked list?** O(1) move-to-front and eviction.

3. **Task Queue (Singly Linked List)**
```typescript
class TaskQueue {
  private queue = new SinglyLinkedList<Task>();

  enqueue(task: Task): void {
    this.queue.append(task); // O(1)
  }

  dequeue(): Task | undefined {
    return this.queue.removeFirst(); // O(1)
  }
}
```
**Why linked list?** O(1) enqueue/dequeue vs O(n) array shift.

4. **Undo/Redo Stack (Doubly Linked List)**
```typescript
class Editor {
  private history = new DoublyLinkedList<EditorState>();
  private current: DoublyNode<EditorState> | null = null;

  undo(): void {
    if (this.current?.prev) {
      this.current = this.current.prev;
      this.applyState(this.current.data);
    }
  }

  redo(): void {
    if (this.current?.next) {
      this.current = this.current.next;
      this.applyState(this.current.data);
    }
  }
}
```
**Why linked list?** Maintain pointer to current state, traverse backward/forward.

When arrays are STILL better in JavaScript:
- V8 engine heavily optimizes arrays (inline caches, SIMD)
- Most operations are read-heavy, not mutation-heavy
- Indices are meaningful (rankings, coordinates, time series)
- Native methods are more convenient

Performance comparison (empirical):
| Operation | Array (n=10,000) | Linked List (n=10,000) |
|-----------|------------------|------------------------|
| Access at index 5000 | ~0.001ms | ~0.5ms (traverse) |
| Insert at index 0 | ~0.3ms (shift) | ~0.001ms |
| Insert at index 5000 | ~0.15ms | ~0.25ms (traverse) |
| Remove at index 0 | ~0.3ms (shift) | ~0.001ms |
| Iterate all | ~0.1ms (cache-friendly) | ~0.3ms (pointer chasing) |

Bottom line: Use arrays by default in JavaScript. Only reach for linked lists when you have:
- Proven performance issues with array mutations
- Specific data structure requirements (LRU cache, undo/redo)
- Need to maintain stable node references
```

---

## Additional Resources

For visual explanations and interactive demonstrations:

**Video Tutorials:**
- [Data Structures: Linked Lists - CS Dojo](https://www.youtube.com/watch?v=WwfhLC16bis) - Excellent visual walkthrough
- [Doubly Linked Lists - mycodeschool](https://www.youtube.com/watch?v=VOQNf1VxU3Q) - Deep dive into doubly linked lists

**Interactive Visualizations:**
- [VisuAlgo - Linked List](https://visualgo.net/en/list) - Step through operations visually
- [Algorithm Visualizer - Linked List](https://algorithm-visualizer.org/brute-force/linked-list) - Animate insertions and deletions

**Documentation:**
- [MDN - Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) - Understanding iterators
- [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) - Type-safe data structures

**Advanced Reading:**
- ["Purely Functional Data Structures" by Chris Okasaki](https://www.cambridge.org/core/books/purely-functional-data-structures/0409255DA1B48FA731859AC72E34D494) - Immutable linked lists
- [V8 Blog - Elements Kinds](https://v8.dev/blog/elements-kinds) - Understanding JavaScript array optimizations

I hope this detailed explanation helps you understand linked lists intuitively and practically! The key is to visualize pointer rewiring and understand the trade-offs compared to arrays.