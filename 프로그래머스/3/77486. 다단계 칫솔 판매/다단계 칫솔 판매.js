/*
enroll의 순서는 참여 순서이다.=> 부모가 먼저 나오가 자식이 나온다.  
판매가 중복되도 한번에 넘기는것이 아니라 개별로 넘겨야 한다 아니면 소수점 반올림 문제로 답이 달라질 수 있다. 
*/
function solution(enroll, referral, seller, amount) {
   const players={};
    for(let i =0; i<enroll.length; i++){
        const player=enroll[i];
        const parent=referral[i];
        players[player]={parent:parent,  totall: 0, }
      
    }
    for(let i =0 ; i< seller.length; i++){
        const current=seller[i];
        const sell= amount[i];
        const income=sell*100;
        const commission=Math.floor(income/10);
        //수수료 빼주기 
        players[current].totall+=(income-commission);
        const parent=players[current].parent
        if(parent!=='-') getNetworkingIncome(parent, commission);
    }
    const result=Object.keys(players).map(i=>players[i].totall)
    return result;
       
function getNetworkingIncome(parent, commission){
    if(commission===0) return; 
    const nextCommission=Math.floor(commission/10);
    players[parent].totall+=(commission-nextCommission);
    const nextParent=players[parent].parent
    if(nextParent!=="-")getNetworkingIncome(nextParent, nextCommission ) ;
    
}

}