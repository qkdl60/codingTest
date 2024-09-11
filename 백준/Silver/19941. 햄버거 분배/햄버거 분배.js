const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
let [N, line]= fs.readFileSync(filePath).toString().split("\n")
const [n,k]=N.split(" ").map(Number);
/*


최대 = .브루, 완탐

사람은 가장 왼쪽의 햄버거를 가져와야한다. 
n은 2만, k는 10으로 20 
*/
line=line.split('');
const hamList= Array(n).fill(true);
line.forEach((a,idx)=>{
    if(a==='P')hamList[idx]=false;
})


let count =0; 
for(let i = 0 ; i<n; i++ ){
    //+-k 범위를 탐색
    const a = line[i];
    if(a==='H')continue;
    const start= i-k <0 ? 0 :i-k;
    const end = i+k >=n? n-1: i+k 
    for(let j =start; j<=end; j++ ){
        const t = line[j];
        if(t==='H' && hamList[j]){
            count++;
            hamList[j]=false;
            break;
        }
        
    }
    
}
console.log(count)