const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt'
let [[n], [m], list] =fs.readFileSync(filePath).toString().trim().split('\n').map(v=>v.split(' ').map(Number));
const board=new Map();

for(let a of list ){
    if(board.has(a)){
        board.set(a, board.get(a)+1);
    }else{
        
        if(board.size<n){
            board.set(a, 1);
        }else{
            //board에서 가정적은 것을 삭제해준다 추천수가 같다면 앞에것을 뺴준다. 
            let minKey=null;
            let min=Number.MAX_SAFE_INTEGER;
            board.forEach((value,key)=>{
                if(value<min){
                    min=value;
                    minKey=key;
                }
                
            })
           
            board.delete(minKey);
            board.set(a, 1);
            
        }
    }
    
}
console.log([...board.keys()].sort((a,b)=>a-b).join(' '))

/*


*/

