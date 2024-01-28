/*
 
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S, ...L] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));
const [m,n]=S;
const list=L;
const d=[[0,1], [0,-1], [1,0],[-1,0]]
let tomatos=[];
for(let i=0; i<n; i++){
    for(let j = 0 ; j<m ; j++){
        const a =list[i][j];
        if(a===1){tomatos.push([i,j])}
    }
}

let days=0;
while(tomatos.length){
    const replaced=[];
    for(let a of tomatos){
        const [x,y]=a; 
        for(let i = 0 ; i< 4; i++){
            const [dx,dy]=d[i]
            const [nx,ny]=[x+dx, y+dy];
            if(nx>=0 && nx<n && ny>=0 && ny<m && list[nx][ny]===0){
                list[nx][ny]=1;
                replaced.push([nx,ny]);
            }
        }
    }
    tomatos=replaced
    days++;
}
for(let i = 0 ; i<n; i++){
    for(let j =0; j<n; j++){
        const a =list[i][j];
        if( a===0 ){
            console.log(-1);
            return ;
        }
    }
}
console.log(days-1)