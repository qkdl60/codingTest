const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));
/*
https://www.acmicpc.net/problem/1700


멀티탭 구멍, 전기용품 총 사용 횟수 

빈도보다는 나중에 재등장하는 출현 시기

*/
const orderMap = list.map((v, i, l) => {
  let nextOrder = null;
  for (let j = i + 1; j < l.length; j++) {
    const b = l[j];
    if (b === v) {
      nextOrder = j;
      break;
    }
  }
  return [v, nextOrder];
});

let count = 0;
const nextOrderMap = [];
const multiTab = new Set();

orderMap.forEach((v) => {
  const [c, nextOrder] = v;
  if (multiTab.has(c)) {
    nextOrderMap[c] = nextOrder;
  } else if (multiTab.size < n) {
    multiTab.add(c);
    nextOrderMap[c] = nextOrder;
  } else {
    const values = multiTab.values();
    let lastOrder = Number.MIN_SAFE_INTEGER;
    let target = null;
    for (let a of values) {
      if (nextOrderMap[a] === null) {
        multiTab.delete(a);
        count++;
        multiTab.add(c);
        nextOrderMap[c] = nextOrder;
        target = null;
        break;
      } else {
        const nextOrder = nextOrderMap[a];
        if (lastOrder < nextOrder) {
          lastOrder = nextOrder;
          target = a;
        }
      }
    }
    if (target !== null) {
      multiTab.delete(target);
      count++;
      multiTab.add(c);
      nextOrderMap[c] = nextOrder;
    }
  }
});
console.log(count);
