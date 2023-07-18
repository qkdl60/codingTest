function solution(n, arr1, arr2) {
  const answer=arr1.map((i,idx)=>{
      // 비트연산자 | 는  두 대상의 이진수가 0인 자리만 0으로 반환한다.  
      i=(i|arr2[idx]).toString(2);
      //길이를 채우주기 위해 padStart로 부족한자리는 0으로 채우준다. 
      i=i.padStart(n,0);
      //1을 #, 0을 " "으로 바꿔준다. 
      return i.replaceAll("1","#").replaceAll("0"," ");
  })
    return answer;
}