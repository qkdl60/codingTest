function solution(park, routes) {
    // park에서 routes 대로 실행시 마지막에 있는 위치[y,x]
    //park는 직사각형, s는 스타트, o는 이동가능, x는 장애물
    //routes는 "방향 칸수"
    // 명령결과가 범위 밖, 장애물을 만나면 실행x, 다음 명령
  
    const dir={N:[-1,0], S:[1,0], W:[0,-1], E:[0,1]};
    const h=park.length;
    const w=park[0].length;
    let s=[];
    const x=[];
    //s지점 찾기
    for(let i=0; i<h; i++ ){
        let flag=false;
        for(let j =0; j<w; j++){
            if(park[i][j]==="S"){
                s.push(i,j);
                flag=true;
                break;
            }
        }
        if(flag)break;
    }
    
    for(let a of routes){
        const [d, c]=a.split(" ");
        let [cy, cx]=s;
        const [my, mx]=dir[d];
        let flag=false;
        for(let i =0; i<c; i++){
            const [ny,nx]=[cy+my, cx+mx];
            if( ny<h && ny>=0 && nx>=0 && nx<w && park[ny][nx]!=="X"){
                 cy=ny, cx=nx;
            }else{
                flag=true;
                break;
            }
           
        }
        if(!flag)s=[cy,cx];
        
    }
    return s
    
}