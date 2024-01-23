const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,...L] = fs.readFileSync(filePath).toString().trim().split('\n')
const n=Number(S);
const list =L.map(Number)
let count=0;
let train=0;

for(let i =n-1; i>0; i--){
    const a= list [i];
    const b= list [i-1];
    
    if(b>=a){
        const gap= b-a;
        count+=(gap+1);
        list[i-1]=list[i-1]-(gap+1)
    }
}
console.log( count)