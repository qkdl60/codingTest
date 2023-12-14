const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,...list] = fs.readFileSync(filePath).toString().trim().split("\n");
const board= list.map(item=>item.split(" "))

/*
width === height
list는 각 지점의 높이를 표시한 것, 
안전한 영역의 최대개수를 계산하는 프로그램

시도1. 높이의 범위를 구하고 각 작은 수 부터 탐색 ㄱㄱ
*/
// 높이 범위
let minHeight=Number.MAX_SAFE_INTEGER;
let maxHeight=Number.MIN_SAFE_INTEGER;
for(let row of board){
    for(let point of row){
        const pointHeight=Number(point);
        if(minHeight>pointHeight)minHeight=pointHeight;
        if(maxHeight<pointHeight)maxHeight=pointHeight
    }
}



// 맵 복사 함수 
const duplicateMap=(map)=>{
    const duplicated=map.map(row=> [...row]);
    return duplicated;
}
// 맵 높이 따라서 BFS 조사 함수 , 지나간 곳은 'V'
const directionX=[0,0,1,-1];
const directionY=[1,-1,0,0]
const checkMap=(rain, map)=>{
    let safetyZoneCount=0;
    for(let i=0; i<Number(n); i++){
        for(let j=0; j<Number(n); j++){
            const startPoint=map[i][j];
            if(startPoint!=="V" && Number(startPoint)>rain){
                map[i][j]="V"
               
                safetyZoneCount++;
                let BFSArray=[[i,j]];
                while( BFSArray.length){
                    const newArray=[]
                    for(let point of BFSArray){
                        const [pointX,pointY]=point;
                        for(let k=0; k<4;k++){
                            const nextX=pointX+directionX[k];
                            const nextY=pointY+directionY[k];
                            if(nextX>=0 && nextX<Number(n)&& nextY>=0 && nextY<Number(n) && map[nextX][nextY]!=="V" && map[nextX][nextY]>rain){
                                map[nextX][nextY]='V';
                                newArray.push([nextX,nextY]);
                            }
                        }
                    }
                    BFSArray=newArray;
                
                }
            }
        }
    }
    return safetyZoneCount;
}


//minHeight부터, maxHeight미만까지 조사
let maxSafetyZoneCount=Number.MIN_SAFE_INTEGER;
for(let rain=0; rain<maxHeight; rain++){
    const duplicatedMap=duplicateMap(board);
    const safetyZoneCount= checkMap(rain, duplicatedMap);
    if(safetyZoneCount>maxSafetyZoneCount)maxSafetyZoneCount=safetyZoneCount;
}

console.log(maxSafetyZoneCount);





