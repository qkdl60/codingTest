const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,L]= fs.readFileSync(filePath).toString().trim().split("\n");
const [n,l]=S.split(" ").map(Number);
const list =L.split(' ').map(Number).sort((a,b)=>a-b)
let neck=l;
for(let a of list ){
    if(a<=neck){
        neck++;
    }
}

console.log( neck)