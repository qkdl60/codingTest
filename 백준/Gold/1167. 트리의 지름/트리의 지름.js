let [[v], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/1167

1개만 연결된

// */

const graph = Array.from({length: v + 1}, () => []);
let start = null;
list.forEach((l) => {
  const [n, ...rest] = l;
  rest.pop();
  while (rest.length) {
    const dist = rest.pop();
    const to = rest.pop();
    start = to;
    graph[n].push([to, dist]);
  }
});

function dfs(start, weightList, visited) {
  const nextList = graph[start];
  const prevWeight = weightList[start];
  nextList.forEach(([to, dist]) => {
    if (!visited[to]) {
      visited[to] = true;
      weightList[to] = prevWeight + dist;
      dfs(to, weightList, visited);
    }
  });
}
let visited = Array.from({length: v + 1}, () => false);
let weightList = Array.from({length: v + 1}, () => 0);
visited[start] = true;
dfs(start, weightList, visited);
const farNode = weightList.reduce((acc, cur, index) => {
  return cur > weightList[acc] ? index : acc;
}, 0);
weightList.fill(0);
visited.fill(false);
visited[farNode] = true;
dfs(farNode, weightList, visited);
const dia = weightList.reduce((acc, cur) => (acc < cur ? cur : acc), 0);
console.log(dia);
