const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [[n,m,k], ...s]=fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));
const energy= s.slice(0,n);
const woods= s.slice(n);
/*
가장 처음 양분은 모든 칸에 5만큼 들어있다. 

m개를 심었다.  한칸에 여러개가 심을 수 있다. 

봄: 나이만큰 땅의 양분 흡수, 나이 +1, 양분은 나이가 어린순으로 먼저 먹는다. 
만약 양분을 못 먹으면 사망

여름: 죽은 나무가 양분으로 양분 값은 나이/2 

가을: 나이가 5의 배수이면 번식, 인접한 8개 칸에 나이 1 나무 추가 

겨울: 땅에 양분 추가 

K년이 지난 후 상도의 땅에 살아있는 나무의 개수를 구하는 프로그램을 작성하시오.

우선순위 큐가 맞는데, 다른 방법이 없나 ? 
우선 스택이용해서 3차원 배열, 나이 내림차순으로  

1. 나무를 심고 => 우선순위 큐? , 3차원 배열, 객체
2. 계절이 지나도록? 
*/
const surround=[[-1,-1],[-1,0], [-1,1], [0,-1],[0,1],[1,-1],[1,0], [1,1] ];
const woodMap=Array.from({length:n}, ()=>Array.from({length:n}, ()=>false));
const currentEnergy=Array.from({length:n}, ()=>Array.from({length:n}, ()=>5));

for(let [x,y,z] of woods){

    if(!woodMap[x-1][y-1]){
        woodMap[x-1][y-1]=[z];
        continue;
    }
    woodMap[x-1][y-1].push(z);
    
}
for(let i=0; i< k; i++){
    go(woodMap, currentEnergy);
    
}
let count= 0; 
for(let i = 0; i<n; i++){
    for(let j= 0; j<n; j++){
        const a=woodMap[i][j];
        if(a)count+=a.length; 
    }
}
console.log(count)


function go(map,currentEnergy){
    //봄, 여름 
    for(let i = 0 ; i<n; i ++){
        for(let j= 0; j<n; j++){
  
            //양분을 먹은 나무 다시 넣어줄 배열
            const temp =[];
            const c =map[i][j];
            //어린순 대로 양분 먹이고 모자라면 다 뽑기 
            if(!c)continue;
            const die=[];
            for(let k=c.length-1; k>=0; k--){
                let a=c[k];
                if(a>currentEnergy[i][j]){
                   die.push(a);
                }else{
                    currentEnergy[i][j]=currentEnergy[i][j]-a;
                    temp.push(a+1);
                };
                if(k===0){
                    
                    map[i][j]=temp.length===0?false:temp.reverse();
                }
            }
            for(let d of die){
                const diedE=Math.floor(d/2);
                currentEnergy[i][j]+=diedE;
            }
        }
    }
    //가을,겨울
    for(let i=0; i<n; i++){
        for(let j=0; j< n; j++){
            const c=map[i][j];
            //양분도 주자
            currentEnergy[i][j]=energy[i][j]+currentEnergy[i][j];
            if(!c)continue;
            for(const a of c){
                if(a%5===0){
                    for(let [dx,dy]of surround){
                        const [nx, ny]=[i+dx, j+dy];
                        if(nx>=0 && nx<n && ny>=0 && ny<n ){
                            const nm=map[nx][ny];
                            if(!nm){
                                map[nx][ny]=[1];
                                continue;
                            }
                            nm.push(1);
                        }
                    }
                }
            }
        }
    }

    
    
}



