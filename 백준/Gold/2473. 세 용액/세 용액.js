/*


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const[N,L] = fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const list =L.split(" ").map(Number).sort((a,b)=>a-b);
let min=Number.MAX_SAFE_INTEGER;
let liquids=[];
list.forEach((a, index)=>{
let left= 0
let right =list.length-1;

while(left<right){
    if(left===index){
        left++;
        continue;
    }    
    if(right===index){
        right--;
        continue;
    }
    const sum =a+list[left]+list[right];
    if(min>Math.abs(sum)){
        min=Math.abs(sum);
        liquids=[a,list[left], list[right]];
    }
    if(sum>0){
        right--;
    }else if (sum<=0){
        left++;
    }
    
}
    
})
console.log(liquids.sort((a,b)=>a-b).join(" "))