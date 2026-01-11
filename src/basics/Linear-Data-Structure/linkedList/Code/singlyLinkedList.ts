/**
 * Node class represents a single element in the linked list.
 * Generic type T allows storing any data type.
 */
export class ListNode<T> {
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
    current.next = newNode; // Current now points to new node

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
      console.log('Empty list');
      return;
    }

    const values: string[] = [];
    let current = this.head;

    // Guard against cycles by limiting to size + 1
    for (let i = 0; i <= this._size && current !== null; i++) {
      values.push(String(current.data));
      current = current.next!;
    }

    console.log(values.join(' → ') + ' → null');
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
console.log('=== Singly Linked List Demo ===\n');

const playlist = new SinglyLinkedList<string>();

console.log('1. Appending songs...');
playlist.append('Song A');
playlist.append('Song B');
playlist.append('Song C');
playlist.print(); // Song A → Song B → Song C → null

console.log('\n2. Prepending a song...');
playlist.prepend('Song Z');
playlist.print(); // Song Z → Song A → Song B → Song C → null

console.log('\n3. Inserting at index 2...');
playlist.insertAt('Song M', 2);
playlist.print(); // Song Z → Song A → Song M → Song B → Song C → null

console.log('\n4. Removing first song...');
console.log('Removed:', playlist.removeFirst()); // Song Z
playlist.print(); // Song A → Song M → Song B → Song C → null

console.log('\n5. Removing at index 2...');
console.log('Removed:', playlist.removeAt(2)); // Song B
playlist.print(); // Song A → Song M → Song C → null

console.log('\n6. Finding a song...');
const found = playlist.find((song) => song === 'Song M');
console.log('Found:', found); // Song M

console.log('\n7. Converting to array...');
console.log('Array:', playlist.toArray()); // ["Song A", "Song M", "Song C"]

console.log('\n8. Using for...of loop...');
for (const song of playlist) {
  console.log('  -', song);
}

console.log('\n9. List size:', playlist.size); // 3