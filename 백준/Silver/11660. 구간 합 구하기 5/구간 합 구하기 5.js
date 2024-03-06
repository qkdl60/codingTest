const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m], ...list] = fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(" ").map(Number))
/*
어딜보고 dp를 알 수 있나? 범위?
dp라면 점화식은?  미리 합쳐놓으면 끝점 - 시작점 으록 계산을 끝 낼 수 있다 .
dp는 3차원?>
구간합은 바로 dp[i][j-1]+dp[i-1][j]-dp[i-1][j-1];
*/
const map=list.slice(0,n);
const question= list.slice(n);
const dp=Array.from({length:n+1}, ()=>Array.from({length:n+1}, ()=>0))
for(let i = 1 ; i<=n; i++){
    for(let j=1 ; j<=n; j++){
        dp[j][i]=dp[j-1][i]+dp[j][i-1]-dp[j-1][i-1]+map[j-1][i-1]
    }
}
const answer=[]
for(let [y,x, ty,tx] of question){

    const a= dp[ty][tx]+dp[y-1][x-1]-dp[ty][x-1]-dp[y-1][tx];
    answer.push(a);
}
console.log(answer.join('\n'))