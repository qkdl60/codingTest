const [[n], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

//dp[i][j]는 i번 부터 j번째까지 최소
const dp = Array.from({length: n}, () => Array(n).fill(Infinity));

for (let distance = 0; distance < n; distance++) {
  for (let row = 0; row < n; row++) {
    const column = row + distance;
    if (column >= n) continue;
    if (distance === 0) {
      dp[row][column] = 0;
    } else if (distance === 1) {
      dp[row][column] = list[row][0] * list[row][1] * list[column][1];
    } else {
      for (let k = row; k < column; k++) {
        const count = dp[row][k] + dp[k + 1][column] + list[row][0] * list[k][1] * list[column][1];
        dp[row][column] = Math.min(dp[row][column], count);
      }
    }
  }
}
console.log(dp[0][n - 1]);
/*
https://www.acmicpc.net/problem/11049
https://e-juhee.tistory.com/entry/python-%EB%B0%B1%EC%A4%80-11049-%ED%96%89%EB%A0%AC-%EA%B3%B1%EC%85%88-%EC%88%9C%EC%84%9C-DP
계속 가장 작은 것만 계산해나가면 된단

*/
