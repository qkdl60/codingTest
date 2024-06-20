/*


*/

const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';

const [N,...S]=fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const map =S.map(i=>i.split(' ').map(Number));

const WIN_MESSAGE="HaruHaru";
const DEFEAT_MESSAGE="Hing";

const directions= [[1,0], [0,1]];
const visited=Array.from({length:n}, ()=>Array.from({length:n}, ()=>false));
visited[0][0]=true;
let q=[[0,0]];
let winFlag=false;
while(q.length){
    const temp=[];
    for(const [cx,cy] of q ){
        const a =map[cx][cy];
        if(a===-1){
            winFlag=true;
            break;
        }
        for(let [dx,dy] of directions){
            const [nx,ny]=[(dx*a)+cx, dy*a+cy];
            if(nx>=0 && nx<n && ny>=0 &&ny <n && !visited[nx][ny] ){
                visited[nx][ny]=true;
                temp.push([nx,ny]);
            }
        }
    }
    if(winFlag)break;
    q=temp;
}
console.log(winFlag?WIN_MESSAGE:DEFEAT_MESSAGE)