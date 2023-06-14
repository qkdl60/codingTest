function solution(n) {
    //1칸 뛰기, 2칸뛰기 
    //1번으로 가는 방법=>0번에서 1칸뛰기(1가지), 2번으로 가는방법=> 1번에서 1칸, 0번에서 2칸(2가지)
    //3번으로 가는 방법=>2번에서 1칸(2번까지는 2가지), 1번에서2칸(1번까지는 1가지)(총 3가지 )
    //.....점화식은 dp[n]=dp[n-1]+dp[n-2]가 된다. 점화식을 위해 dp에 인덱스 2까지는 넣어주어야 한다. 
    // 숫자가 너무 커질수 있음으로 넣기전에 num으로 각각 나눈 나머지들을 합쳐서 넣어준다. 
    const dp=Array.from({length:n+1}, ()=>0);
    dp[1]=1;
    dp[2]=2;
    const num=1234567;
    for(let i=3; i<=n; i++){
        dp[i]=(dp[i-1]%num)+(dp[i-2]%num);
    }
    return dp[n]%num;
}