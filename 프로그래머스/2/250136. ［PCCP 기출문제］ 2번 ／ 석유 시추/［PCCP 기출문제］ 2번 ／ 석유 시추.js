/*
세로n, 가로 m, 
완탐x=>가로 완탐시 같은 덩어리를 탐색하는 경우가 있을거다. 
dfs 땅을 한번 완전 탐색 해서 dfs시 가로 최소,최대, 넓이 를 반환하도록

*/
function solution(land) {
    const quan=Array.from({length:land[0].length}, ()=>0);
    const n =land.length;
    const m=land[0].length
    for(let i =0; i<land.length; i++){
        for(let j=0; j< land[0].length; j++){
            if(land[i][j]===1){
                const [minY,maxY,quantity] = bfs(i,j,n,m, land);
               
                for(let k=minY; k<=maxY; k++ ){
                    quan[k]+=quantity;
                }   
            }
        
        }
    }

    return Math.max(...quan)
    
}


function bfs(sx,sy, n,m, land){
    const d=[[1,0],[-1, 0], [0,1], [0,-1]];
    let queue=[[sx,sy]];
    land[sx][sy]=0;
    let minY=sy;
    let maxY=sy;
    let quantity=1; 
    while(queue.length){
        const replaced=[];
        for(let [x,y] of queue  ){
            for(let[dx,dy] of d){
            const [nx,ny] =[x+dx, y+dy];
            if(nx>=0 && nx<n && ny>=0 && ny<m && land[nx][ny] ===1 ){
                minY=Math.min(minY, ny);
                maxY=Math.max(maxY, ny);
                quantity++;
                replaced.push([nx,ny]);
                land[nx][ny]=0;
            }
            
        }
            
        }
        
        queue=replaced;
    }
    
    return [minY, maxY, quantity];
}