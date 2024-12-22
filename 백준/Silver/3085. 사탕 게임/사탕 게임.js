const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[N], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(""));

/*
https://www.acmicpc.net/problem/3085
사탕의 색이 다른 인접한 두 칸을 고른다. 
서로 교환, 모두 같은 색으로 이루어져 있는 가장 긴 연속적인 부부을 고르고 다 먹는다.

사탕이 채워진 상태가 주어졌을 때, 상근이가 먹을 수 있는 최대 사탕 개수

1. 모든 행렬 검사 
*/

let max = 0;

max = inspectList(list);
const n = list.length;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (j + 1 < n && list[i][j] != list[i][j + 1]) {
      [list[i][j], list[i][j + 1]] = [list[i][j + 1], list[i][j]];
      const count = inspectList(list);
      [list[i][j], list[i][j + 1]] = [list[i][j + 1], list[i][j]];
      max = Math.max(count, max);
    }
    if (i + 1 < n && list[i][j] != list[i + 1][j]) {
      [list[i][j], list[i + 1][j]] = [list[i + 1][j], list[i][j]];
      const count = inspectList(list);
      [list[i][j], list[i + 1][j]] = [list[i + 1][j], list[i][j]];
      max = Math.max(count, max);
    }
  }
}

console.log(max);
function inspectList(tList) {
  const l = tList.length;
  let max = 0;
  for (let i = 0; i < l; i++) {
    const str = tList[i].join("");
    const count = getSameCharCount(str);
    let rowStr = "";
    for (let j = 0; j < l; j++) {
      const char = tList[j][i];
      rowStr += char;
    }
    const rowCount = getSameCharCount(rowStr);
    max = Math.max(rowCount, count, max);
  }

  return max;
}

function getSameCharCount(str) {
  let max = 0;
  let prev = "";
  let count = 1;
  for (let i = 1; i < str.length; i++) {
    prev = str[i - 1];
    const current = str[i];
    if (prev === current) {
      count += 1;
      max = Math.max(max, count);
    } else {
      count = 1;
    }
  }

  return max;
}
