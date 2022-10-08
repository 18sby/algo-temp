# algo-temp
Use it as a template only at algorithm contest.

## KMP
```js
const calcNext = (pattern) => {
  const n = pattern.length;
  const next = new Array(n).fill(0);
  let j = 0;
  let i = 1;
  while (i < n) {
    if (pattern[i] === pattern[j]) {
      next[i] = j + 1;
      i++;
      j++;
    } else {
      if (j > 0) {
        j = next[j - 1];
      } else {
        i++;
      }
    }
  }
  return next;
}

const kmp = (s, pattern) => {
  const m = s.length;
  const n = pattern.length;
  const next = calcNext(pattern);
  let i = 0;
  let j = 0;
  let match = false;
  while (i < m) {
    if (s[i] === pattern[j]) {
      i++;
      j++;
      if (j === n) {
        match = true;
        break;
      }
    } else {
      if (j > 0) {
        j = next[j - 1];
      } else {
        i++;
      }
    }
  }
  return match ? (i - n) : -1;
}
```

## PriorityQueue
```js
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
```

## SegmentTree general
```js
function build(p, l, r) {
  if (!t[p]) t[p] = { val: 0, hold: 0 };
  t[p].l = l;
  t[p].r = r;
  if (l === r) {
    t[p].val = nums[l];
    return ;
  }
  const mid = l + ((r - l) >> 1);
  if (!t[p * 2]) t[p * 2] = { val: 0, hold: 0 };
  if (!t[p * 2 + 1]) t[p * 2 + 1] = { val: 0, hold: 0 };
  build(p * 2, l, mid);
  build(p * 2 + 1, mid + 1, r);
  t[p].val = t[p * 2].val + t[p * 2 + 1].val;
};

function lazy(p) {
  if (t[p].hold) {
    t[p * 2].hold = t[p].hold;
    t[p * 2].val += t[p].hold * (t[p * 2].r - t[p * 2].l + 1);
    t[p * 2 + 1].hold = t[p].hold;
    t[p * 2 + 1].val += t[p].hold * (t[p * 2 + 1].r - t[p * 2 + 1].l + 1);
    t[p].hold = 0;
  }
}

function change(p, nl, nr, k) {
  if (t[p].l >= nl && t[p].r <= nr) {
    t[p].hold += k;
    t[p].val += k * (t[p].r - t[p].l + 1);
    return ;
  }
  lazy(p);
  const mid = t[p].l + ((t[p].r - t[p].l) >> 1);
  if (nl <= mid) {
    change(p * 2, nl, nr, k);
  }
  if (nr > mid) {
    change(p * 2 + 1, nl, nr, k);
  }
  t[p].val = t[p * 2].val + t[p * 2 + 1].val;
}

function query(p, nl, nr) {
  if (t[p].l >= nl && t[p].r <= nr) {
    return t[p].val;
  }
  lazy(p);
  let res = 0;
  const mid = t[p].l + ((t[p].r - t[p].l) >> 1);
  if (nl <= mid) {
    res += query(p * 2, nl, nr);
  }
  if (nr > mid) {
    res += query(p * 2 + 1, nl, nr);
  }
  return res;
}
```

## UnionFind
```js
class UnionFind {
  constructor(n) {
    this._count = n;
    this.parent = new Array(n).fill(0).map((_, i) => i);
    this.size = new Array(n).fill(1);
  }
  union(p, q) {
    const { size, parent } = this;
    const rootP = this.find(p);
    const rootQ = this.find(q);
    if (rootP === rootQ) {
      return;
    }
    if (size[rootP] > size[rootQ]) {
      parent[rootQ] = rootP;
      size[rootP] += size[rootQ];
    } else {
      parent[rootP] = rootQ;
      size[rootQ] += size[rootP];
    }
    this._count--;
  }
  find(x) {
    const { parent } = this;
    while (x !== parent[x]) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  connected(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    return rootP === rootQ;
  }
  get count() {
    return this._count;
  }
}
```