/*
타임 10초 


*/
const fs =require('fs');
const filePath=process.platform ==='linux'?'/dev/stdin':'./input.txt';
const [N, ...S]=fs.readFileSync(filePath).toString().trim().split('\n')
const n =Number(N);
const map=S.map(i=>i.split(" ").map(Number));
//상 하 좌 우
const d= [[-1,0], [1,0], [0,-1],[0,1]];
//
let days = 0;
//완료 여부
let stopFlag=false;
while(!stopFlag){
	//변경해줘야되는 위치와 변경될 정보 { p:[x,y], c:0}
	days++;
	let isStop=true;
	const targets=[]
	for(let i=0; i<n; i++){
		for(let j=0; j< n; j++){
			const t= map[i][j];
			if(t!==0){
				isStop=false;
				let redCount=0
				for(let k=0; k<4; k++){
					const [dx,dy]=d[k];
					const [rx,ry]=[i+dx, j+dy];
					if(rx>=0 && rx<n && ry>=0 && ry<n && map[rx][ry]===0 )redCount++;
				}
				if(redCount===0)continue;
				const after=t-redCount;
				targets.push({p:[i,j], c:after<0? 0:after})
			}
		}
	}
	//단풍 변경
	for(let {p,c} of targets){
		const [x,y]=p;
		map[x][y]=c;
	}
	if(isStop)stopFlag=true;

}
console.log(days-1)
