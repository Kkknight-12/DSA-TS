# LFU Cache

**Difficulty:** Hard
**Topics:** Hash Table, Linked List, Design, Doubly-Linked List
**LeetCode:** [460. LFU Cache](https://leetcode.com/problems/lfu-cache/)

---

## Problem Statement (Simple Language Mein)

**LFU = Least Frequently Used**

Ek cache design karo jisme:
- Fixed capacity ho
- Jab capacity full ho jaaye, **sabse kam frequently used** item hatao
- Agar same frequency wale multiple items hain, toh unme se **least recently used** hatao

**Operations:**
1. `get(key)` - Key ki value return karo, frequency++ karo. Agar key nahi hai toh -1
2. `put(key, value)` - Key-value pair add/update karo, frequency++ karo. Agar capacity exceed ho toh LFU item hatao

**IMPORTANT:** Dono operations O(1) time mein hone chahiye!

---

## LRU vs LFU - Kya Difference Hai?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   LRU (Least Recently Used):                                    │
│   - Sabse purana (time ke hisaab se) item hatao                │
│   - Jo sabse lamba time se use nahi hua                        │
│                                                                 │
│   LFU (Least Frequently Used):                                  │
│   - Sabse kam baar use hua item hatao                          │
│   - Jo sabse kam times access hua                              │
│   - Tie breaker: LRU (same frequency mein purana hatao)        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Example Comparison:

```
Capacity = 2

Operations: put(1,1), put(2,2), get(1), get(1), get(1), put(3,3)

LRU Behavior:
  put(1,1): cache = [1]
  put(2,2): cache = [1, 2]
  get(1):   cache = [2, 1]  (1 is now most recent)
  get(1):   cache = [2, 1]
  get(1):   cache = [2, 1]
  put(3,3): evict 2 (least RECENT), cache = [1, 3]

LFU Behavior:
  put(1,1): cache = [1], freq(1)=1
  put(2,2): cache = [1, 2], freq(1)=1, freq(2)=1
  get(1):   freq(1)=2
  get(1):   freq(1)=3
  get(1):   freq(1)=4
  put(3,3): evict 2 (freq=1, lowest FREQUENCY), cache = [1, 3]

┌─────────────────────────────────────────────────────────────────┐
│   LRU evicts based on TIME (when last used)                     │
│   LFU evicts based on COUNT (how many times used)               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Real Life Example

```
Imagine ek music app jisme:
- Maximum 3 songs cache mein rakh sakta hai
- Jo song sabse kam baar play hua, wo hatao
- Agar same play count hai, toh jo sabse pehle play hua wo hatao

┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   Action: Play "Shape of You"                                  │
│   Cache: [Shape of You (1)]                                    │
│                                                                │
│   Action: Play "Blinding Lights"                               │
│   Cache: [Shape of You (1), Blinding Lights (1)]               │
│                                                                │
│   Action: Play "Shape of You" again                            │
│   Cache: [Shape of You (2), Blinding Lights (1)]               │
│                                                                │
│   Action: Play "Bad Guy"                                       │
│   Cache: [Shape of You (2), Blinding Lights (1), Bad Guy (1)]  │
│                                                                │
│   Action: Play "Levitating" (cache full!)                      │
│   Which to evict? Blinding Lights or Bad Guy? (both freq=1)    │
│   Blinding Lights came first → Evict Blinding Lights (LRU)     │
│   Cache: [Shape of You (2), Bad Guy (1), Levitating (1)]       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Examples

### Example 1:

```
LFUCache cache = new LFUCache(2);  // Capacity = 2

cache.put(1, 1);  // cache=[1], cnt(1)=1
cache.put(2, 2);  // cache=[1,2], cnt(1)=1, cnt(2)=1
cache.get(1);     // return 1, cnt(1)=2
cache.put(3, 3);  // cnt(2)=1 is lowest, evict key 2
                  // cache=[1,3], cnt(1)=2, cnt(3)=1
cache.get(2);     // return -1 (not found)
cache.get(3);     // return 3, cnt(3)=2
cache.put(4, 4);  // cnt(1)=2, cnt(3)=2 → TIE!
                  // key 1 was used before key 3 → evict key 1 (LRU)
                  // cache=[3,4], cnt(3)=2, cnt(4)=1
cache.get(1);     // return -1 (not found)
cache.get(3);     // return 3, cnt(3)=3
cache.get(4);     // return 4, cnt(4)=2

Output: [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
```

### Visual Dry Run:

```
Capacity = 2

┌────────────────────────────────────────────────────────────────────────┐
│ Operation   │ Cache State              │ Frequencies    │ Result       │
├────────────────────────────────────────────────────────────────────────┤
│ put(1,1)    │ [1=1]                    │ 1:1            │ null         │
│ put(2,2)    │ [1=1, 2=2]               │ 1:1, 2:1       │ null         │
│ get(1)      │ [2=2, 1=1]               │ 1:2, 2:1       │ 1            │
│ put(3,3)    │ [1=1, 3=3]               │ 1:2, 3:1       │ null (evict 2)│
│ get(2)      │ [1=1, 3=3]               │ 1:2, 3:1       │ -1           │
│ get(3)      │ [1=1, 3=3]               │ 1:2, 3:2       │ 3            │
│ put(4,4)    │ [3=3, 4=4]               │ 3:2, 4:1       │ null (evict 1)│
│ get(1)      │ [3=3, 4=4]               │ 3:2, 4:1       │ -1           │
│ get(3)      │ [4=4, 3=3]               │ 3:3, 4:1       │ 3            │
│ get(4)      │ [3=3, 4=4]               │ 3:3, 4:2       │ 4            │
└────────────────────────────────────────────────────────────────────────┘
```

### Example 2 (Capacity = 3):

```
LFUCache cache = new LFUCache(3);

cache.put(5, 7);  // cache=[5], cnt(5)=1
cache.put(4, 6);  // cache=[5,4], cnt(5)=1, cnt(4)=1
cache.put(3, 5);  // cache=[5,4,3], all freq=1
cache.put(2, 4);  // evict 5 (oldest with freq=1), cache=[4,3,2]
cache.put(1, 3);  // evict 4 (oldest with freq=1), cache=[3,2,1]
cache.get(1);     // return 3, cnt(1)=2
cache.get(2);     // return 4, cnt(2)=2
cache.get(3);     // return 5, cnt(3)=2
cache.get(4);     // return -1 (was evicted)
cache.get(5);     // return -1 (was evicted)

Output: [null, null, null, null, null, null, 3, 4, 5, -1, -1]
```

---

## Constraints

- `0 <= capacity <= 10^4`
- `0 <= key <= 10^5`
- `0 <= value <= 10^9`
- At most `2 * 10^5` calls will be made to `get` and `put`

---

## The Challenge: O(1) Operations!

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Humein YE operations O(1) mein karne hain:                    │
│                                                                 │
│   1. get(key) → Key dhundho, frequency badhao                   │
│   2. put(key) → Add/update, frequency track karo                │
│   3. Find minimum frequency item                                │
│   4. Among min freq items, find LRU (least recent)              │
│   5. Remove LFU item quickly                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**LRU mein sirf ek criteria tha (time), LFU mein DO criteria hain:**
1. Frequency (primary)
2. Recency (tie-breaker)

---

## Key Insight! 🔑

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Solution: THREE HashMaps + Multiple Doubly Linked Lists       │
│                                                                 │
│   1. keyToNode: key → Node (O(1) lookup)                        │
│                                                                 │
│   2. freqToList: frequency → DoublyLinkedList                   │
│      - Each frequency has its own LRU list                      │
│      - Within same frequency, use LRU order                     │
│                                                                 │
│   3. minFreq: Track minimum frequency (for eviction)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Visual Structure:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   keyToNode (HashMap):                                          │
│   ┌─────────────────────────────────────────┐                   │
│   │  key1 → Node1                           │                   │
│   │  key2 → Node2                           │                   │
│   │  key3 → Node3                           │                   │
│   └─────────────────────────────────────────┘                   │
│                                                                 │
│   freqToList (HashMap):                                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  freq=1 → HEAD ⇄ [Node_A] ⇄ [Node_B] ⇄ TAIL             │   │
│   │                   (LRU)      (MRU)                       │   │
│   │                                                         │   │
│   │  freq=2 → HEAD ⇄ [Node_C] ⇄ [Node_D] ⇄ TAIL             │   │
│   │                   (LRU)      (MRU)                       │   │
│   │                                                         │   │
│   │  freq=3 → HEAD ⇄ [Node_E] ⇄ TAIL                        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   minFreq = 1 (points to lowest frequency with items)           │
│                                                                 │
│   TO EVICT:                                                     │
│   1. Go to freqToList[minFreq]                                  │
│   2. Remove HEAD.next (LRU in that frequency)                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Node Structure

```typescript
class LFUNode {
    key: number;       // Store key (needed for eviction)
    value: number;     // Store value
    freq: number;      // Frequency count
    prev: LFUNode | null;
    next: LFUNode | null;
}
```

**Why store frequency in node?**
- Jab node access hota hai, current frequency se remove karo
- New frequency list mein add karo
- Node ko pata hona chahiye current frequency kya hai

---

## Operations

### 1. get(key)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   get(key):                                                     │
│                                                                 │
│   1. Check: key exists in keyToNode?                            │
│      - No → return -1                                           │
│      - Yes → continue                                           │
│                                                                 │
│   2. Get node from keyToNode                                    │
│                                                                 │
│   3. Update frequency:                                          │
│      - Remove node from freqToList[node.freq]                   │
│      - node.freq++                                              │
│      - Add node to freqToList[node.freq] (new freq)             │
│      - Update minFreq if needed                                 │
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
│     1. Get node from keyToNode                                  │
│     2. Update node.value                                        │
│     3. Update frequency (same as get)                           │
│                                                                 │
│   Case 2: Key doesn't exist                                     │
│     1. If at capacity → Evict LFU item                          │
│        - Get list at minFreq                                    │
│        - Remove HEAD.next (LRU in that freq)                    │
│        - Delete from keyToNode                                  │
│                                                                 │
│     2. Create new node with freq=1                              │
│     3. Add to keyToNode                                         │
│     4. Add to freqToList[1]                                     │
│     5. minFreq = 1 (new item always has freq=1)                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## updateFrequency Helper

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   updateFrequency(node):                                        │
│                                                                 │
│   1. oldFreq = node.freq                                        │
│                                                                 │
│   2. Remove node from freqToList[oldFreq]                       │
│                                                                 │
│   3. If freqToList[oldFreq] is empty AND oldFreq == minFreq:    │
│      - minFreq++ (no more items at this frequency)              │
│                                                                 │
│   4. node.freq++                                                │
│                                                                 │
│   5. Add node to freqToList[node.freq]                          │
│      - Create new list if doesn't exist                         │
│      - Insert at MRU position (end)                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Why minFreq Works

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   minFreq is updated in only TWO cases:                         │
│                                                                 │
│   1. When we ADD new item:                                      │
│      minFreq = 1 (new item always starts with freq=1)           │
│                                                                 │
│   2. When we UPDATE existing item:                              │
│      If old freq list becomes empty AND it was minFreq:         │
│      minFreq++ (next frequency has items)                       │
│                                                                 │
│   WHY minFreq++ works?                                          │
│   - When we remove node from freq F, we add it to freq F+1      │
│   - If F was minFreq and F's list is now empty                  │
│   - Then F+1 must have at least this node                       │
│   - So minFreq = F+1 is correct!                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **LRU Cache understanding** (HashMap + DLL)
- **Multiple HashMaps** coordination
- **Doubly Linked List** operations

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| `get(key)` | **O(1)** | O(1) |
| `put(key, value)` | **O(1)** | O(1) |
| **Overall Space** | - | **O(capacity)** |

**Why O(1)?**
- All HashMap operations: O(1)
- All DLL operations: O(1)
- minFreq update: O(1)

---

## Detailed Dry Run

```
LFUCache(2)  // capacity = 2

Initial State:
  keyToNode = {}
  freqToList = {}
  minFreq = 0
  size = 0

═══════════════════════════════════════════════════════════════════
put(1, 1)
═══════════════════════════════════════════════════════════════════

Key 1 not in cache → New item

1. Create node: Node(key=1, val=1, freq=1)
2. Add to keyToNode: {1 → Node}
3. Add to freqToList[1]:
   freq=1: HEAD ⇄ [1:1] ⇄ TAIL
4. minFreq = 1 (new item)
5. size = 1

State:
  keyToNode = {1 → Node(1,1,freq=1)}
  freqToList[1] = [1:1]
  minFreq = 1

═══════════════════════════════════════════════════════════════════
put(2, 2)
═══════════════════════════════════════════════════════════════════

Key 2 not in cache → New item

1. Create node: Node(key=2, val=2, freq=1)
2. Add to keyToNode
3. Add to freqToList[1]:
   freq=1: HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL
                  LRU      MRU
4. minFreq = 1
5. size = 2 (at capacity)

State:
  keyToNode = {1 → Node(1,1,freq=1), 2 → Node(2,2,freq=1)}
  freqToList[1] = [1:1, 2:2]
  minFreq = 1

═══════════════════════════════════════════════════════════════════
get(1) → returns 1
═══════════════════════════════════════════════════════════════════

Key 1 exists → Update frequency

1. Get node from keyToNode
2. updateFrequency(node):
   - Remove from freqToList[1]:
     freq=1: HEAD ⇄ [2:2] ⇄ TAIL
   - node.freq = 1 → 2
   - Add to freqToList[2]:
     freq=2: HEAD ⇄ [1:1] ⇄ TAIL
   - minFreq still 1 (freq=1 list not empty)
3. Return 1

State:
  keyToNode = {1 → Node(1,1,freq=2), 2 → Node(2,2,freq=1)}
  freqToList[1] = [2:2]
  freqToList[2] = [1:1]
  minFreq = 1

═══════════════════════════════════════════════════════════════════
put(3, 3)
═══════════════════════════════════════════════════════════════════

Key 3 not in cache, size == capacity → Need eviction!

1. Evict LFU:
   - Go to freqToList[minFreq] = freqToList[1]
   - Remove HEAD.next = Node(2,2)
   - Delete key 2 from keyToNode
   - freq=1 list now: HEAD ⇄ TAIL (empty, but minFreq will be reset)

2. Create node: Node(key=3, val=3, freq=1)
3. Add to keyToNode
4. Add to freqToList[1]:
   freq=1: HEAD ⇄ [3:3] ⇄ TAIL
5. minFreq = 1 (new item)

State:
  keyToNode = {1 → Node(1,1,freq=2), 3 → Node(3,3,freq=1)}
  freqToList[1] = [3:3]
  freqToList[2] = [1:1]
  minFreq = 1

═══════════════════════════════════════════════════════════════════
get(2) → returns -1
═══════════════════════════════════════════════════════════════════

Key 2 not in keyToNode (was evicted)
Return -1

═══════════════════════════════════════════════════════════════════
get(3) → returns 3
═══════════════════════════════════════════════════════════════════

Key 3 exists → Update frequency

1. updateFrequency(node):
   - Remove from freqToList[1]:
     freq=1: HEAD ⇄ TAIL (empty!)
   - node.freq = 1 → 2
   - Is old list empty AND oldFreq == minFreq? YES!
     minFreq = 1 → 2
   - Add to freqToList[2]:
     freq=2: HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
                    LRU      MRU

State:
  keyToNode = {1 → Node(1,1,freq=2), 3 → Node(3,3,freq=2)}
  freqToList[2] = [1:1, 3:3]
  minFreq = 2

═══════════════════════════════════════════════════════════════════
put(4, 4)
═══════════════════════════════════════════════════════════════════

Key 4 not in cache, size == capacity → Need eviction!

1. Evict LFU:
   - Go to freqToList[minFreq] = freqToList[2]
   - Remove HEAD.next = Node(1,1) ← LRU in freq=2
   - Delete key 1 from keyToNode
   - freq=2 list now: HEAD ⇄ [3:3] ⇄ TAIL

2. Create node: Node(key=4, val=4, freq=1)
3. Add to keyToNode
4. Add to freqToList[1]:
   freq=1: HEAD ⇄ [4:4] ⇄ TAIL
5. minFreq = 1 (new item)

State:
  keyToNode = {3 → Node(3,3,freq=2), 4 → Node(4,4,freq=1)}
  freqToList[1] = [4:4]
  freqToList[2] = [3:3]
  minFreq = 1

═══════════════════════════════════════════════════════════════════
get(1) → returns -1 (was evicted)
get(3) → returns 3, freq=3
get(4) → returns 4, freq=2
═══════════════════════════════════════════════════════════════════

FINAL OUTPUT: [null, null, null, 1, null, -1, 3, null, -1, 3, 4] ✓
```

---

## Edge Cases

1. **Capacity = 0**: Every put should do nothing, every get returns -1
2. **Multiple items with same frequency**: Evict LRU among them
3. **Update existing key**: Frequency increases, value updates
4. **Single item cache**: Every new put evicts the previous item
5. **Frequency overflow**: Won't happen in practice (max 2*10^5 operations)

---

## LRU vs LFU Comparison

| Aspect | LRU Cache | LFU Cache |
|--------|-----------|-----------|
| **Eviction Criteria** | Least Recently Used | Least Frequently Used |
| **Data Structure** | 1 HashMap + 1 DLL | 2 HashMaps + Multiple DLLs |
| **Tie Breaker** | N/A | LRU (among same freq) |
| **Complexity** | O(1) | O(1) |
| **Use Case** | Temporal locality | Frequency patterns |

---

## Interview Tips

1. **Clarify the tie-breaker:**
   - "If two keys have same frequency, which one to evict?"
   - Answer: The one that was least recently used

2. **Explain the structure:**
   - "I'll use frequency → DLL mapping"
   - "Each DLL is itself an LRU list for that frequency"

3. **Mention minFreq optimization:**
   - "Track minimum frequency to find eviction target in O(1)"

4. **Edge cases:**
   - Capacity 0
   - Update existing key (increases frequency!)

---

## Related Problems

- **146. LRU Cache** (Medium) - Simpler version
- **432. All O(1) Data Structure** (Hard)
- **355. Design Twitter** (Medium)

---

**Implementation dekhna hai?** 🎯