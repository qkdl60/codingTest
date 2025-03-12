const [[n], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/11725

부모 노드란? 
현재 노드 기준으로 부모와 지식을 어떻게 구별하지? 
*/

const graph = Array.from({length: n + 1}, () => []);
list.forEach((v) => {
  const [p1, p2] = v;
  graph[p1].push(p2);
  graph[p2].push(p1);
});
const visited = Array.from({length: n + 1}, () => false);

const parentList = [null, null];
let current = [1];
visited[1] = true;
while (current.length) {
  const replace = [];
  current.forEach((parent) => {
    const children = graph[parent];
    children.forEach((child) => {
      if (!visited[child]) {
        visited[child] = true;
        parentList[child] = parent;
        replace.push(child);
      }
    });
  });
  current = replace;
}
parentList.shift();
parentList.shift();
console.log(parentList.join("\n"));
