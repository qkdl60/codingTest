function solution(number, k) {
   let answer=[];
    for(let i =0; i<number.length; i++){
        let a= number[i];
        
        while(k>0 && answer[answer.length-1] <a){
            answer.pop();
            k--;
        }
        answer.push(a);
    }
    answer= answer.slice(0, answer.length-k)
    return answer.join("")
}