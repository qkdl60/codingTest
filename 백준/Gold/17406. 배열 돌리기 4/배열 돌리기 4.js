const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin': './input.txt';
const [[n,m,k], ...s]= fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));
const ar= s.slice(0, n);
const calcInfo=s.slice(n);
const indexs=Array.from({length:k}, (_,i)=>i);
const cases=getPermutations(indexs, k);


/*
 $$$순열, 조합 구하는 방식 공부 배열 회전 방법 공부하기$$$$ 

배열의 값=각 행의 모든 수의 합중 최솟값

배열은 회전 연산  (r,c,s )값을 받으면 
가장 왼쪽 위(r-s, c-s), 가장 오른쪽 아래(r+s, c+s)인 정사각형 시계 방향으로 회전  

회전 연산 순서를 조합의 경우대로 진행하고  
*/
const directions=[[0,1], [1,0], [0,-1], [-1, 0], null];
let min=Number.MAX_SAFE_INTEGER;
for(let c of cases){
    const arr= ar.map(i=>i.map(j=>j));
    for(let i of c){
        const [r,c,s]=calcInfo[i];
        rotateArray(r,c,s, arr);
    }
    const answer =getArrayValue(arr);
    min=Math.min(answer, min)
    
}

console.log(min)

//시계방향 회전, 순회 정지를 위
function rotateArray(r,c,s, map ){
    let [luX, luY]=[r-s-1,c-s-1];
    let [rdX,rdY]= [r+s-1,c+s-1];
    let [ldX, ldY]=[r+s-1,c-s-1];
    let [ruX,ruY]=[r-s-1, c+s-1];
    
    //돌려 돌려 배열 , 어떻게 돌리지, while 문으로 돌리기, for문 ? 크게는 while
    //while 돌리고 위 꼭지점 위치가 같아지면 break한다. 
    while(true){
        if(luX===rdX )break;
        //pointer를 만들어서 돌아다니도록하자 
        let pointer=[luX, luY+1];
        //이전  값을 임시로 저장
        let preValue=map[luX][luY];
        let d=0;
        while(true){
            const[px,py]=pointer;
            const temp=map[px][py];
            map[px][py]=preValue;
            preValue=temp;
            //pointer의 위치가 꼭지점이라면 d++해준다. 
            if((luX===px && luY===py) || (ruX ===px && ruY===py) || (rdX===px && rdY===py) || (ldX===px && ldY===py) )d++;
            if(directions[d]===null)break;
            const [dx,dy]=directions[d];
            pointer=[pointer[0]+dx,pointer[1]+dy];
        }
        //꼭지점 좁혀주기 
        luX++;
        luY++;
        rdX--;
        rdY--;
        ldX--;
        ldY++;
        ruX++;
        ruY--;
    }
}

function getArrayValue(array){
    
    return Math.min(...array.map(i=>i.reduce((acc,cur)=>acc+cur),0 ))
    
}

function getPermutations(arr, selectNum) {
  let results = [[]];
  for(let i = 0; i < selectNum; i++){
    const interim = [];
    for(let j = 0; j < arr.length; j++){
      results.map(val => {
        if(!val.includes(arr[j])){
          interim.push([...val, arr[j]]);
        }
      });
    }
    results = interim;
  }
  return results;
}
