const fs = require('fs');
const filePath=process.platform==="linux"?'/dev/stdin': './input.txt';
const [a,b,c,d]=fs.readFileSync(filePath).toString().trim().split(' ').map(Number).sort((a,b)=>a-b);

//오름차순 
/*
최장 => 임의의 두 값의 차이가 크다. 

완탐=> 3가지 
[a,b][c,d]
[a,c][b,d]
[a,d][b,c]
*/
const t1=Math.abs(a-b)+Math.abs(c-d);
const t2=Math.abs(a-c)+Math.abs(b-d);
const t3=Math.abs(a-d)+Math.abs(b-c);
console.log(Math.max(t1,t2,t3))

