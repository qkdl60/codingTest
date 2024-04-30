/*
4가지 항목을 반드시 선택
1. cpp, java,python 중 선택
2. backend, frontend 
3. junior, senior
4. chicken, pizza

조건을 만족하는  사람중 코테 점수 x 점 이상 받은 사람은 몇명?

info와 query를 변경해주자, query를 통해서 검색이 쉽도록 

info 크기는 1<=_<=50,000 이다. 
조건 크기 1<=_<=100,000 이다.
=> 완탐은 오버
=> 완탐이 안되면 이진, 정렬 ,

info를 어떻게 
점수와 조건을 분리 

query도
점수와 조건분리 
- 을 어떻게

info로 해당 조건에 몇개가 있는지로 만들어야 query를 통해서 1복잡도로 조회 할 수 있다. 
query로 만들면 info를 돌면서 이중으로 검색해야된다. 

*/
function solution(informations, query) {
    const map={};
    informations.forEach(i=>getCombination(i,map))
    //정렬
    for(const key of Object.keys(map))map[key].sort((a,b)=>a-b);
    const result=[]
    query.forEach(q=>{
        const key=q.split(" and ");
        const [last, s]=key.pop().split(" ");
        const targetScore=Number(s);
        key.push(last);
        const qKey=key.join("");
        const scores=map[qKey];
        const c=scores? search(scores,targetScore): 0;
        result.push(c)
    })
    return result
}
//조건 배열만 받아서 해당 될 수 있는 쿼리를 모두 만든다. 
function getCombination(condition, map){
    const c= condition.split(" ");
    const score=Number(c.pop());
    let result =[ '' ];
    c.forEach((a)=>{
        //a가 올 수 있고,'-'가 올 수 있다. 
        const replaced=[]
        result.forEach(pre=>{
            const A=pre+a
            const D=pre+'-'
            replaced.push(A, D);
            
        })
        result=replaced
    })
    result.forEach(key=>{
        if(map[key])map[key].push(score);
        else map[key]=[score];
    })
}

function search(scores, targetScore){
    let left =0
    let right=scores.length-1; 
    while(left<=right){
        const mid =Math.floor((left+right)/2);
        if(scores[mid]<targetScore){
            left=mid+1;
        }else{
            right=mid-1;
        }
    }
    return scores.length-left;
    
}