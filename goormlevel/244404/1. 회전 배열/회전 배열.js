const fs = require('fs');
const filePath=process.platform==='linux'?'/dev/stdin': './input.txt';
const [[n,m], s]=fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(" ").map(Number));
/*
m 이 10^6으로 1회전으로 해결해야한다. 
배열 조작보다는 pointer 이동방식으로 하면 간단하게 해결할 수 있다. 

이동회수 만큼 pointer 빼준다. 

a 를 n으로 나눈 나머지 

*/
let pointer= 0;
for(let i = 0; i<m; i++){
	const a=s[pointer];
	const moveCount=a%n;
	const nextPointer=pointer+moveCount;
	pointer=nextPointer%n;
}

console.log(s[pointer])