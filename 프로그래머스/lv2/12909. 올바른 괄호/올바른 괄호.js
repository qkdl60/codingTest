function solution(s){
  
    let count=0;
    if(s[0]===")")return false
    for(let i=0; i<s.length; i++){
        if(s[i]==="(")count++
        else{
            if(count===0)return false;
            count--;
        }
    }
    return count===0
}