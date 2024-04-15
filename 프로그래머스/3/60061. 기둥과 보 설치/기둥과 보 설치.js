
function solution(n, build_frame) {
    
    const map=Array.from({length:n+1}, ()=>Array.from({length:n+1}, ()=>[false,false]));
    
    const result=[]
    
    for(const [x,y,a,b] of build_frame){
        map[y][x][a]=b==1
        if(isOk(map))continue;
        map[y][x][a]=!map[y][x][a];
        
    }
    
    for(let i =0 ; i<=n; i++){
        for(let j =0 ; j<=n ; j++){
            for(let k =0 ; k<2; k++){
                if(map[j][i][k])result.push([i,j,k])
            }
        }
    }
    return result 
    
   
}


/*
기둥 [x,y]의 조건
1. [x,y-1]에 기둥이 있거나
2. [x, y]에 보가 있거나, x가 >0 [x-1,y]에 보가 있다. 


if(y>0 && map[y-1][x][0])continue;
if(map[y][x][1] || (x>0 && map[y][x-1][1]))continue;


보 [x,y]의 조건
1.[x,y-1]에 기둥이 있거나
2.[x+1,y-1]에 기둥이 있거나
3.[x-1,y]와 [x+1,y]에 보가 있거나


if(y>0 && map[y-1][x][0])continue;
if(y>0 && x<map.length && map[y-1][x+1][0])continue;
if(x>0 && x<map.length && map[y][x-1][1] &&  map[y][x+1][1])continue;

*/

function isOk(map){
    
    for(let i =0 ; i< map.length; i++){
        for(let j = 0 ; j< map.length; j++){
            for(let k =0; k<2; k++){
                 if(k===0 && map[i][j][0]){
                if(i===0)continue;
                if(i>0 && map[i-1][j][0])continue;
                if(map[i][j][1]|| (j>0 && map[i][j-1][1]))continue;
                return false;
                }
                if(k===1 && map[i][j][1]){
                if(i>0 && map[i-1][j][0])continue;
                if(i>0 && j<map.length-1 && map[i-1][j+1][0])continue;
                if(j>0 && j<map.length-1 && map[i][j-1][1] && map[i][j+1][1])continue;
                return false;
            }
                
                
                
            }
          
            
        }
    }
    return true;
}