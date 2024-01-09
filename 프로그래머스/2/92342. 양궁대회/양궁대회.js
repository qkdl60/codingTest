/*\
목표 
어피치와 가장 많은 점수 차를 만들고 싶다. 
-> 어피치가 맞춘 점수를 가져오면 어피치의 점수는 깍인다. 
점수가 차이가 같다면 낮은 점수를 여러개 맞춘 경우를 return 

해당 점수를 얻기 위해서는 어피치보다 한 발만 더 맞추면 된다. 
그리고 3발쏴서 10점을 얻는 것 보다. 1발로 7점, 1발6점, 1발5점이 더 좋은 값이다 .
그리고 같은 개수의 화살을 쓴다면 높은점수에 
어피치보다 두 발이상 더 맞추는 경우x, 어피치보다 적게  맞추는 경우x
그렇다면 각 점수에 대해서 어피치  보다 +1개를 쏘거나, 안쏘거나의 경우로 나눠진다.  
 재귀 조건, 화살개수 오버, 다 쓴 경우, 
 
완전 탐색은 조합 , 중복 가능
그리디 같은데 

조합을 만들 경우 stackover가 나네 , 
*/

//조합을 어떻게 만들어줘야 되나?dfs 말고, bfs로 
const getSum=(array)=>{
    return array.reduce((acc,cur)=>acc+Number(cur), 0);
}

const getCombination=(compareArray,arrowCount)=>{
   let result =[[]];
    
    for(let i=0;i<compareArray.length; i++ ){
        //0점에는 어피치보다 +1이거나 안쏘거나가 아니다.
        const shot=compareArray[i]+1;
        const replaceResult=[];
        for(let a of result){
            const next_shot=[...a, shot];
            const next_noShot=[...a,0];
            if( getSum(next_shot)>arrowCount)replaceResult.push(next_noShot);
            else replaceResult.push(next_noShot,next_shot);
            if( i===compareArray.length-1 && getSum(a)<arrowCount){
                replaceResult.push([...a, arrowCount-getSum(a)]);
            }
        }
        
    result=replaceResult;
    }
    return result.filter(i=> getSum(i)===arrowCount);
}

const compareLowestScore=(array1, array2)=>{
    for(let i=array1.length-1; i>=0; i--){
        const a= array1[i]
        const b= array2[i]
        if(a!==b)return a>b?array1: array2;
    }
    return [];
}

function solution(n, info) {
    //경우의  수르 다 뽑아주고
    const combination =getCombination(info, n);
    //각 경우의 수에서 점수를 비교한다. 
  
    let maxGap=0;
    let score=[-1];
    for(let a of combination){
        let apeachTotal=0;
        let lionTotal=0;
        
        for(let i=0; i<info.length; i++){
            const score=10-Number(i);
            const as=Number(info[i]);
            const ls=Number(a[i]);

            // 0인경우는 둘다 뺴줘야한다. 
            if(as!==0 && as>=ls)apeachTotal+=score;
            else if( ls!==0 && as<ls) lionTotal+=score;
        }
        
        const gap=lionTotal-apeachTotal;
        
        if(gap>0 && gap>maxGap){
           maxGap=gap;
           score=a;
         }else if(gap>0 && gap===maxGap ){
             //가장 낮은 점수를 더 많이 맞힌 경우
             const lower=compareLowestScore(score, a);
             score=lower;
         }
    }
    return score;
    
    
}