const [[n, m], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
const g = Array.from({length: n + 1}, () => []);
const count = Array.from({length: n + 1}, () => 0);

list.forEach(([f, b]) => {
  g[f].push(b);
  count[b]++;
});
count[0] = null;
let q = [];
count.forEach((v, index) => {
  if (v === 0) q.push(index);
});

const result = [];

while (q.length) {
  const replace = [];
  q.forEach((v) => {
    result.push(v);
    count[v] = null;
    for (let a of g[v]) {
      count[a] -= 1;
      if (count[a] === 0) {
        replace.push(a);
      }
    }
  });
  q = replace;
}
console.log(result.join(" "));
/*
https://www.acmicpc.net/problem/2252



*/
