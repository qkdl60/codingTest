/*
총 n개의 강의가 들어가는 블루레이
강의는 연속으로 들어가야 한다. 
m개의 블루레이에 모든 영상을 녹화

블루레이 용량 크기 최소화


*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);
const list =L.split(" ").map(Number);
let max=list.reduce((a,c)=>a+c, 0)
let min=Math.max(...list);
let answer;
while(min<=max){
    const mid=Math.floor((min+max)/2);
    const count=countBlueray(mid);
    if(count<=m){
        answer=max;
        max=mid-1;
    }else{
        min=mid+1;
    }
    
}
console.log(min)
function countBlueray(volume){
    let resVolume=volume;
    let count=1;
    for(let a of list ){
        if(resVolume>=a)resVolume-=a;
        else{
            resVolume=volume-a
            count++;
        }
    }
    return count;
}
