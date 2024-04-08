/*
거스름돈
조합

어떻게 가격을 맞추지?
우선 해당 거스름돈 보다 큰 것을 없앤다. 

그리디
dp

*/
function solution(n, money) {
    const cash=money.filter(i=>i<=n).sort((a,b)=>a-b);
    const dp=Array(n+1).fill(0);
    dp[0]=1;
    for(let i = 0; i<cash.length; i++){
        for(let j=cash[i]; j<=n; j++){
            dp[j]=dp[j]+dp[j-cash[i]];
        }
    }
    return dp[n]
}