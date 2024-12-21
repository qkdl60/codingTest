const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m, c], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1260

*/

let g = Array.from({length: n + 1}, () => []);

for (const [f, t] of list) {
  g[f].push(t);
  g[t].push(f);
}
g = g.map((l) => l.sort((a, b) => a - b));


const visited = Array.from({length: n + 1}, () => false);
visited[c] = true;
const dList = [c];
DFS(c, [...visited], dList);

const bList = [c];
BFS(c, [...visited], bList);

console.log([dList, bList].map((arr) => arr.join(" ")).join("\n"));

function DFS(t, visited, ar) {
  const l = g[t];
  for (const a of l) {
    if (!visited[a]) {
      visited[a] = true;
      ar.push(a);
      DFS(a, visited, ar);
    }
  }
}

function BFS(t, visited, ar) {
  let q = [t];
  while (q.length) {
    const replace = [];
    for (const a of q) {
      const l = g[a];
      for (let b of l) {
        if (!visited[b]) {
          visited[b] = true;
          replace.push(b);
          ar.push(b);
        }
      }
    }
    q = replace;
  }
}
