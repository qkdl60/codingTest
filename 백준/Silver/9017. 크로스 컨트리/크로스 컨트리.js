/*
    한 팀 6명, 팀 점수는 상위 4명의 합, 결승점 통과순으로 점수 획득, 점수의 합이 가장 낮은 팀의 우승 
    
    여섯명의 주자가 참가하지 못한 팀은 점수 계산에서 제외
    동점의 경우에는 다섯번째 주자가 가장 빨리 들어오는 팀이 우승 

    모든 선수의 등수가 주어질때 우승 팀을 구하는 프로그램
*/

const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':"./input.txt";
const [N,...s]=fs.readFileSync(filePath).toString().trim().split('\n');
const n=Number(N);
//테스트 케이스
const result=[];
for(let i =0; i<n; i++){
    const m=Number(s[2*i]);
    const rank=s[(2*i )+1].split(' ').map(Number);
   // 각 팀 명 수 확인 
   const teamMateCount=rank.reduce((acc,cur)=>{
       if(acc[cur]===undefined){
           acc[cur]=1;
       }else{
           acc[cur]++;
       }
       
       return acc
   }, {})
  //6명 안되는 팀원들 등수에서 제거한다. 
   const filteredRank=rank.filter(i=>{
       const mateCount=teamMateCount[i];
       return mateCount===6;
   })
   //등수로 점수 체크하기, [총점,mateCount, 5번째 index]
   const teamScore=filteredRank.reduce((acc,cur,index)=>{
       if(acc[cur]===undefined){
           acc[cur]=[index+1, 1, null];
       }else{
           const [totalScore, mateCount, fiveManIndex]=acc[cur];
           acc[cur]=[mateCount<=3?totalScore+index+1:totalScore, mateCount+1,mateCount===4?index: fiveManIndex ];
       }
       return acc;
   },{})
   //팀 점수로 우승자 정하기 ;
   let winner=null
   for(let teamNo of Object.keys(teamScore)){
       if(winner===null){
           winner=teamNo;
       }else{
           const [winScore,_, winFiveMan]= teamScore[winner];
           const [tScore, __, tFiveMan]= teamScore[teamNo];
           if(winScore>tScore)winner=teamNo;
           else if (winScore===tScore && winFiveMan>tFiveMan)winner=teamNo;
       }
   }
  
   result.push(Number(winner))
    
}
console.log(result.join('\n'))