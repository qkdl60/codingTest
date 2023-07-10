function solution(board) {
    const dangerZone= [[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1], [0,1],[1,1]];
    const n =board.length;
    for(let i = 0 ; i<n; i++){
        for(let j=0; j<n; j++){
            let a= board[i][j];
            if(a===1){
                for(let b of dangerZone){
                    const [x, y]=b;
                    const [areaX, areaY]=[j+x,i+y];
                    if(areaX>=0 && areaX<n && areaY>=0 && areaY<n && board[areaY][areaX]===0){
                        board[areaY][areaX]=2;
                    }
                        
                }
            }
        }
    }
    return board.reduce((acc,cur)=>{
        let m =cur.filter(i=>i===0).length;
        return acc+m}, 0)
}