const fs =require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const [[h,w], list]=fs.readFileSync(filePath).toString().trim().split('\n').map(v=>v.split(' ').map(Number));
/*
0번 인덱수 h 로 유지 
양쪽으로 진행 배열 두객 최장 수열로 

*/

const left= Array(w).fill(0);
const right= Array(w).fill(0);

let leftMax=0;
for(let i = 0; i<w; i++){
    const a= list[ i];
    if(a>leftMax){
        left[i]=0;
        leftMax=a; 
        continue;
    }
    left[i]=leftMax-list[i];
}
let rightMax=0;
for(let i = w-1; i>=0; i--){
    const a=list[i];
    if(a>rightMax){
        rightMax=a;
        right[i]=0;
        continue;
    }
    right[i]=rightMax-list[i];
}
let sum=0;
for(let i =0; i<w; i++){
    sum+=Math.min(right[i], left[i])
}
console.log(sum)