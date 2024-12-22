const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1890

반드시 오른쪽, 아래쪽으로만 이동
이동할 수 있는 경로의 개수 

*/
const dp = Array.from({length: n}, () => Array.from({length: n}, () => BigInt(0)));
dp[0][0] = 1;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (dp[i][j] === 0) continue;
    const moveCount = list[i][j];
    if (moveCount === 0) continue;
    const [nx, ny] = [i + moveCount, j + moveCount];

    if (nx < n) dp[nx][j] += BigInt(dp[i][j]);
    if (ny < n) dp[i][ny] += BigInt(dp[i][j]);
  }
}

console.log(dp[n - 1][n - 1].toString());
