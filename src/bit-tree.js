class BitTree {
  constructor(n) {
    this.bit = new Array(n + 1).fill(0);
  }
  add(i, val) {
    i += 1; // 向右偏移 1，0 索引不用
    const { bit } = this;
    while (i < bit.length) {
      bit[i] += val;
      i += this.lowbit(i);
    }
  }
  query(i) {
    i += 1; // 向右偏移 1，0 索引不用
    const { bit } = this;
    let res = 0;
    while (i > 0) {
      res += bit[i];
      i -= this.lowbit(i);
    }
    return res;
  }
  lowbit(x) {
    return x & (-x);
  }
}