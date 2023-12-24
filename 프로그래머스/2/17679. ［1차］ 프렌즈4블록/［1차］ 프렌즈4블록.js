/*
dfs, bfs , 구현

*/
function solution(m, n, origin) {
//검사는 지워지는게 없을 때 까지 진행 BFs 진행, 검사를 2*2로 진행?.
    const board=origin.map(i=>[...i]);
    let searchFlag=true;
    while(searchFlag){
        const checked=[];
        for(let i =0; i<m-1; i++){
            for(let j =0; j<n-1; j++){
                const [a,b,c,d]=[board[i][j],board[i+1][j],board[i][j+1],board[i+1][j+1]];
                if(a!=="_" && a===b && b===c && c===d){
                    checked.push([i,j]);
                    
                }       
            }
        }
        if(checked.length ===0)searchFlag=false;
        else{
            for(const [i,j] of checked ){
                board[i][j]="_";
                board[i][j+1]='_';
                board[i+1][j]='_';
                board[i+1][j+1]="_";
            }
            //변경된 블럭 자리바꾸는 것 구현 
            for(let i=0; i<n;i++){
                //*한 줄씩 빈칸 내리기 구현 어떻게 
                let newColumn=''
                for(let j =0; j<m; j++){
                   if( board[j][i]!=="_")newColumn+=board[j][i]
                }
                const newColumnArray=newColumn.padStart(m, '_').split("");
                for(let j=0;j<m; j++){
                    board[j][i]=newColumnArray[j];
                }
                
            }
            
        }
 
    }
    return board.reduce((acc, cur)=>{const deleteLength=cur.filter(i=> i==="_").length
    return acc+=deleteLength
    }, 0)
    
}