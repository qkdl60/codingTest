/*
석순 , 종유석 교차로 나온다.
문제만 보면 완전탐색인데, 제한 사항보면
2<=n<=200,000 , 2<=h<=500,000 이다. 
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...L]= fs.readFileSync(filePath).toString().trim().split('\n')
const [n,h]=N.split(" ").map(Number);

const countArray=Array(n+1).fill(0);

const list =L.map(Number);
const upList =list.filter((_,index)=>0===index%2).sort((a,b)=> a-b);
const downList= list.filter((_,index)=>1==index%2).sort((a,b)=>a-b);
let answer=Number.MAX_SAFE_INTEGER;
for(let i =1; i<=h; i++){
    const upH=h-i+1;
    const upCount=getCrashStartIndex(upList, i);
    const downCount=getCrashStartIndex(downList, upH);
 
    const count= n-upCount-downCount;
    countArray[count]=countArray[count]+1;
    answer=Math.min(answer, count)
}
console.log( answer ,countArray[answer])




//해당 높이보단 큰 장애물이 시작되는 인덱스를 얻을 수 있다. 얻은 인덱스부터 뒤로는 다 부신다. 

function getCrashStartIndex(list, h){
    let max=list.length-1;
    let min=0;
    while(min<=max){
        const mid=Math.floor((min+max)/2);
        if( list[mid] >=h){
            max=mid-1;
        }else{
            min=mid+1;
        }
    }
    return min;
}