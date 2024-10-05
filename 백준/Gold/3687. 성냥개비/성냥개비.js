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
const minDp = [
  null,
  null,
  ["1", "1"],
  ["7", "7"],
  ["4", "4"],
  ["2", "2"],
  ["6", "0"],
  ["8", "8"],
  ["10", "01"],
  ["18", "07"],
  ["22", "04"],
  ["20", "02"],
];

for (let i = 11; i <= nMax; i++) {
  let left = 2;
  let right = i - 2;
  //for 2번

  minDp[i] = [String(Number.MAX_VALUE), String(Number.MAX_VALUE)];

  while (left <= right) {
    const c1 = minDp[left][0] + minDp[right][0];
    const c2 = minDp[right][0] + minDp[left][0];
    const c3 = minDp[left][1] + minDp[right][1];
    const c4 = minDp[right][1] + minDp[left][1];

    const c5 = minDp[right][1] + minDp[left][0];
    const c6 = minDp[right][0] + minDp[left][1];

    const c7 = minDp[left][1] + minDp[right][0];
    const c8 = minDp[left][0] + minDp[right][1];

    const ar = [c1, c2, c3, c4, c5, c6, c7, c8];

    const filtered = ar.filter((i) => !i.startsWith("0"));
    const min = ar.reduce((acc, cur) => {
      if (acc === null) return cur;
      return acc < cur ? acc : cur;
    }, null);

    minDp[i] = [String(Math.min(minDp[i][0], ...filtered)), min];
    left++;
    right--;
  }
}
const answer = [];
list.forEach((n) => {
  const a = Math.floor(n / 2);
  const b = n % 2;
  let max = "1".repeat(a);
  max = b ? "7" + max.slice(1) : max;
  const min = minDp[n][0];
  answer.push([min, max].join(" "));
});
console.log(answer.join("\n"));
