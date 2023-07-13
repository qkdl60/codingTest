function solution(dirs) {
    //처음 지나가는 길의 길이
    let now =[0,0];
    const move={"U":[1,0], "D":[-1,0], "R":[0,1], "L":[0,-1]}
    const path =new Set();
    for(let a of dirs){
        const [cy,cx ]=now;
        const [my,mx]=move[a];
        const [ny, nx]=[cy+my, cx+mx];
        if(nx>=-5 && nx<=5 && ny<=5 && ny>=-5){
            path.add([cy,cx,ny,nx].join(""));
            path.add([ny,nx,cy,cx].join(""));
            now=[ny,nx];
        }
    }
    return path.size/2
    
    
//     let now=[0,0];
//     const path=new Set();
//     for(let a of dirs){
//         let [x,y]=now;
//         if( (a== "R"|| a=="L") && x<=5 && x>=-5){
//             let nextX= a=="R"? x+1: x-1;
//             if(nextX>5 || nextX<-5) continue;
//             path.add([x,y,nextX,y].join(""));
//             path.add([nextX,y,x,y].join(""));
//             now=[nextX, y];
//         }else if((a=="U"|| a== "D") && y<=5 && y>=-5){
//             let nextY= a=="U" ? y+1: y-1;
//             if(nextY>5 || nextY<-5) continue;
//             path.add([x,y,x,nextY].join(""));
//             path.add([x,nextY,x,y].join(""));
//             now=[x,nextY];
//         }
//     }
//   return path.size/2
    
}