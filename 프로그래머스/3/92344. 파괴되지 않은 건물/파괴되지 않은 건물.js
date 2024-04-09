/*
타입 1 적의공격, [r1,c1,r2,c2,damage]
타입 2 아군의회복, [r1,c1,r2,c2, damage]
1000*1000*250000
복잡도는 완전 탐색x, 

효율성에서 문제가 된다=> 검사 방식에서 시간 줄이기 
완전 탐색 아니고 종합적으로 진행


pSum 배열에 [t1][c1]  

,[t1][c2+1], [t2+1][c1] [t2+1][c2]

*/
function solution(board, skill) {
    const n = board.length;
    const m=board[0].length
    const pSum=Array.from({length:n+1}, ()=>Array.from({length:m+1}, ()=>0));
    
    
    
    for(let [t,r1,c1,r2,c2, d] of skill){
        const a = t===1 ? -1*d : +d
        
        pSum[r1][c1] += a ;
        pSum[r1][c2+1]+= -a;
        pSum[r2+1][c1]+= -a; 
        pSum[r2+1][c2+1]+= a;
        
    }
      console.log(pSum)
    for(let i =0; i<=n; i++){
        for(let j=1; j<=m; j++){
            pSum[i][j]+=pSum[i][j-1];
        }
    }
    for(let i = 1 ; i<= n; i++){
        for(let j = 0; j<=m; j++){
            pSum[i][j]+=pSum[i-1][j]
        }
        
    }
    let count=0
    for(let i= 0 ; i< n; i++){
        for(let j=0; j<m;j++){
            pSum[i][j]=pSum[i][j]+board[i][j];
            if( pSum[i][j]>=1)count++;
        }
    }
    
return count
}