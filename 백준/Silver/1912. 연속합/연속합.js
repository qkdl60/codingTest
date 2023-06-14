const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,nums] = fs.readFileSync(filePath).toString().trim().split("\n");
n=n*1;
nums=nums.split(" ").map(num=>num*1);
const dp=Array.from({length:n+1}, ()=>0);

// 수열을 원하기 때문에 dp값은 지금껏 오면서 가장큰 수를 원하는것이 아니라 이어지거나, 새로 시작하거나 이다. 
// 그래서 dp[n]=Math.max(dp[n-1]+num[n-1], num[n-1]);
let max=Number.MIN_SAFE_INTEGER;
for(let i =1; i<=n; i++){
    dp[i]=Math.max(dp[i-1]+nums[i-1], nums[i-1]);
    max=Math.max(max, dp[i]);
}
console.log(max)