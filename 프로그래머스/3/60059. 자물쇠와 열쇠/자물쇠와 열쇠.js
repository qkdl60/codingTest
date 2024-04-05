/*
자말쇠에서 구멍 부분 그래프 

키는 자물쇠보다 항상 작거나 같다 
키를 완전탐색으로 대본다. 
안된다면 회전 완전 탐색 

자물쇠에서 구멍난 곳만 체크하면 될까? => 시간초과는 없다 .


lock을 key 만큼 늘린다. => boundary 에러 피하기 
*/
function solution(key, lock) {
    const n=lock.length;
    const m= key.length;
    // lock이 모두 1인 경우
    const flatedLock=lock.flat(1);
    if(new Set(flatedLock).size ===1 && flatedLock[0] ===1) return true;

    // 확정된 lock은 어느 크기로?
    const expandedLength=n+(2*m)-2
    const expandedLock=Array.from({length:expandedLength}, ()=>Array.from({length:expandedLength}, ()=>1))
    // 확장된 lock 중간에 lock pattern 배치
    for(let i =0; i< n; i++){
        for(let j=0; j<n; j++){
            expandedLock[m+i-1][m+j-1]=lock[i][j];
        }
    }
   
    let copiedKey=Array.from({length:m}, ()=>Array.from({length:m}, ()=>0));
    for(let i = 0; i<m; i++){
        for(let j=0; j<m; j++){
            copiedKey[i][j]=key[i][j]
        }
    }
    
    for(let i =0; i<4; i++){
        
        //배치 지점
        for(let i=0 ; i<expandedLength; i++){
            for(let j =0; j< expandedLength; j++){
                
                const checkPattern= Array.from({length:expandedLength},
                ()=>Array.from({length:expandedLength}, ()=>0));
     
                // start [i,j]
                for(let k=0; k<expandedLength; k++ ){
                    for(let l=0; l<expandedLength; l++){
                        checkPattern[k][l]+=expandedLock[k][l];
                        if(k>=i && k<i+m  &&  l>=j && l<j+m){
                            checkPattern[k][l]+=copiedKey[k-i][l-j]
                        }
                    }
                }
                const resultCheck=check(checkPattern,m,n);
                if(resultCheck)return true;                
            }
        }
        copiedKey=rotate(copiedKey)
        
        
    }
    return false;

}

function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
}

// 검사 합친걸 넣어줘야한다. 어디 부터 검사해야하지 ? 
function check(pattern ,m,n){
    for(let i =m-1; i<m-1+n; i++){
        for(let j=m-1; j<m-1+n; j++){
            const a= pattern[i][j]
            if(a !==1)return false
        }
    }
    
    return true;
}


