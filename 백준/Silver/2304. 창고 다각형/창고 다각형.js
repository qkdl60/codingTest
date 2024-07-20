/*
    
  가장 높은 구간을 만나기 전까지는 현재 긴두을 반복한다고 생각
  양방향 진행 겹쳐서 작은 구간으로 ?
  

*/
let fs = require("fs");
let [N,...S] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n= Number(N);
const list=S.map(i=>i.split(' ').map(Number)).sort((a,b)=>a[0]-b[0]);
const width=(list[n-1][0] - list[0][0])+1;
const listCopy=list.map(i=>[i[0]-list[0][0],i[1]])
const copy= Array(width).fill(0);
for(let [x, h] of listCopy){
    copy[x]=h;
}
const left =Array(width).fill(0);
const  right= Array(width).fill(0);
for(let i =0 ; i<width; i++){
    const rightIndex=width-i-1;
    if(i===0){
        left[i]=copy[i];
        right[rightIndex]=copy[rightIndex];
        continue;
    }
    left[i]=Math.max(left[i-1], copy[i]);
    right[rightIndex]=Math.max(right[rightIndex+1], copy[rightIndex])
}
const result= Array(width).fill(0);
for(let i = 0 ; i<width; i++){
    result[i]=Math.min(left[i], right[i]);
}
console.log(result.reduce((acc,cur)=>{
    return acc+cur;
},0))

