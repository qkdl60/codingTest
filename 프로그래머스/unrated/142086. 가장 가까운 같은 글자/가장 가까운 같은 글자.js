function solution(s) {
    
    /* s의 각 위치마다 자신보다 앞에 나왔으면서 자신과 가장 가까운 곳에 있는 같은 글자 */
    s=s.split("");
    
    //처음 나왔다면 -1, 
    const answer=[];
    for(let i =0; i<s.length ; i++){
        //indexof와 i 를 비교해서 같다면 -1, 다르다면 그차이를 넣어준 후 중복방지 처리
        let a =s[i];
        let idx=s.indexOf(a);
        if(idx ===i)answer.push(-1);
        else{
            answer.push(i-idx)
            s[idx]=0;
        }
    }
   return answer
}