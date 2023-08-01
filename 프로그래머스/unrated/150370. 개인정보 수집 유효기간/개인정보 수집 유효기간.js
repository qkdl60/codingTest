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
        termsObj[type]=months*1;
    }
    // month  유효기간을 더해주고, 12로 나누어서 Math.floor으로 년도에 더해주고 나머지는 month에 
    const answer=[];
    privacies.forEach((a,index)=>{
        let [day, type]=a.split(" ");
        let [y, m, d]=day.split(".").map(v=>v*1);
        let months=termsObj[type];
        let endM=((m+months-1)%12)+1;
        let endY=y+Math.floor((months+m)/12);
        if((months+m)%12===0)endY--;
            
       
        console.log(endY, endM, d)
        
        if(ty>endY)answer.push(index+1);
        else if (ty===endY && tm>endM)answer.push(index+1);
        else if (ty===endY && tm===endM && td>=d)answer.push(index+1);
        
    })
    return answer
}