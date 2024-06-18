/*
앞 뒤로만 움직인다.
좌, 우 움직임x, 회전만 
현재 방향 상태 
거북이가 이동한 영역을 모두 포함할수 있는 가장 작은 직사각형의 넓이

처음에는 북쭉을 보고 있다. 
*/

const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N, ...s]=fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
//f는 1,b은 0, l은 +1, r은 -1 
const direction=[
    [[1,0],[-1,0]],
    [[0,-1],[0,1]],
    [[-1,0],[1,0]],
    [[0,1],[0,-1]],
]
const move={"F":1, "B":0 };
const rotate={"R":-1, "L": 1};
//직사각형을 어떻게 추적? 움직일때마다 최대 크기를 통해서 직사각형 만들기 
//
const result=[];
for(let c of s){
    const command=c.split('');
    let current= 0;
    const currentP=[0,0];
    // y축 최대, y축 최소, x축 최대, x축 최소
    const arrange=[0,0,0,0];
    for(let a of command){
        if(a==='L'|| a==="R"){
            current=current+rotate[a];
            if(current<0)current=3;
            if(current>3)current=0;
            continue;
        }
        // 움직임 
        const [mx, my]=direction[current][move[a]];
        [currentP[0],currentP[1]]=[currentP[0]+mx, currentP[1]+my];
        
        //nx,ny에 대한 검증?
        if(currentP[0]<arrange[3])arrange[3]=currentP[0];
        if(currentP[0]>arrange[2])arrange[2]=currentP[0];
        if(currentP[1]>arrange[0])arrange[0]=currentP[1];
        if(currentP[1]<arrange[1])arrange[1]=currentP[1];
    }
    const w=arrange[0]-arrange[1];
    const h=arrange[2]-arrange[3];
  
    result.push(w*h);
}

console.log(result.join('\n'))