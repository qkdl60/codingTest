/*
필드 검사 타겟들 파쇄
재배열 
위 반복
*/
const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
let m=fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(''));

let count=0;
while(true){
    const [map,removedCount]=removePuyo(m);
    if(removedCount===0)break;
    count++;
    arrangeField(map)
}
console.log(count)






function arrangeField(map){
    const rowLength=map[0].length;
    const columnLength=map.length;
    for(let i =0 ; i<rowLength; i++){
        const replace=[];
        for(let j=0; j<columnLength;j++){
            const a=map[j][i];
            if(a==='.')replace.unshift('.');
            else replace.push(a);
        }
        for(let j=0; j<columnLength; j++){
            map[j][i]=replace[j]
        }
    }
    
    
    
};


function removePuyo(map){
  const directions=[[1,0], [-1, 0], [0,1], [0,-1]];
  const h=map.length;
  const w=map[0].length;
  const visited=Array.from({length:h}, ()=>Array.from({length:w}, ()=>false));  
    //재방문 막기 
    //지워져야되는 좌표 저장
  const target=[];
    //bfs로 진행
  for(let i=0; i<h; i++){
      for(let j = 0; j<w; j++){
          const a=map[i][j];
          if(a!=='.' && !visited[i][j]){
            //temp가 4개 이상이면 파괴한다
              visited[i][j]=true
            const temp=[[i,j]];
            let q=[[i,j]];
            while(q.length){
                const replace=[];
                for(let[cx,cy] of q){
                    for(let [dx,dy] of directions){
                        const [nx, ny]=[dx+cx,dy+cy];
                        if(nx>=0 && nx<h&& ny>=0 && ny<w && map[nx][ny]===a && !visited[nx][ny]){
                            visited[nx][ny]=true;
                            replace.push([nx,ny]);
                            temp.push([nx,ny]);
                        }
                    }
                }
                q=replace;
            } 
           
            if(temp.length>=4) target.push(...temp);
          }
      }
  }
  for(let [x,y] of target){
    map[x][y]='.';
  }
    return [map, target.length];
};