const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1021
2초 


*/
const deQue = Array.from({length: n}, (_, index) => n - index);
let count = 0;

for (const t of list) {
  const top = deQue[deQue.length - 1];
  if (t == top) {
    deQue.pop();
    continue;
  }

  const currentLength = deQue.length;
  const fromStartIndex = deQue.findIndex((v) => v == t) + 1;
  const fromLastIndex = currentLength - fromStartIndex;

  if (fromStartIndex >= fromLastIndex) {
    popAndUnShift(deQue, fromLastIndex);
    count += fromLastIndex;
  } else {
    shiftAndPush(deQue, fromStartIndex);
    count += fromStartIndex;
  }

  deQue.pop();
}
console.log(count);

function popAndUnShift(array, count) {
  for (let i = 0; i < count; i++) {
    array.unshift(array.pop());
  }
}

function shiftAndPush(array, count) {
  for (let i = 0; i < count; i++) {
    array.push(array.shift());
  }
}
