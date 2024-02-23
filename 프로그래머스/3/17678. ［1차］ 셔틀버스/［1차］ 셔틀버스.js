/*

셔틀을 탈 수 
마지막 셔틀을 타고 싶다. 

셔틀은 09:00 부터 총 n회 t 분 간격으로 역에 도착, 셔틀에 최대 m명 탑승
셔틀은 대기한 인원들 태우고 바로 출발 

마지막 셔틀시간보다 크다면 timetagle에서 모두 제외, 고려 필요 x

제일 마지막 버스를 타고 싶다. 
마지막 버스에 타는 인원들을 확인해보자
*/
function solution(n, t, m, timetable) {
    
    const startTime=(9*60);
    const endTime=(23*60)+59;
    
    const busTable=[startTime];
    for(let i=1; i<n ;i++){
        const a=t*i;
        busTable.push(startTime+a);
    }
    const lastBus=busTable[busTable.length-1];
    
    const sorted=timetable.map(i=>{
        const [h,m]=i.split(":").map(Number);
        return (h*60)+m 
    }).filter(i=>i<=lastBus).sort((a,b)=>b-a);
 

    // 마지막 셔틀을 타고 싶다 .
    // 셔틀에 태우고 자리가 있다면 셔틀 시간에 맞춰서, 없다면 마지막 탑승 인원 -1 
    const bus=Array.from({length:n}, ()=>[]);
    busTable.forEach((b, index )=>{
        for(let i =0; i<m; i++){
            if(sorted.length===0)break; 
            const a =sorted[sorted.length-1];
            if(a<=b)bus[index].push(sorted.pop());
        }
        //해당 시간보다 작거나 같고 앞에 m명을 빼준다. 
    })
    const result = bus[bus.length-1].length<m? lastBus: bus[bus.length-1].pop()-1
    return `${Math.floor(result/60).toString().padStart(2,0)}:${Number(result%60).toString().padStart(2, 0)}`
}