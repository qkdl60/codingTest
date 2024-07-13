/*
배열과 좌표
    (1,1)(2,1) 배열상 두 칸이지만 좌표는 점으로 길이는 1이다.
    배열을 점으로 이용할 것이다. 그리고 해당 좌표만 배열을 채워서 순화을 할것이다. 
    ㄷ자형태, 평행하는 테드리를 ㅁ자와 구별해야된다. 
    크기를 두배로 키운다. 
    
    
    
    
    
    
    
*/


function solution(rectangle, characterX, characterY, itemX, itemY) {
    const maxL=50;
    const map =Array.from({length:(maxL*2)+2}, ()=>Array.from({length:(maxL*2)+2}, ()=>0));
    
    const visited=Array.from({length:(maxL*2)+2}, ()=>Array.from({length:(maxL*2)+2}, ()=>0))
    //라인별 채워줘야되는 범위를 맵핑
    for(let a of rectangle){
        const [ldx, ldy,rtx,rty] =a.map(i=>i*2);
        for(let i= ldy; i<=rty; i++){
            for(let j= ldx; j<=rtx; j++){
                map[i][j]=1;
            }
        }
    }
   
   // 테두리 순회 
    const d= [[1,0], [-1,0], [0,1], [0,-1]]
    const result =[];
    visited[characterY*2][characterX*2]=1;
    let count =1; 
    let queue=[[characterY*2, characterX*2]];
    let flag=false;
    while(queue.length){
        const replace=[];
        count++;
        for(let [x,y] of queue){
            for(let [dx,dy] of d){
                const [nx, ny]=[x+dx, y+dy];
                            
                if( nx>=0 && nx<map.length && ny >=0 && ny <map.length && map[nx][ny]===1
                   && visited[nx][ny]===0 && isLine(nx,ny, map)){
                    visited[nx][ny]=1; 
                    if(nx===itemY*2 && ny === itemX*2){
                        flag=true;
                        break;
                    }
                    replace.push([nx,ny]);
                }
            }
            if(flag)break;
        }
        if(flag)break;
        queue=replace;
    }
    return (count-1)/2
    
    
   
}
function isLine(x,y, map){
    const d= [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1],[-1,-1], [-1,1]];
    for(let [dx,dy] of d){
        const [nx,ny]=[dx+x, dy+y];
        if(nx>=0 && nx<map.length && ny>=0 && ny<map.length && map[nx][ny]===0)return true;
    }
    return false;
}
