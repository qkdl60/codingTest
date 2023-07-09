function solution(n) {
    // 만약 4이면
    /*
    [[ 1, 2, 3, 4],
     [12,13,14, 5],
     [11,16,15, 6],
     [10, 9, 8, 7]]
    5이면
    [[ 1,  2,  3,  4, 5], 
     [16, 17, 18, 19, 6], 
     [15, 24, 25, 20, 7], 
     [14, 23, 22, 21, 8], 
     [13, 12, 11, 10, 9]]
     
    dfs로 각 배열을 채워준다. 
    */
    const dx=[1, 0, -1, 0];
    const dy=[0, 1,  0,-1];
    
    const visited=Array.from({length:n},()=>Array.from({length:n },()=>0));
    const answer=Array.from({length:n},()=>Array.from({length:n },()=>1)); // 스타트 지점을 위해 1로 채운다. 
    let d =0 // 막히면 방향을 바꿔서 간다. 
    const limit=n*n+1;
    function DFS(num,cur){
        if(num==limit){
            return;
        }else{
            const [curX, curY]=cur;
            answer[curY][curX]=num;
            const [nextX, nextY]=[curX+dx[d], curY+dy[d]];
            if(nextX<n && nextX>=0 && nextY>=0 && nextY<n&& visited[nextY][nextX]===0){
                visited[nextY][nextX]=1;
                DFS(num+1, [nextX, nextY]);
            }else{
                d=(d+1)%4;
                const [nx,ny]=[curX+dx[d], curY+dy[d]];
                if(nx<n && nx>=0 && ny<n && ny>=0 && visited[ny][nx]===0){
                    visited[ny][nx]=1;
                    DFS(num+1, [nx, ny]);
                }else return;
            }
            
        }
    }
    visited[0][0]=1;
    DFS(1, [0,0]);
    return answer
    
    
    

}