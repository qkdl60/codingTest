const [T, ...L] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const t = Number(T);
let answer = "";
for (let i = 0; i < T; i++) {
  const n = Number(L.shift());
  const list = L.shift().split(" ").map(Number);
  const k = Number(L.shift());

  const dp = Array.from({length: k + 1}, () => 0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    const a = list[i];
    for (let j = a; j < k + 1; j++) {
      dp[j] = dp[j] + dp[j - a];
    }
  }
  answer += `${dp[k]}\n`;
}
console.log(answer);
/*
https://www.acmicpc.net/problem/9084


1  1 1 1 1 1 1
2  1 2 2 3 3  
*/
