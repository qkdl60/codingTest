/*
최대값을 찾아서 새로운 
각 위치를 알 필요가 있나? 거리만 가지고 중간자르기 ㄱㄱ
maxheap이 필요한가?
만약 {0,300,500} 과 같이 설치된 도로에 3개의 휴게소를 설치할 경우
차례대로 150, 400, 75 지점에 휴게소가 세워지게 되어 150이 결과 값으로 도출되지만
사실 100,200,400 지점에 3개의 새로운 휴게소를 설치한다면 정답은 100이 되는 반례가 존재한다.

간격을 s 라고 했을 때 간격이 s 보타 큰 곳은 한쪽에서 s 만큼 떨어진 곳에 박는다 그러면  최대 크기는 s로 통일된다.
이 후 새로 새운 건물들의 수가 m인지 확인 만약 m 보다 많다면 간격을 늘려주고 , 적다면 간격을 줄여준다. 

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N,L]= fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m,l]=N.split(" ").map(Number);
if(!L)L='';
const position=L.split(" ").map(Number)
position.push(0, l);
const distances=position.sort((a,b)=>a-b).reduce((acc,cur, index, origin)=>{
    if(index===0)return acc;
    const d= cur-origin[index-1]
   acc.push(d)
    return acc;
}, []);

let max=l-1;
let min=1;
while( min<=max){
    const mid=Math.floor((max+min)/2);
    let count=0;
    for(let d of distances){
       if(d>mid && d%mid!==0){
           const c=Math.floor(d/mid);
           count+=c;
       }else if(d>mid && d%mid ===0){
           const c=Math.floor(d/mid)-1;
           count+=c;
       }    
    }
    //들어간 집이 더 많다면 간격을 더 키워줘야한다.
    if(count>m){
        min=mid+1;
    }else{
        max=mid-1;
    }
}
console.log(min);






