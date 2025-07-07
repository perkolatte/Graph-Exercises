/**
 * A simple Queue class implemented with a linked list for O(1)
 * enqueue and dequeue operations.
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Adds a value to the end of the queue.
   * @param {*} val The value to add.
   */
  enqueue(val) {
    const newNode = { value: val, next: null };
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
    this.size++;
  }

  /**
   * Removes and returns the value at the start of the queue.
   * @returns {*} The dequeued value, or undefined if the queue is empty.
   */
  dequeue() {
    if (!this.head) return undefined;
    const item = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (this.size === 0) {
      this.tail = null;
    }
    return item;
  }

  /** Checks if the queue is empty. */
  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;
