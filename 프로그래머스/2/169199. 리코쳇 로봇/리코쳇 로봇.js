/*
 "."은 빈 공간을, "R"은 로봇의 처음 위치를, "D"는 장애물의 위치를, "G"는 목표지점을 나타냅니다.
 상, 하, 좌, 우 4방향 중 하나를 선택해서 게임판 위의 장애물이나 맨끝에 부딫힐 때까지 이동이 한번, G에서는 바로 멈추지 않는다 .

시도1. r 부터 브루트 포스로 넓이 우선 탐색, 이전 기록에 있다면 제외, 방문지점은v로 변경 (기록 방식은 메모리x) 
 
*/
function solution(board) {
    let start;
   const  testBoard=board.map(item=> item.split(''));
    
    const boardColumnLength=board.length;
    const boardRowLength=board[0].length;
 
    
    //start,체크 
    for(let row=0; row<boardColumnLength; row++){
        for(let index =0; index< boardRowLength; index++){
            if(board[row][index]==='R'){
                testBoard[row][index]='V'
                start=[row, index];
                break;
            }
        }
    }

   // BFS 준비 
    const directionX=[0,0,1,-1];
    const directionY=[1,-1,0,0];
    //반복만이 너무 많이 사용되는것 같다. 못 줄이나?
    let step= 0;
    let bfsArray=[start];
    const history=[]
    while(bfsArray.length){
        const newArray=[];
        for(let [x,y] of bfsArray){
            //현재 위치에서 이동, 이동한 위치 표시, 로봇을 어떻게 움직일지 ?
            for(let i =0; i<4; i++ ){
            let nextX=x+directionX[i];
            let nextY=y+directionY[i];
            //벽에 부딪히거나, 장애물에 부딪치면 stop
           while(nextX>=0 && nextY>=0 && nextX<boardColumnLength && nextY<boardRowLength && testBoard[nextX][nextY]!=='D'){
                nextX+=directionX[i];
                nextY+=directionY[i];
               
           }
            nextX-=directionX[i];
            nextY-=directionY[i];
            if(testBoard[nextX][nextY]==='.'){
                testBoard[nextX][nextY]='V';
                newArray.push([nextX,nextY])
            }else if(testBoard[nextX][nextY]==='G')return step+1;
                
        }
     
    }
           // newArray길이 확인 
        if(newArray.length===0)return -1;
        step++;
        bfsArray=newArray
    
}
}