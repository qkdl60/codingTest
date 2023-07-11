function solution(keyinput, board) {
    let x=0;
    let y=0;
    [board[0],board[1]]=[(board[0]-1)/2,(board[1]-1)/2]
    const xRange=[board[0]*-1, board[0]];
    const yRange=[board[1]*-1, board[1]];
    
    for(let i of keyinput){
        i==="right"? x+=1:i==="left"? x-=1:i==="up"? y+=1:y-=1;
        x<xRange[0]?x+=1:x>xRange[1]?x-=1:x;
        y<yRange[0]?y+=1:y>yRange[1]?y-=1:y;
    }
    return [x,y]
    
}
