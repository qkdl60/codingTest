function solution(dirs) {
    let now=[0,0];
    const path=new Set();
    for(let a of dirs){
        let [x,y]=now;
        if( (a== "R"|| a=="L") && x<=5 && x>=-5){
            let nextX= a=="R"? x+1: x-1;
            if(nextX>5 || nextX<-5) continue;
            path.add([x,y,nextX,y].join(""));
            path.add([nextX,y,x,y].join(""));
            now=[nextX, y];
        }else if((a=="U"|| a== "D") && y<=5 && y>=-5){
            let nextY= a=="U" ? y+1: y-1;
            if(nextY>5 || nextY<-5) continue;
            path.add([x,y,x,nextY].join(""));
            path.add([x,nextY,x,y].join(""));
            now=[x,nextY];
        }
    }
  return path.size/2
    
}