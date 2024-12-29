const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], ...map] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
const tets = [
  //1
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  //2

  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  //3
  // 0
  // 0
  // 0 0
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],

  //  0
  //  0
  //0 0
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, -1],
  ],

  // 0 0 0
  //     0
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
  ],

  // 0 0 0
  // 0
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
  ],

  // 0
  // 0 0 0
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ],

  //     0
  // 0 0 0
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [1, -2],
  ],

  // 0 0
  // 0
  // 0
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
  ],

  // 0 0
  //   0
  //   0
  [
    [0, 0],
    [0, -1],
    [1, 0],
    [2, 0],
  ],
  //4
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [-1, 1],
    [-1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [2, -1],
  ],
  //5
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [-1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, -1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ],
];
/*
https://www.acmicpc.net/problem/14500


*/
let max = Number.MIN_SAFE_INTEGER;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    for (const a of tets) {
      let sum = 0;
      let isOk = true;
      for (let [x, y] of a) {
        const [cx, cy] = [x + i, y + j];
        if (cx < 0 || cx >= n || cy < 0 || cy >= m) {
          isOk = false;
          break;
        }
        sum += map[cx][cy];
      }
      if (isOk) {
        max = Math.max(max, sum);
      }
    }
  }
}
console.log(max);
