const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S, ...L] = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(S);
const list =L.map(i=>i.split(' ').map(Number)).sort((a,b)=>a[0]-b[0])
/*

 겹친다는게 무슨 의미?
 a=>b 가 연결되었을때 
 a+1은 b+1이상의 전봇대에 연결되는것이 안 겹치는 것이다. 
 a, 내 이전 전봇대에서 연결된 곳이 나보다 큰게 몇개인가 조사

 a를 기준으로 오름차순 정렬 후 b의 최장 증가 수열을 확인
 

*/
const dp=Array.from({length:n}, ()=>1)
for(let i =0; i< n ; i++){
    const next = list[i][1];
    for(let j =0; j< i ; j++){
        if(next> list [j][1]){
            dp[i]=Math.max(dp[i], dp[j]+1)
        }
    }
}
console.log( n- Math.max(...dp))