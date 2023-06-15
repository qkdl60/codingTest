function solution(new_id) {
    // 규칙에 맞지 않을떄 유저에게 유사하고 규칙에 맞는 아이디추천
    // 길이 3<= <=15; (-, _, . ) 사용 가능 마침표는 처음과 끝에 사용할 수 없고, 연속적으로 사용x
    
    //1. 소문자 치환
    let id=new_id.toLowerCase();
    
    // 알파벳소문자, 숫자, -,_,. 외는 제외
    const reg1=/[^a-z0-9-_.]/g;
    id=id.replaceAll(reg1, "");

    //. 2번 이상이면 1번으로 치환
    const reg2=/\.{2,}/g
    id=id.replaceAll(reg2, ".");
    console.log(id)
    //. 처음이나 끝에 나오면 제거 
    const reg3=/(^\.)|(\.$)/g;
    id=id.replaceAll(reg3, "");
    console.log(id)
    //빈문자열이면 'a'대입;
    if(id==="")id+="a";
    console.log(id);
    //길이가 16 이상이면 자르고, 
    if(id.length>=16)id=id.substring(0,15)
    const reg4=/\.$/g;
    if(id.match(reg4))id=id.replace(reg4, "")
    
    // 길이가 2이하이면
    while(id.length<=2){
        id+=id[id.length-1];
    }
    return id



    
}