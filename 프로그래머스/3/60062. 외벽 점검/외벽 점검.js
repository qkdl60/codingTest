/*
취약 지점을 점검하기 위해 보내야 하는 친구 수의 최소값을 return 

원형으로 마지막,시작은 이어진다 
구간을 2개 반복해서 만든다 => 방향을 고려 안해도 된다.  

한명이 최대한 많은 구간을 감당해야된다.

순서에 따라서 가능 불가능 

친구들 순열의 수는 4만개 

출발지는 15개 

4 1 4 
 
  1 3 4 9 10 13 15 16 

*/
function solution(n, weak, dist) {
    // dist.sort((a,b)=>b-a);
    let answer = Infinity;
    const expanded=weak.map(i=>i+n);
    const total=weak.concat(expanded);
    const permutationList= getPermutation(dist, dist.length);
    
    for(let i = 0; i<weak.length; i++){
        const searchLine= total.slice(i, i+weak.length);
        for(let permu of permutationList){
            const result = calc(permu, searchLine);

            answer =Math.min(result, answer);
        }
        
    }
    return answer ===Infinity?-1: answer; 
}


const getPermutation=(arr, count)=>{
    const result= [];
    if(count===1)return arr.map(i=>[i]);
    
    arr.forEach((fixed,index,origin)=>{
        const rest= [...origin.slice(0, index,), ...origin.slice(index+1,)];
        const permutation= getPermutation(rest, count-1);
        
        permutation.forEach(i=>{
            result.push([...i, fixed])
        })
    })
    
    return result   
}
//친구들 순열과 weak배열을 받아서 순회에 필요한 인원을 반환
//return의 Infinity, 사용된 permu 수
/*



*/
const calc=(permutation, line)=>{
    
    let count = 0; 
    let currentLineIndex= 0;
    let isEnd= false;
    //친구들 순서대로 검사 
    permutation.forEach(f=>{
        if(isEnd)return; 

        let weakPoint= line[currentLineIndex];
        const cover=weakPoint+f;
        let nextLineIndex= currentLineIndex+1;
        let nextWeakPoint=line[nextLineIndex];
                
        while(weakPoint<=cover){
            currentLineIndex=nextLineIndex;
            weakPoint=line[currentLineIndex];
            nextLineIndex=currentLineIndex+1;
            nextWeakPoint=line[nextLineIndex];
            if(weakPoint===undefined){
                isEnd=true;
                break;
            }
        }
        count++;
    })

    return isEnd? count: Infinity;
    
}


