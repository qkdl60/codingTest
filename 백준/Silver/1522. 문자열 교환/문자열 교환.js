const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt'
const str=fs.readFileSync(filePath).toString().trim();
const target = str.repeat(2);// 순회하는 구조를 위해서 연결

const aTotalCount=str.split('b').join('').length;

let aCount=0;
let bCount= 0;
let left =0;
let right=aTotalCount-1;
//init window 만들기 
for(let i=0; i<aTotalCount; i++){
    const a= target[i];
    if(a==='a')aCount++;
    else bCount++;
}
let min=bCount;
right++;
while(right<target.length){
    const a =target[right];
    if(a==='b')bCount++;
    const b=target[left];
    if(b==='b')bCount--;
    
    min=Math.min(min, bCount)
    left++;
    right++;
    
}
console.log(min)