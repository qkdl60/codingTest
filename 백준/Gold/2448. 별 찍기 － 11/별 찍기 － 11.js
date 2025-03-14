const [[n]] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/2448

n은 높이
*/

const getTriangle = (triangle) => {
  const h = triangle.length;
  const bottom = [];
  for (let i = 0; i < h; i++) {
    const gap = triangle[h - i - 1].length;
    const point = triangle[i];
    const sum = point + " ".repeat(gap) + point;
    bottom.push(sum);
  }
  return [...triangle, ...bottom];
};

const fillSpace = (triangle) => {
  const bottomLength = triangle[triangle.length - 1].length;
  const filled = triangle.map((point) => {
    const pointLength = point.length;
    const gap = bottomLength - pointLength;
    const spaceCount = gap / 2;
    const space = " ".repeat(spaceCount);
    return space + point + space;
  });
  return filled;
};

let triangle = [`*`, `* *`, `*****`];
let m = 3;
while (m < n) {
  triangle = getTriangle(triangle);
  m = m * 2;
}
triangle = fillSpace(triangle);
console.log(triangle.join("\n"));
