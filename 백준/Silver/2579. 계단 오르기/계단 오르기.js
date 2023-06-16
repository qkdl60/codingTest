const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, ...score] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i*1);

// n번째 가는  방법 = n-1번째 + n-3번쨰 , n-2번째
score.unshift(0)


//1번(10) = 0번
//2번(20) = 0번,1번(10)
//3번(15) = 1번(10), 2번(0번)
//4번(25) = 3번(1번), 2번(20);
//5번(10) = 4번(2번), 3번();
//6번(20) = 5번(3번), 4번();*
// dp[n]= Math.max(arr[n]+arr[n-1]+dp[n-3], arr[n]+dp[n-2])
const dp =Array.from({length:n+1}, ()=>0);
dp[1]=score[1];
dp[2]=score[1]+score[2];
dp[3]=Math.max(score[3]+score[2], score[1]+score[3]);
for(let i=4; i<n+1; i++){
    dp[i]=Math.max(score[i]+score[i-1]+dp[i-3], score[i]+dp[i-2]);
}
console.log(dp[n])