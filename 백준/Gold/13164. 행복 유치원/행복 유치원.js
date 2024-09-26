const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], position] = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
 각 조의 인원은 최소가 돼야 한다.
 최소가 1명이면 비용이 0 원이다. 

 1 3 
 5 6 
 10 
  */

const diff = position
  .reduce((acc, cur, idx, array) => {
    const pre = array[idx - 1];
    if (!pre) return acc;
    acc.push(cur - pre);
    return acc;
  }, [])
  .sort((a, b) => a - b);
console.log(diff.slice(0, n - m).reduce((acc, cur) => acc + cur, 0));
