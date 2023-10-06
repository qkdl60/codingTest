function solution(prices) {
  /*
    가격이 떨어지지 않은 기간 => 오르거나 유지 
    1초 뒤 떨어지면 1초 유지한것 
    시간을 줄이는 법
    가격이 떨어진다는 기준은 해당가격기준이다 
  */
    const answer=[]

    for(let i = 0 ; i<prices.length-1; i++){
        const price=prices[i]
        let count=0;
        for(let j =i+1; j<prices.length; j++){
            const compare=prices[j];
            count++;
            if(price>compare)break
           
            
        }
        answer.push(count)
        
    }
    answer.push(0)
    
   return answer
}