const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [[n,m,b], ...map]=fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(' ').map(Number))

/*
평탄화 방법 
제거시 블록의 개수는 늘어난다. 
1. 블록을 제거, 2초
2. 블록을 놓기, 1초

최소 시간과 높이 출력, 답이 여러개 땅의 높이가 가능 높은 것 

높이는 음수x, 256블록 이상이 될 수 없다. 

완탐 
*/
let minH=Number.MAX_SAFE_INTEGER;
let maxH=Number.MIN_SAFE_INTEGER;

for(let i =0 ; i<n ; i++){
    for(let j =0 ; j <m ;j++){
        const a= map[i][j];
        maxH=Math.max(maxH, a);
        minH=Math.min(minH, a);

    }
}

let record=Number.MAX_SAFE_INTEGER;
let height;

for(let i =minH; i<=maxH; i++){
    let blockCount=b; 
    let time=0;
    for (let j=0; j<n; j++){
        for(let k=0; k<m; k++ ){
            const a=map[j][k];
            const gap = i-a; 
            if(gap>0){
                blockCount-=gap;
                time+=gap;
            }else{
                blockCount+=(gap*-1)
                time+=(gap*-2);
            }
        }
    }

    if(blockCount<0)continue;
    if(record>time){
        record=time;
        height=i;
        continue;
    }
    if(record===time && height<i){
        height=i;
        continue;
    }
}

console.log(record+' '+height)