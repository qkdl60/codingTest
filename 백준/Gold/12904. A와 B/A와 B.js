const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [s,t]= fs.readFileSync(filePath).toString().trim().split("\n");

/*
문자열 뒤에 A 추가
문자열 뒤집고 뒤에 B 추가

s=>t 로 만들수 있다면 1, 없다면 0 
 
s와 t의 길이가 같은 경우는 없고, s<t 이다. 

길이 차이가 연산 시행 회수

DFS?
BFS?
T에서 S로 가야한다. 
T 끝자리를 보고 어떤로직이 실행됐는지 유추 실행 확인 순
*/
let answer=0
DFS(t)
console.log(answer)

function DFS(str){
    if(str.endsWith("A")){
        const a=[...str];
        a.pop();
        const b = a.join('');
        if(b===s){
            answer=1;
            return; 
        }
        if(b.length<=s.length)return
        DFS(b)
        return;
    }
    const a= [...str];
    a.pop();
    const b= a.reverse().join('');
    if(b===s){
        answer=1;
        return; 
    }
    if(b.length<=s.length)return;
    DFS(b);
    return 
}



