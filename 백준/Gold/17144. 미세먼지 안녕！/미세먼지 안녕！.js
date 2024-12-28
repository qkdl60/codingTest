const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[r, c, t], ...map] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
const aroundList = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
let purifierPoints = null;

const upD = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];
const downD = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const directions = [upD, downD];
/*
https://www.acmicpc.net/problem/17144

공기 청정기 
1번 열에 위치, 크기는 2 행을 차지 

1초 동안 순서
1.미세먼지가 확산, 모든 칸이 동시에 발생
  - r,c에 있는 미세먼지가 이접한 네방향으로 확산 
  - 확산된 양은 Arc/5 이고, 소수점은 버린다. 
  - r,c에 남는 양은 확산된 양을 빼준다.
2. 공기청정기 작동
  - 공청에서 바람이 나오고, 위쪽은 반시계방향으로, 아래쪽은 시계방향으로 순환
  - 미세먼지는 바람 방향대로 1칸씩 이동
  - 공청으로 들어가면 모두 정화
*/

for (let i = 0; i < t; i++) {
  spreadTickle(map);
  windCirculation(map);
}
const total = map.map((row) => row.reduce((acc, cur) => acc + cur, 0)).reduce((acc, cur) => acc + cur, 0);
console.log(total + 2);

function spreadTickle(map) {
  const temp = Array.from({length: r}, () => Array.from({length: c}, () => 0));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const a = map[i][j];
      if (a === 0 || a === -1) continue;

      const tickle = Math.floor(a / 5);
      let totalTickle = 0;
      for (const [ax, ay] of aroundList) {
        const [nx, ny] = [i + ax, j + ay];
        if (nx >= 0 && nx < r && ny >= 0 && ny < c && map[nx][ny] !== -1) {
          temp[nx][ny] += tickle;
          totalTickle += tickle;
        }
      }
      map[i][j] -= totalTickle;
    }
  }
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      map[i][j] += temp[i][j];
    }
  }
}
function windCirculation(map) {
  if (purifierPoints === null) {
    searchPurifier(map);
  }
  const temp = Array.from({length: r}, () => Array.from({length: c}, () => null));
  for (let i = 0; i < 2; i++) {
    let [cx, cy] = purifierPoints[i];
    const [sx, sy] = purifierPoints[i];
    let d = 0;
    let isFirst = true;

    const direction = directions[i];

    while (cx !== sx || cy !== sy || isFirst) {
      let [dx, dy] = direction[d];
      const [nx, ny] = [cx + dx, cy + dy];
      if (nx >= 0 && nx < r && ny >= 0 && ny < c) {
        temp[nx][ny] = map[cx][cy];
        cx = nx;
        cy = ny;
      } else {
        d = d < 3 ? d + 1 : 0;
      }
      isFirst = false;
    }
  }

  const [[upx, upy], [dpx, dpy]] = purifierPoints;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if ((upx == i && upy == j) || (dpx === i && dpy == j)) continue;

      const tempValue = temp[i][j];
      map[i][j] = tempValue === null ? map[i][j] : tempValue == -1 ? 0 : tempValue;
    }
  }
}

function searchPurifier(map) {
  for (let i = 0; i < r; i++) {
    if (purifierPoints !== null) break;
    for (let j = 0; j < c; j++) {
      const p = map[i][j];
      if (p !== -1) continue;
      purifierPoints = [
        [i, j],
        [i + 1, j],
      ];
      break;
    }
  }
}
