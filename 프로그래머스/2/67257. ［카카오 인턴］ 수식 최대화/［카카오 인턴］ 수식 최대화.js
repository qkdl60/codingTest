function getPermutation(array,length){
    if(length===1)return array.map(i=>[i]);
    const result=[];
    for(let i =0; i<array.length; i++){
        const picked=array[i];
        const pre=getPermutation([...array.slice(0,i), ...array.slice(i+1)] ,length-1);
        const cur=pre.map(j=>[...j, picked]);
        result.push(...cur);
    }
    return result ;
    
}
/*
'*','+','-'의 순열 
결과가 마이너스일때만 절대값으로, 계산중에는 마이너스 그대로 진행
이 문제는 완전 탐색으로 
어떻게 계산하지 ?
*/
function calc(t1,t2, oper){
    switch(oper){
        case '+':
            return Number(t1)+Number(t2);
        case '-':
            return Number(t1)-Number(t2);
        case '*':
            return Number(t1)*Number(t2);
    }
}
//expression을 탐색하면서 원하는 숫자와 연산자를 분리해서 반환해준다.
function separate(expression){
    const numbers=[];
    const operations=[];
    let num='';
    expression.split("").forEach(i=>{
        if(isNaN(i)){
            operations.push(i)
            if(num.length){
                numbers.push(Number(num));
                num='';
            }
        }else{
            num+=i;
        }
    })
    numbers.push(Number(num))
    return [numbers, operations];
}
    
function solution(expression) {
    //우선순위 순열을 만들고
    const p=getPermutation(['*', '+', "-"],3);
   //숫자와 연산자 분리 
   const [numbers, operations]=separate(expression);
    // 우선순위 에따라서 계산 , 
   
    let max=0;
    p.forEach(i=>{
        //i는 우선순위별로 연산자가 담긴 배열
        //배열의 조작해기위해서 복사해준다.
        const nums=[...numbers];
        const oper=[...operations];
        
        i.forEach(j=>{
            //j는 현재 우선 순위 이다. 0
             // 해당 연산자 인덱스가 0이라면, 0과1 계산 후 0에 넣어주고 1은 빼준다. 해당 oper 도 빼준다.
            
            //while(oper.includes(j)){} 이런식의 계산 진행도 가능 이게 더 좋은 방법인것 같다. 
            for(let k =0 ; k<oper.length; k++){
                if(oper[k]===j){
                    const calced=calc(nums[k], nums[k+1],oper[k]);
                    nums.splice(k,1,calced);
                    nums.splice(k+1,1);
                    oper.splice(k,1);
                    k=-1;
                }
            }
        })
      const result=Math.abs(nums[0]);
    max=max<result?result: max;
        
    })
  
    return max;
}