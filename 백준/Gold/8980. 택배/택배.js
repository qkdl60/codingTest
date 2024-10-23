const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, c], [m], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

list.sort((a, b) => {
  if (a[1] !== b[1]) return a[1] - b[1];
  else if (a[0] !== b[0]) return a[0] - b[0];
  else return b[2] - a[2];
});
let sum = 0;
let capacity = Array.from({length: n + 1}, () => c);

for (let [s, e, cap] of list) {
  const part = capacity.slice(s, e);
  const min = Math.min(...part, cap);
  if (min !== 0) {
    for (let i = s; i < e; i++) {
      capacity[i] -= min;
    }
    sum += min;
  }
}
console.log(sum);

/*
https://www.acmicpc.net/problem/8980

트럭에는용량이 있다 
다시 돌아가지 않는다. 
부분으로 넣을 수 있다 

왜 빨리 내리는게 최선인가?

트럭 한 대로 배송할 수 있는 최대 박스 

받는 망르 번호는 보내는 망르 번호보다 항상 크다 

마을에서 넣을지 말지, 넣는다면 얼마나 넣을지 

m은 1<= m <=10,000

30
1 2 10
2 3 30

1 4 30
*/
