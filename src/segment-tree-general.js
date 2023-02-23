/*
  提示：让线段树索引从 1 开始，0 索引不用
  
  interface Tree {
    val: 0,
    hold: 0
  }
*/
const a = [2, 4, 6, 8, 10, 12];
const n = a.length;


class SegmentTree {
  constructor(nums) {
    this.nums = nums;
    const n = nums.length;
    this.t = new Array(4 * n + 1);
    this.build(1, 1, n);
  }

  build(p, l, r) {
    const { nums, t } = this;
    if (!t[p]) t[p] = { l, r, val: 0, hold: 0 };
    if (l === r) {
      t[p].val = nums[l - 1];
      return;
    }
    const mid = l + ((r - l) >> 1);
    this.build(p * 2, l, mid);
    this.build(p * 2 + 1, mid + 1, r);
    t[p].val = t[p * 2].val + t[p * 2 + 1].val;
  }

  change(p, nl, nr, k) {
    const { t } = this;
    if (t[p].l >= nl && t[p].r <= nr) {
      t[p].hold += k;
      t[p].val += k * (t[p].r - t[p].l + 1);
      return;
    }
    this.lazy(p);
    const mid = t[p].l + ((t[p].r - t[p].l) >> 1);
    if (nl <= mid) {
      this.change(p * 2, nl, nr, k);
    }
    if (nr > mid) {
      this.change(p * 2 + 1, nl, nr, k);
    }
    t[p].val = t[p * 2].val + t[p * 2 + 1].val;
  }

  query(p, nl, nr) {
    const { t } = this;
    if (t[p].l >= nl && t[p].r <= nr) {
      return t[p].val;
    }
    this.lazy(p);
    let res = 0;
    const mid = t[p].l + ((t[p].r - t[p].l) >> 1);
    if (nl <= mid) {
      res += this.query(p * 2, nl, nr);
    }
    if (nr > mid) {
      res += this.query(p * 2 + 1, nl, nr);
    }
    return res;
  }

  lazy(p) {
    const { t } = this;
    if (t[p].hold) {
      t[p * 2].hold = t[p].hold;
      t[p * 2].val += t[p].hold * (t[p * 2].r - t[p * 2].l + 1);
      t[p * 2 + 1].hold = t[p].hold;
      t[p * 2 + 1].val += t[p].hold * (t[p * 2 + 1].r - t[p * 2 + 1].l + 1);
      t[p].hold = 0;
    }
  }
}


const seg = new SegmentTree(a);
seg.build(1, 1, n);
console.log('build: ', seg.t);
console.log('query 1 ~ 5, ', 'should be 30, actually is ', seg.query(1, 1, 5));
console.log('query 1 ~ 6, ', 'should be 42, actually is ', seg.query(1, 1, 6));
seg.change(1, 3, 3, 10);
console.log('query 1 ~ 5, ', 'should be 40, actually is ', seg.query(1, 1, 5));
console.log('query 1 ~ 6, ', 'should be 52, actually is ', seg.query(1, 1, 6));