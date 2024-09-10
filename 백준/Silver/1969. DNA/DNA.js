const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N, ...list]= fs.readFileSync(filePath).toString().split("\n")
const [n,m]=N.split(" ").map(Number);


/*
길이가 같고, 다른 개수 => hd

여러개 중 해당 인덱스의 많은 철자, 순서 상 앞 번

우선 순위로 뽑아야되나?
*/

let answer = ''
let sum=0;

for(let i =0 ; i< m; i++){
    
    let max= null;
    const count = {}
    
    for(let j=0; j<n; j++){
        const a = list[j][i];
        if(count[a])count[a]=count[a]+1;
        else count[a]=1;
        
        if(max===null)max=a;
        else if ((count[a]>count[max]) || (count[a]=== count[max] && a < max) )max=a; 
      
    }
    answer +=max
    for(let j =0 ; j<n; j++){
        const a =list[j][i];
        if(max!==a)sum++;
        
    }
    
}

console.log(answer+'\n'+sum)