class PriorityNode<T> {
    value: T;
  
    priority: number;
  
    next: PriorityNode<T> | null;
  
    constructor(value: T, priority: number) {
      this.value = value;
      this.priority = priority;
      this.next = null;
    }
  }
  export class PriorityQueue<T> {
    private head: PriorityNode<T> | null;
  
    private tail: PriorityNode<T> | null;

    private reversed: boolean;

    public size: number;

    constructor(reversed: boolean = false) {
      this.reversed = reversed;
      this.size = 0;
      this.head = null;
      this.tail = null;
    }
  
    public enqueue(value: T, priority: number) {
      if(this.reversed) {
        priority *= -1;
      }
      const node = new PriorityNode(value, priority);
      if (!this.head || !this.tail) {
        this.head = this.tail = node;
      } else {

        if(node.priority > this.head.priority) {
          node.next = this.head;
          this.head = node;
        } else if(node.priority <= this.tail.priority) {
          this.tail.next = node;
          this.tail = node;
        }
        else {
          let nav = this.head;
          while(nav.next != null && node.priority < nav.next.priority) {
            nav = nav.next;
          }

          let oldNext = nav.next;
          nav.next = node;
          node.next = oldNext;

        }

      }
      this.size++;
    }
  
    public dequeue(): T {
      if (!this.head) {
        throw new Error("Empty");
      }

      const oldHead = this.head;
      this.head = oldHead.next;
      this.size--;
      return oldHead.value;
    }
  
    public isEmpty(): boolean {
      return this.head == null;
    }
  }
  