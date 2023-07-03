function solution(n, k) {
//     let m=k;
//     const answer=[];
//     while(m<=n){
//         answer.push(m);
//         m+=k;
//     }
    
//     return answer
    return Array.from({length:Math.floor(n/k)},(_,i)=>(i+1)*k)
}