let [[t], ...line] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1005

건설순서는 모든 건물이 건설 가능하도록 주어진다.

dp 순서가 중요하다 

*/
const answer = [];
while (line.length) {
  const [n, k] = line.shift();
  const timeList = line.shift();
  const tech = line.slice(0, k + 1);

  line = line.slice(k + 1);
  const [goal] = tech.pop();

  //0은 선행 , 1은 후행
  const graph = Array.from({length: n + 1}, () => []);
  const dp = Array.from({length: n + 1}, (_, index) => timeList[index - 1]);
  const prevCount = Array.from({length: n + 1}, () => 0);
  dp[0] = 0;
  for (let [f, to] of tech) {
    graph[f].push(to);
    prevCount[to]++;
  }

  const start = prevCount.findIndex((value, index) => index !== 0 && value == 0);
  dp[start] = timeList[start - 1];
  let q = [start];
  prevCount[start] = -1;
  while (q.length) {
    const replace = [];
    for (let a of q) {
      for (let b of graph[a]) {
        prevCount[b]--;
        dp[b] = Math.max(dp[b], dp[a] + timeList[b - 1]);
      }
      for (let i = 1; i <= n; i++) {
        const a = prevCount[i];
        if (a === 0) {
          replace.push(i);
          prevCount[i]--;
        }
      }
    }
    q = replace;
  }
  answer.push(dp[goal]);
}
console.log(answer.join("\n"));
