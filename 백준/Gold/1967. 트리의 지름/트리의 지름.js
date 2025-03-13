const [[n], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/1967

출발점은 leaf만 하면된다. 
*/

const graph = Array.from({length: n + 1}, () => []);

list.forEach((node) => {
  const [p, c, v] = node;
  graph[p].push([c, v]);
  graph[c].push([p, v]);
});
const visited = Array(n + 1).fill(false);
const valueList = Array(n + 1).fill(0);
visited[1] = true;
dfs(1, 0, visited, valueList);
const maxLeaf = valueList.reduce((acc, cur, index) => {
  return cur > valueList[acc] ? index : acc;
}, 0);
visited.fill(false);
valueList.fill(0);
visited[maxLeaf] = true;
dfs(maxLeaf, 0, visited, valueList);
let answer = valueList.reduce((acc, cur) => {
  return cur > acc ? cur : acc;
}, Number.MIN_SAFE_INTEGER);
console.log(answer);

function dfs(point, value, visited, valueList) {
  const nextNodeList = graph[point];
  nextNodeList.forEach((nextNode) => {
    const [nextPoint, nextValue] = nextNode;
    if (!visited[nextPoint]) {
      visited[nextPoint] = true;
      const currentValue = valueList[nextPoint];
      valueList[nextPoint] = Math.max(currentValue, value + nextValue);
      dfs(nextPoint, value + nextValue, visited, valueList);
    }
  });
}
