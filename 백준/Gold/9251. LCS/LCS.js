const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [str1,str2] = fs.readFileSync(filePath).toString().trim().split("\n");
//dp에 이중배열을 이용하는 케이스 
const dp =Array.from({length:str1.length+1}, ()=>Array.from({length: str2.length+1}, ()=>0));

for(let i =1; i<=str1.length; i++){
    for(let j =1; j<=str2.length; j++){
        if(str1[i-1]===str2[j-1])dp[i][j]=dp[i-1][j-1]+1;
        else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1])
    }
}
console.log(dp[str1.length][str2.length])