const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,L]= fs.readFileSync(filePath).toString().trim().split('\n')
const n=Number(S);
const list =L.split(' ').map(Number)

const dp=Array.from({length:n}, ()=>1)
for(let i = 0 ; i< n ; i++){
    const next = list [i];
    for(let j =0; j< i; j++){
        if( list[j]>next)dp[i]=Math.max(dp[i], dp[j]+1);
    }
    
}
console.log(Math.max(...dp))