/*
한 번에 한 행만 선택할 수 있다. 

삭제된 행은 x,
삭제가 안된 행은 o, 
추가는 없고 해당 삭제 


splice 사용?
cmd 최대 1000 완전탐색식으로도 가능? 배열 크기도 최대 1000 ,splice 복잡도n 
완탐x

cmd는 순차적으로 모두 실행줘야된다 
splice말고 다른 방법 필요 복잡도 1인 방법 
해당 인덱스 x 표시? current이 온다면 한번더 진행 
스택은 o 
linkedList 로 ?
해당 인덱스에 상태,left, right를 가진다. 
해당 인덱스의 상태가 'X' 가 된다면 left, right 를 검사 후 
 옆에서 상태가 X인이면 left는 left의 left를 가져온다.  상태 변경시 좌우를 같이 변경 해준다. 
 
*/
function solution(n, k, cmd) {
    const deletedList=[];

    let current=k;
    const list=Array.from({length: n}, (_,index,origin)=> {
        if(index===0)return {up:null, state:'O', down:index+1};
        if(index===n-1)return {up: index-1, state:'O', down:null}
        return {up:index-1, state:"O", down:index+1};
    });
    

    for(let order of cmd){
        let [t,count]=order.split(" ");
        let num=Number(count);
        
        if(t==='U'){
          while (list[current].up !==null && num!==0 ){
              current=list[current].up;
              num--;
          }  
         

        }
        if(t==="D"){
            while(list[current].down !==null && num!==0){
                current=list[current].down;
                num--;
            }
        }
        if(t==="C"){
            //지우고 현재 위치 조정 필요 
            deletedList.push(current);
            list[current].state="X";
            
            //0번 인덱스가 삭제되면 0 번 인덱스의 up은 업데이트x, 마지막은 last인덱스의 down은 업데이트x
            if(current!==0 && list[current].up!==null)  list[list[current].up].down=list[current].down
            if(current!==list.length-1 && list[current].down!==null) list[list[current].down].up=list[current].up
            //지우고는 아래행으로 
            current=list[current].down!==null ?list[current].down:list[current].up!==null?list[current].up: current;
         
            //모두 삭제되는 케이스도 있나?
        }
        if(t==="Z"){
            const last= deletedList.pop();
            list[last].state="O";
            //0번 인덱스이면 down만 업데이트 , 라스이면 up 만 인덱스 
            if(last!==0 && list[last].up!==null) list[list[last].up].down=last;
            if(last!==list.length-1 && list[last].down!==null)  list[list[last].down].up=last;
            // 살리고 현재값을 변경할 필요 없다.  
            
        }
    }
    return [...list].map(i=>i.state).join("")
  

}