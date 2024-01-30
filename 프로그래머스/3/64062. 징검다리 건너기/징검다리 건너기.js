/*

stones 내림차순으로 정렬 후 꺼내서 각 돌의 크기 만치 빼준다. 
0이 연속으로 k이상으로 있다면 끝
stones 의 크기는 200,000 =>  효유성 테스트에서 x

k개씩 묶어서 최대 값을 구해줘 그 최대값의 최소값이 답이지 

이분탐색 파라미터 서치 
*/
function solution(stones, k) {
    let left=1; 
    let right= 200000000;
    while(left<=right){
        const mid=Math.floor((left+right)/2);
        const count =isOkay(mid);
        // count가 크다는건 너무 많이 지나갔다. 
      
        if(count>=k){
            right=mid-1;
        }else{
            left=mid+1;
        }
    }
  return left
    
    function isOkay(mid){
       
        let count =0;
        for(let i =0 ; i<stones.length; i++ ){
            const a =stones[i] -mid;
            a <=0 ?count++: count=0;
            if( count ===k)return count;
        }
            
        return count 
      
    }
    
   
}