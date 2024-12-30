const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [t, ...list] = fs.readFileSync(filePath).toString().trim().split("\n");

/*
https://www.acmicpc.net/problem/5052
일관성=> 헌 번호가 다른 번호의 접두어인 경우가 없어야 한다. 
트리 만들어서 분류해야된다. 

 */
const answer = [];
while (list.length) {
  const tree = new Map();

  const n = Number(list.shift());
  const numberList = list.slice(0, n).sort((a, b) => a.length - b.length);
  list = list.slice(n);
  let isOk = true;
  for (let a of numberList) {
    let str = "";
    for (let i = 0; i < a.length; i++) {
      const char = a[i];
      str += char;
      if (tree.has(str)) {
        isOk = false;
        break;
      }
    }
    if (isOk) tree.set(str);
    else break;
  }

  answer.push(isOk ? "YES" : "NO");
}

console.log(answer.join("\n"));
