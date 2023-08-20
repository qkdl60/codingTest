const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,...days] = fs.readFileSync(filePath).toString().trim().split("\n");
n=+n
/*
남은 n일동안 최대한 많은 상담을 하려고한다. 
하루에 하나씩 서로 다른사람의 상담을 잡아놓았다 .
각각의 상담은 상담을 완료하는데 걸리는 기간 T, 상담을 했을 때 받을 수 있는 금액 p
최대 이익을 구하시오 
*/
days=days.map(v=>v.split(" ").map(w=>+w))
days.unshift(0);
//dp array를 만들고 dp[n]은 n일 가질 수 있는 최대 이익
//dp는 t가 1이면 dp[n-1]+p 와 현재값을 비교해서 큰 값을 넣어주고 ,
//t가 t이 아니면 dp[n+t]= dp[n-1]+p 와 dp[n+t]를 비교해 큰 값을 넣어주고 
// t가 오버되면 dp[n]=dp[n-1]이다 .
const dp=Array.from({length:n+1}, ()=>0)

for(let i =1; i<=n; i++){
    const [t,p]=days[i];
    if(t===1)dp[i]=dp[i]>dp[i-1]+p?dp[i]:dp[i-1]+p
    else if(t>1 && i-1+t<=n){
        dp[i-1+t]=dp[i-1+t]>dp[i-1]+p?dp[i-1+t]:dp[i-1]+p;
        dp[i]=dp[i]>dp[i-1]?dp[i]:dp[i-1];
    }
    else dp[i]=dp[i]>dp[i-1]?dp[i]:dp[i-1]
}
console.log(dp[n])