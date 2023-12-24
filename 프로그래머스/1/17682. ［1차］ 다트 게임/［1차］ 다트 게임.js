/*
게임은 3번 진행 ,

S=> 1제곱
D=> 2제곱
T=> 3제곱
*=> 스타상, 해당점수와 바로 전 점수 각 2배
#=> 아차상, 해당점수 -로 전환
게임 3번을 어떤식으로 나누어야되나?최고는 정규 표현식, if문?
*/


function solution(dartResult) {
    let temp ='0';
    let prePoint=0;
    let totalPoint=0;
    dartResult=dartResult.split('');
    while(dartResult.length){
        const a =dartResult.shift();
        if( a==='1'&& dartResult[0]==='0'){
            temp='10';
            dartResult.shift();
        }else temp =a;
        const b=dartResult.shift();
        if(b==="D")temp**=2;
        else if (b==="T")temp**=3;
        
        if(isNaN(dartResult[0]) && dartResult[0]!==undefined){
            const c= dartResult.shift();
            if( c==='*'){
                temp*=2;
                totalPoint=Number(totalPoint)+Number(temp)+Number(prePoint);
            }else{ 
                temp*=-1;
                 totalPoint=Number(totalPoint)+Number(temp);
            }
           
            
        }else{
        totalPoint=Number(totalPoint)+Number(temp)
    }
         prePoint=Number(temp);
        temp=0;
        
    }
  
   return totalPoint
}