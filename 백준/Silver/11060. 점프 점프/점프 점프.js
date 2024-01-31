const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,L] = fs.readFileSync(filePath).toString().trim().split("\n");
const n= Number(S);
const list =L.split(" ").map(Number);
const dp=Array.from({length:n}, ()=>Number.MAX_SAFE_INTEGER);
dp[0]=0;
for(let i=0; i<n; i++){
    const a= list[i];
    for(let j=i+1; j<=i+a && j<n; j++ ){
        dp[j]=Math.min(dp[i]+1, dp[j]);
    }
}
console.log(dp[n-1]===Number.MAX_SAFE_INTEGER? -1:dp[n-1])