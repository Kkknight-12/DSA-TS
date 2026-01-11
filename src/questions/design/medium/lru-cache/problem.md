# LRU Cache

**Difficulty:** Medium
**Topics:** Hash Table, Linked List, Design, Doubly-Linked List
**LeetCode:** [146. LRU Cache](https://leetcode.com/problems/lru-cache/)

---

## Problem Statement (Simple Language Mein)

**LRU = Least Recently Used**

Ek cache design karo jisme:
- Fixed capacity ho (kitne items store kar sakte hain)
- Jab capacity full ho jaaye aur naya item add karna ho, toh **sabse purana (least recently used)** item hatao

**Operations:**
1. `get(key)` - Key ki value return karo. Agar key nahi hai toh -1
2. `put(key, value)` - Key-value pair add/update karo. Agar capacity exceed ho toh LRU item hatao

**IMPORTANT:** Dono operations O(1) time mein hone chahiye!

---

## Real Life Example Se Samjho

```
Imagine karo tumhare phone mein Recent Apps feature hai:
- Maximum 3 apps dikha sakta hai
- Jab bhi koi app use karte ho, wo FRONT mein aa jata hai
- Agar 4th app open karo, toh sabse purana app list se hat jata hai

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Phone Recent Apps (Capacity = 3)                              │
│                                                                 │
│   Action: Open WhatsApp                                         │
│   Recent: [WhatsApp]                                            │
│                                                                 │
│   Action: Open Instagram                                        │
│   Recent: [Instagram, WhatsApp]                                 │
│                                                                 │
│   Action: Open YouTube                                          │
│   Recent: [YouTube, Instagram, WhatsApp]                        │
│                                                                 │
│   Action: Use WhatsApp again                                    │
│   Recent: [WhatsApp, YouTube, Instagram]  ← WhatsApp front mein │
│                                                                 │
│   Action: Open Twitter (4th app, capacity full!)                │
│   Recent: [Twitter, WhatsApp, YouTube]                          │
│           Instagram hataya (Least Recently Used)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Examples

### Example 1:

```
LRUCache cache = new LRUCache(2);  // Capacity = 2

cache.put(1, 1);    // cache = {1=1}
cache.put(2, 2);    // cache = {1=1, 2=2}
cache.get(1);       // return 1, cache = {2=2, 1=1} (1 recently used)
cache.put(3, 3);    // capacity full! evict LRU (key 2)
                    // cache = {1=1, 3=3}
cache.get(2);       // return -1 (not found, was evicted)
cache.put(4, 4);    // capacity full! evict LRU (key 1)
                    // cache = {3=3, 4=4}
cache.get(1);       // return -1 (not found)
cache.get(3);       // return 3
cache.get(4);       // return 4

Output: [null, null, null, 1, null, -1, null, -1, 3, 4]
```

### Visual Dry Run:

```
Capacity = 2

┌──────────────────────────────────────────────────────────────────────┐
│ Operation      │ Cache State        │ Result │ Explanation           │
├──────────────────────────────────────────────────────────────────────┤
│ put(1,1)       │ [1=1]              │ null   │ Add key 1             │
│ put(2,2)       │ [1=1, 2=2]         │ null   │ Add key 2             │
│ get(1)         │ [2=2, 1=1]         │ 1      │ 1 is now most recent  │
│ put(3,3)       │ [1=1, 3=3]         │ null   │ Evict 2 (LRU), add 3  │
│ get(2)         │ [1=1, 3=3]         │ -1     │ 2 was evicted         │
│ put(4,4)       │ [3=3, 4=4]         │ null   │ Evict 1 (LRU), add 4  │
│ get(1)         │ [3=3, 4=4]         │ -1     │ 1 was evicted         │
│ get(3)         │ [4=4, 3=3]         │ 3      │ 3 is now most recent  │
│ get(4)         │ [3=3, 4=4]         │ 4      │ 4 is now most recent  │
└──────────────────────────────────────────────────────────────────────┘

LRU (Least Recent) ←──────────────────────────────→ MRU (Most Recent)
```

### Example 2 (Capacity = 1):

```
LRUCache cache = new LRUCache(1);  // Capacity = 1

cache.put(1, 1);    // cache = {1=1}
cache.put(2, 2);    // evict 1, cache = {2=2}
cache.get(1);       // return -1 (was evicted)
cache.put(3, 3);    // evict 2, cache = {3=3}
cache.get(2);       // return -1 (was evicted)
cache.put(4, 4);    // evict 3, cache = {4=4}
cache.get(3);       // return -1 (was evicted)

Output: [null, null, null, -1, null, -1, null, -1]
```

---

## Constraints

- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`
- `0 <= value <= 10^5`
- At most `2 * 10^5` calls will be made to `get` and `put`

---

## The Challenge: O(1) Operations!

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Humein YE operations O(1) mein karne hain:                    │
│                                                                 │
│   1. get(key)  → Key dhundho aur value return karo              │
│   2. put(key)  → Key add/update karo                            │
│   3. Access order track karo (most recent vs least recent)      │
│   4. LRU item quickly remove karo                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Kaunsa Data Structure use karein?**

| Operation | Array | HashMap | LinkedList |
|-----------|-------|---------|------------|
| Search by key | O(n) | **O(1)** | O(n) |
| Insert/Delete at ends | O(n) | - | **O(1)** |
| Insert/Delete in middle | O(n) | - | **O(1)** if node known |
| Track order | Yes | No | Yes |

**Solution:** HashMap + Doubly Linked List = Best of both worlds!

---

## Key Insight! 🔑

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   HashMap: Key → Node (O(1) lookup)                             │
│   Doubly Linked List: Track usage order (O(1) reorder)          │
│                                                                 │
│   HashMap gives us: Fast key lookup                             │
│   DLL gives us: Fast insertion/deletion anywhere                │
│                                                                 │
│   Together: O(1) for everything!                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Why Doubly Linked List? Why not Singly?

```
Singly Linked List:
  To delete a node, we need PREVIOUS node
  Finding previous = O(n) traversal

Doubly Linked List:
  Each node has PREV pointer
  Delete any node in O(1)!

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Singly:  [A] → [B] → [C]                                      │
│            To delete B, need to find A first (O(n))            │
│                                                                 │
│   Doubly:  [A] ⇄ [B] ⇄ [C]                                      │
│            B knows both A and C                                 │
│            Delete B in O(1): A.next = C, C.prev = A            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **HashMap/Map** basics
- **Doubly Linked List** operations (insert, delete)
- Understanding of pointers/references

---

## Data Structure Design

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   DOUBLY LINKED LIST:                                           │
│                                                                 │
│   HEAD ⇄ [Node1] ⇄ [Node2] ⇄ [Node3] ⇄ TAIL                    │
│   (dummy)  ↑         ↑         ↑      (dummy)                   │
│            │         │         │                                │
│           LRU      middle     MRU                               │
│       (remove      (access)  (add new)                          │
│        first)                                                   │
│                                                                 │
│   HASHMAP:                                                      │
│   ┌─────────────────────────┐                                   │
│   │  key1 → Node1           │                                   │
│   │  key2 → Node2           │                                   │
│   │  key3 → Node3           │                                   │
│   └─────────────────────────┘                                   │
│                                                                 │
│   HEAD.next = LRU (Least Recently Used)                         │
│   TAIL.prev = MRU (Most Recently Used)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Why Dummy HEAD and TAIL?

```
Without dummy nodes:
  - Need to handle empty list specially
  - Need to handle single element specially
  - Edge cases everywhere!

With dummy nodes:
  - List is never truly empty (HEAD and TAIL always exist)
  - All operations become uniform
  - No special cases!

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Empty Cache:                                                  │
│   HEAD ⇄ TAIL                                                   │
│                                                                 │
│   One Item:                                                     │
│   HEAD ⇄ [Node] ⇄ TAIL                                          │
│                                                                 │
│   Multiple Items:                                               │
│   HEAD ⇄ [N1] ⇄ [N2] ⇄ [N3] ⇄ TAIL                             │
│                                                                 │
│   Insert/Delete code remains SAME for all cases!               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Node Structure

```typescript
class DLLNode {
    key: number;      // Store key (needed for eviction)
    value: number;    // Store value
    prev: DLLNode | null;
    next: DLLNode | null;
}
```

**Why store KEY in node?**

```
Jab eviction hota hai (LRU remove):
1. Hum HEAD.next node remove karte hain
2. HashMap se bhi delete karna hai
3. HashMap.delete(???) ← Key chahiye!
4. Isliye node mein key store karte hain
```

---

## Operations

### 1. get(key)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   get(key):                                                     │
│                                                                 │
│   1. Check: key exists in HashMap?                              │
│      - No → return -1                                           │
│      - Yes → continue                                           │
│                                                                 │
│   2. Get node from HashMap                                      │
│                                                                 │
│   3. Move node to MRU position (end of list)                    │
│      - Remove from current position                             │
│      - Insert before TAIL                                       │
│                                                                 │
│   4. Return node.value                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2. put(key, value)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   put(key, value):                                              │
│                                                                 │
│   Case 1: Key already exists                                    │
│     1. Get node from HashMap                                    │
│     2. Update node.value                                        │
│     3. Move node to MRU position                                │
│                                                                 │
│   Case 2: Key doesn't exist                                     │
│     1. Create new node                                          │
│     2. Add to HashMap                                           │
│     3. Insert at MRU position (before TAIL)                     │
│     4. If size > capacity:                                      │
│        - Remove LRU node (HEAD.next)                            │
│        - Delete from HashMap                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Helper Functions

### removeNode(node)

```
Remove a node from its current position in DLL:

Before: ... ⇄ [prev] ⇄ [node] ⇄ [next] ⇄ ...

After:  ... ⇄ [prev] ⇄ [next] ⇄ ...
              (node is disconnected)

Code:
  node.prev.next = node.next
  node.next.prev = node.prev
```

### insertBeforeTail(node)

```
Insert node just before TAIL (MRU position):

Before: ... ⇄ [last] ⇄ TAIL

After:  ... ⇄ [last] ⇄ [node] ⇄ TAIL

Code:
  node.prev = tail.prev
  node.next = tail
  tail.prev.next = node
  tail.prev = node
```

### moveToEnd(node)

```
Move existing node to MRU position:

1. removeNode(node)
2. insertBeforeTail(node)
```

---

## Algorithm (Pseudocode)

```typescript
class LRUCache {
    capacity: number;
    cache: Map<number, DLLNode>;
    head: DLLNode;  // dummy head
    tail: DLLNode;  // dummy tail

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();

        // Initialize dummy nodes
        this.head = new DLLNode(0, 0);
        this.tail = new DLLNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        if (!this.cache.has(key)) {
            return -1;
        }

        const node = this.cache.get(key)!;
        this.moveToEnd(node);  // Mark as recently used
        return node.value;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            // Update existing
            const node = this.cache.get(key)!;
            node.value = value;
            this.moveToEnd(node);
        } else {
            // Add new
            const node = new DLLNode(key, value);
            this.cache.set(key, node);
            this.insertBeforeTail(node);

            // Evict if over capacity
            if (this.cache.size > this.capacity) {
                const lru = this.head.next!;
                this.removeNode(lru);
                this.cache.delete(lru.key);
            }
        }
    }
}
```

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| `get(key)` | **O(1)** | O(1) |
| `put(key, value)` | **O(1)** | O(1) |
| **Overall Space** | - | **O(capacity)** |

**Why O(1)?**
- HashMap lookup: O(1)
- DLL insert/delete: O(1) (we have direct node reference)
- No traversal needed anywhere!

---

## Detailed Dry Run

```
LRUCache(2)  // capacity = 2

Initial State:
  HEAD ⇄ TAIL
  HashMap: {}

═══════════════════════════════════════════════════════════════════
put(1, 1)
═══════════════════════════════════════════════════════════════════

Key 1 not in cache → Create new node

  HEAD ⇄ [1:1] ⇄ TAIL
  HashMap: {1 → Node(1,1)}

  Size = 1, Capacity = 2 → No eviction

═══════════════════════════════════════════════════════════════════
put(2, 2)
═══════════════════════════════════════════════════════════════════

Key 2 not in cache → Create new node

  HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL
         LRU      MRU
  HashMap: {1 → Node(1,1), 2 → Node(2,2)}

  Size = 2, Capacity = 2 → No eviction

═══════════════════════════════════════════════════════════════════
get(1) → returns 1
═══════════════════════════════════════════════════════════════════

Key 1 exists → Get node, move to end

Before:
  HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL

After moving [1:1] to end:
  HEAD ⇄ [2:2] ⇄ [1:1] ⇄ TAIL
         LRU      MRU

Return: 1

═══════════════════════════════════════════════════════════════════
put(3, 3)
═══════════════════════════════════════════════════════════════════

Key 3 not in cache → Create new node
Size will become 3 > capacity 2 → Need eviction!

Before adding:
  HEAD ⇄ [2:2] ⇄ [1:1] ⇄ TAIL
         LRU

1. Add new node:
   HEAD ⇄ [2:2] ⇄ [1:1] ⇄ [3:3] ⇄ TAIL

2. Size = 3 > 2 → Evict LRU (HEAD.next = node with key 2)

   Remove [2:2]:
   HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
          LRU     MRU

   Delete key 2 from HashMap

HashMap: {1 → Node(1,1), 3 → Node(3,3)}

═══════════════════════════════════════════════════════════════════
get(2) → returns -1
═══════════════════════════════════════════════════════════════════

Key 2 not in HashMap (was evicted)
Return: -1

═══════════════════════════════════════════════════════════════════
put(4, 4)
═══════════════════════════════════════════════════════════════════

Key 4 not in cache → Create new node
Size will become 3 > capacity 2 → Need eviction!

Before adding:
  HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
         LRU

1. Add new node:
   HEAD ⇄ [1:1] ⇄ [3:3] ⇄ [4:4] ⇄ TAIL

2. Size = 3 > 2 → Evict LRU (HEAD.next = node with key 1)

   Remove [1:1]:
   HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
          LRU     MRU

   Delete key 1 from HashMap

HashMap: {3 → Node(3,3), 4 → Node(4,4)}

═══════════════════════════════════════════════════════════════════
get(1) → returns -1
═══════════════════════════════════════════════════════════════════

Key 1 not in HashMap (was evicted)
Return: -1

═══════════════════════════════════════════════════════════════════
get(3) → returns 3
═══════════════════════════════════════════════════════════════════

Key 3 exists → Get node, move to end

Before:
  HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL

After moving [3:3] to end:
  HEAD ⇄ [4:4] ⇄ [3:3] ⇄ TAIL
         LRU     MRU

Return: 3

═══════════════════════════════════════════════════════════════════
get(4) → returns 4
═══════════════════════════════════════════════════════════════════

Key 4 exists → Get node, move to end

Before:
  HEAD ⇄ [4:4] ⇄ [3:3] ⇄ TAIL

After moving [4:4] to end:
  HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
         LRU     MRU

Return: 4

═══════════════════════════════════════════════════════════════════
FINAL OUTPUT: [null, null, null, 1, null, -1, null, -1, 3, 4]
═══════════════════════════════════════════════════════════════════
```

---

## Edge Cases

1. **Capacity = 1**: Every new put evicts previous item
2. **Update existing key**: Value changes, key moves to MRU
3. **Get non-existent key**: Return -1, no state change
4. **Multiple gets on same key**: Key stays MRU
5. **Put same key twice**: Update value, no eviction

---

## Common Mistakes

1. **Forgetting to store key in node**: Can't delete from HashMap during eviction
2. **Not moving to MRU on get()**: Access should update recency
3. **Not handling update case in put()**: If key exists, just update value
4. **Off-by-one in capacity check**: Check `size > capacity` after adding

---

## Interview Tips

1. **Start with clarifying questions:**
   - What's the time complexity requirement? (O(1))
   - Can values be negative?
   - Should get() update recency? (Yes!)

2. **Explain your approach:**
   - "HashMap alone can't track order"
   - "List alone can't do O(1) search"
   - "Together they give us O(1) for everything"

3. **Mention dummy nodes:**
   - "I'll use dummy head/tail to avoid edge cases"

4. **Code helper functions first:**
   - removeNode()
   - insertBeforeTail()
   - Then main functions become simple

---

## Related Problems

- **460. LFU Cache** (Hard) - Least Frequently Used
- **432. All O(1) Data Structure** (Hard)
- **588. Design In-Memory File System** (Hard)

---

**Implementation dekhna hai?** 🎯