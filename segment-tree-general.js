/*
  提示：让线段树索引从 1 开始，0 索引不用
  
  interface Tree {
    val: 0,
    hold: 0
  }
*/

const nums = [1, 2, 3, 4, 5, 6];
const n = nums.length;
nums.unshift(-1); // 0 索引不用，对于 nums 来说，建树范围是闭区间 [1, 6]
const t = new Array(n); // 线段树

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

build(1, 1, n);

// 查询区间 [1, 5] 的和
console.log(query(1, 1, 5)); // 1 + 2 + 3 + 4 + 5 = 15

// 修改区间 [2, 3] 每个值 +2
change(1, 2, 3, 2);

// 查询区间 [1, 5] 的和
console.log(query(1, 1, 5)); // 1 + 4 + 5 + 4 + 5 = 19