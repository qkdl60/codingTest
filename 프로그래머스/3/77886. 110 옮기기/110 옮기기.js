/*


*/
function solution(s) {
  const answer = s.map(str=>{
    return sortByDic(str)
  })
  return answer ;
}
function sortByDic(numberStr){
    const strArr=numberStr.split('');
    let rest = [];
    let count =0;
    strArr.forEach(char=>{
        rest.push(char);
        const l= rest.length-1;
        const last = rest[l-2]+rest[l-1]+rest[l];
        if(last=='110'){
            count ++;
            rest.pop();
            rest.pop();
            rest.pop();
        }
    })
    
    let answer ='';
    for(let i = rest.length-1; i>=0; i--){
        const a= rest[i];
        if(a==='0'){
            answer = a+'110'.repeat(count)+answer;
            count=0;
        }else{
            answer =a+answer; 
        }
    }
    if(count>0){
        answer='110'.repeat(count)+answer;
    }
    return answer ;
}