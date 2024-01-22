/*
동전의 개수가 최소가 되도록 거슬러 줘야한다.


*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim()
const n= Number(s);
let count=0;
const a=n%5;
const b=Math.floor(n/5);
count+=b;
const c=a%2;
if(c!==0){
   for(let i= 1; i<=b; i++){
       const e=5*i;
       const f= e+a;
       if(f%2===0){
           const g=f/2
           console.log(count-i+g);
           return;
       }
   }
    console.log(-1);
    return; 
}
const d=Math.floor(a/2);
console.log(count+d)