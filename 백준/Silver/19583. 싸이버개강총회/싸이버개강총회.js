/*
    개강 총회 시작 전: 입장 여부 확인, 시작 이전에 채팅 닉넴임으로 
    
    끝내고: 총회 끝난 이 후 채팅 닉네임으로 체크 



모든 시간 분 단위로 변환 

채팅기록 100000 으로 

출석이 확인된 학회원의 인원 수를 출력한다.
*/
const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [T,...S]= fs.readFileSync(filePath).toString().trim().split('\n');
const [startTime, endTime, streamEndTime]=T.split(' ');
const startMin=getTimePerMin(startTime);
const endMin=getTimePerMin(endTime);
const streamMin=getTimePerMin(streamEndTime);

const beforeStart=new Set;
const part=new Set();
let count=0;
for(let a of S){
    const [tStr, name]=a.split(' ');
    const time=getTimePerMin(tStr);
    if(time<=startMin)beforeStart.add(name);
    if(time>=endMin && time<=streamMin){
        if(beforeStart.has(name))part.add(name);
    }
}

console.log(part.size)



function getTimePerMin(str){
    const [h,m]=str.split(":").map(Number);
    return (h*60)+m
}