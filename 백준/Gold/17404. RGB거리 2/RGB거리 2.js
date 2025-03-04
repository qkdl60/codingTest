const [[n], ...cost] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/17404



dp[i][j]= dp[i-1][j-1]+cost[i][j], dp[i-1][j+1]+cost[i][j]

첫번째 R 
*/
let min = Infinity;
for (let start = 0; start < 3; start++) {
  const dp = Array.from({length: n}, () => Array.from({length: 3}, () => 0));

  dp[0][0] = start === 0 ? cost[0][0] : Infinity;
  dp[0][1] = start === 1 ? cost[0][1] : Infinity;
  dp[0][2] = start === 2 ? cost[0][2] : Infinity;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      const prevIndex = (j + 2) % 3;
      const nextIndex = (j + 1) % 3;

      dp[i][j] = Math.min(dp[i - 1][prevIndex] + cost[i][j], dp[i - 1][nextIndex] + cost[i][j]);
    }
  }
  const prevIndex = (start + 2) % 3;
  const nextIndex = (start + 1) % 3;
  min = Math.min(min, dp[n - 1][prevIndex], dp[n - 1][nextIndex]);
}

console.log(min);
