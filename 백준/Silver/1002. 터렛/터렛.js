const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1002
2초 

r 위치의 좌표를모두 구하고 공통된걸 구해서 카운팅 => 너무 계산이 복잡해진다. 
예상 위치는 각 좌표를 기준으로 r 만큼의 원형이다. 
두 원형이 접하는 경우는 0개, 1개,2개 

좌표는 -도 있다. 
*/
const answers = [];
for (const t of list) {
  const [x1, y1, r1, x2, y2, r2] = t;

  const dx = Math.abs(x1 - x2) ** 2;
  const dy = Math.abs(y1 - y2) ** 2;
  const d = Math.sqrt(dx + dy);

  const rSum = r1 + r2;
  const rDiff = Math.abs(r1 - r2);

  if (x1 == x2 && y1 == y2 && r1 == r2) answers.push(-1);
  else if (d < rSum && d > rDiff) answers.push(2);
  else if (rSum === d || rDiff === d) answers.push(1);
  else answers.push(0);
}

console.log(answers.join("\n"));
