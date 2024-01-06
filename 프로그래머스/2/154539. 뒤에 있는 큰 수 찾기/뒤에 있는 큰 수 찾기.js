function solution(numbers) {
    // 
    //뒷 큰 수라서 배열 뒷부분만 신경쓰면되고 뒤에 부터 시작하는것이라 뒤집는것이 편하다.
    const reversed=numbers.reverse();
    //뒤에 있는 큰 수 들을 저장해 줄 배열 
    const postOverNum=[];
    //뒤에 수들을 감소 수열로 저장할 배열, 뒷 큰 수를 빠르게 찾기 위해서 기본 배열을 찾는것 보다 빠르다
    const overNum=[-1,];
    //뒤집어진 배열을 순서대로 돈다. 
    reversed.forEach((i,index,origin)=>{
        //overNum에 마지막 값보다 작다면 감소수열에 해당되므로 바로 넣어준다
        if(i<overNum[overNum.length-1])overNum.push(i);
        // 그렇지 않다면 큰 것이 나올때까지(i보다 작거나 같은 값은) pop을 시킨다. pop을 시켜도 되는 이유는 i보다 작은 값은 다음 큰수로서 의미가 없어서 버려도 된다.
        else if(i>=overNum[overNum.length-1]){
            while(overNum.length>0 && i>=overNum[overNum.length-1]){
                overNum.pop();
            }
            
            overNum.push(i);
        }
        //처음 값(맨 뒤에 있던 배열)은 무조건 -1, 
        if(index===0){
            postOverNum.push(-1);
        }else{
            //현재 값 바로 뒤에 있던 숫자 바로 뒷 수, 만약 이 값이 현재값보다 크다면 무조건 뒤에 있는 큰 수
            const lastNum=origin[index-1];
            
            //바로 뒤 있는 수의 뒤에 있는 큰 수,
            const lastPON=postOverNum[index-1];
            
        //바로 뒤 에 있는 수의 뒤 큰 수가 -1일 때
        if(lastPON===-1){
            // 바로 뒷 수의 뒤 큰 수가 -1이면, 바로 뒤에 수가 가장 크거나, 수가 없거나
            //바로 뒷 수의 뒤 큰 수가-1이고, 현재값이 바로 뒤에 있는 수보다 크거나 같다면 현재값은 가장 크므로 뒤 큰 수가 없다. 즉 -1
            if(i>=lastNum){
                postOverNum.push(-1);    
            // 현재값이 바로 뒷수보다 작은 경우
             }else{
                 // 바로 뒷 수가 현재 값보다 크다면 큰 뒤 수는 바로 뒷 수
                postOverNum.push(lastNum);
             }
        //바로 뒤 수의 뒤 큰 수가 -1이 아닐때,    
        }else{
            //바로 뒷 수가 현재 값보다 크다면 큰 뒤 수는 바로 뒷 수
            if(i<lastNum){
                postOverNum.push(lastNum)
            
             // 바로 뒷 수가 현재값 보다 작거나 같으며, 뒷수의 뒤 큰수가 나보다 크다면(lastNum<=i<lastPON) 
            }else if(i<lastPON){
                postOverNum.push(lastPON);
            }else{
               if(overNum.length>1 && overNum[overNum.length-2]>i)postOverNum.push(overNum[overNum.length-2]);
                else postOverNum.push(-1)
               
            }
        }
        }
    
        
    })

    return postOverNum.reverse();
 
}