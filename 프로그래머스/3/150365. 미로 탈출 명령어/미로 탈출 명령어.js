/*
중복 가능
사전순으로 가장 빠른 -> 완탐?

l [ 0,-1]
r [ 0, 1]
u [-1, 0]
d [ 1, 0]

중복 없으니 dfs bfs k번까지 돌린다. 
 1<= k<= 2500 메모리 오버? 
 
 백트리킹 어떻게? 
 n,m 범위를 넘어가는 경우
 마지막 도차점이 아닐때
 
 1칸 전에는  [r-1, c], [r+1,c], [r,c-1], [r,c+1] 에 있어야 한다. 
 
path 중 우순 순위는 d, l, r, u 
'd...' 이

그리디로 접근하면 dfs


*/

const directions=[{d:'d' , o:[1,0]} ,{d:"l", o: [0,-1]}, {d:"r", o:[0,1]}, {d:'u', o:[-1,0]}];

function solution(n, m, x, y, r, c, k) {
    // 그래프 그려야 되나? 필요하다, 각 그래프에 도착까지 남은 최소 거리  넣고 
    const graph=Array.from({length:n}, ()=>Array.from({length:m}, ()=>0))
    const start = [x-1,y-1];
    const end = [r-1,c-1];
    // schema{d:철자, o:이동 좌표}
    const minD=Math.abs(start[0]-end[0]) +Math.abs(start[1]-end[1]);
    if(k<minD || (k-minD)%2!==0)return'impossible'
    let min=[end];
    let minCount=0;
    //graph에 최소 거리 표시 
    
   const answer= dfs('', start,  k, n,m, r-1,c-1)
    
  return answer? answer:'impossible'
   
}

function dfs(path,  current ,restCount, n,m, eX, eY){
    const [currentX, currentY]=current;
    if(currentX===eX && currentY===eY && restCount===0)return path
    if(restCount===0)return ;
    for(let {d,o} of directions){
        const [nextX, nextY]=[currentX+o[0], currentY+o[1]];
        const minD=Math.abs(eX-currentX)+Math.abs(eY-currentY);
        if(nextX>=0 && nextX<n && nextY>=0 && nextY<m && minD<=restCount){
            const returnValue=dfs(path+d, [nextX, nextY], restCount-1, n,m, eX,eY );
            if(returnValue)return returnValue;
        }
    }
    
}
    
