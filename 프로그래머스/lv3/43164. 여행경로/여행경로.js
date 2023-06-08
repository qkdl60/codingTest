function solution(tickets) {
    // 경로가 여러가지 이면 사전순서상 앞
        
    let ticketsInfo=tickets.map(([from, to], idx)=>{return {from, to ,idx}});
    //dfs로 모든 티켓을 사용하지 못했다면 back 
    //사용한 티켓은 인덱스로 저장
    let usedTickets=[];
    function searchTicket(from){
            let ticketIdxs=ticketsInfo.filter((t)=>(t.from===from && !usedTickets.includes(t.idx)));
            // 없다면 null, 있다면 to를 사전순으로 정렬해서 넘겨준다. 
            if(ticketIdxs.length===0)return [];
            else return ticketIdxs.sort((a,b)=>{
                if(a.to>b.to)return +1;
                else if (a.to <b.to )return -1;
                else return 0;
            });
    }   
    

    let answer=[];
    let flag=false
    function DFS(from ){
        if(usedTickets.length===tickets.length){  // 끝 
            flag=true;
        }else{
            let ticketing=searchTicket(from);
            
            for(let a of ticketing){
                usedTickets.push(a.idx);
                DFS(a.to);
                if(flag)break;
                usedTickets.pop();
            }
            
        }
    }
    DFS("ICN");
    return ["ICN", ...usedTickets.map(tIdx=>tickets[tIdx][1])]
}