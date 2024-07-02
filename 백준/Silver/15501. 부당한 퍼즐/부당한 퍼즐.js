/*
수열 2개 
1번 수열을 적절히 변형해서 2번으로 

1번에 대해서 할 수 있는 동작 2개 
- 뒤집기: 전체 순서 뒤집기 =>boolean으로 표시 
- 밀기 : 오른쪽이나 왼쪽으로 한 칸 씩 이동 : startIndex

 수열이 1,000,000 이다. 
 
두번째 수열start number를 찾고 순서대로 탐색?

필요한 것 
t의 startNumber
t의 진행 방향 

flag 사용방시 별로이다. 



*/
const fs =require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const [N, ...S]=fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const [a, t ]=S.map(i=>i.split(' ').map(Number));
let aIndex= a.findIndex(i=>i===t[0]);
let tIndex= 0;
// 앞, 뒤
const d=[1, -1];
//a의 진행 방향 정해주기, array 크기 예외 처리 필요 
const isGo=t[1] === (aIndex+1 ===n?a.at(-1): a[aIndex+1]);
const isBack=t[1] === (aIndex-1===-1?a.at(-1):a[aIndex-1]);

let playFlag=true;
let winFlag=true;

//둘다false true 일수 있다. 
if(n===1){
    winFlag=a[0]===t[0]
    playFlag=false;
}
if((isGo===isBack)&& playFlag){
    playFlag=false;
    winFlag=false;
}


const moveD=isGo?0:1;

//순회
while(playFlag){
    let nextIndex=aIndex+d[moveD];
    if(nextIndex===n)nextIndex=0;
    if(nextIndex===-1)nextIndex=n-1;
    aIndex=nextIndex;
    tIndex++;
    // 모두 순회하면 종료;
    if(tIndex===n)break;
    if(a[aIndex]!==t[tIndex]){
        winFlag=false;
        break;
    }
    
}

console.log(winFlag?'good puzzle':'bad puzzle')