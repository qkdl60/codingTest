function solution(arr) {
    let i =0;
    const stk=[];
    while(i<arr.length){
        if(stk.length===0){
            stk.push(arr[i]);
            i++;            
        }else{
            const l =stk[stk.length-1]
            if(l===arr[i]){
                stk.pop()
                i++
            }else{
                stk.push(arr[i])
                i++;
            }
        }
    }
    return stk.length>0? stk:[-1]
}