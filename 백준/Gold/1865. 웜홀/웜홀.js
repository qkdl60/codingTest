let [[t], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/1865

*/
const answer = [];
for (let i = 0; i < t; i++) {
  const [n, m, w] = list.shift();
  const roadList = list.slice(0, m);
  const wormHoleList = list.slice(m, m + w);
  list = list.slice(m + w);
  const edgeList = [];
  roadList.forEach(([s, e, w]) => {
    edgeList.push([s, e, w]);
    edgeList.push([e, s, w]);
  });
  wormHoleList.forEach(([s, e, w]) => {
    edgeList.push([s, e, w * -1]);
  });
  const dist = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    edgeList.forEach(([s, e, w]) => {
      dist[e] = Math.min(dist[s] + w, dist[e]);
    });
  }

  let result = "NO";
  for (const [s, e, w] of edgeList) {
    if (dist[s] + w < dist[e]) {
      result = "YES";
      break;
    }
  }
  answer.push(result);
}

console.log(answer.join("\n"));
