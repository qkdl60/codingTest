const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [t, ...x] = fs.readFileSync(filePath).toString().trim().split("\n");
t=+t
x=x.map(v=>+v);
//a층의 b호에 살려면 자신의 아래층(a-1)의 1호 부터 b호까지 사람들의 수 의 합만긐 사람들을 데려와 살아얗낟. 
//0층의 i호에는 i명

for(let i =0; i<t; i++){
    const apt=[]
    const [k, n]=x.splice(0,2)
    const base=Array.from({length:n},(_, i)=>i+1 )
    apt.push(base)
    for(let j =1; j<=k; j++){
        const floorJ=[1]
        for(let l=1; l<n; l++){
            floorJ[l]=floorJ[l-1]+apt[j-1][l]    
        }
        apt.push(floorJ)
    }
    console.log(apt[k][n-1])
   
}