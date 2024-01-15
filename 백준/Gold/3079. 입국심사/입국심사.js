const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,m] = N.split(" ").map(BigInt);
const list = L.map(BigInt).sort((a,b) => Number(a-b));

let max = list[n-1n] * m;
let min = 1n;

while(min < max){
    const mid = (max + min) / 2n;
    let passedPeople = 0n;
    
    for(let a of list){
        passedPeople += mid / a;
    }

    if(passedPeople >= m){
        max = mid;
    }else{
        min = mid + 1n;
    }
}
console.log(min.toString());
