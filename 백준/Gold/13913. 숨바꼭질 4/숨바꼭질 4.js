const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

const [[n, k]] = input;
const dp = [];

/*
https://www.acmicpc.net/problem/13913

1초 후, -1, +1로 이동,
순간이동은 1초 후, 2*x

가장 빠르게 찾는 경우, 이동 경로 
*/

let q = [n];
const visited = [];
visited[n] = [0, `${n}`];
let flag = false;
while (q.length) {
  const replace = [];
  for (const p of q) {
    const [count, path] = visited[p];
    if (p === k) {
      flag = true;
      break;
    }
    for (let next of [p - 1, p + 1, p * 2]) {
      if (next >= 0 && next <= 100000 && !visited[next]) {
        visited[next] = [count + 1, `${path} ${next}`];
        replace.push(next);
      }
    }
  }
  q = flag ? [] : replace;
}

console.log(visited[k].join("\n"));
