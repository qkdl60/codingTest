function solution(n, times) {
    //최대로 걸릴 시간 n/times.length*Math.max(times) 이 숫자 안에 답이 있고
    // 확인은 (걸릴시간/각 time의 정수값)==각 라인별 처리인원을 모두 더했을때 총원과 같다면 답이고, 값이 크다면 걸릴 시간을 줄이고, 값이 작다면 걸릴 시간 올리고
    let left=0;
    let right=n*Math.max(...times);
    let mid=Math.floor((left+right)/2);
    
    function expected(mid, times){
        return times.reduce((acc,cur)=>Math.floor(mid/cur)+acc,0)
    }
    let answer;
    while(left<=right){
        const expectedTotal=expected(mid,times);
        if(expectedTotal>=n)right=mid-1;
        else left=mid+1;
        
        mid=Math.floor((left+right)/2);
        console.log(left, mid, right)
    }
    return left;
    
    
  
    
}