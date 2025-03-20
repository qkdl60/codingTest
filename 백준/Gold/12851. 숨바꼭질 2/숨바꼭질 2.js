const [[n, k]] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/12851

x-1; 
x+1; 
2*x; 
*/

const moveList = [(x) => x + 1, (x) => x - 1, (x) => x * 2];
const max = n + k;
const map = Array(100001).fill(Infinity);
let q = [n];
map[n] = 0;
let isPass = true;
let time = 1;
let successCount = null;
if (n === k) {
  isPass = false;
  time = 0;
  successCount = 1;
}

while (q.length && isPass) {
  const replace = [];
  let count = 0;
  q.forEach((current) => {
    moveList.forEach((move) => {
      next = move(current);
      if (map[next] >= time && next >= 0) {
        map[next] = time;
        replace.push(next);
        if (next === k) {
          count++;
          isPass = false;
        }
      }
    });
  });

  if (isPass) {
    q = replace;
    time++;
  } else {
    successCount = count;
    q = [];
  }
}

console.log(`${time}\n${successCount}`);
