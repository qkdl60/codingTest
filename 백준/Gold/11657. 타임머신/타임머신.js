let [[n, m], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/11657

*/

const dist = Array(n + 1).fill(Infinity);
dist[1] = 0;
for (let i = 1; i < n; i++) {
  list.forEach((edge) => {
    const [s, e, w] = edge;
    dist[e] = Math.min(dist[s] + w, dist[e]);
  });
}

let isPass = true;
//사이클 검사
for (const [s, e, w] of list) {
  if (dist[s] + w < dist[e]) {
    isPass = false;
    break;
  }
}

const distList = dist.slice(2).map((a) => (a === Infinity ? -1 : a));
const answer = isPass ? distList.join("\n") : -1;
console.log(answer);
