const [[n], [...list]] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/11054

왼쪽 시작 증가 수열 , 오른쪽 시작 감소 수열 ;

*/
const dp1 = Array(n).fill(1);
const dp2 = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  const next = list[i];

  for (let j = 0; j < i; j++) {
    const prev = list[j];
    if (next > prev) {
      dp1[i] = Math.max(dp1[i], dp1[j] + 1);
    }
  }
}
for (let i = n - 1; i >= 0; i--) {
  const next = list[i];
  for (let j = n - 1; j > i; j--) {
    const prev = list[j];
    if (next > prev) {
      dp2[i] = Math.max(dp2[i], dp2[j] + 1);
    }
  }
}

let answer = Number.MIN_SAFE_INTEGER;
for (let i = 0; i < n; i++) {
  answer = Math.max(answer, dp1[i] + dp2[i] - 1);
}

console.log(answer);
