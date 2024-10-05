const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));
list.sort((a, b) => {
  return b[1] - a[1];
});
const day = [];
/*
[d, score]일때 
score 내림차순으로 정렬
d 부터 0까지 순회하면 남은 자리에 insert;
  */

list.forEach(([d, score]) => {
  for (let i = d; i > 0; i--) {
    if (!day[i]) {
      day[i] = score;
      break;
    }
  }
});

console.log(
  day.reduce((acc, cur) => {
    return cur ? acc + cur : acc;
  }, 0)
);
