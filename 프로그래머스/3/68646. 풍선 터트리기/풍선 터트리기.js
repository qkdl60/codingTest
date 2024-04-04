/*
인접한 두 풍선을 선택한다. 
인접한 두 풍선 중 하나를 터트린다. 
1번만 작은 것을 터트릴 수 있고 
나머지는 큰 것을 터트린다. 

n번으로 


그럼 무조건 터지는 조건은?  정렬 배치도 영향을 준다 

최장 수열? 언제한번 작은것을 넘어갈지 ?  두 풍선 선택 의미가 없지 않나? 

큰것을 제거할때는 가장 작은 수 만 제거 되지 않을 수 있다 .
작은것을 제거할때는 가장 큰 수 만 제거 되지 않을 수 있다. 
양옆을 고려해야되나?

우선 가장 작은 값은 무조건 무조건 들어간다. 그래서 기준으로 잡는다. 

가장 작은 값과 두번 째로 작은 값은 위치와 상관없이 살아남는다 

투포인터?
*/
function solution(a) {
//     let left=0;
//     let right=a.length-1;
//     let leftMin=a[left];
//     let rightMin=a[right];
//     let count=1; 
    
//     while(left<right){
//         if(a[left] <a[right]){
//             const middle=a[right-1];
//             if(middle<rightMin){
//                 count++;
//                 rightMin=middle;
//             }
//             right--;
//         }else{
//             const middle=a[left+1];
//             if(middle<leftMin){
//                 count++;
//                 leftMin=middle
//             }
//             left++;
//         }
//     }
//     return count
    let front=a[0];
    let back=a[a.length-1];
    let frontArr=[];
    let backArr=[];
    
    for(let i =1; i< a.length-1; i++){
        let current=a[i];
        if( current<front){
            front=current;
            frontArr.push(current);
        }
    }
    for(let i= 1; i<a.length-1; i++){
        let current= a[a.length-1-i];
        if(current <back){
            back=current;
            backArr.push(current);
        }
    }
    
    return new Set([...frontArr, ...backArr]).size+2
}