function solution(numbers) {
    const reversed=numbers.reverse();
    const postOverNum=[];
    const overNum=[-1,];
    reversed.forEach((i,index,origin)=>{
        if(i<overNum[overNum.length-1])overNum.push(i);
        else if(i>=overNum[overNum.length-1]){
            while(overNum.length>0 && i>=overNum[overNum.length-1]){
                overNum.pop();
            }
            overNum.push(i);
        }
        
        if(index===0){
            postOverNum.push(-1);
          
        }else{
            const lastNum=origin[index-1];
            const lastPON=postOverNum[index-1];
        if(lastPON===-1){
            if(i>lastNum){
                postOverNum.push(-1);
              
            }else{
                 if(overNum.length>1 && overNum[overNum.length-2]>i)postOverNum.push(overNum[overNum.length-2]);
                else postOverNum.push(-1)
               
               
            }
        }else{
            if(i<lastNum){
                postOverNum.push(lastNum)
            
              
            }else if(i<lastPON){
                postOverNum.push(lastPON);
            }else{
               if(overNum.length>1 && overNum[overNum.length-2]>i)postOverNum.push(overNum[overNum.length-2]);
                else postOverNum.push(-1)
               
            }
        }
        }
    
        
    })
    console.log(overNum)
    return postOverNum.reverse();
 
}