function solution(n, k) {
    let m=k;
    const answer=[];
    while(m<=n){
        answer.push(m);
        m+=k;
    }
    
    return answer
}