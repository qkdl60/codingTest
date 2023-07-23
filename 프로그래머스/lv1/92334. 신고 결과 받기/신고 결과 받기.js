

function solution(id_list, report, k) {
   /*
   각 유저는 한번에 한명, 신고횟수제한x, 서로다른 유전 계속 신고가능, 한 유저를 여러번 신고가능 하지만 1회로 처리
   k번 이상 신고된 유저는 게시판 이용 정지, 해당유저를 신고한 유저에게 정지사실 메일 발송
   마지막 한번에 신고를 취합 후 메일 발송
    report는 '무지 프로도'이면 무지가 프로도를 신고하것이 된다.  각 유저가 받을 결과 메일의 횟수를 리턴 
    
   */
    
    // 각 유저가 누구에게 신고를 당했는지 체크를 하고  그 길이가 2 이상이면 그 유저들에게  메일을 봬준다. 
    //리스트를 0으로 초기화
    let reportedList = {};
    let mailCountList={}
    for(let a of id_list ){
        reportedList[a]=[];
        mailCountList[a]=0;
    }
    // 각 유저가 누구에게 신고를당했는지 이름을 넣우준다. 중복도 제거하며
    for(let a of report ){
        let[b,c] =a.split(" ");
        reportedList[c]=[...new Set([...reportedList[c], b])]
    }
    
    for( let a in reportedList){
        const l=reportedList[a];
        if(l.length>=k){
            for(let b of l){
                mailCountList[b]+=1;
            }
        }
    }
   
    return Object.values(mailCountList)
 
    
    
  
    
}