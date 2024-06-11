/*
 연산자 우선 순위
 + * -

음의정수는?
 


*/

const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin': './input.txt';
const [a,b]=fs.readFileSync(filePath).toString().trim().split(" ");
console.log(Math.max(eval(a),eval(b)))
	
function calc(a,b,sign){
	if(sign==='*')return Number(a)*Number(b);
	if(sign==="+")return Number(a)+Number(b);
	if(sign==="-")return Number(a)-Number(b);
}