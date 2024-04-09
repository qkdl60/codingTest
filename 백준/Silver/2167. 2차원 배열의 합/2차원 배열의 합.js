const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m],...L]= fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(' ').map(Number));
const list =L.slice(0, n);
const qusetion=L.slice(n);
const k=qusetion.shift()[0];

const dp = Array.from({length:n+1}, ()=>Array(m+1).fill(0));

for(let i = 0; i<n; i++){
    for(let j =0 ; j< m; j++){
            dp[i+1][j+1]=list[i][j]
        if(i===0 && j>=1)dp[i+1][j+1]+=dp[i+1][j];
        if(j===0 && i>=1)dp[i+1][j+1]+=dp[i][j+1];
        if(i>=1 && j>=1)dp[i+1][j+1]+=dp[i][j+1]+dp[i+1][j]-dp[i][j]
        
    }
}

const answer=[]

for(const [i,j,x,y] of qusetion ){
    const a= dp[i-1][j-1];
    const c= dp[i-1][y];
    const d= dp[x][j-1];

    const b= dp[x][y];
    
    answer.push(b+a-c-d);
}

console.log( answer.join('\n'))