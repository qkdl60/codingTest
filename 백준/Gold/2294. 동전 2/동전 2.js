const [N, ...L] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const [n, k] = N.split(" ").map(Number);
const list = L.map(Number).sort();
const dp = Array.from({length: k + 1}, () => Infinity);
dp[0] = 0;
for (let i = 0; i < n; i++) {
  const a = list[i];

  for (let j = a; j < k + 1; j++) {
    dp[j] = Math.min(dp[j], dp[j - a] + 1);
  }
}
console.log(dp[k] === Infinity ? -1 : dp[k]);

/*
https://www.acmicpc.net/problem/2294

동전 최소 사용, k원으로 만들고 싶다. 
*/
