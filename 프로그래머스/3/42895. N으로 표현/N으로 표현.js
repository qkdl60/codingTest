function solution(N, number) {
// m개를 사용했을 때 만들 수 있는 수들은 m-1개로 만든 수에서 +N, -N, *N, /N, NNNNNN..., 이다.=> 점화식

// a개로 만든 수(사칙)b개로 만든 수 
// NNNN을 어떻게 표현?  string=> number 타입 변환으로 
    const dp =Array.from({length:9}, ()=>[]);
    const visited=[];
    dp[0]=[0];
    dp[1]=[N];
    visited[0]=0;
    visited[N]=1; 
    
    for(let i=2; i<9; i++){
       //dp[i]에 대한 답들을 구한다.
        const resultSet = new Set();
        const NN=Number(Array(i).fill(N).join(''));
        visited[NN]=i;
        resultSet.add(NN);
        for(let j =0; j<i; j++){
            //0에서부터 j까지 dp[j]를 순회한다. 
            for(let k=0; k<dp[j].length; k++){
                //dp[j]를 순회한다.
                const a=dp[j][k];  
                for(let l=0; l<dp[i-j].length; l++){
                    //dp[i-j]를 순회 한다. 
                    const b =dp[i-j][l];
                    const plusValue=a+b; 
                    const minusValue=a-b;
                    const multiValue=a*b; 
                    const divdValue=a/b;
                    for(const c of [plusValue, minusValue, multiValue, divdValue]){
                        if(Number.isInteger(c) && c>0 &&visited[c]===undefined){
                            visited[c]=i;
                            resultSet.add(c);
                        }
                    }
                }
                
            }
        }
        dp[i]=[...resultSet];
        
    }

    return visited[number]!==undefined?visited[number]: -1
}