/*

//짝수 인덱스가 -1, 홀수 인덱스가 -1, 

*/
function solution(sequence) {
    
    const even=sequence.map((v,index)=>index%2===0? v*-1: v); //짝수번째 수가 -1이 오는 경우
    const odd=sequence.map((v,index)=> index%2===1 ?v*-1: v); //홀수번째 수가 -1이 오는 경우

    const evenDp=Array.from({length:sequence.length+1}, ()=>0);
    const oddDp=Array.from({length: sequence.length+1}, ()=>0);``
    let max=Number.MIN_SAFE_INTEGER;
    for(let i= 1; i<=sequence.length; i++){
        evenDp[i]=Math.max(evenDp[i-1]+even[i-1], even[i-1]);
        oddDp[i]=Math.max(oddDp[i-1]+odd[i-1], odd[i-1]);
        max=Math.max(evenDp[i], oddDp[i], max);
    }
    
    
    return max
    
}