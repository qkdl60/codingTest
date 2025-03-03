const [[n], ...list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
 최대 수익을 구하시오 

*/

const dp = Array.from({length: n + 1}, () => 0);
let max = 0;
list.forEach((c, index) => {
  const [d, p] = c;
  max = Math.max(max, dp[index]);
  if (index + d <= n) dp[index + d] = Math.max(dp[index + d], max + p);
});

console.log(Math.max(...dp));
