const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [n,k,p,x]= fs.readFileSync(filePath).toString().trim().split(' ').map(Number);

/*
반전 => 켜진 부분은 끄고, 꺼진 부분은 켜고
1층 부터 

n 층 까지, 
k 자리 수 
p 최대 반전 가능 수
x 현재 층


비트연산자로  차이 개수 확인 가능 

맵핑된 이진수를 십진수 xor 비교 0 split, 
*/
// parseInt(,2).toString(10)

const lightCount={
  0:'1110111', 1:'0010010', 2:'1011101', 3:'1011011', 4: '0111010',
  5:'1101011', 6:"1101111", 7:"1010010", 8:"1111111", 9: "1111011"
}
const compareResult=Array.from({length:10}, ()=>Array(10));
for(let i= 0 ; i<10 ;i++){
    for(let j=0; j<10; j++){
        const count =compareCount(lightCount[i],lightCount[j]);
        compareResult[i][j]=count
        compareResult[j][i]=count;
    }
}

let answerCount=0;

for(let i =1 ; i<=n; i++){
    const current=x.toString().padStart(k, '0');
    const compareValue=i.toString().padStart(k,'0');
    let count=0;
    for(let j= 0; j<k;j++){
        const a =current[j];
        const b= compareValue[j];
        const c= compareResult[a][b];
        count+=c;
    }
    if(count<=p)answerCount++;
}
console.log(answerCount-1)




function compareCount(a,b){
    const parsedA=parseInt(a,2).toString(10);
    const parsedB=parseInt(b,2).toString(10);
    
    const bits= parsedA ^ parsedB;
    const count=bits.toString(2).split('0').join('').length;
    return count;
}