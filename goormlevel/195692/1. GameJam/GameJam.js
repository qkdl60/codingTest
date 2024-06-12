const fs = require('fs')
const filePath= process.platform==='linux'?'/dev/stdin': './input.txt';
const [N,G,P,...S]=fs.readFileSync(filePath).toString().trim().split("\n")
const n =Number(N);
const [gr,gc]=G.split(" ").map(Number);
const [pr,pc]=P.split(" ").map(Number);
const commandMap={"L":[0,-1], "R":[0,1], "U":[-1,0], "D":[1,0]}
//이동 중 밖으로 나가면 반대편 쪽으로 이동, 자신의 말이 있던 곳을 지나야한다면 끝, 
//게임 점수는 이동한 칸 수 
const board= S.map(i=>i.split(' '));
//본인이 이동했던 위치 표시용 
const gMap =Array.from({length:n}, ()=>Array.from({length:n}, ()=>0));
//생존 flag, 현재 위치 init
let gFlag=true;
let gCurrent=[gr-1, gc-1];
gMap[gr-1][gc-1]=1;

while(gFlag){
	//현재 위치에서 command와 이동 칸 수 를 확인 
	const [cx,cy]=gCurrent;
	const o=board[cx][cy];
	//split('')으로 자르면 안되느된 count가 일의 자리만 있는것이아니라서 ㅠㅠ
	const command=o.at(-1);
	const count =o.substring(0,o.length-1);
	const [mx,my]=commandMap[command];
	for(let i =0 ; i<Number(count); i++){
		let [nx,ny]=[gCurrent[0]+mx, gCurrent[1]+my];
		//범위에 대한 처리 먼저 
		if(nx>=n)nx=0;
		if(nx<0)nx=n-1;
		if(ny>=n)ny=0;
		if(ny<0)ny=n-1;
		if(gMap[nx][ny]===0){
			gMap[nx][ny]=1;
			gCurrent=[nx,ny];
			continue;
		}else{
			gFlag=false;
			break;
		} 		
	}
}
//점수 계산 
const gScore=gMap.flat(2).reduce((acc,cur)=>acc+cur, 0);

const pMap =Array.from({length:n}, ()=>Array.from({length:n}, ()=>0));
let pCurrent=[pr-1, pc-1];
let pFlag=true;
pMap[pr-1][pc-1]=1;
while(pFlag){
		const [cx,cy]=pCurrent;
	const o=board[cx][cy];
	const command=o.at(-1);
	const count =o.substring(0,o.length-1);
	const [mx,my]=commandMap[command];
	for(let i =0 ; i<Number(count); i++){
		let [nx,ny]=[pCurrent[0]+mx, pCurrent[1]+my];
		//범위에 대한 처리 먼저 
		if(nx>=n)nx=0;
		if(nx<0)nx=n-1;
		if(ny>=n)ny=0;
		if(ny<0)ny=n-1;
		if(pMap[nx][ny]===0){
			pMap[nx][ny]=1;
			pCurrent=[nx,ny];
			continue;
		}else{
			pFlag=false;
			break;
		}
	}
}
// p점수 계산
const pScore=pMap.flat(2).reduce((acc,cur)=>acc+cur,0);
const answer=gScore>pScore?`goorm ${gScore}`: `player ${pScore}`;
console.log(answer)
