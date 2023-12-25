/*
문제가 뭔 말인지도 모르겟네 ㅠㅠ
각 음은 1분에 1개, 음악은 반드시 처음부터 재생, 길이보다 재생된 시간이 길다면 연속해서, 짧다면 처음부터 재생시간까지만
m은 네오가 기억하는 멜로디 , 방송된 곡 정보 musicinfos에 [시작 시각, 끝난 시각, 음악 제목, 악보 정보]
샵은 한글자로 바꿔준다.
*/
function solution(m, musicinfos) {
    
    const replace={'A#':"H", "C#": "I", "D#":"J", "F#": "K", "G#":"L"}
    for(const [target, replacement] of Object.entries(replace) ){
        m=m.replaceAll(target, replacement);
    }
    
    
    const playInfos=musicinfos.map((music,index)=>{
        let [s,e, title,melody]=music.split(",");
        for(const [target, replacement] of Object.entries(replace)){
           melody=melody.replaceAll(target, replacement); 
        }
        const [sh, sm]=s.split(":");
        const [eh, em]=e.split(':');
        const sTime=sh*60 + Number(sm);
        const eTime=eh*60 + Number(em);
        const runTime=(eTime-sTime);
        const melodyLength=melody.length;
        const playedMelody=melodyLength>=runTime? melody.slice(0,runTime): melody.repeat(Math.ceil(runTime/melodyLength))
        return {order:index, title,runTime, melody, playedMelody };
    })
    
    
    const filtered=playInfos.filter(info=> {
            const {playedMelody}=info;
        return playedMelody.includes(m);
    }).sort((a,b)=>{
        if( b.runTime===a.runTime)return a.index-b.index;
        else return  b.runTime-a.runTime;
    } )
    return filtered.length===0 ? "(None)": filtered[0].title;
    
}