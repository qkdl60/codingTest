let [[n, m, k]] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

const d = [
  [1, 0],
  [0, 1],
];

/*
https://www.acmicpc.net/problem/10164

o표시가 있다면 


*/
const end = [n - 1, m - 1];
const start = [0, 0];
if (k === 0) {
  const count = getRouteCount(start, end);
  console.log(count);
} else {
  const x = Math.floor(k / m);
  const y = k % m;
  const e1 = [x, y === 0 ? k - 1 : y - 1];
  const c1 = getRouteCount(start, e1);
  const c2 = getRouteCount(e1, end);

  console.log(c1 * c2);
}

function getRouteCount(start, end) {
  let count = 0;
  let q = [start];
  const [sx, sy] = start;
  const [ex, ey] = end;
  while (q.length) {
    const replace = [];
    for (let [cx, cy] of q) {
      if (cx === ex && cy === ey) {
        count++;
        continue;
      }
      for (const [dx, dy] of d) {
        const [nx, ny] = [dx + cx, dy + cy];
        if (nx <= ex && ny <= ey) {
          replace.push([nx, ny]);
        }
      }
    }
    q = replace;
  }

  return count;
}
