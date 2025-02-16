/*
    초당 최대 최라량=임의 시간부터 1초간 처리하는 요청의 최대 개수( 완료 여부 상관x)

    서버 타임아웃?
    모든 시간을 s로 변경, 
    15일 완료 기준으로 14일 요청이 있을 수 있다?     
    1초 시작, 2초 종료이면, 걸린시간은 2초이다 .
    
    -도 관리 필요 
*/
const getSeconds= (time)=>{
    const [h,m,s]= time.split(":");
    const [seconds, micro] = s.split('.');
    
    let totalSeconds=Number(seconds);
    totalSeconds+=Number(m)*60;
    totalSeconds+=Number(h)*60*60;

    
    return totalSeconds*1000 + Number(micro)
}

const getDistanceTime=(duration)=>{
    
    
}


function solution(lines) {
    const timeline= [];

    lines.forEach(t=>{
        const [date, time, duration]=t.split(' ')
        const [ds]=duration.split('s');
        const durationMS= Math.floor((Number(ds) -0.001)*1000)
        const  timeMS =getSeconds(time);
        console.log(durationMS, timeMS)
        const startMS =timeMS-durationMS;
        const endMS=timeMS+999;
        timeline.push(['start', startMS])
        timeline.push(['end', endMS])        
    })
    timeline.sort((a,b)=>{
        if(a[1]===b[1]){
            if(a[0]==='start')return -1;
            else return 1;
        }
        return a[1]-b[1];
    })
    let max = 0;
    let count =0;
    console.log(timeline)
    timeline.forEach(t=>{
        const [type, time ]=t; 
        if(type==='start')count++;
        else count--;
        
        max=Math.max(max, count )
    })
    return max
}