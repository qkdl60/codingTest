const [[k], [w, h], ...map] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1600

원숭이는 k번만 말의 움직임으로, 인접한 곳만 이동 가능 

map 왼쪽 위에서 시작해서 오른쪽 아래로 가야한다. 
0 은 평지 , 1은 장애물 

뛰기, 움직이는 것 모두 1번 

최소 이동 

BFS?
이동 회수를 기준으로 한다면 앞에서만 점프를 한 것만 가능 , 
 

*/

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const horseMove = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [2, -1],
  [2, 1],
  [1, -2],
  [1, 2],
];

let answer = -1;
const visited = Array.from({length: h}, () => Array.from({length: w}, () => Array.from({length: k + 1}, () => false)));
//[x,y,점프회수];
let q = [[0, 0, 0, 0]];
let flag = false;
while (q.length) {
  const replace = [];
  for (let [cx, cy, ck, count] of q) {
    if (cx == h - 1 && cy == w - 1) {
      answer = count;
      flag = true;
      q = [];
      break;
    }

    for (let [dx, dy] of move) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (nx >= 0 && nx < h && ny >= 0 && ny < w && map[nx][ny] === 0 && !visited[nx][ny][ck]) {
        visited[nx][ny][ck] = true;
        replace.push([nx, ny, ck, count + 1]);
      }
    }
    if (ck >= k) continue;

    for (let [dx, dy] of horseMove) {
      const [nx, ny, nk] = [cx + dx, cy + dy, ck + 1];
      if (nx >= 0 && nx < h && ny >= 0 && ny < w && map[nx][ny] === 0 && !visited[nx][ny][nk]) {
        visited[nx][ny][nk] = true;
        replace.push([nx, ny, nk, count + 1]);
      }
    }
  }
  if (!flag) q = replace;
}
console.log(answer);
