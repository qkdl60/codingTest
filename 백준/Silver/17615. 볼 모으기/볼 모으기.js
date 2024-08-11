const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt'
let [n, list]=fs.readFileSync(filePath).toString().trim().split('\n');
n=Number(n);
/*
한가지 색의 볼만 움직일 수 있다.

특정 기준으로 색을 정해야되나?
모두 시도하고 비교하기?

색을 정해도 어떻게 이동 시킬지 ? 

최소 이동 횟수 

색 
방향

*/


//타겟을 왼쪽으로 옮기는 경우
let targetB=false;
let targetR=false;

let targetBCount=0;
let targetRCount=0;

for(let i = 0 ; i<list.length; i++){
    const a= list[i];
    if(!targetB && a==="R")targetB=true;
    if(!targetR && a==='B')targetR=true;
    
    if(targetB && a==='B')targetBCount++;
    if(targetR && a==='R')targetRCount++;
}

let targetB2=false;
let targetR2=false;

let targetBCount2=0;
let targetRCount2=0;

//타겟을 오른쪽으로 옮기는 경우
for(let i =list.length-1; i>=0; i--){
       const a= list[i];
    if(!targetB2 && a==="R")targetB2=true;
    if(!targetR2 && a==='B')targetR2=true;
    
    if(targetB2 && a==='B')targetBCount2++;
    if(targetR2 && a==='R')targetRCount2++;
    
}

console.log(Math.min(targetBCount , targetBCount2, targetRCount, targetRCount2))