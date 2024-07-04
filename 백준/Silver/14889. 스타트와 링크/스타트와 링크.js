const [N, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const S = arr.map((line) => line.split(' ').map(Number));
const numbers = Array.from({ length: N }, (_, i) => i);


function getPower(arr) {
    let power = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const a = arr[i];
            const b = arr[j];
            power += S[a][b] + S[b][a];
        }
    }

    return power;
}

let minDiff = Infinity;

const startTeam = [];

function dfs(count, start) {
    if (count === N / 2) {
        const linkTeam = numbers.filter((number) => !startTeam.includes(number));
        const diff = Math.abs(getPower(linkTeam) -getPower(startTeam));
        minDiff = Math.min(minDiff, diff);
        return;
    }

    for (let i = start; i < N; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        startTeam.push(i);
        dfs(count + 1, i);
        startTeam.pop();
        visited[i] = false;
    }
}

const visited = new Array(N).fill(false);
dfs(0, 0);
console.log(minDiff);