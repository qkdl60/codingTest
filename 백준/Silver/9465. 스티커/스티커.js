const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [x,...c ] = fs.readFileSync(filePath).toString().trim().split("\n");
x=x*1;

let answer=""

for(let i =0 ; i<x; i++){
    let [n, line1, line2]=c.splice(0,3);
    n=n*1;
    line1=line1.split(" ").map(v=>+v);
    line2=line2.split(" ").map(v=>+v);
    const dp=[[0, line1[0], line2[0]]];
    ;
    
    for(let i=1; i<n; i++){
        dp[i]=[
            Math.max(dp[i-1][1],dp[i-1][0], dp[i-1][2] ), 
            Math.max(dp[i-1][0]+line1[i], dp[i-1][2]+line1[i]), 
            Math.max(dp[i-1][0]+line2[i], dp[i-1][1]+line2[i])
            ]
    }
    answer+=Math.max(...dp[n-1])+"\n"
    
}

console.log(answer)