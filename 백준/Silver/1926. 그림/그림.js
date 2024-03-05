const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m], ...list]= fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));

let max=0;
let count=0;
for(let i =0; i<n ; i++){
    for(let j = 0; j<m; j++){
        if(list[i][j]===1){
            count++;
            const scale=bfs(i,j);
    
            max= Math.max(scale, max);
        }
    }
}
console.log(count+'\n'+max)


function bfs(i,j){
    let queue=[[i,j]];
    list[i][j]=0;
    const d= [[1,0], [0,1], [-1, 0], [0, -1]];
    let count=1;
    while(queue.length){
        const replaced=[]
        for(let [x,y]of queue){
            for(let k=0; k<4; k++){
                const [dx,dy]=d[k];
                const [nx,ny]=[dx+x, dy+y];
                if(nx>=0 && nx<n && ny>=0 && ny<m && list[nx][ny]===1){
                    list[nx][ny]=0;
                    count++;
                    replaced.push([nx,ny]);
                }
            }
        }
        queue=replaced;
    }
    return count;
}