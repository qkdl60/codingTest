/*
    수열의 합을 구하고 싶다.
    수열의 두 수르 묶으 려고 한다. 


*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n,...list] = fs.readFileSync(filePath).toString().trim().split("\n").map(BigInt);

const positive=[];
const zero=[]
let sum=0n;
const negative=[];
for(let a of list ){
    if(a>1n)positive.push(a);
    else if (a===1n)sum+=1n;    
    else if ( a===0n)zero.push(a);
    else negative.push(a);
}
positive.sort((a,b)=>Number(b)-Number(a));// 짝수이면 다 두개씩 묶어서 구하고, 홀수 이면 가장 작은 값 빼고 둘이 
negative.sort((a,b)=> Number(a)-Number(b));// 짝수이면 다 곱하고 , 홀수이면 가장 큰값 빼고 

const restP=positive.length%2===1? positive.pop(): 0n ;
const restN=negative.length%2===1? negative.pop(): 0n ;
sum+=restP;
for(let i =1; i<positive.length; i+=2){
   sum+= (positive[i]*positive[i-1]);
}
for(let i= 1 ; i< negative.length; i+=2){
    sum+=(negative[i]*negative[i-1]);
}
if(zero.length===0)sum+=restN;
console.log(Number(sum))

 