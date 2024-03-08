const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim()
const [[n,m],...list]=s.split('\n').map(i=>i.split(' ').map(Number));

const d= [[1,0], [0,1], [1,1]]; // 뒤로 가지 못학기때문에 다른 쪽을 포기하고 움직이는 것이다. 
/*
어떤 기준으로 움직여야 되는가? 이진 탐색? 이동기 기대값? 포기 하는 값들?
반대로 생각 map[i][j]일 떄 여기에 올수 있는 값위치는 map[i-1][j], map[i][j-1], map[i-1][j-1]


*/
const dp =Array.from({length:n+1}, ()=>Array.from({length:m+1}, ()=>0));
for(let i =1; i<=n; i++){
    for(let j=1; j<=m; j++){
        const a =list[i-1][j-1]
        dp[i][j]=Math.max(a+dp[i-1][j],a+dp[i][j-1], a+dp[i-1][j-1]);
    }
}
console.log(dp[n][m])