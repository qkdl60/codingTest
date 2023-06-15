function solution(survey, choices) {
    
   
   //16개의 유형
    //7개의 선택지, n개의 질문
    //survey는 지표, choice 선택한 선택지(1~7, 1 :매우 비동의, 7 : 매우 동의 ) 
    // 앞에오는 것이 동의, 뒤에오는 것이 비동의 
    const total =survey.map((s, i)=> {return {survey: s, choice:choices[i]} });
    
    // choice 에대해 choice-4를 해주면 0 이이면 모두 0점, -이면 4-choice를 해서  뒤에 점수를 준다.
    const index=["RT", "CF", "JM", "AN"];
    
    const score=new Map();
    
    //index를 돌며 각 type 에 대한점수를 0점으로 초기화
    for(let i of index){
        let [i1,i2]=i;
        score.set(i1, 0);
        score.set(i2, 0);
    }
    
    
    // 4점을 기준으로 해당 타입에 점수를 주자 
    total.forEach(v=>{
        const {survey, choice}=v; 

        const a=choice-4; 
        if(a>0){
            score.set(survey[1], score.get(survey[1])+a);
        }else if (a<0){
            score.set(survey[0], score.get(survey[0])+(a*-1));
        }
    });
    
    // 인덱스는 사전순으로 묶여있어서 점수가 같다면 앞에것가 오면 된다. 
    let result="";
    for(let i of index){
        let[t1,t2]=i;
        let [t1Score, t2Score]=[score.get(t1), score.get(t2)];
        if(t1Score<t2Score){
            result+=t2;
        }else{
            result+=t1;
        }
        
    }
   
    return result ;
    
}