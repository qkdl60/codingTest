const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], [k], p] = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

p.sort((a, b) => a - b);

/*
  고속도로에 n개의 센서가 있고 , 
  집중국은 최대 k 개 세울 수 있다. 
  각 집중국의 수신 가능 영역의 길이의 합을 최소화 


  수신 가능영역의 길이는 0 이상, 모든 센서의 좌표가 다를 필요가 
  없다. 
  
  1c10021c1
  020000030

  최대 k 개의 묶음으로 만들고, 각 묶음 크기가 최소 

  1개 =>p[p.length-1] - p[0];

  2개 중간에 빈곳이 있다면 제거 가능 

  간격 개수가 m이면  m+1=n, 
  k개로 묶는다면 k-1개의 간격 필요 

  센서가 1개이면 max = 0 ;
  */

let max = p[p.length - 1] - p[0];
const emptyDist = [];
for (let i = 0; i < p.length - 1; i++) {
  const current = p[i];
  const next = p[i + 1];
  const dist = next - current;
  if (!isNaN(dist)) emptyDist.push(dist);
}

emptyDist.sort((a, b) => b - a);

let empty = 0;
for (let i = k - 1; i < n - 1; i++) {
  empty += emptyDist[i];
}
console.log(empty);
