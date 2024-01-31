/*
현재 위치에서 next포지션으로 이동방향으로 표시해준다. 다음으로 이동할때 직도 추가 이동방향이 변경된다며 커도로 추가
완전 탐색으로 시간이 많이든다 .


*/



function solution(board) {
    // 0은 진행방향 col, 1은row
   const pd={'10':0, '-10':0, '01': 1, '0-1': 1};
    const dir=[[1,0],[-1,0],[0,1],[0, -1]];
    const visited=Array.from({length:board.length}, ()=>Array.from({length:board[0].length}, ()=>Array.from({length:2}, ()=>Number.MAX_SAFE_INTEGER)))
    visited[0][0][0]=0;
    visited[0][0][1]=0;
    
    let qu=[[0,0,0], [0,0,1]];
    while(qu.length){
        const replaced=[];
        for(let a of qu){
            const [x,y,d]=a; 
            for(let i =0; i<4; i++){
                const [dx,dy]=dir[i]
                const [nx,ny]=[x+dx,y+dy];
                const nd= pd[(''+dx+dy)]
                const cost= d ===nd?  visited[x][y][d]+100: visited[x][y][d]+100+500;
                if( nx>=0 && nx<board.length && ny>=0 && ny<board[0].length && board[nx][ny]===0 
                   &&visited[nx][ny][nd]>cost){
                    visited[nx][ny][nd]=cost;
                    replaced.push([nx,ny,nd]);
                }
            }
        }
        qu=replaced;
        
    }
    
return Math.min(...visited[board.length-1][board[0].length-1])
    
    
}

