function solution(priorities, location) {
    let ar= [];
    const priorStack=[]
    // 우선순위 와 인덱스로 묶어서 저장
    priorities.forEach((v,i)=>{
        ar.push({lo:i, pri:v});
        priorStack.push(v);
    })
    //우선순위 정렬,
    priorStack.sort((a,b)=>a-b);
    let flag=false;

    let count=0;
    
    while(true){
        let newAr=[];
        //shift() 대신 for...of 사용    
        console.log(ar)
        for(let a of ar ){
            if(a.pri===priorStack[priorStack.length-1]){
                priorStack.pop();
                count++;
                if(a.lo===location){
                    flag=true;
                    break;
                }
            }else{
                newAr.push(a);
            }
        }
        if(flag)break;
        ar=newAr
    }
    return count
    
}