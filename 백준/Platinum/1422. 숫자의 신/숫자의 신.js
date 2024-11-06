const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [k, n] = N.split(" ").map(Number);

const fix = [...L].sort((a, b) => Number(b) - Number(a))[0];
const count = n - k;
const fixArr = Array.from({length: count}, () => fix);

const list = [...L, ...fixArr].sort((a, b) => {
  const c1 = a + b;
  const c2 = b + a;
  if (c1 >= c2) return -1;
  return 1;
});

const result = list.reduce((acc, cur) => acc + cur, "");
console.log(result);
/*
https://www.acmicpc.net/problem/1422

가장 큰 수 => N개의 수를 뽑아서 
  n은 k보다 크거나 같다  
같은 수를 여러번 사용 가능
  적어도 모든 수 한번 사용

  가장 큰 수 출력 
  
 list에 있는 수로 가장 큰수를 만든다.  
 
 여기서 제일 길거나 가장 큰수를 첫번쨰를 앞 또는 뒤에 붙인다 
두가지 모두 만들고 비교 
=> 중간에 섞이는 경우도 필요하다 


  */
