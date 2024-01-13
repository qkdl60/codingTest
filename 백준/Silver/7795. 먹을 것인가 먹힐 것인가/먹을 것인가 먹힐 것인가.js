
/*
A와 B르 정렬 하고
A는 작은 순서부터 체크를 시작한다 . 그 다음은 이전보다 큼으로 이전의 마지막 먹이 다음을 서칭한다. 
그리고 b도 정렬이 되었음으로 큰 부분에 대해서는 서칭을 안해도 된다. 

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [t,...list] = fs.readFileSync(filePath).toString().trim().split("\n")
const answer=[];

for(let i =0; i<Number(t); i++){
    const [N, a,b]=list.slice(0,3);
   
    list=list.slice(3);
    const A=a.split(" ").map(Number).sort((a1,b1)=>a1-b1);
    const B=b.split(" ").map(Number).sort((a1,b1)=>a1-b1);
    let couple=0;
    let preIndex=0;
    let c=0;
    A.forEach((i, iIndex, origin)=>{
        for(let j =preIndex; j<B.length; j++){
            const taget=B[j];
            if(i>taget){
                c++;
                preIndex++;
            }else{
                preIndex=j;
                break;
            }
        }

        couple+=c;
    })
    answer.push(couple)
}
console.log( answer.join("\n"))