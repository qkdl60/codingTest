const [[t], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/11066

*/
let answer = [];
for (let i = 0; i < t; i++) {
  const [n] = list.shift();
  const fileList = list.shift();
  //dp[i][j]는 i번째부터 j까지 결과의 최소값이다. 순서는 지켜져야된다.
  const dp = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => (i === j ? 0 : Infinity)));
  const sum = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => (i === j ? fileList[j] : Infinity)));

  for (let dist = 1; dist < n; dist++) {
    for (let i = 0; i < n; i++) {
      const j = i + dist;
      if (j >= n) continue;
      sum[i][j] = sum[i][j - 1] + fileList[j];
      if (dist === 1) {
        dp[i][j] = fileList[i] + fileList[j];
      } else {
        for (let k = i; k < j; k++) {
          const count = dp[i][k] + dp[k + 1][j] + sum[i][j];
          dp[i][j] = Math.min(dp[i][j], count);
        }
      }
    }
  }
  answer.push(dp[0][n - 1]);
}
console.log(answer.join("\n"));
