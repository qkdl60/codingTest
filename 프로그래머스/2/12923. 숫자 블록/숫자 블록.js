/*
완전탐색, 직접 구현은 길이가 너무 길어서x

index 에는 약수중 최대가, 소수이면 1 
*/
function solution(begin, end) {
  const result =[];
    for(let i=begin; i<=end; i++){
        result.push(getNumb(i))
    }
    return result
}


   
function getNumb(order){
    if(order===1)return 0;
    if(order===2)return 1; 
    if(order===3)return 1; 
    
    let answer=1;
   // 10,000,000 이하의 가장 큰 약수를 구하고 있다. 
        const resultArr=[]
        for(let i =2 ; i<=Math.sqrt(order) ; i++){
            if(order%i===0) {
                resultArr.push(i);
                if( order/i <=1e7)return order/i;
            }
        }
         return resultArr.length?resultArr[resultArr.length-1] : 1;
}