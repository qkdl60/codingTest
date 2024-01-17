const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim()
const n=Number(s);
const numberArray=Array.from({length:Math.ceil(n/2)}, (_,index)=>index+1);

let left=0;
let right=1;
let count=1;
let sum=numberArray[left]+numberArray[right];
while(right<numberArray.length){
    if(sum<n){
        right++;
        sum+=numberArray[right];
    }else if(sum>n){
        sum-=numberArray[left];
        left++;
    }else if(sum===n){
        count++;
        right++;
        sum+=numberArray[right];
    }
}
console.log(count)