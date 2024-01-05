/*
두 성질을 만족하는 것 => 후보키
- 유일성
- 최소성

유일성을 가진 조합을 만든다 .조합안에서, 작은 후보키를 부분으로 가지고 있는 후보키는 제거 시킨다. 
*/
const checkIsPart=(pre, cur)=>{
    if( pre.every(i=>cur.includes(i)))return true;
    else return false;
}
const getPermutation=(array,length)=>{
        const result =[];
       if(length===1)return array.map(i=>[i]);
       
       for(let i=0; i<array.length; i++){
           const picked=array[i];
           const rest= array.slice(i+1);
           const preP=getPermutation(rest, length-1);
           const curP=preP.map(i=>[picked,...i])
        result.push(...curP);
        }
       
       return result ;
   }

const checkUnique=(keys,relation)=>{
    const keySet=new Set();
    for(let tuple of relation){
        let keyStr='';
        for(let key of keys){
           keyStr+=tuple[Number(key)]
        }
        keySet.add(keyStr);
    }
    return keySet.size===relation.length;
}
function solution(relation) {
    const obj={};
    for(let i =0 ; i<relation[0].length; i++){
        obj[i]=[];
    }
    relation.forEach((data)=>{
        data.forEach((i,index)=>{
            obj[index].push(i);
        })
    })
    const objKeys=Object.keys(obj);
    const keysLength=objKeys.length;
    const cKey=[];
    for(let i =1; i<=keysLength; i++){
        const keys=getPermutation(objKeys,i);
        cKey.push(...keys);
    }
    const uniqueKey= cKey.filter(i=>checkUnique(i,relation)).reduce((acc,cur)=>{
       
        if(acc.every(i=>!checkIsPart(i,cur)))acc.push(cur)
        return acc
    }, [])
    //[0,2]의 [0,1,2] 후자는 전자를 모두 가지고 있는 케이스 이다. 전자를 모두 가지고 있는 경우는 걸러준다. 
    return uniqueKey.length


   
    

}

