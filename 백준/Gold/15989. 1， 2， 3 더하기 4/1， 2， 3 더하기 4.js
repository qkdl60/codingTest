const fs= require('fs');
const filePath= process.platform==='linux'? '/dev/stdin': './input.txt';
const [t, ...list ]=fs.readFileSync(filePath).toString().trim().split('\n');
const answer= [] ;
const max= Math.max(...list);
const dp=Array.from({length:max+1}, ()=>Array.from({length:4}, ()=>0))
dp[1][1]=1;
dp[1][2]=0;
dp[1][3]=0;
dp[2][1]=1;
dp[2][2]=1;
dp[2][3]=0;
dp[3][1]=1;
dp[3][2]=1;
dp[3][3]=1;
for(let i=4; i<=max; i++ ){
    dp[i][1]=dp[i-1][1]
    dp[i][2]=dp[i-2][2]+dp[i-2][1]
    dp[i][3]=dp[i-3][3]+dp[i-3][2]+dp[i-3][1]
}
for(let a of list){
    const t=dp[a].reduce((acc,cur)=>acc+cur,0)
    answer.push(t)
}
console.log(answer.join('\n'))

//조합이다. dp 
/*

정수 n 을 만들는 방법 
n-1 에 +1
n-2 에 +2;
n-3 에 +3;

중복 제거를 위해서 
1,2,3  오름차순 합으로 구별해서 끝자리 별로 저장 



1, 1 => 1

2,  1+1 => 1 // 1로끝나는
    2 =>1 //2 로 끝나는

3,  1+1+1, =>1  
    1+2,  =>1
    3 =>1

4를 만드는방법은 
1에 3을 더해주고 
2에 2을 더해주고 
3에 1을 더해준다. 


4,  1+1+1+1, =>1 
    2+2,1+1+2, =>2
    1+3, =>1
    
5,  1+1+1+1+1, =>1
    1+1+1+2, 1+2+2 =>2
    1+1+3, 2+3 =>2
    
6,  1+1+1+1+1+1, =>1
    1+1+1+1+2, 2+2+2, 1+1+2+2, =>3
    1+1+1+3, 1+2+3, 3+3 =>3
    
7.  1+1+1+1+1+1+1 => 1
    1+1+1+1+1+2,1+1+1+2+2, 1+2+2+2, => 3
    1+1+1+1+3, 1+3+3, 1+1+2+3, 2+2+3 => 4
*/