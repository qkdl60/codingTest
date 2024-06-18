/*
필드 검사 타겟들 파쇄
재배열 
위 반복


맵에서 삭제
*/
const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
let m=fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(''));
const COLUMN_LENGTH=12;
const ROW_LENGTH=6;
let count=0;
while(true){
    const [map,removedCount]=removePuyo(m);
    if(removedCount===0)break;
    count++;
    arrangeField(map);
}
console.log(count)



/*
'.'이 아닌것을 순서대로 모으고, 해당 위치에 '.'을 넣어준다.
그리고 밑에서 부터 모아온 뿌요로 바꿔준다. 
*/
function arrangeField(map){
 
    for(let i =0 ; i<ROW_LENGTH; i++){
        let replace=''
        for(let j=0; j<COLUMN_LENGTH;j++){
            const a=map[j][i];
            if(a!=='.'){
                replace+=a;
                map[j][i]='.';
                
            }
            
        }
        replace=replace.split('')
        let index=11;
        while(replace.length){
            map[index][i]=replace.pop();
            index--;
        }
    }
};


function removePuyo(map){
  const directions=[[1,0], [-1, 0], [0,1], [0,-1]];
  const visited=Array.from({length:COLUMN_LENGTH}, ()=>Array.from({length:ROW_LENGTH}, ()=>false));  
    //재방문 막기 
    //지워져야되는 좌표 저장
  const target=[];
    //bfs로 진행
  for(let i=0; i<COLUMN_LENGTH; i++){
      for(let j = 0; j<ROW_LENGTH; j++){
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
                        if(nx>=0 && nx<COLUMN_LENGTH&& ny>=0 && ny<ROW_LENGTH && map[nx][ny]===a && !visited[nx][ny]){
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