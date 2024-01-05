const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n, m] = fs.readFileSync(filePath).toString().trim().split(" ");
let  a=BigInt(1);
for(let i=n; i>n-m;i--){
    a*=BigInt(i);
}
let b=BigInt(1);
for(let i=m;i>1; i--){
    b*=BigInt(i);
}
console.log((a/b).toString(10))