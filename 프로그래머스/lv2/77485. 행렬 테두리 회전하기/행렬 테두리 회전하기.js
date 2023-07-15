function solution(rows, columns, queries) {
   //행렬에서 직사각형 모양의 범위를 여러번 선택해서 테두리부분을 시계방향으로 한칸씩 회전
    //(x1,y1, x2, y2)는 직사각형범위 x가 행, y가 렬
    const indexQueries=queries.map(query=>query.map(v=>v-1));
    const board= Array.from({length:rows} ,(_,i)=>Array.from({length:columns}, (_,idx)=>(i*columns)+(idx+1)));
    const result =[];
    for(let a  of indexQueries){
      // 어떻게 돌리냐?temp에 자기값을 넣고 앞에것을 땡겨온다. 
        const numbers=new Set();
        const [x1,y1, x2,y2]=a;
        let temp=[board[x1][y1]];
        
        for(let i=y1+1; i<=y2; i++ ){
            const pre=temp.shift();
            numbers.add(pre);
            temp.push(board[x1][i]);
            board[x1][i]=pre;
        }
        for(let i=x1+1; i<=x2; i++){
            const pre=temp.shift();
            numbers.add(pre);
            temp.push(board[i][y2]);
            board[i][y2]=pre
        }
        for(let i=y2-1; i>=y1; i--){
            
            const pre= temp.shift();
            numbers.add(pre);
            temp.push(board[x2][i]);
            board[x2][i]=pre;
        }
        for(let i=x2-1; i>=x1; i--){
           
            const pre=temp.shift();
            numbers.add(pre);
            temp.push(board[i][y1]);
            board[i][y1]=pre;
        }
        result.push(Math.min(...numbers))
    }
    return result 

}
