const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [T, ...line]= fs.readFileSync(filePath).toString().split("\n")
let t= Number(T);
/*

남규는 원형으로 인접한 옆 통나무로 건너뛰는데, 
이때 각 인접한 통나무의 높이 차가 최소가 되게 하려 한다.

인접한 => 부분만 생각 
*/
const answer =[];
while(t--){
    const n= Number(line.shift());
    const list = line.shift().split(" ").map(Number).sort((a,b )=> a-b);
    let left =0 ;
    let right = list.length-1;
    const result =[] ;
    let max= Number.MIN_SAFE_INTEGER;
    for(let i = 0; i<list.length; i++){
        const currentIdx =i%2===0?left++:right--
        const prevIdx= currentIdx-1<0?list.length-1:currentIdx-1;
        const nextIdx= currentIdx+1;
        const current=list [i];
        const prev= result[prevIdx]??current;
        const next = result[nextIdx]??current;
        max= Math.max(Math.abs(current-prev), Math.abs(current-next ),max);        
        result[currentIdx]=current;
       
    }
    answer.push(max);
    
    
}
console.log(answer.join('\n'))
