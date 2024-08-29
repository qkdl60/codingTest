const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [n ,...list]=fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
/*



옮겨지는 아이들 최소 수 => 최대 개수의 증가 수열만 고정 

1 2 2 1 3 1 2  => 이 중  3을 기준으로 이동해서 4 

dp? => 점화식 어떻게 ?최소 2차 반복, 3차반복으로 진행?
dp => 이차원 ? 


3 ,   3,7,   3,5,   2,  3,5,6  1    3,4


3 7 5 2 6 1 4
*/

const dp=[ ];


for(let i = 0 ; i < n ; i++){
    const a = list[i];
    dp[i]=[a];
    
    for(let j=0; j<i; j++){
        const temp = dp[j];
        const l= temp[temp.length -1 ]; 
        if (a>l){
            const tempLength=temp.length+1;
            if(dp[i].length<=tempLength){
                dp[i]= [...temp, a]
            }
        }
    }
    
}
const mapped =dp.map(i=>i.length );
const answer = Math.max(...mapped)
console.log(n-answer )