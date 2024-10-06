const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [n, ...list] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
/*
0->6
1->2
2->5
3->5
4->4
5->5
6->6
7->3
8->7
9->6

1,2,6,8,20

자리수 확보를 위해서 1로 나머지 앞자리 7

이중 dp
[앞에 0이 아닌 가장 작은 값, 앞에 0도 가능한 가장 작은 값]
개수
2    ->    1,1
3    ->    7
4    ->    4
5    ->    2
6    ->    6,0 
7    ->    8
8    ->    16, 01
9    ->    18, 07 (2,7, 18 ), (3,6, 67), (4,5,24), 
10   ->    22, 04 (2,8, 101),(3,7, 78), (4,6, 40, 04),(5,5,22)
11   ->    20, 02 (2,9, 118),(3,8, 167), (4,7,48),(5,6, 20,02)
12   ->    28, 06 (2, 10, 122),(3,9,187), (4,8,164),(5,7,28),(6,6, 60,06)
13   ->    68, 08  (2, 11, 120),(3,10,227),(4,9,184), (5,8,162),(6,7, 68,08)
14   ->    88 ,88 (2, 12, 106),(3,11,102), (4,10,224),(5,9,182),(6,8,166,016,001),(7,7,88)
15   ->    108, 007 (2,13, 108),(3,12,287),(4,11,264),(5,10,222),(6,9,186),(7,8,168),()
*/
const nMax = Math.max(...list);
const dp = [null, null, "1", "7", "4", "2", "6", "8"];

for (let i = 8; i <= nMax; i++) {
  dp[i] = Number.MAX_SAFE_INTEGER.toString();
  for (let j = 2; j <= i - 2; j++) {
    const a = dp[j];
    const b = i - j === 6 ? "0" : dp[i - j];
    dp[i] = Math.min(Number(a + b), Number(dp[i])).toString();
  }
}
const answer = [];
list.forEach((n) => {
  const a = Math.floor(n / 2);
  const b = n % 2;
  let max = "1".repeat(a);
  max = b ? "7" + max.slice(1) : max;
  const min = dp[n];
  answer.push([min, max].join(" "));
});
console.log(answer.join("\n"));
