function solution(number, k) {
    let num =number.split("");
    let answer=[];
    //제거 기준은 뒤에 있는 값보다 앞에있는 값이 작다면 제거대상, 제거시 그 앞에 인덱스도 다시 확인, 
    // 종료 기준은 k==0이 될때, 
    
    for(let i =0; i<num.length; i++){
        if(answer.length>0){
            if(k>0 && answer[answer.length-1]<num[i]){
                answer.pop();
                k--;
                i--;
            }else{
                answer.push(num[i]);
            }
        }else{
            answer.push(num[i])
        }
 
    }
    return k===0 ? answer.join(""): answer.slice(0,-k).join("");
    
}