function solution(n, words) {
    /*
    말한 단어의 마지막 문자로 시작하는 단어를 말해야 한다.
    이전에 등장한 말x, 한 글자 단어x,
    가장 먼저 탈락하는 사람의 번호, 자신의 몇번째  차례에서 탈락하는지 , 탈락자가 없다면 [0,0]을 리턴
    */  
    // 이전 단어의 끝자리로 시작되는가?, 이 단어가 이전에 나온적있는가?     
    const dupleChecker=new Set();
    let failedIndex=null;
    for(let i =0; i<words.length; i++){
        const word=words[i];
        //각 단어가 이전에 있는지 확인
        if(!dupleChecker.has(word)){
            dupleChecker.add(word);
            if(i===0)continue;
            else{
                const preWord=words[i-1];
                if(preWord[preWord.length-1]!==word[0]){
                    failedIndex=i;
                    break;
                }
            }
        }else{
            failedIndex=i;
            break;
        }
           
    }
    return failedIndex===null? [0,0]:[failedIndex%n+1,Math.floor(failedIndex/n)+1]
    
    
    
    
    
    
    
    
    
    
//     const check=new Set();
//     check.add(words[0]);
//     for(let i=1; i<words.length; i++){
//         let preWord=words[i-1];
//         let curWord=words[i];
        
//         const order =i%n+1;
//         const count= Math.floor(i/n)+1;
//         if(preWord[preWord.length-1] != curWord[0]){
//             return [order,count];
//         }else{
//             if(check.has(curWord)) return [ order, count];
//             else check.add(curWord);
//         }
//     }
//     return [0,0]
}