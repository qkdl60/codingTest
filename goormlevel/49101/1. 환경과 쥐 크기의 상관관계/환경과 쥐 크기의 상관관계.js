/*
대푯값이란, 어떤 정수x에 대해서 쥐의 몸집 크기가 [x-2, x+2] 구간에 속하는 쥐가 가장 많을때 그 중 가장 작은 x값 

x의 값의 범위는 가장 작은 x 값이라는 조건때문에 
해당 집단의 작은값-2 으로 한다. 최대 값은  집단의 최대값-2;

배열만들어서 범위에 몇개 들어있는지 카운팅

배열 요소를 하나씩 보면서 요소가 포함되는 범위의 x값에 넣는다. 


*/

const fs = require('fs');
const filePath=process.platform==='linux'?'/dev/stdin': './input.txt';
const [N,S1,S2]=fs.readFileSync(filePath).toString().trim().split('\n');
const n=Number(N);

const a=S1.split(" ").map(Number).sort((a,b)=>a-b);
const aMin=a[0];
const aMax=a[a.length-1];
const ax={};
for(let i= aMin-2; i<=aMax-2; i++){
	ax[i]=0;
}

a.forEach(i=>{
	const i1=i-2;
	if(ax[i1]!==undefined)ax[i1]=ax[i1]+1
	const i2=i-1;
	if(ax[i2]!==undefined)ax[i2]=ax[i2]+1
	const i3=i;
	if(ax[i3]!==undefined)ax[i3]=ax[i3]+1
	const i4=i+1;
	if(ax[i4]!==undefined)ax[i4]=ax[i4]+1
	const i5=i+2;
	if(ax[i5]!==undefined)ax[i5]=ax[i5]+1
})
let aResult={x:Number.MAX_SAFE_INTEGER, count:Number.MIN_SAFE_INTEGER};
for(let [key, value] of Object.entries(ax)){
	if(Number(value)>aResult.count )aResult={x:Number(key), count:Number(value)};
}


const b=S2.split(" ").map(Number).sort((a,b)=>a-b);
const bMin=b[0]
const bMax=b[b.length-1];
const bx={};
for(let i= bMin-2; i<=bMax-2; i++){
	bx[i]=0;
}

b.forEach(i=>{
	const i1=i-2;
	if(bx[i1]!==undefined)bx[i1]=bx[i1]+1
	const i2=i-1;
	if(bx[i2]!==undefined)bx[i2]=bx[i2]+1
	const i3=i;
	if(bx[i3]!==undefined)bx[i3]=bx[i3]+1
	const i4=i+1;
	if(bx[i4]!==undefined)bx[i4]=bx[i4]+1
	const i5=i+2;
	if(bx[i5]!==undefined)bx[i5]=bx[i5]+1
})
let bResult={x:Number.MAX_SAFE_INTEGER, count:Number.MIN_SAFE_INTEGER};
for(let [key, value] of Object.entries(bx)){
	if(Number(value)>bResult.count )bResult={x:Number(key), count:Number(value)};
}
const aAnswer=aResult.x;
const bAnswer=bResult.x;
const answer =aAnswer+" "+bAnswer;
const result= aAnswer>bAnswer?'good':'bad';
console.log(answer+"\n"+result)
