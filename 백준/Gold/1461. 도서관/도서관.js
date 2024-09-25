const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], position] = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

const minus = [];
const plus = [];

position.forEach((i) => {
  if (i > 0) plus.push(i);
  else minus.push(i);
});

minus.sort((a, b) => b - a);
plus.sort((a, b) => a - b);

const minMax = minus[minus.length - 1] || 0;
const plusMax = plus[plus.length - 1] || 0;

let answer = 0;
if (Math.abs(minMax) > plusMax) {
  answer += minMax * -1;
  repeat(minus, m);
} else {
  answer += plusMax;
  repeat(plus, m);
}
while (minus.length) {
  const a = minus[minus.length - 1];
  answer += a * 2 * -1;
  repeat(minus, m);
}
while (plus.length) {
  const a = plus[plus.length - 1];
  answer += a * 2;
  repeat(plus, m);
}
console.log(answer);

function repeat(targetArray, count) {
  for (let i = 0; i < count; i++) {
    targetArray.pop();
  }
}
