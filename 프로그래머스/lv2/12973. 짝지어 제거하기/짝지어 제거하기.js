function solution(s)
{
//문자열 안에서 같은 알파벳이 2개 붙어있는 짝을 제거, 그둘을 제거 ,이것을 문자열안에서 반복, 문자열이 모두 제거된다면 짝지어 제거 성공

//     let chars=s.split("");
//     let flag =true;
//     let idx=0; 
     
//     while(flag){
//         const char1=chars[idx];
//         const char2=chars[idx+1];
//         if(char1=== char2){
//             chars.splice(idx, 2);
//             if(idx!==0)idx--;
//         }else{
//             idx++;
//         }
        
//         if(idx===chars.length || chars.length===0)flag= false;
//     }
//     return chars.length===0 ? 1: 0
    
    // 효율성 테스트x____________________________________
    
    const stack=[];
    for(let a of s){
        if(stack[stack.length-1]===a)stack.pop();
        else stack.push(a);
    }
    
    return stack.length===0? 1:0
        
    
    
    }
    
