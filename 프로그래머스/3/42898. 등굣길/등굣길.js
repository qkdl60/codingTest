/*
왼쪽 상단 이 집 , 가장 오른쪽 ( n,m)
최단 경로의 개수 => 학교에서 출발 bfs로 
테두리에 물이 있다면 그 뒤로는 진입할 수 없다. 

*/
function solution(m, n, puddles) {
    const D_NUM=1000000007;
    const map=Array.from({length:n}, ()=>Array(m).fill(1));
    puddles.forEach(i=>{
        const [a,b]=i;
        if(a===1){
            for(let j =b-1; j<n; j++){
                map[j][0]=0;
            }
        }else if(b===1){
            for(let j =a-1; j<m; j++){
                map[0][j]=0;
            }
        }else map[b-1][a-1]=0;
    })
     for(let i =1; i<n; i++){
         for(let j=1; j<m; j++){
            const a= map[i][j];
            if(a===0)continue;
            const b=map[i-1][j]%D_NUM;
            const c=map[i][j-1]%D_NUM;
           
            map[i][j]=(c+b)%D_NUM;
         }
     }
 
  return map[n-1][m-1]
     
}