function solution(keyinput, board) {
    //board의 크기는 항상 홀수 , 만약 9이면 -4,-3,-2,-1,0,1,2,3,4이다.  시작은 [0,0], 범위를 넘어가면 무시된다 .
    let x=0;
    let y=0;
    //범위를 계산하기 편하게 
    [board[0],board[1]]=[(board[0]-1)/2,(board[1]-1)/2]
    const xRange=[board[0]*-1, board[0]];
    const yRange=[board[1]*-1, board[1]];
    // 각입력에 맞추어서 
    for(let i of keyinput){
        i==="right"? x+=1:i==="left"? x-=1:i==="up"? y+=1:y-=1;
        x<xRange[0]?x+=1:x>xRange[1]?x-=1:x;
        y<yRange[0]?y+=1:y>yRange[1]?y-=1:y;
    }
    return [x,y]
    
}