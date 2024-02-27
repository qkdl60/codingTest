/*
완전 탐색은 경우가 너무 많다. 
중간에 틀리면 그 뒤는 안봐도 된다.

완전탐색으로 한다면 검사했던 부분문자열을 또 펠린드롬인지 검사해야된다. 이 부분을 dp로 메모하자 

점화식을 어떤식으로, 배열을 어떻게 
dp[i][j]=boolean i부터j까지가 펠린드롬 여부
dp[i][i]는 자기 자신으로 항상 true이다. 

*/

function solution(s){
    const dp=Array.from({length:s.length}, ()=>Array.from({length:s.length}, ()=>null));
    let max= Number.MIN_SAFE_INTEGER;
    for(let i= 0; i<s.length; i++){
        for(let j=i; j<s.length;j++){
            const result = isP(dp, s, i,j);
            if( result )max=Math.max(j-i+1, max);
        }
    }
    
    return max
  
}

function isP(dp, s, l,r){
    let left=l;
    let right=r;
    while(left<=right){
        if(dp[left][right]!==null)return dp[left][right];
        else{
            const ls= s[left];
            const rs= s[right];
            if( ls === rs){
                const result = isP(dp,s, l+1, r-1);
                dp[left][right]=result ;
                return result ;
            }else{
                dp[left][right]=false;
                return false;
            }
        }
    }
    return true;
}