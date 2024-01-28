const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,s], list ] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(' ').map(Number))

// 각 자리에서 할 수있는 선택은 더하거나 안 더하거나 


let count=0;
dfs(0,0);
console.log(count)
function dfs(index , sum){
    if( index>=n)return ;

    sum+=list[index];

    if( sum===s)count++;
    dfs(index+1, sum-list[index]);
    dfs(index+1, sum);
}

