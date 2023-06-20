function solution(n)
{   //split으로 각 자릿수를 하나씩 나누어주고 
    // reduce를 통해서 합해준다. 
//     let str=n.toString().split("");
//     let answer=str.reduce((pre,cur)=>pre+(cur*1),0);
    
//     // [실행] 버튼을 누르면 출력 값을볼 수 있습니다.
//     console.log(answer)
    let answer=0;
    while(n>=1){
        answer+=n%10;
        n=Math.floor(n/10);
    }

    return answer;
}