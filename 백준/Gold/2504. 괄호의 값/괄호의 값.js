const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0].split("");

/*
https://www.acmicpc.net/problem/2504

반드시 오른쪽, 아래쪽으로만 이동
이동할 수 있는 경로의 개수 
(()[[]])([])


*/

const stack = [];
let isWrong = false;
for (let a of input) {
  if (a == "(" || a == "[") {
    stack.push(a);
  } else if (a == ")") {
    let sum = 0;
    if (stack.length === 0) {
      isWrong = true;
      break;
    }
    while (stack.length) {
      const top = stack.pop();
      if (top == "(") {
        stack.push(sum > 0 ? sum * 2 : 2);
        sum = 0;
        break;
      } else if (typeof top === "number") {
        sum += top;
      } else {
        isWrong = true;
        break;
      }
    }
    if (sum > 0) {
      isWrong = true;
      break;
    }
  } else if (a == "]") {
    let sum = 0;
    if (stack.length === 0) {
      isWrong = true;
      break;
    }
    while (stack.length) {
      const top = stack.pop();
      if (top == "[") {
        stack.push(sum > 0 ? sum * 3 : 3);
        sum = 0;
        break;
      } else if (typeof top === "number") {
        sum += top;
      } else {
        isWrong = true;
        break;
      }
    }

    if (sum > 0) {
      isWrong = true;
      break;
    }
  }
  if (isWrong) break;
}

if (isWrong || stack.some((v) => typeof v !== "number")) {
  console.log(0);
} else {
  console.log(stack.reduce((acc, cur) => acc + cur, 0));
}
