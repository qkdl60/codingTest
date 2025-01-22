const [[n, m], current, ...map] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
let [cx, cy, cd] = current;

const d = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

/*
https://www.acmicpc.net/problem/14503

후진 가능 

*/
const visited = Array.from({length: n}, () => Array.from({length: m}, () => false));

const canRear = (cx, cy, cd) => {
  const nd = (cd + 2) % 4;
  const [dx, dy] = d[nd];
  const [nx, ny] = [cx + dx, cy + dy];
  if (nx >= 0 && nx < n && ny >= 0 && ny < m && map[nx][ny] === 0) return true;
  return false;
};

const searchAround = (cx, cy) => {
  let answer = false;
  for (let [dx, dy] of d) {
    const [nx, ny] = [dx + cx, dy + cy];
    if (map[nx][ny] === 0 && !visited[nx][ny]) {
      answer = true;
      break;
    }
  }

  return answer;
};

let count = 0;

while (true) {
  //1. 현재 칸이 더렵다면 청소한다.
  if (!visited[cx][cy]) {
    visited[cx][cy] = true;
    count++;
  } else {
    const isDirty = searchAround(cx, cy);
    if (isDirty) {
      cd = (cd + 3) % 4;
      const [dx, dy] = d[cd];
      const [nx, ny] = [cx + dx, cy + dy];
      if (map[nx][ny] == 0 && !visited[nx][ny]) {
        cx = nx;
        cy = ny;
      }
      continue;
    } else {
      if (canRear(cx, cy, cd)) {
        const rearD = (cd + 2) % 4;
        const [dx, dy] = d[rearD];
        cx = cx + dx;
        cy = cy + dy;
      } else break;
    }
  }
}
console.log(count);
