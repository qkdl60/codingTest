function solution(s) {
    /*
    시도1. 브루트포스, 1~ s.length/2 까지 index 0부터 쭈욱 검사 
    */
    
    const length=s.length
    //문자열을 자를 떄 slice는 너무 오래 걸리나?, 원래 있던 배열은 그대로 두고 압축된배열을 다시 써야되나?
    if( length===1){
        return 1;
    }
    let min=Number.MAX_SAFE_INTEGER;
    // 1개부터 s의 절반까지만 잘라보면된다. 
    for(let i =1; i<=Math.floor(length/2); i++){
        let depressed='';
        let count=1;
        // i만큰 자르고 s 서치, s 서치시 연속되면 연속된 길이만큼 진행하고, 연속되지 않는다면 +1만큼 진행, for보다는 
        // while이 괜찮아보인다. 자르는것은 slice로 진행
        //window초기화
        let window=s.slice(0,i);
        let keepFlag=true;
        let startPoint=0;
        let endPoint=i
        while(keepFlag){
            //window 옆에랑 비교를 해줘야한다. 옆에는 어떻게 비교?slice? ,
            //while 종료 조건으?
            
            //비교군을 잘라준다. 다음 진행 분기처리 필요한가?
            
            const compareTarget=s.slice(endPoint, endPoint+i);
            if(window ===compareTarget ){
                count++;
                startPoint=endPoint;
                endPoint+=i;
                if(endPoint>length){
                    keepFlag=false;
                    depressed+=s.slice(startPoint,length)
                    break;
                }
            }else{
                if( count===1){
                    depressed+=window;
                     count=1;
                startPoint=endPoint;
                endPoint=startPoint+i;
                window=s.slice(startPoint, endPoint);
                    
                }else{
                    depressed+=(count+window);
                    count=1;
                    startPoint=endPoint;
                    endPoint+=i;
                    window=s.slice(startPoint, endPoint);
                                  
                }
            if(endPoint>length){
                 
                    depressed+=s.slice(startPoint,length)
                    keepFlag=false;
                    break;
                }
               
            }
            
            
        }
        min=Math.min(min, depressed.length)
        
    }
    
    return min
}