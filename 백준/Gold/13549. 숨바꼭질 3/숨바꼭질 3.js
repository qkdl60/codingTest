const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n,k ] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number)

const visited=Array.from({length:100001}, ()=>false);
visited[n]=true;

const que=[[ n,0 ]];
while(que.length){
    const [c, t]=que.shift();
    if(c===k){
        console.log(t);
        return; 
    }
    for(let n of [c*2, c-1, c+1]){
        if(n >=0 && n<100001 && !visited[n] ){
            visited[n]=true;
            if(n===c*2)que.unshift([n, t]);
            else que.push([n, t+1]);
        }
    }
}