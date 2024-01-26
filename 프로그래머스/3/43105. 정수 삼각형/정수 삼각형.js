function solution(triangle) {
   const dp=[triangle[0]];
    for(let i =1; i<triangle.length; i++){
        const a= triangle[i];
        const ar=Array.from({length:a.length});
        for(let j=0; j< a.length; j++){
            if(j===0){
                ar[0]=a[0]+dp[i-1][0];
            }else if(j===a.length-1){
                ar[j]=a[j]+dp[i-1][j-1];
            }else ar[j]=a[j]+Math.max(dp[i-1][j-1], dp[i-1][j]);
        }
        dp.push(ar);
    }
    return Math.max(...dp[dp.length-1]);
}