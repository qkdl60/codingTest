function solution(word) {
const first={A:1, E:782, I:1563, O:2344, U:3125}
const second={A:1,E:157, I:313, O:469, U:625}
const third= {A:1,E:32, I:63, O:94, U:125}
const fourth={A:1, E:7, I:13 , O:19, U:25}
const fifth={A:1, E:2, I:3, O:4, U:5};
const order=[first, second, third, fourth, fifth];
let answer=0;
    for(let i=0; i<word.length; i++){
        const lengths=order[i];
        const char=word[i];
        answer+=lengths[char];
    }
    
return answer
/*
"AAAAE" 6
"AAAE" 10
"I" 1563 -> 이 전에 1562개가 있다, 그러면 "A"~ "E"전까지 1~781까지, "E"~"I"전까지 782~1562까지
그러면 맨 앞자리에 의한 범위가 정해지고 ,
"A"는"AA", AE", "AI", "AO", "AU"로 구성 2~781을 5개 로 나누면(1번은 "A") 
"AA"~"AE전" 156개씩
"AA"는"AAA","AAE","AAI", "AAO","AAU"로 구성 3~157을 (2번은 "AA")
"AAA"~"AAE전" 31개씩
"AAAA"~"AAAE전" 6개씩
=> 식으로 뽑기  
"EIO" 1189

*/
}