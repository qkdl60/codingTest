function solution(today, terms, privacies) {
    const [ty, tm, td]=today.split(".").map(v=>v*1);
    /*
        약관의 종류는 여러가지, 각 약관마다 유효기간이 있다. 
        모든 달은 28일까지, 오늘날짜는 yyyy.mm.dd 이다. 
        약관은 중복x,  유효기간은 달 1<= <=100, 
        privacies 수집일, 종류   
        파기해야할 개인정보의 번호를 오름차순으로 리턴
    */
    //terms를 객체롤 변환
    const termsObj={};
    for(let a of terms){
        let [type, months]=a.split(" ");
        termsObj[type]=months*28;
    }
// 모든것을 다 day기준으로 바꾸고 비교한다. 
    const answer=[];
    const totalToday=(ty*12*28)+(tm*28)+td;
    privacies.forEach((a,index)=>{
        let [day, type]=a.split(" ");
        let [y, m, d]=day.split(".").map(v=>v*1);
        const plusDays=termsObj[type];
        const totalDay=(y*12*28)+(m*28)+d+plusDays;
        //만약 현재가 더 크다면 계약기간이 지난것이다. 
        if(totalToday>=totalDay)answer.push(index+1)
    }) 
    return answer
}