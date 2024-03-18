/*
    플로이드 와셜 ????
    실력이 좋다 => 무조건 이긴다. 
    [a,b]=> a가 b를 이겻다. 
    정확하게 순위를 매길 수 있다.=> 4 3 
    win은 인덱스가 이기는 인덱스들
    loose는 인덱스가 지는 인덱스들 
    
    table[1][2]=[1,0] 1번과 2번 선수 관계 
    1번이 2번을 이겼다. 
    table[2][1]=[0,1] 
    2번은 1번에게 졌다. 
    
    
    table[2][3]=[1,0];
    2번이 3번을 이겼다. 
    table[3][2]=[0,1];
    3번이 2번에게 졌다 .
    
*/
function solution(n, results) {
    const table=Array.from({length:n}, ()=>Array.from({length:n}, _=>null));
                           
   for(let i =0 ; i<n; i++){
        table[i][i]=0;
    }
    for(let[a,b]of results){
      table[a-1][b-1]=1;
        table[b-1][a-1]=-1; 
    }
    
    for(let i=0; i <n; i++){
        for(let j=0; j<n; j++){
            for(let k =0; k<n; k++){
                if( table[i][k]===1 && table[j][i]===1){
                    table[j][k]=1;
                    table[k][j]=-1;
                }
             }
        }
    }    
   const answer= table.map(i=> i.filter(j=>j!==null)).filter(i=>i.length>=n).length;
    return answer
    


}