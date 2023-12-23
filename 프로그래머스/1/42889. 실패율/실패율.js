/*
실패율=스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 프레이어 수 
N은 전체 스테이지 수 ,states는 사용자들의 현재 멈춰있는 스테이지의 숫자이다.

result 는 실패율이 높은 스테이지 부터 내림차순으로 , 만약 실패율이 같다면 번호 작은 순으로 
스테이지에 도달한 유저가 없다면 실패율은 0 으로 
n+1은 모든 스테이지 통과 
각 유저의 스테이지 검사 => 머무르고 있는 스테이지 이 전까지 스테이지 +1, 머무르고 있는스테이지 +1

*/
function solution(N, stages) {
    //init 스테이지 
    const stage=[]
    for(let st=1; st<=N+1; st++){
        stage.push({st:st, current: 0, total: 0 });
    }
    for( let currentStage of stages){
       for(let i =0; i<=currentStage-1; i++ ){
           const {st, current, total}=stage[i];
           if( i<currentStage-1) stage[i]={st, current, total: total+1};
           else stage[i]={st, current: current+1, total:total+1}
       }
    } 
const failRate=stage.map(i=>{
    const {st, current, total}=i;
    return {st, rate: total===0? 0: current/total}
})
failRate.pop();
    // sort 기준 
const maped= failRate.sort((a,b)=>{
    if(b.rate===a.rate)return a.st-b.st;
    else return b.rate-a.rate;
}).map(i=>i.st)
 
    return maped
}