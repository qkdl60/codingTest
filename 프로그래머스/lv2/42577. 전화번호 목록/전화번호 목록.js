function solution(phone_book) {
    //한 번호가 다른 번호의 접두어인 경우 확인, 
    //한 번호가 다른 번호의 포함이 아닌 접두어인 경우false, 아니면 true
    // 총길이 백만으로 1번 순회 안으로 
    phone_book.sort()
    for(let i =0; i <phone_book.length-1; i++){
        let a =phone_book[i];
        let b= phone_book[i+1];
        if(b.substring(0, a.length)===a)return false;
    }
    return true
}