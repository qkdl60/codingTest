function solution(r1, r2) {
    let count = 0; 
    const m = r2*r2; 
    const l= r1*r1; 
    for(let x=1; x<=r2; x++){
        const a= x*x; 
 
        const b= m-a;
        const c= l-a;
        
        const d =Math.floor(Math.sqrt(b));        
        const e= c<=0?0:Math.ceil(Math.sqrt(c))
       
        count+=(  d-e+1);
 
        
    }
    return count*4
    
}


