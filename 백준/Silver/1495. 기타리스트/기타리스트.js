const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L] = fs.readFileSync(filePath).toString().trim().split('\n')
const [n,s, m]=N.split(" ").map(Number);
const list = L.split(" ").map(Number);

/*

n이 연주할 곡 개수,
s가 시작 볼륨 
m이 최대 볼륨


더하거나 빼거나 두가지 중 하나이다. 그리디 안되는 것 같은디 ? 
다중 배열 => 2가지 모두 경우에 모두 저장, 범위를 넘으면 컷 

*/
const dp=[[s]];

for(let i = 1; i<=n; i++){
    const pre=dp[i-1];
    const cur=new Set()
    const curV=list[i-1];
    for(let a of pre ){
        const pv=a+curV;
        const mv=a-curV;
        if(pv>=0 && pv<=m)cur.add(pv)
        if(mv>=0 && mv <=m )cur.add(mv);
    }
    if(cur.size===0){
        console.log(-1);
        return;
    }
    dp[i]=[...cur];
}
console.log(Math.max(...dp[n]))