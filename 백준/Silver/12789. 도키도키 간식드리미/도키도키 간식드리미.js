const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], line] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/12789

currentOrder 에 인원이 없다면 line검색해서 1번을 찾는다. 나머지는 waiting으로 

currentOrder에 인원이 있다면 각 line의top 검색 없다면, line에 top을 waiting으로 

line의 top이 없고, waiting top이 순서가 아니면 sad 

*/
line.reverse();
const currentOrder = []; //현재 순서 1명이 들어가고 나간다.
const waitingLine = []; //현재 순서가 아닌 인원들 대기석
let flag = true;
while (line.length || waitingLine.length) {
  while (!currentOrder.length) {
    const lineTop = line.pop();
    if (lineTop === 1) {
      currentOrder.push(lineTop);
      break;
    }
    waitingLine.push(lineTop);
  }
  const lineTop = line[line.length - 1];
  const waitingTop = waitingLine[waitingLine.length - 1];
  const current = currentOrder[0];

  if (current + 1 == lineTop) {
    currentOrder.pop();
    currentOrder.push(line.pop());
  } else if (current + 1 == waitingTop) {
    currentOrder.pop();
    currentOrder.push(waitingLine.pop());
  } else if (!lineTop && waitingTop) {
    //실패
    flag = false;
    break;
  } else {
    waitingLine.push(line.pop());
  }
}

console.log(flag ? "Nice" : "Sad");
