let [[n, m, k]] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

const d = [
  [1, 0],
  [0, 1],
];

/*
https://www.acmicpc.net/problem/10164

o표시가 있다면 


*/
const dp = Array.from({length: n}, () => Array.from({length: m}, () => 0));
dp[0][0] = 1;
const start = [0, 0];
const end = [n - 1, m - 1];
if (k === 0) {
  const answer = getRouteCount(start, end, dp);
  console.log(answer);
} else {
  const x = Math.floor((k - 1) / m);
  const y = (k - 1) % m;
  const e1 = [x, y];

  getRouteCount(start, e1, dp);
  const answer = getRouteCount(e1, end, dp);
  console.log(answer);
}

function getRouteCount(start, end, dp) {
  const [sx, sy] = start;
  const [ex, ey] = end;
  for (let i = sx; i <= ex; i++) {
    dp[i][sy] = dp[sx][sy];
  }
  for (let i = sy; i <= ey; i++) {
    dp[sx][i] = dp[sx][sy];
  }
  for (let i = sx + 1; i <= ex; i++) {
    for (let j = sy + 1; j <= ey; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[ex][ey];
}
