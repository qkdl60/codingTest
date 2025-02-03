/*
로봇 크기 2*1

출발 위치 (1,1) 가로 상태 

앞뒤 구분없이 움직일 수 있는 상태 

도착은 로봇 두 칸 중 한칸이라도 가면 된다. 

회전 반경에 1이 있다면 안된다. 회전시 경로 확인 

이동, 회전 소요시간 1 초 

최소 시간 return 


*/
const m =[[0,1], [0,-1], [1,0], [-1,0]];
const r= [1, -1]
function solution(board) {
    const  n =board.length
    const visited = Array.from({length:n+2}, ()=>Array.from({length:n+2}, ()=>[false, false]));
    const map=Array.from({length:n+2}, ()=>Array.from({length:n+2}, ()=>1));
    for(let i = 0; i<n; i++){
        for(let j=0 ; j<n; j++){
            map[i+1][j+1]=board[i][j];
        }
    }
    visited[1][1][0]=true;
    
    let q=[[[1,1], [1,2]]]    
    let count =0;
    while(q.length){
        count++;
        let replace = [];
        for(const [p1,p2] of q){
            const [x1,y1]=p1;
            const [x2,y2]=p2;
            if((x2===n && y2===n)){
                replace=[];
                break;
            }
            const d =getD(x1,y1,x2,y2);
            for(let [mx, my] of m){
                const [nx1,ny1]=[x1+mx, y1+my];
                const [nx2,ny2]=[x2+mx, y2+my];
                if(map[nx1][ny1]===0 && map[nx2][ny2]===0 && !visited[nx1][ny1][d]){
                    const np1=[nx1, ny1];
                    const np2= [nx2, ny2];
                    visited[nx1][ny1][d]=true;
                    replace.push([np1, np2])
                }
            }
            for(let p of r){
                const nd= d===0?1:0;
                if(d===0){
                    //가로
                    //[x1,y1],[x1+p, y1]  [x2,y2][x2+p,y2]
                    if(map[x1+p][y1]===0 && map[x2+p][y2]===0){
                       if(p===1){
                           if(!visited[x1][y1][nd]){
                               visited[x1][y1][nd]=true;
                               replace.push([[x1,y1],[x1+p, y1]])
                           }
                           if(!visited[x2][y2][nd]){
                               visited[x2][y2][nd]=true;
                               replace.push([[x2,y2], [x2+p, y2]])
                           }
                       } else{
                            if(!visited[x1+p][y1][nd]){
                               visited[x1+p][y1][nd]=true;
                               replace.push([[x1+p,y1],[x1, y1]])
                           }
                           if(!visited[x2+p][y2][nd]){
                               visited[x2+p][y2][nd]=true;
                               replace.push([[x2+p,y2], [x2, y2]])
                           }
                           
                       }
                    }
                }else{
                    //세로
                    //[x1,y1][x1,y1+p] [x2,y2][x2,y2+p]
                    if(map[x1][y1+p]===0 && map[x2][y2+p]==0){
                        if(p===1){
                            if(!visited[x1][y1][nd]){
                                visited[x1][y1][nd]=true;
                                replace.push([[x1,y1],[x1, y1+p]]);
                            }
                            if(!visited[x2][y2][nd]){
                                visited[x2][y2][nd]=true;
                                replace.push([[x2,y2],[x2,y2+p]])
                            }
                            
                        }else{
                            if(!visited[x1][y1+p][nd]){
                                visited[x1][y1+p][nd]=true;
                                replace.push([[x1, y1+p], [x1,y1]]);
                            }
                            if(!visited[x2][y2+p][nd]){
                                visited[x2][y2+p][nd]=true;
                                replace.push([[x2,y2+p],[x2,y2]])
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
        }
        
        

        q=replace    
    }
    return --count; 
    
}
//0이 가로, 1이 세로
function getD(x1, y1, x2, y2){
    return x1===x2?0:1;
}
