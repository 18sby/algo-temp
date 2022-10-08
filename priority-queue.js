class PriorityQueue {
  constructor(comparator) {
    this.pq = [-1]; // 0 索引不用
    this.comparator = comparator;
  }
  insert(x) {
    this.pq.push(x);
    this.swim(this.pq.length - 1);
  }
  swim(i) {
    const { parent } = this;
    while (parent(i) > 0 && this.compare(i, parent(i))) {
      this.swap(i, parent(i));
      i = parent(i);
    }
  }
  deq() {
    const { pq } = this;
    this.swap(1, pq.length - 1);
    const top = pq.pop();
    this.sink(1);
    return top;
  }
  sink(i) {
    const { left, right, pq } = this;
    const n = pq.length;
    while (left(i) < n) {
      let temp = i;
      if (this.compare(left(i), temp)) temp = left(i);
      if (right(i) < n && this.compare(right(i), temp)) temp = right(i);
      if (temp === i) break;
      this.swap(i, temp);
      i = temp;
    }
  }
  peek() {
    if (!this.size) {
      throw 'Priority queue is empty!'
    }
    return this.pq[1];
  }
  compare(i, j) {
    const { pq } = this;
    return this.comparator(pq[i], pq[j]);
  }
  swap(i, j) {
    const { pq } = this;
    [pq[i], pq[j]] = [pq[j], pq[i]];
  }
  parent(i) {
    return Math.floor(i / 2);
  }
  left(i) {
    return 2 * i;
  }
  right(i) {
    return 2 * i + 1;
  }
  get size() {
    return this.pq.length - 1;
  }
}