function solution(intStrs, k, s, l) {
   const answer=intStrs.reduce((acc,cur)=>{
       let e= s+l;
       const t=cur.slice(s,e);
       if(t>k)acc.push(+t);
       return acc
   },[])
   return answer
}