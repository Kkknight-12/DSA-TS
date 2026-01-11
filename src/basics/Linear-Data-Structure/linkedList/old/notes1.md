Bhai, pehle toh welcome to DSA world! Main hoon Grok, aur aaj hum Linked List ko scratch se seekhenge. Tu new hai DSA mein, toh main bilkul basic se start karunga – jaise zero se hero banate hain. DSA matlab Data Structures and Algorithms, jo programming mein data ko efficiently store aur manipulate karne ke liye use hota hai. Jaise, agar tu ek list banana chahta hai, toh array se start kar sakta hai, but linked list ek alag beast hai. Chalo step by step jaate hain.

### Pehle Samajh Lo: Array vs Linked List – Kyun Linked List?
JavaScript mein built-in array hota hai (jaise `let arr = [1, 2, 3];`), jo contiguous memory mein store hota hai – matlab elements ek ke baad ek fixed jagah pe baithte hain. Insertion ya deletion mein time lagta hai kyuki shift karna padta hai (O(n) time).

Lekin **Linked List**? Yeh ek chain ki tarah hai – har element (node) apne next element ko point karta hai. Memory scattered hoti hai, but insertion/deletion super fast (O(1) agar position pata ho). JavaScript mein yeh built-in nahi hai, toh hum khud banayenge! TypeScript mein code likhenge kyuki tu bola, jo JS ka strict version hai (types add karta hai, errors kam hote hain).

**Pros of Linked List:**
- Dynamic size – jitna chahiye utna grow/shrink.
- Insertion/deletion easy (no shifting).
**Cons:**
- Random access slow (array ki tarah index se nahi pahunch sakte, traverse karna padta hai – O(n)).
- Extra memory for pointers.

Ab chalo banate hain **Singly Linked List** (sirf aage ki taraf point karegi). Baad mein doubly ya circular bataunga agar chahiye.

### Step 1: Node Kya Hai? (Basic Building Block)
Linked list ka har element ek **Node** hota hai. Isme do cheezein:
- `data`: Actual value (number, string, etc.).
- `next`: Pointer to next node (null if last).

TypeScript mein Node ko class banayenge:

```typescript
class Node<T> {  // T is generic type, jaise number ya string
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;  // Shuru mein next null hi rahega
  }
}
```

Samajh: Yeh ek blueprint hai. Jaise `new Node(5)` banaoge, toh data=5, next=null.

### Step 2: LinkedList Class Banayenge
Yeh main class hogi jo poori list manage karegi. Sirf ek property: `head` (first node ko point karegi).

```typescript
class LinkedList<T> {
  head: Node<T> | null = null;  // Shuru mein empty list

  // Display function – poori list print karega
  display(): void {
    let current = this.head;
    let result = '';
    while (current !== null) {
      result += current.data + ' -> ';
      current = current.next;  // Next pe jaao
    }
    result += 'null';
    console.log(result);  // Jaise "1 -> 2 -> 3 -> null"
  }
}
```

Yeh display sirf traversal dikhata hai – head se start karke null tak chalte hain.

### Step 3: Operations – Kaise Insert Karein?
Sabse basic: Insert karna. Pehle **beginning mein insert** (easy, head change hogi).

```typescript
// Insert at beginning
insertAtBeginning(data: T): void {
  const newNode = new Node(data);  // Naya node banao
  newNode.next = this.head;  // Naye node ka next old head ko point kare
  this.head = newNode;  // Head ko naye node pe shift kar do
}
```

Example: Agar list empty hai, head null tha, ab head = newNode. Agar pehle 1 tha, ab newNode(5) -> 1.

Ab **end mein insert** (traverse karke last pe add):

```typescript
// Insert at end
insertAtEnd(data: T): void {
  const newNode = new Node(data);
  if (this.head === null) {
    this.head = newNode;  // Empty tha toh head set kar do
    return;
  }
  let current = this.head;
  while (current.next !== null) {
    current = current.next;  // Last tak jaao
  }
  current.next = newNode;  // Last ka next = newNode
}
```

**Specific position pe insert** (position 0 se count, jaise index):

```typescript
// Insert at position (0-based)
insertAtPosition(data: T, position: number): void {
  if (position < 0) {
    console.log('Invalid position bhai!');
    return;
  }
  const newNode = new Node(data);
  if (position === 0) {
    newNode.next = this.head;
    this.head = newNode;
    return;
  }
  let current = this.head;
  let index = 0;
  while (current !== null && index < position - 1) {
    current = current.next;
    index++;
  }
  if (current === null) {
    console.log('Position out of bound!');
    return;
  }
  newNode.next = current.next;
  current.next = newNode;
}
```

