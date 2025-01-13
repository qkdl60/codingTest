const [[n], ...map] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
const d = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

/*
https://www.acmicpc.net/problem/16236
물고기 m마리, 상어 1마리, 한 칸에 최대 물고기 1마리 

처음 아기 상어의 크기는 2, 1초 후 상하좌우 1칸씩 이동

아기 상어는 자신보다 큰 물고기는 지나 갈 수 없다. 자신보다 작은 물고기를 먹을 수 있다. 

- 더 이상 먹을 수 있는 물고기가 없다면 끝
- 먹울 수 있는 물고기가 1마리 이면 그쪽으로, 여러 마리라면 가장 가까운 
- 거리는 지나야하는 칸의 최솟 값 
- 거리가 같다면 가장위, 가장 왼쪽 기준으 한다.
- 이동은 1초, 먹는데는 시간 x
- 현재 크기만큼 물고기를 먹어야 크기가 커진다. 몇 초 동안 먹을 수 있는지 

0 빈칸, 9 상어 

탐색을 BFS로 진행 

*/

let currentPoint = null;
let currentSize = 2;
let currentCount = 0;
let time = 0;
for (let i = 0; i < n; i++) {
  let flag = false;
  for (let j = 0; j < n; j++) {
    const a = map[i][j];
    if (a === 9) {
      currentPoint = [i, j];
      flag = true;
      break;
    }
  }
  if (flag) break;
}
const [cx, cy] = currentPoint;

map[cx][cy] = 0;
while (currentPoint) {
  const [next, count] = searching(currentPoint, currentSize);
  if (next) {
    time += count;
    currentCount++;
    const [nx, ny] = next;
    map[nx][ny] = 0;
    if (currentCount === currentSize) {
      currentSize++;
      currentCount = 0;
    }
  }
  currentPoint = next;
}
console.log(time);

function searching(currentPoint, currentSize) {
  let q = [currentPoint];
  const [x, y] = currentPoint;
  const visited = Array.from({length: n}, () => Array.from({length: n}, () => false));
  visited[x][y] = true;

  let count = 0;
  let answer = null;
  while (q.length) {
    const replace = [];
    for (const [cx, cy] of q) {
      if (map[cx][cy] !== 0 && map[cx][cy] < currentSize) {
        answer = [cx, cy];
        break;
      }
      for (const [dx, dy] of d) {
        const [nx, ny] = [cx + dx, cy + dy];
        if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny] && map[nx][ny] <= currentSize) {
          visited[nx][ny] = true;
          replace.push([nx, ny]);
        }
      }
    }
    if (!answer && replace.length) {
      count++;
      replace.sort(([ax, ay], [bx, by]) => {
        if (ax === bx) return ay - by;
        return ax - bx;
      });
      q = replace;
    } else break;
  }
  return [answer, count];
}

