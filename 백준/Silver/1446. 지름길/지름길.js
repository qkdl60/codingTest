const fs =require('fs');
const filePath= process.platform==='linux'? '/dev/stdin':'./input.txt'
const [[n,d], ...list ]= fs.readFileSync(filePath).toString().trim().split('\n').map(v=>v.split(' ').map(Number));

const filtered=list.filter(([s,e,t])=>{
    if(e-s<=t)return false;
    if(e>d)return false;
    return true;
})
const shortcut= Array.from({length: d+1}, ()=>[]);
filtered.forEach(v=>{
    const [s,e,t]=v;
    shortcut[e].push([s,t])
})
const dist = Array.from({length: d+1}, (_, index)=>null);
dist[0]=0;

for(let i =1; i<=d; i++){
    let minD=dist[i-1]+1; 
    const shortcuts=shortcut[i];
    if(shortcuts.length){
        shortcuts.forEach((v,j)=>{
            const [s,t]=v;
            const d= dist[s];
            if(d+t<minD){
                minD=d+t;
            }
        })
    }
    dist[i]=minD;
}
console.log(dist[d])


/*
고속도로는 역주행x=> 도착지점을 넘을 수 없다. 

선택 문제로 그리디? dfs? 

시작 도착 배열 만들고 최단거리 비교하며 넣기 

*/

