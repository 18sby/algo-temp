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