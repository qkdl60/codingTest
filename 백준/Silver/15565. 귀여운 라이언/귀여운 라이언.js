const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,k]=N.split(" ").map(Number);
const list =L.split(' ').map(Number);
//라이언이 k보다 작다면 right를 키우고
//크거나같다면 left를 키운다. 
let left=0;
let right=1;
let min=Number.MAX_SAFE_INTEGER;
let lionCount=[list[left],list[right]].filter(i=>i===1).length;
while(right<n){
    
    if(lionCount<k){
        right++;
        if(list[right]===1)lionCount++;
        
    }else if(lionCount>k){
        if(list[left]===1)lionCount--;
        left++;
        
    }else{
        min=Math.min(min, right-left+1 );
        if(list[left]===1)lionCount--;
        left++;
    }
}
console.log(min===Number.MAX_SAFE_INTEGER? -1: min)
