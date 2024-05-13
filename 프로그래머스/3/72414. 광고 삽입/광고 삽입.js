/*
    time HH:MM:SS => s으로 변경
    
    플레이 시간에 대한 배열을 만들고, 사람들의 시청 시간구간에 +1을 해준다. 
    
    광고시간을 슬라이드로 총합이 큰 값
    => 완전 탐색 방식으로 너무 클 것 같다 
    
    누적 시청 시간 기준으로 잡는다 . 누적 시청 시간이 중복 된다면 가장 빠른 시간을 리턴한다. 
    
    누적 시청 시간 => 시청자수*시청시간 
    
    누적합으로 배열 넣고 timeLine[startTime]-timeLine[endTime]=> 구간의 누적 시청시간 

*/

function solution(play_time, adv_time, logs) {
    const [ph, pm, ps]=play_time.split(':');
    const [adH, adM, adS]=adv_time.split(":");
    const adPlayTime=getSeconds(adH, adM, adS);
    const playTime=getSeconds(ph, pm, ps);
    const timeLine=Array(playTime).fill(0);
    const sumTime=Array(playTime).fill(0);
    //[시작시간, 종료 시간]시작 시간 순으로 정렬을 해준다.start, end를 나누어서 배치하고 end를 만나기 전에 
    
    const secondsLogs=logs.map(log=>{
        const [startTime, endTime]=log.split('-');
        const [sh,sm, ss]=startTime.split(':');
        const [eh,em,es]= endTime.split(':');
        const startSeconds=getSeconds(sh,sm,ss);
        const endSeconds=getSeconds(eh,em,es);
        return [{type:'start', time:startSeconds}, {type:'end', time:endSeconds}];  
    }).flat().sort((a,b)=>{
        if(a.time===b.time){
            //end를 먼저 놓는다 
            if(a.type==='start')return 1;
            return -1;
        }
        return a.time-b.time;
    })
    secondsLogs.forEach((log)=>{
        const {type, time}=log;
        timeLine[time]+=type==='start'? 1: -1;
    })
    for(let i=1; i<playTime; i++){
        timeLine[i]+=timeLine[i-1]
        sumTime[i]=sumTime[i-1]+timeLine[i];
    }
    let sum =0;
    let startTime=0;
    for(let i =0; i+adPlayTime<playTime; i++){
        const s= sumTime[i];
        const e= sumTime[i+adPlayTime];
        const p= e-s; ;
        if(p>sum){
            sum=p;
            startTime=i;
        }
    }
    if(startTime===0)return '00:00:00';
    else return getTime(startTime+1)
    
}

function getSeconds(h, m , s){
    const hs=Number(h)*60*60;
    const ms=Number(m)*60;
    const ss= Number(s);
    return hs+ms+ss;
}

function getTime(seconds){
    const s= seconds%60;
    const ms=Math.floor(seconds/60);
    const m=ms%60; 
    const h=Math.floor(ms/60);
    
    return`${h.toString().padStart(2, '0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
 }