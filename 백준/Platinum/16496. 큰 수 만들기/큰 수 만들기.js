const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" "));

list.sort((a, b) => {
  const c1 = a + b;
  const c2 = b + a;
  if (c1 >= c2) return -1;
  return 1;
});

/*
https://www.acmicpc.net/problem/16496



0으로 시작하면 안된다

가장 큰 수 => 


  */
const result = list.reduce((acc, cur) => acc + cur, "");
if (Number(result) === 0) console.log(0);
else console.log(result);
