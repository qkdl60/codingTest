const [a, b, c] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);
/*
https://www.acmicpc.net/problem/1629

*/

const calc = (b) => {
  if (b === 1n) return a % c;
  const half = calc(b / 2n) % c;
  if (b % 2n) {
    return (half * half * (a % c)) % c;
  }
  return (half * half) % c;
};
const answer = calc(b);
console.log(Number(answer));
