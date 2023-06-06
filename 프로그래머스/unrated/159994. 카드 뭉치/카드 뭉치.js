function solution(cards1, cards2, goal) {
    for(let a of goal){
        if(a===cards1[0]){
            cards1.shift();
        }else if (a===cards2[0]){
            cards2.shift();
        }else return "No"
    }
    return "Yes"
    
}