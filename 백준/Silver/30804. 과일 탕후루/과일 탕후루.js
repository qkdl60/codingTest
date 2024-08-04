const fs =require('fs')
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const [[n], list] =fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(' ').map(Number));
const category={};

let left= 0 ;
let right =0; 
category[list[right]]=1;
let max= 1 ;
while(left <=right && right<n){
    const keys=Object.keys(category).filter(v=>category[v]>0);
 
    if(keys.length<=2){
        right++;
        category[list[right]]=(category[list[right]]??0)+1
    }else{
        category[list[left]]--;
        left++;
    }
    max= Math.max(max, right-left)
}
console.log(max)
