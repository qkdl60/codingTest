/*
0번 인덱스가 완호
[근무 태도 점수, 동료 평가 점수 ]

두 점수가 모두 낮은 경우가 한 번이라도 있다면 인센x 그렇지 않은 사람들 중에 석차를 낸다 .

두 점수의 합이 높은 순으로 석차, 동급 석차가 있다면 같은 석차로 뒤의 석차가 하나 없어진다. 

인센을 못받으면 -1 리턴, 석차를 리턴

idx=> 0이 완호 

최대 100,000

두 점수가 다른 임의의 사원보다 모두 낮은 경우=>  총합이 작다 .
원호보다 낮은 총합이 낙다면 고려할 필요 없다. 
현재 크기로는 이중 반복x,  0 스코어로 정렬 후 이것  내 위에 점수에 대해서만 검사를 하면 된다 .

인센 못 받는 경우 확인, 필터 
줄세우기 

*/

function solution(scores) {
    //인덱스 저장을 위해 객체형태로 변환 
    const info=scores.map((i,idx)=>({idx, score:i,total: i[0]+i[1]}));
    const targetScore=scores[0][0]+scores[0][1];
    let maxScore=0;
    const sortedFilterd=[...info].filter((i)=>{
        if(i.total< targetScore)return false;
        return true;
    }).sort((a,b)=> {
        if(a.score[0]!==b.score[0])return b.score[0]-a.score[0];
        else return a.score[1]- b.score[1]; // 같은 경우를 위해서 
    }).filter((i, index, origin)=>{
        //내 앞에서 가낭 큰 값보다 작다면  두 점수 모두 낮은것이다. 
        if(maxScore>i.score[1])return false;
        maxScore=Math.max(maxScore, i.score[1]);
        return true;
        // for(let j=0 ; j<index; j++ ){
        //     const a= origin[j];
        //     if(a.score[1]>i.score[1]) {
        //         return false
        //     }
        // }
        //  return true;
    })
    let answer = -1;
    let flag=true;
    sortedFilterd.forEach(i=>{
        if(i.idx ===0){
            flag=false;
            return;          
                      }
    })
    
    if(flag)return answer; 
    //없는 경우 얼리 리턴 필요 
    
     
   const grade= sortedFilterd.sort((a,b)=>{
        if(  (b.score[0]+b.score[1]) === (a.score[0]+a.score[1]))return a.idx-b.idx ;
        else return (b.score[0]+b.score[1]) - (a.score[0]+a.score[1])
    }).forEach((i,idx)=>{
       if( i.idx === 0 )answer = idx+1;
   })
    //현재 순서에서 위에 동급이 있냐가 
    return answer ;
   
    
}