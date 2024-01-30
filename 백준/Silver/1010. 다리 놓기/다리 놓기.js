const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S, ...L]= fs.readFileSync(filePath).toString().trim().split("\n");
const n =Number(S);
const list =L.map(i=>i.split(' ').map(Number));
function factorial(num){
    if(num<=1) return 1;
    return num * factorial(num-1);
}
for(let i = 0 ;i <n; i++){
    const arr= list[i]
    const N = parseInt(arr[0]);
    const M = parseInt(arr[1]);
   console.log(Math.round((factorial(M)/(factorial(M-N)*factorial(N)))));
    
}