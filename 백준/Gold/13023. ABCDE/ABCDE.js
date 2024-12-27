const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/13023

각 사람들의 번호는 0 번부터, 

[a, b] => a와 b는 친구이다. 

a와 b는 친구
b와 c는 친구
c와 d는 친구
d와 e는 친구
=> 이게 무슨 관계인데? 5개 사람을 연결할 수 있는?

dfs 깊이가 5개


1 7
7 3
3 4
4 6

*/
const g = Array.from({length: n}, () => new Set());
for (const [a, b] of list) {
  g[a].add(b);
  g[b].add(a);
}

const graph = g.map((set) => [...set]);
const visited = Array.from({length: n}, () => false);
let isPossible = false;

for (let i = 0; i < n; i++) {
  if (isPossible) break;

  visited[i] = true;
  dfs(i, visited, 1);
  visited[i] = false;
}

function dfs(current, visited, count) {
  if (count >= 5 || isPossible) {
    isPossible = true;
    return;
  }
  for (let next of graph[current]) {
    if (visited[next]) continue;
    visited[next] = true;
    dfs(next, visited, count + 1);
    visited[next] = false;
    if (isPossible) {
      return;
    }
  }
}
console.log(isPossible ? 1 : 0);
