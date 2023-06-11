function solution(picks, minerals) {
    //각 곡괭이는 종류에 상관없이 5개를 캔 후 x
    //최소한의 피로도로 광물을 캐고 싶다. 광물은 순서대로 , 광물이 없거나 곡괭이가 없거
    // 최소한의 피로도 return, 어떤 순서의 곡괭이로 일을 하고 나서의 피로도를 구해라 
    // picks 의 순서는 [dia, iron, stone];
    // picks의 총 갯수 *5 만큼의 길이 만큼만 minerals를 고려해주면된다 .
    const totalP=picks.reduce((acc,cur)=>acc+cur, 0);
    
    const toCheckMine= minerals.length>totalP*5? minerals.slice(0,totalP*5): minerals;
    const fatigue=[1, 5, 25];
    
    const picksStack=picks.reduce((acc, cur,i)=>{
        let pick=Array.from({length:cur}, ()=>i);
        acc.push(...pick);
        return acc;
    },[]).reverse();
    //pickStack에서 0==dia, 1==iron, 2===stone;
    
    //광물에대한 등급도 필요(string으로 비교를 하는것이아니라 등급으로 하면 대소를 비교 가능, 곡괭이 -광물 그레이드=> 1이면 피로도 5, 2이면 25, 0>=이면 1)
    let mineGrade=new Map();
    mineGrade.set("diamond",0);
    mineGrade.set("iron", 1);
    mineGrade.set("stone", 2);
    
    const mineGroups=[];
    
    const groupPoint=[];
    
    for(let i =0; i<toCheckMine.length; i+=5){
        let g=toCheckMine.slice(i,i+5);
        mineGroups.push(g);
        let point=g.reduce((acc,cur)=>{
            
            if(cur==="diamond"){
                return acc+25;   
            }else if(cur==="iron"){
                return acc+5;
            }else{
                return acc+1; 
            }
        },0);
        groupPoint.push({idx:mineGroups.length-1, point, cnt:g.length});
    }
      console.log(picksStack)
    const sortedGroup=groupPoint.sort((a,b)=>b.point-a.point).map((g, i)=>{
        const p =picksStack.pop();
        return {...g, pick:p };
    });
  
    const totalFatigue= sortedGroup.reduce((acc,cur)=>{
        let {idx, point, pick}=cur;
        let mines=mineGroups[idx];
        let fati=0
        for(let a of mines){
            let grade=mineGrade.get(a);
            let fg=pick-grade<=0 ? 0 : pick-grade;
            const f=fatigue[fg];
            fati+=f;
        }
        
        return acc+fati;
    }, 0)
    console.log(totalFatigue)
    return totalFatigue;
    // 포인트가 높을 수록 diamond, iron, stone 으로 
    // 앞에 stone, iron이 많다면 굳이 dia를?, 아니면 mine을 5개씩 자르고, 각 구간에 대한 점수를 내고  그 점수 순서대로 곡괭이를 지정해 준다. 
    //toCheckMine을 5개씩 묶어서 점수를 준다. 
    
}