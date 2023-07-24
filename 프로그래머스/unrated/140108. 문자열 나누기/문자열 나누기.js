function solution(s) {
    /*첫 글자를 x, 왼쪽에서 오른쪽으로 x와 x가 아닌 다른 글자 들이 나온 횟수 처음으로 두 횟수가 같아지는 순간 stop, 문자열 분리, 남은 문자에대해서 위의 과정 반복  */
    let x =null;
    let same=0;
    let diff=0;
    let order=0;
    let result =0;
    while(order<=s.length){
        if(order===0){
            x=s[0];
            same++;
        }else{
            if(x===s[order])same++;
            else diff++;
        }
        
        if(same===diff){
            s=s.slice(order+1)
            order=0;
            result++;
        }else order++;
    }
    if(s.length>0)result++;
    return result 
}