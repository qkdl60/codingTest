function solution(board, moves) {
   //보드에서 맨위 하나를 들어서 바구니에 넣는다. 2개가 연속되면 사리진다.  바구니는 크기 제약x
    //board 인형이 놓인 상태, moves 집게 움직임  모두 작동시킨 후 사라진 인형개수
    //배열 안의 0은 빈칸, 
    /*
    [[0,0,0,0,0],
     [0,0,1,0,3],
     [0,2,5,0,1],
     [4,2,4,4,2],
     [3,5,1,3,1]]
    */
    //움직임을 인덱스로 표현한다. 
    const n=board.length;
    const idxMoves=moves.map(v=>v-1);
    // 집은 인형을 넣을 바구니
    const basket=[];
    //삭제한 카운트
    let count=0;
    for(let l of idxMoves){
        let h=0;
        //0이 아닌 숫자가 나올때까지 내려가기
        while(h<n){
            if(board[h][l] === 0)h++;
            else{
                //0이아닌 숫자가 나오면 바구니에 넣고 0 넣어주기 
                basket.push(board[h][l]);
                board[h][l]=0;
                break;
            }
        }
        //바구니 검사 , 길이가 1보다 클때, 1,2번째 검사 같다면 두개 뽑아주고 count+2; 
        if(basket.length>1 && (basket[basket.length-1] === basket[basket.length-2])){
            basket.pop();
            basket.pop();
            count+=2;
        };
    }
    return count
    
}