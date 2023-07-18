function solution(n, arr1, arr2) {
  // const answer=arr1.map((i,idx)=>{
  //     // 비트연산자 | 는  두 대상의 이진수가 0인 자리만 0으로 반환한다.  
  //     i=(i|arr2[idx]).toString(2);
  //     //길이를 채우주기 위해 padStart로 부족한자리는 0으로 채우준다. 
  //     i=i.padStart(n,0);
  //     //1을 #, 0을 " "으로 바꿔준다. 
  //     return i.replaceAll("1","#").replaceAll("0"," ");
  // })
  //   return answer;
    
    const bitAr1=arr1.map(v=>v.toString(2).padStart(n,0));
    const bitAr2=arr2.map(v=>v.toString(2).padStart(n,0));
    const map=Array.from({length:n}, ()=>Array.from({length:n}, ()=>1));
    for(let i =0; i<n; i++){
        for(let j=0; j<n; j++){
            const bit1=bitAr1[i][j];
            const bit2=bitAr2[i][j];
            map[i][j]=bit1==="0"&& bit2==="0"? " ":"#"
        }
        map[i]=map[i].join("");
    }
    return map
}
  