### Step 4: Delete Karna
**Beginning se delete**:

```typescript
// Delete from beginning
deleteFromBeginning(): T | null {
  if (this.head === null) {
    console.log('List empty hai!');
    return null;
  }
  const deletedData = this.head.data;  // Data save kar lo
  this.head = this.head.next;  // Head ko next pe shift
  return deletedData;
}
```

**End se delete**:

```typescript
// Delete from end
deleteFromEnd(): T | null {
  if (this.head === null) return null;
  if (this.head.next === null) {
    const data = this.head.data;
    this.head = null;
    return data;
  }
  let current = this.head;
  while (current.next !== null && current.next.next !== null) {
    current = current.next;
  }
  const data = current.next!.data;  // ! for non-null assertion
  current.next = null;
  return data;
}
```

**Specific position se delete** (similar to insert):

```typescript
// Delete at position
deleteAtPosition(position: number): T | null {
  if (position < 0 || this.head === null) return null;
  if (position === 0) {
    return this.deleteFromBeginning();
  }
  let current = this.head;
  let index = 0;
  while (current !== null && index < position - 1) {
    current = current.next;
    index++;
  }
  if (current === null || current.next === null) return null;
  const deletedData = current.next.data;
  current.next = current.next.next;
  return deletedData;
}
```

### Step 5: Search Karna
Koi value dhundhni hai? Traverse karke check:

```typescript
// Search value
search(data: T): boolean {
  let current = this.head;
  while (current !== null) {
    if (current.data === data) {
      return true;  // Mila!
    }
    current = current.next;
  }
  return false;  // Nahi mila
}
```

### Poora Code Ek Saath – Test Kar Lo!
Yeh full class hai. TypeScript file bana ke run kar (jaise `tsc file.ts && node file.js`):

```typescript
class Node<T> {
  data: T;
  next: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList<T> {
  head: Node<T> | null = null;

  insertAtBeginning(data: T): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtEnd(data: T): void {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  insertAtPosition(data: T, position: number): void {
    if (position < 0) {
      console.log('Invalid position!');
      return;
    }
    const newNode = new Node(data);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let current = this.head;
    let index = 0;
    while (current !== null && index < position - 1) {
      current = current.next;
      index++;
    }
    if (current === null) {
      console.log('Position out of bound!');
      return;
    }
    newNode.next = current.next;
    current.next = newNode;
  }

  deleteFromBeginning(): T | null {
    if (this.head === null) {
      console.log('List empty!');
      return null;
    }
    const deletedData = this.head.data;
    this.head = this.head.next;
    return deletedData;
  }

  deleteFromEnd(): T | null {
    if (this.head === null) return null;
    if (this.head.next === null) {
      const data = this.head.data;
      this.head = null;
      return data;
    }
    let current = this.head;
    while (current.next !== null && current.next.next !== null) {
      current = current.next;
    }
    const data = current.next!.data;
    current.next = null;
    return data;
  }

  deleteAtPosition(position: number): T | null {
    if (position < 0 || this.head === null) return null;
    if (position === 0) {
      return this.deleteFromBeginning();
    }
    let current = this.head;
    let index = 0;
    while (current !== null && index < position - 1) {
      current = current.next;
      index++;
    }
    if (current === null || current.next === null) return null;
    const deletedData = current.next.data;
    current.next = current.next.next;
    return deletedData;
  }

  search(data: T): boolean {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }

  display(): void {
    let current = this.head;
    let result = '';
    while (current !== null) {
      result += current.data + ' -> ';
      current = current.next;
    }
    result += 'null';
    console.log(result);
  }
}

// Test kar lo bhai!
const list = new LinkedList<number>();
list.insertAtEnd(1);
list.insertAtEnd(2);
list.insertAtBeginning(0);
list.insertAtPosition(10, 2);  // Position 2 pe 10 add
list.display();  // Output: 0 -> 1 -> 10 -> 2 -> null

console.log(list.search(10));  // true
list.deleteFromBeginning();  // 0 delete
list.display();  // 1 -> 10 -> 2 -> null

console.log(list.deleteFromEnd());  // 2 return karega
list.display();  // 1 -> 10 -> null
```

### Aur Kya Seekhein Next?
Yeh singly linked list thi – sirf forward. Agar **Doubly Linked List** chahiye (prev bhi point kare), ya **Circular** (last next=head), toh bata. Practice kar: Yeh code copy-paste kar ke VS Code mein run kar, samajh aa jayega traversal ka funda. Time complexity: Insert/delete O(1) agar head pe, warna O(n). Questions ho toh pooch, main clear kar dunga! Keep coding, tu rock karega DSA mein. 🚀