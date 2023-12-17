function solution(plans) {
    
    
    
    /*
    진행중이던 과제가 끝냈을 때, 잠시 멈춘 과제가 있다면, 멈춰둔 과제를 이어서 진행, 여러개이면 최     근 것 부터, => 스택
    start를 모두 분으로 바꾸는게 계산이 쉽겠다. 
    시도1. plans를 돌리고 시작시간으로 진행 시간이 남으면 스택확인, 남은 시간 뺴주고, 없다면 다음 진행
    문제1. 남은 시간에 남은 과제를 하고도 시간이 남을 경우가 있다. 이 경우 다음 작업을 진행한다. 
    */
    // name은 소문자, start는'hh:mm',playtime은 분ㅇ로 
    const rest=[];
    const answer=[];
    // rest에 저장시 [name, resttime]형식으로 저장 
    const plansLength=plans.length;
    
    plans.map(plan=>{
        const [name,start, playtime]=plan
        const [h,m]=start.split(":");
        const startTime=(Number(h)*60)+Number(m);
        return [name, startTime, Number(playtime)];
    }).sort((a,b)=>{
        const [_,Atime,__]=a
        const [___,Btime,____]=b;
        return Atime-Btime;
    }).forEach((plan, index,mapedPlans)=>{
        //마지막 처리는 index로?, plans에 마지막을 임의로 넣어줄까?
        const [name, start, play]=plan;
        if(index<plansLength-1){
            const [_, nextStart,__]=mapedPlans[index+1];
            let restTime=nextStart-start;
            if(restTime<play){
                rest.push([name,play-restTime]);
            }else if(restTime===play || rest.length===0){
                answer.push(name);
            }else{
              
                answer.push(name);
                restTime=restTime-play
                while(restTime>0 && rest.length>0){
                    const [restName, restWorkTime]=rest.pop();
                    if(restTime>=restWorkTime){
                        answer.push(restName);
                        restTime=restTime-restWorkTime
                    }else{ 
                        rest.push([restName, restWorkTime-restTime]);  
                        restTime=0;
                    }
                }
            }
        }else answer.push(name);
    })
    if(rest.length>0){
    const restNames=rest.map(plan=>plan[0]).reverse();
        return [...answer, ...restNames]
    }else return answer
    
}