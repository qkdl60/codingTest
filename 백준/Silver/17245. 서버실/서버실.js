const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const[s,...L]= fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(s);
const list =L.map(i=>i.split(" ").map(BigInt))

let left=0n; 
let right=0n;

let total=0n;
list.forEach(i=>i.forEach(j=>{
    total+=j;
    right=BigInt(Math.max(Number(j),Number(right)))} 
));
if(total===0n){
    console.log( 0);
    return; 
}
while(left<=right){
    const mid=(left+right)/2n;
    let count =0n;
    for(let i of list ){
        for(let j of i){
            if(j<=mid)count+=j;
            else count+=mid;
        }
    }
    const half=(count*100n)/total
    if( half>=50n){
        // 절반이상이면 너무 많은 시간을 켜것이다. 시간을 줄여야하다.ㄴ
        right=mid-1n;
    }else{
        left=mid+1n;
    }
}

console.log( Number(left))