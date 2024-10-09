const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) =>
    i
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b)
  );

/*
https://www.acmicpc.net/problem/2437

정렬 후 [0]이 1 이 아닐때 최솟값은 1이다. 
*/

let sum = 0;
for (let i of list) {
  if (sum + 1 < i) {
    break;
  } else {
    sum += i;
  }
}
console.log(sum + 1);
