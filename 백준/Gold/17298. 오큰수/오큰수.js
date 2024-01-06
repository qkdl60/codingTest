const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, m] = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(N);
const list = m.split(" ").map(Number);
const result = new Array(n).fill(-1);  // 모든 요소를 -1로 초기화
const stack = [];

for (let i = 0; i < n; i++) {
    while (stack.length > 0 && list[stack[stack.length - 1]] < list[i]) {
        result[stack.pop()] = list[i];  // 스택의 top 위치에 현재 값 저장
    }
    stack.push(i);  // 인덱스를 스택에 추가
}

console.log(result.join(" "));