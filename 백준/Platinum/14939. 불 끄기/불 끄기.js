const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const line = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) =>
    l.split("").map((v) => {
      if (v === "O") return true;
      return false;
    })
  );

/*
https://www.acmicpc.net/problem/14939

두번째 줄부터 윗 칸의 0,1여부에 따라서 작동
마
마지막 줄에 대한 처리를 해준다 
마지막 줄에 대해서는 컨트롤x
첫 번째 줄에 대해서만 해준다 .
*/

const around = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [0, 0],
  [1, 0],
];
const yLimit = line[0].length;
const xLimit = line.length;
let count = Number.MAX_SAFE_INTEGER;
//첫번째 줄 조합
const indexAr = Array.from({length: 10}, (_, index) => index);

for (let i = 0; i <= 10; i++) {
  const combiList = getCombinations(indexAr, i);

  if (i === 0) {
    const tLine = copyLine(line);
    let tCount = i;
    tCount += traversal(tLine);
    const isOff = getLineState(tLine[tLine.length - 1]);
    if (isOff && count > tCount) {
      count = tCount;
    }
  }
  for (const combi of combiList) {
    const tLine = copyLine(line);
    let tCount = i;
    for (let a of combi) {
      toggle(0, a, tLine);
    }

    tCount += traversal(tLine);
    const isOff = getLineState(tLine[tLine.length - 1]);
    if (isOff && count > tCount) {
      count = tCount;
    }
  }
}
console.log(count === Number.MAX_SAFE_INTEGER ? -1 : count);

//한줄 위에 를 기준으로

//윗줄을 기준으로 불끄기
function traversal(line) {
  let tCount = 0;
  for (let i = 0; i < line.length - 1; i++) {
    const row = line[i];
    for (let j = 0; j < row.length; j++) {
      const t = row[j];
      if (t) {
        toggle(i + 1, j, line);
        tCount += 1;
      }
    }
  }
  return tCount;
}

function toggle(x, y, line) {
  around.forEach(([ax, ay], i) => {
    const [tx, ty] = [x + ax, y + ay];
    if (tx >= 0 && tx < xLimit && ty >= 0 && ty < yLimit) {
      line[tx][ty] = !line[tx][ty];
    }
  });
}

function getLineState(line) {
  return line.every((i) => !i);
}

function getCombinations(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);
  // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    // 해당하는 fixed를 제외한 나머지 뒤
    const combinations = getCombinations(rest, selectNumber - 1);
    // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map((el) => [fixed, ...el]);
    //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached);
    // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
}
function copyLine(array) {
  const result = [];
  array.forEach((ar) => {
    const newLine = [...ar];
    result.push(newLine);
  });

  return result;
}
