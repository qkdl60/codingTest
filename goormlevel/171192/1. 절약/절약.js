/*
성공 기준=> 가지고 있는 돈이 항상 0원 이상=> 지출이 가지고 있는 돈보다 크면 안된다. 
지출이 가지고 있는 돈보다 크다=> 실패 
in 수입, out 지출 


*/

const fs =require('fs');
const filePath=process.platform==="linux"?'/dev/stdin':'./input.txt';
const [N,...s]= fs.readFileSync(filePath).toString().trim().split("\n");
const n =Number(N);
s.reverse();
let all=0;
while(s.length){
	const [t, c]=s.pop().split(" ");
	if(t==='in')all+=Number(c);
	else all-=Number(c);
	if(all<0)break;
	
}

console.log( all<0?'fail': 'success')



