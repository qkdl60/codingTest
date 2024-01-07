   /*
   무엇을 찾아야하나?
   최소값을 찾는 거면 완전탐색?
    어디를 쏴야하는 거지?
    그리디로 가자 => 중복되는 곳을 숫자로 쌓고 높은 곳을 앞에서 부터 쏜다. 해당 index가 속하느 개구간 미상일 제거 반복
   
   최대 크기를 배열을 만들면 배열 만드는 시간이 오래 걸린다. 
   targets 배열로 해결해야 한다.
   
   
   앞 부분 부터 먼저끝나는 , 뒷부분부터 먼저 시작하는 
   */

function solution(targets) {
    targets.sort((a,b)=>{
        const [as,ae]=a;
        const [bs,be]=b;
        
        return bs -as;
    })
    let x=targets[0][0];
    let shot=1;
    targets.forEach(i=>{
        const[s,e]=i;
            if(x>=e){
                x=s;
                shot++;
            }        
    })
 
return shot
    
}