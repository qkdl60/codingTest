let [[n], ...line] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/2056
*/
const graph = Array.from({length: n + 1}, () => []);
const dp = Array.from({length: n + 1}, () => 0);
for (let i = 0; i < n; i++) {
  const [time, k, ...numbers] = line[i];
  dp[i + 1] = time;
  graph[i + 1].push(...numbers);
}

for (let i = 2; i <= n; i++) {
  let max = 0;
  for (let a of graph[i]) {
    max = Math.max(max, dp[a]);
  }
  dp[i] = dp[i] + max;
}

console.log(Math.max(...dp));
