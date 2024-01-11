const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, ...map] = fs.readFileSync(filePath).toString().trim().split("\n")
const [r,c] = n.split(" ").map(Number)
map = map.map(i => i.split(""))
const impossible = 'KAKTUS'
let goal;
let start;
const water = [[]];
const dirs = [[0,1], [1,0], [-1,0], [0,-1]];

// 각 표시 초기화
map.forEach((i, x) => {
    i.forEach((j, y) => {
        if(j === 'S') start = [x, y];
        if(j === "D") goal = [x, y];
        if(j === "*") water[0].push([x, y]);
    })
})

// 물이 찼는지 확인하는 지도
// 복사 과정을 제거하고 원본 map을 사용하여 메모리 사용량을 줄임
const waterMap = map;

// dp 및 반복을 진행할 지도
const visited = Array.from({length: r}, () => Array.from({length: c}, () => 0))

// bfs 진행한다. 우선 물을 채우고 고스므도치가 가는길을 진행한다. 
let queue = [start];
let time = 1; 

// queue.length가 0이면 while문 종료로 변경하여 코드의 흐름을 명확하게 함
while (queue.length !== 0) {
    // 물이 찬다. 
    const nextWater = [];
    for(const a of water[time-1]) {
        const [x, y] = a; 
        for(const [dx, dy] of dirs) {
            // 중복 계산을 줄이기 위해 nx와 ny를 미리 계산
            const nx = x + dx;
            const ny = y + dy;
            // 지도 크기 검사, 물에서 '.'인 것
            if(nx >= 0 && ny >= 0 && nx < r && ny < c && waterMap[nx][ny] === '.') {
                waterMap[nx][ny] = '*';
                nextWater.push([nx, ny]);
            }
        }
    }
    water[time] = nextWater

    // 고슴도치 움직인다. 
    const replaceQ = [];
    for(const [x, y] of queue) {
        for(const [dx, dy] of dirs) {
            // 중복 계산을 줄이기 위해 nx와 ny를 미리 계산
            const nx = x + dx;
            const ny = y + dy;
            // 지도 크기 검사, 물인지 검사, 방문횟수 비교, 목표 체크 
            if(nx >= 0 && nx < r && ny >= 0 && ny < c && (waterMap[nx][ny] === '.' || waterMap[nx][ny] === "D")) {
                if(visited[nx][ny] === 0) {
                    visited[nx][ny] = time;
                    replaceQ.push([nx, ny]);
                }
                if(waterMap[nx][ny] === "D") {
                    console.log(time)
                    return;
                }
            }
        }
    }
    // 큐 업데이트 방식을 교체하여 메모리 할당과 해제를 줄임
    queue = replaceQ;
    time++;
}
console.log(impossible);