/*
숙련도에 따라 퍼즐을 풀 때 틀리는 횟수가 바뀌게 된다. 

- 난인도 <= 숙련도 
틀리지 않고 시간안에 해결 

- 난이도 > 숙련도 
난이도 - 숙련도 = 틑리는 회수 
틀릴 때마다 time_cur만큼 시간 사용 

제한 시간 내에 퍼즐을 모두 해결하기 위한 숙련도의 최솟값
*/
function solution(diffs, times, limit) {
    let left = 1; 
    let right= [...diffs].sort((a,b)=>a-b)[diffs.length-1]
    while(left<=right){
        const middle= Math.floor((left+right)/2);
        const isOver=isOverLimit(diffs,times, limit, middle);
        if( isOver){
            left=middle+1; 
        }else{
            right=middle-1;
        }
    }
   return left ;
    
    
}



function isOverLimit(diffs, times, limit, level){
    let answer =false; 
    let time = 0;
    for(let i=0 ; i<diffs.length; i++){
        const d= diffs[i];
        const index=i;
           if(d <= level){
            const t = times[index];
            time+=t; 
        }else{
            const prevT= times[index-1];
            const t= times[index];
            const reT=prevT+t; 
            const gap =d- level;
            const totalT= (reT*gap)+t; 
            time+=totalT;
        }
        if(time>limit){
            answer =true; 
            break;
        }      
    }
    return answer ; 
    
}